<script setup lang="ts">
import { ModalColor, ModalParameter } from '#components'

const colorRepository = useColorRepository()
const parameterRepository = useParameterRepository()
const { open } = useModalStore()

const { data: colors, refresh: refreshColors } = useAsyncData(() => colorRepository.get())
const { data: parameters, refresh: refreshParameters } = useAsyncData(() => parameterRepository.get())

function addColor() {
  open(ModalColor, {
    onSubmit() { refreshColors() },
  })
}

function addParameter() {
  open(ModalParameter, {
    onSubmit() { refreshParameters() },
  })
}
</script>

<template>
  <main class="space-y-2">
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <span class="text-2xl">Кольори</span>
          <UButton icon="i-heroicons-folder-plus-16-solid" @click="addColor">
            Додати колір
          </UButton>
        </div>
      </template>

      <UTable
        v-if="colors"
        :rows="colors"
        :columns="[
          {
            key: 'title',
            label: 'Назва',
          },
          {
            key: 'value',
            label: 'Колір',
          },
          {
            key: 'image',
            label: 'Зображення',
          },
        ]"
      >
        <template #title-data="{ row }">
          {{ row.title }}
        </template>
        <template #value-data="{ row }">
          <div class="w-10 h-10" :style="{ background: row.value }" />
        </template>
        <template #image-data="{ row }">
          <base-image :src="row.image" class="w-10 h-10" />
        </template>
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="italic text-sm">В базі відсутні кольори</span>
            <UButton icon="i-heroicons-folder-plus-16-solid" @click="addColor">
              Додати колір
            </UButton>
          </div>
        </template>
      </UTable>
    </UCard>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <span class="text-2xl">Основні характеристики</span>
          <UButton icon="i-heroicons-folder-plus-16-solid" @click="addParameter">
            Додати характеристику
          </UButton>
        </div>
      </template>
      <UTable
        v-if="parameters"
        :rows="parameters"
        :columns="[
          {
            key: 'type',
            label: 'Тип',
          },
          {
            key: 'value',
            label: 'Значення',
          },
          {
            key: 'unit',
            label: 'Одиниці вимірювання',
          },
        ]"
      >
        <template #type-data="{ row }">
          {{ row.type }}
        </template>
        <template #value-data="{ row }">
          {{ row.value }}
        </template>
        <template #unit-data="{ row }">
          {{ row.unit }}
        </template>
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="italic text-sm">В базі відсутні характеристики</span>
            <UButton icon="i-heroicons-folder-plus-16-solid" @click="addParameter">
              Додати характеристику
            </UButton>
          </div>
        </template>
      </UTable>
    </UCard>
  </main>
</template>
