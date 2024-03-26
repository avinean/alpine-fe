<script setup lang="ts">
import type { ServiceEntity } from '~/types/entities'
import { VisibilityStatus } from '~/types/enums'

const statuses = ref<VisibilityStatus[]>([
  VisibilityStatus.Published,
  VisibilityStatus.Draft,
])
const toast = useToast()
const { photo, url, add: addPhoto } = usePhoto()
const { get, add, edit, publish, draft, archive } = useServiceRepository()
const { data, refresh } = useAsyncData(
  () => get({ statuses: statuses.value }),
  { watch: [statuses] },
)

const loading = ref()
const service = ref<Partial<ServiceEntity> | null>(null)
const edittingId = ref<number | null>(null)

function callAddEdit(preset?: Partial<ServiceEntity>) {
  edittingId.value = preset?.id || null
  service.value = {
    title: preset?.title || undefined,
    description: preset?.description || undefined,
    image: preset?.image || undefined,
  }
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

  try {
    const data = {
      ...service.value,
      image: url.value,
    }
    if (edittingId.value)
      await edit(edittingId.value, data)
    else
      await add(data)
    refresh()
    service.value = null
    edittingId.value = null
  }
  catch (error: any) {
    toast.add({
      title: 'Не вдалось додати/змінити послугу',
      description: error.message,
    })
  }
  finally {
    loading.value = false
  }
}

function validate(state: ServiceEntity) {
  const errors = []

  if (!state.title)
    errors.push({ path: 'title', message: 'Обовʼязкове поле' })
  if (!photo.value)
    errors.push({ path: 'image', message: 'Обовʼязкове поле' })

  return errors
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between">
        <span class="text-2xl">Контакти</span>
        <UButton icon="i-heroicons-folder-plus-16-solid" @click="callAddEdit()">
          Додати послугу
        </UButton>
      </div>
    </template>
    <div class="border-b pb-2">
      <UFormGroup label="Статуси" class="w-40">
        <UseStatusSelector v-model="statuses" />
      </UFormGroup>
    </div>

    <UForm
      v-if="service"
      :state="service"
      :validate="validate"
      class="space-y-2"
      @submit="onCreateOrUpdate"
    >
      <UTable
        :rows="[service]"
        :columns="[
          { key: 'image', label: 'Зображення' },
          { key: 'title', label: 'Назва' },
          { key: 'description', label: 'Опис' },
          { key: 'actions', label: 'Дії' },
        ]"
      >
        <template #image-data>
          <UFormGroup name="image">
            <InputFile
              class="block w-40"
              :src="service.image"
              @change="photo = $event"
            />
          </UFormGroup>
        </template>
        <template #title-data>
          <UFormGroup name="title">
            <UInput v-model="service.title" />
          </UFormGroup>
        </template>
        <template #description-data>
          <UFormGroup name="description">
            <UTextarea v-model="service.description" :rows="5" />
          </UFormGroup>
        </template>
        <template #actions-data>
          <UButton :loading="loading" type="submit">
            Зберегти
          </UButton>
        </template>
      </UTable>
    </UForm>
    <UTable
      v-if="data"
      :rows="data"
      :columns="[
        { key: 'status', label: 'Статус' },
        { key: 'image', label: 'Зображення' },
        { key: 'title', label: 'Назва' },
        { key: 'description', label: 'Опис' },
        { key: 'createdAt', label: 'Створено' },
        { key: 'updatedAt', label: 'Оновлено' },
        { key: 'actions', label: 'Дії' },
      ]"
    >
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
      <template #deascription-data="{ row }">
        <div class="max-w-32 whitespace-break-spaces">{{ row.description }}</div>
      </template>
      <template #image-data="{ row }">
        <BaseImage :src="row.image" width="80" height="80" />
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
                click: () => callAddEdit(row),
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
  </UCard>
</template>
