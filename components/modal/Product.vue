<script lang="ts" setup>
import type { ColorEntity, ParameterEntity, ProductEntity } from '~/types/entities'

const props = defineProps<{
  preset?: ProductEntity | null
}>()
const emit = defineEmits<{
  submit: []
}>()

defineExpose({
  title: props.preset?.id ? 'Змінити продукт' : 'Додати продукт',
  ui: { width: 'sm:max-w-4xl' },
})

const toast = useToast()
const { add, edit } = useProductRepository()
const { photo, url, add: addPhoto } = usePhoto(props.preset?.image)

const loading = ref(false)
const state: Partial<ProductEntity> = reactive({
  description: props.preset?.description,
  title: props.preset?.title,
  image: props.preset?.image,
  price: props.preset?.price,
  application: props.preset?.application,
  size: props.preset?.size,
  standart: props.preset?.standart,
  tags: props.preset?.tags,
  colors: props.preset?.colors,
  parameters: props.preset?.parameters,
})
const brand = ref<number>()
const category = ref<number>()
const colors = computed({
  get() {
    return state.colors?.map(color => color.id) || []
  },
  set(value: number[]) {
    state.colors = value.map(id => ({ id } as ColorEntity))
  },
})
const parameters = computed({
  get() {
    return state.parameters?.map(parameter => parameter.id) || []
  },
  set(value: number[]) {
    state.parameters = value.map(id => ({ id } as ParameterEntity))
  },
})

function validate(state: ProductEntity) {
  const errors = []

  if (!brand.value && !props.preset)
    errors.push({ path: 'brand', message: 'Обовʼязкове поле' })
  if (!category.value && !props.preset)
    errors.push({ path: 'category', message: 'Обовʼязкове поле' })
  if (!state.description)
    errors.push({ path: 'description', message: 'Обовʼязкове поле' })
  if (!state.title)
    errors.push({ path: 'title', message: 'Обовʼязкове поле' })
  if (!state.price)
    errors.push({ path: 'price', message: 'Обовʼязкове поле' })
  if (!state.application)
    errors.push({ path: 'application', message: 'Обовʼязкове поле' })
  if (!state.size)
    errors.push({ path: 'size', message: 'Обовʼязкове поле' })
  if (!state.standart)
    errors.push({ path: 'standart', message: 'Обовʼязкове поле' })

  return errors
}

async function onCreateOrUpdate() {
  loading.value = true
  try {
    await addPhoto()
  }
  catch (error: any) {
    toast.add({
      title: 'Помилка завантаження фото',
      description: error.message,
    })
  }

  const data = {
    ...state,
    image: url.value,
  } as ProductEntity

  try {
    if (props.preset?.id)
      await edit(props.preset.id, data)
    else
      await add(category.value!, data)

    emit('submit')
  }
  catch (error: any) {
    toast.add({
      title: 'Не вдалось додати/змінити продукт',
      description: error.message,
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm
    :state="state"
    :validate="validate"
    class="space-y-2"
    @submit="onCreateOrUpdate"
  >
    <div class="grid grid-cols-2 gap-2">
      <input-file
        class="block w-40 m-auto row-span-3"
        :src="state.image"
        @change="photo = $event"
      />
      <UFormGroup label="Бренди" name="brand">
        <UseBrandSelector v-model="brand" :disabled="!!preset" />
      </UFormGroup>

      <UFormGroup label="Категорії" name="category">
        <UseCategorySelector v-model="category" :brands="brand ? [brand] : []" :disabled="!!preset" />
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
        class="row-span-3"
      >
        <UTextarea v-model="state.description" :rows="6" />
      </UFormGroup>
      <UFormGroup
        label="Колір"
        name="colors"
        required
      >
        <UseColorSelector v-model="colors" multiple />
      </UFormGroup>
      <UFormGroup
        label="Характеристики"
        name="parameters"
        required
      >
        <UseParameterSelector v-model="parameters" multiple />
      </UFormGroup>
      <UFormGroup
        label="Застосування"
        name="application"
        required
      >
        <UInput v-model="state.application" />
      </UFormGroup>
      <UFormGroup
        label="Розмір"
        name="size"
        required
      >
        <UInput v-model="state.size" />
      </UFormGroup>
      <UFormGroup
        label="Стандарт"
        name="standart"
        required
      >
        <UInput v-model="state.standart" />
      </UFormGroup>
      <UFormGroup
        label="Ціна"
        name="price"
        required
      >
        <UInput v-model.number="state.price" type="number" step="any">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">ГРН</span>
          </template>
        </UInput>
      </UFormGroup>
      <UFormGroup
        label="Теги для пошуку"
        name="tags"
        required
      >
        <InputTags v-model="state.tags" />
      </UFormGroup>
    </div>
    <div class="flex justify-end">
      <UButton
        :loading="loading"
        type="submit"
        class="flex justify-center"
      >
        Зберегти
      </UButton>
    </div>
  </UForm>
</template>
