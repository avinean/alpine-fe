<script setup lang="ts">
import { ModalProduct } from '#components'
import type { CategoryEntity, ProductEntity } from '~/types/entities'
import { VisibilityStatus } from '~/types/enums'

const modalStore = useModalStore()
const router = useRouter()
const route = useRoute()
const statuses = ref<VisibilityStatus[]>([
  VisibilityStatus.Published,
  VisibilityStatus.Draft,
])
const selectedBrands = computed({
  get() {
    return route.query.brands?.toString()?.split(',').map(Number) || []
  },
  set(ids: number[]) {
    router.replace({
      query: {
        ...route.query,
        brands: ids.length ? ids.join(',') : undefined,
        categories: undefined,
      },
    })
  },
})
const selectedCategories = computed({
  get() {
    return route.query.categories?.toString()?.split(',').map(Number) || []
  },
  set(ids: number[]) {
    router.replace({
      query: {
        ...route.query,
        categories: ids.length ? ids.join(',') : undefined,
      },
    })
  },
})

const { get, publish, draft, archive } = useProductRepository()
const { data, refresh } = useAsyncData(
  () => get({ categories: selectedCategories.value, statuses: statuses.value }),
  { watch: [selectedCategories, statuses] },
)

function callModal(preset?: ProductEntity) {
  modalStore.open(ModalProduct, {
    preset,
    onSubmit() { refresh() },
  })
}

const columns = [
  {
    key: 'status',
    label: 'Статус',
  },
  {
    key: 'title',
    label: 'Назва',
  },
  {
    key: 'description',
    label: 'Опис',
  },
  {
    key: 'price',
    label: 'Ціна',
  },
  {
    key: 'image',
    label: 'Зображення',
  },
  {
    key: 'createdAt',
    label: 'Створено',
  },
  {
    key: 'updatedAt',
    label: 'Оновлено',
  },
  {
    key: 'actions',
    label: 'Дії',
  },
]
</script>

<template>
  <main class="space-y-2 py-2">
    <div class="flex justify-between items-center">
      <div class="flex gap-2 p-2">
        <UFormGroup label="Статуси" class="w-40">
          <UseStatusSelector v-model="statuses" />
        </UFormGroup>
        <UFormGroup label="Бренди" class="w-40">
          <UseBrandSelector v-model="selectedBrands" multiple />
        </UFormGroup>
        <UFormGroup label="Категорії" class="w-40">
          <UseCategorySelector v-model="selectedCategories" :brands="selectedBrands" multiple />
        </UFormGroup>
      </div>
      <UButton icon="i-heroicons-folder-plus-16-solid" @click="() => callModal()">
        Додати продукт
      </UButton>
    </div>
    <UTable v-if="data" :rows="data" :columns="columns">
      <template #status-data="{ row }">
        <UBadge v-if="row.status === VisibilityStatus.Draft" variant="subtle" color="gray">
          Чорновик
        </UBadge>
        <UBadge v-else-if="row.status === VisibilityStatus.Archived" color="black">
          Архівовано
        </UBadge>
        <UBadge v-else variant="subtle" color="green">
          Опублікований
        </UBadge>
      </template>
      <template #title-data="{ row }">
        <div class="max-w-32 overflow-hidden text-elipsis">
          {{ row.title }}
        </div>
      </template>
      <template #description-data="{ row }">
        <div class="max-w-32 overflow-hidden text-elipsis">
          {{ row.description }}
        </div>
      </template>
      <template #price-data="{ row }">
        <div class="max-w-32 overflow-hidden text-elipsis">
          {{ row.price }} грн
        </div>
      </template>
      <template #image-data="{ row }">
        <base-image :src="row.image" width="80" height="80" />
      </template>
      <template #createdAt-data="{ row }">
        <div class="max-w-32 overflow-hidden text-elipsis">
          <base-datetime :date="row.createdAt" />
        </div>
      </template>
      <template #updatedAt-data="{ row }">
        <div class="max-w-32 overflow-hidden text-elipsis">
          <base-datetime :date="row.updatedAt" />
        </div>
      </template>
      <template #actions-data="{ row }">
        <UDropdown
          :items="[
            [
              {
                label: 'Редагувати',
                icon: 'i-heroicons-pencil-square-16-solid',
                click: () => callModal(row),
              },
              {
                label: row.status === VisibilityStatus.Draft ? 'Опублікувати' : 'Приховати',
                icon: row.status === VisibilityStatus.Draft ? 'i-heroicons-eye-solid' : 'i-heroicons-eye-slash-solid',
                click: async () => {
                  await (row.status === VisibilityStatus.Draft ? publish(row.id) : draft(row.id))
                  refresh()
                },
              },
            ],
            [
              {
                label: row.status === VisibilityStatus.Archived ? 'Розархівувати' : 'Архівувати',
                icon: row.status === VisibilityStatus.Archived ? 'i-heroicons-folder-plus-16-solid' : 'i-heroicons-folder-minus-16-solid',
                click: async () => {
                  await (row.status === VisibilityStatus.Archived ? draft(row.id) : archive(row.id))
                  refresh()
                },
              },
            ],
          ]"
        >
          <UButton color="gray" variant="ghost" icon="i-heroicons-adjustments-horizontal-solid" />
        </UDropdown>
      </template>
    </UTable>
  </main>
</template>
