<script lang="ts" setup>
import { useCategoryRepository } from '~/composables/useCategoryRepository'
import { usePhoto } from '~/composables/usePhoto'
import type { CategoryEntity } from '~/types/entities'

const props = defineProps<{
  preset?: CategoryEntity | null
}>()
const emit = defineEmits<{
  submit: []
}>()

defineExpose({
  title: props.preset?.id ? 'Змінити категорію' : 'Додати категорію',
})

const { add, edit } = useCategoryRepository()
const { photo, add: addPhoto } = usePhoto(props.preset?.image)

const loading = ref(false)
const state: Partial<CategoryEntity> = reactive({
  description: props.preset?.description,
  title: props.preset?.title,
  image: props.preset?.image,
})
const brand = ref<number>()

function validate(state: CategoryEntity) {
  const errors = []
  if (!state.description)
    errors.push({ path: 'description', message: 'Обовʼязкове поле' })
  if (!state.title)
    errors.push({ path: 'title', message: 'Обовʼязкове поле' })
  if (!props.preset?.id && !brand.value)
    errors.push({ path: 'brand', message: 'Обовʼязкове поле' })

  return errors
}

async function onCreateOrUpdate() {
  loading.value = true
  const image = await addPhoto()

  const data = {
    ...state,
    image,
  } as CategoryEntity

  if (props.preset?.id)
    await edit(props.preset.id, data)
  else
    await add(brand.value!, data)

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
      <UFormGroup v-if="!preset" label="Бренди" name="brand" class="w-40">
        <UseBrandSelector v-model="brand" class="w-full" />
      </UFormGroup>
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
