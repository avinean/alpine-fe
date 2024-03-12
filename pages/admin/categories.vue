<script setup lang="ts">
import { ModalCategory } from '#components'
import type { CategoryEntity } from '~/types/entities'
import { VisibilityStatus } from '~/types/enums'

const { open } = useModalStore()
const router = useRouter()
const route = useRoute()
const statuses = ref<VisibilityStatus[]>([
  VisibilityStatus.Published,
  VisibilityStatus.Draft,
])
const { get, publish, draft, archive } = useCategoryRepository()

const selectedBrands = computed({
  get() {
    return route.query.brands?.toString()?.split(',').map(Number) || []
  },
  set(ids: number[]) {
    router.replace({ query: { ...route.query, brands: ids.join(',') } })
  },
})

const { data: categories, refresh } = useAsyncData(
  () => get({ brands: selectedBrands.value, statuses: statuses.value }),
  { watch: [selectedBrands, statuses] },
)

function callModal(preset?: CategoryEntity) {
  open(ModalCategory, {
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
      </div>
      <UButton icon="i-heroicons-folder-plus-16-solid" @click="() => callModal()">
        Додати категорію
      </UButton>
    </div>
    <UTable v-if="categories" :rows="categories" :columns="columns">
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
        <UTooltip text="Перейти на сторінку товарів категорії">
          <ULink :to="`/admin/products?brands=${row.brand?.id}&categories=${row.id}`">
            {{ row.title }}
          </ULink>
        </UTooltip>
      </template>
      <template #description-data="{ row }">
        <div class="max-w-32 overflow-hidden text-elipsis">
          {{ row.description }}
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
