<script lang="ts" setup>
import { usePhoto } from '~/composables/usePhoto';
import type { ProductEntity } from '~/types/entities'

const props = defineProps<{
  categoryId: number,
  preset?: ProductEntity | null
}>()
const emit = defineEmits<{
  submit: []
}>()

defineExpose({
  title: props.preset?.id ? "Змінити продукт" : "Додати продукт",
})

const { add, edit } = useProductRepository()
const { photo, add: addPhoto } = usePhoto(props.preset?.image)

const loading = ref(false)
const state: Partial<ProductEntity> = reactive({
  description: props.preset?.description,
  title: props.preset?.title,
  image: props.preset?.image,
  price: props.preset?.price
})

function validate(state: ProductEntity) {
  const errors = []
  if (!state.description)
    errors.push({ path: 'description', message: "Обовʼязкове поле" })
  if (!state.title)
    errors.push({ path: 'title', message: "Обовʼязкове поле" })
  if (!state.price)
    errors.push({ path: 'price', message: "Обовʼязкове поле" })

  return errors
}

async function onCreateOrUpdate() {
  loading.value = true
  const image = await addPhoto()

  const data = {
    ...state,
    image,
  } as  ProductEntity

  if (props.preset?.id)
    await edit(props.preset.id, data)
  else
    await add(props.categoryId, data)

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
        <UInput v-model="state.description" />
      </UFormGroup>
      <UFormGroup
        label="Ціна"
        name="price"
        required
      >
        <UInput v-model="state.price" type="number">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">ГРН</span>
          </template>
        </UInput>
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