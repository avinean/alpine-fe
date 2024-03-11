<script lang="ts" setup>
import { usePhoto } from '~/composables/usePhoto';
import type { BrandEntity } from '~/types/entities'

const props = defineProps<{
  preset?: BrandEntity | null
}>()
const emit = defineEmits<{
  submit: []
}>()

defineExpose({
  title: props.preset?.id ? "Змінити бренд" : "Додати бренд",
})


const { add, edit } = useBrandRepository()
const { photo, add: addPhoto } = usePhoto(props.preset?.image)

const loading = ref(false)
const state: Partial<BrandEntity> = reactive({
  description: props.preset?.description,
  title: props.preset?.title,
  image: props.preset?.image,
})

function validate(state: BrandEntity) {
  const errors = []
  if (!state.description)
    errors.push({ path: 'description', message: "Обовʼязкове поле" })
  if (!state.title)
    errors.push({ path: 'title', message: "Обовʼязкове поле" })

  return errors
}

async function onCreateOrUpdate() {
  loading.value = true
  const image = await addPhoto()

  const data = {
    ...state,
    image,
  } as  BrandEntity

  if (props.preset?.id)
    await edit(props.preset.id, data)
  else
    await add(data)

  emit('submit')
}
</script>

<template>
  <UForm
    :state="state"
    :validate="validate"
    class="grid gap-2"
    @submit="onCreateOrUpdate"
  >
    <div class="grid grid-cols-2 gap-x-4 gap-y-2">
      <input-file
        class="row-span-6"
        :src="state.image"
        @change="photo = $event"
      />
      <UFormGroup
        label="Назва"
        name="title"
        required
      >
        <UInput v-model="state.title" />
      </UFormGroup>
      <UFormGroup
        label="Опис"
        name="description"
        required
      >
        <UTextarea v-model="state.description" />
      </UFormGroup>

      <UButton
        type="submit"
        class="flex justify-center"
      >
        Зберегти
      </UButton>
    </div>
  </UForm>
</template>