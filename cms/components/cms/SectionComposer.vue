<script lang="ts" setup>
import { AdminModalGallery } from '#components'
import type { GalleryEntity } from '~/types/entities'
import type { CmsSection } from '~/types/cms'

const props = defineProps<{
  sections: CmsSection[]
  allowedTypes?: CmsSection['type'][]
}>()

const emit = defineEmits<{
  update: [sections: CmsSection[]]
}>()

const { open } = useModalStore()

function setImage(section: CmsSection) {
  if (section.type !== 'image')
    return
  open(
    AdminModalGallery,
    {
      selected: section.image ? [section.image] : [],
      onSubmit([entity]) {
        if (!entity)
          return
        if (!section.image) {
          section.image = {
            image: entity.image,
            title: entity.title,
            id: entity.id,
          } as GalleryEntity
        }
        else { section.image.image = entity.image }
      },
    },
  )
}

function addSection(type: CmsSection['type']) {
  if (type === 'text')
    emit('update', [...props.sections, { type: 'text', content: '', align: 'left', tag: 'p' }])
  if (type === 'image')
    emit('update', [...props.sections, { type: 'image', image: null, aspectRatio: 'auto' }])
  if (type === 'grid') {
    emit('update', [...props.sections, {
      type: 'grid',
      columns: {
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
      },
      groups: [[]],
    }])
  }
  if (type === 'card')
    emit('update', [...props.sections, { type: 'card', image: null, sections: [] }])
}

function removeSection(section: CmsSection) {
  emit('update', props.sections.filter(s => s !== section))
}

const menu = [
  [{
    label: 'Додати секцію',
  }],
  ([
    {
      type: 'text',
      label: 'Текст',
      icon: 'i-heroicons-document-text-16-solid',
      click: () => addSection('text'),
    },
    {
      type: 'image',
      label: 'Зображення',
      icon: 'i-heroicons-photo-solid',
      click: () => addSection('image'),
    },
    {
      type: 'grid',
      label: 'Сітку',
      icon: 'i-heroicons-rectangle-group-20-solid',
      click: () => addSection('grid'),
    },
    {
      type: 'card',
      label: 'Картку',
      icon: 'i-heroicons-presentation-chart-bar-20-solid',
      click: () => addSection('card'),
    },
  ] as {
    type: CmsSection['type']
    label: string
    icon: string
    click: () => void
  }[]).filter(({ type }) => props.allowedTypes?.includes(type) ?? true),
]
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="(section, index) in sections"
      :key="index"
      class="shadow-md hover:shadow-xl p-4"
    >
      <UDivider>
        <div class="flex items-center gap-4">
          <UBadge v-if="section.type === 'text'" label="Текст" />
          <UBadge v-else-if="section.type === 'image'" label="Зображення" />
          <UBadge v-else-if="section.type === 'grid'" label="Сітка" />
          <UBadge v-else-if="section.type === 'card'" label="Картка" />

          <UButton icon="i-heroicons-trash-16-solid" @click="removeSection(section)" />
        </div>
      </UDivider>
      <div v-if="section.type === 'text'">
        <div class="flex gap-2 flex-wrap mb-4">
          <UFormGroup label="Тип:" class="flex-1">
            <USelect
              v-model="section.tag"
              option-attribute="label"
              value-attribute="value"
              :options="[
                { label: 'Заголовок 1', value: 'h1' },
                { label: 'Заголовок 2', value: 'h2' },
                { label: 'Заголовок 3', value: 'h3' },
                { label: 'Заголовок 4', value: 'h4' },
                { label: 'Заголовок 5', value: 'h5' },
                { label: 'Заголовок 6', value: 'h6' },
                { label: 'Параграф', value: 'p' },
                { label: 'Список', value: 'ul' },
              ]"
            />
          </UFormGroup>
          <UFormGroup label="Вирівнювання:" class="flex-1">
            <USelect
              v-model="section.align"
              option-attribute="label"
              value-attribute="value"
              :options="[
                { label: 'Зліва', value: 'left' },
                { label: 'По центру', value: 'center' },
                { label: 'Справа', value: 'right' },
              ]"
            />
          </UFormGroup>
        </div>
        <UTextarea v-model="section.content" />
      </div>

      <div v-else-if="section.type === 'image'">
        <div class="flex gap-2 flex-wrap mb-4">
          <UFormGroup label="Пропорція:" class="flex-1">
            <USelect
              v-model="section.aspectRatio"
              option-attribute="label"
              value-attribute="value"
              :options="[
                { label: 'Автоматична', value: 'auto' },
                { label: '1:1', value: 1 },
              ]"
            />
          </UFormGroup>
        </div>

        <BaseImage
          :src="section.image?.image"
          class="cursor-pointer max-w-64"
          @click="setImage(section)"
        />
      </div>
      <div v-else-if="section.type === 'grid'">
        <div class="grid grid-cols-4 gap-4 mb-4">
          <UFormGroup label="Кількість колонок (sm):">
            <USelect v-model="section.columns.sm" :options="[1, 2, 3, 4, 5, 6]" />
          </UFormGroup>
          <UFormGroup label="Кількість колонок (md):">
            <USelect v-model="section.columns.md" :options="[1, 2, 3, 4, 5, 6]" />
          </UFormGroup>
          <UFormGroup label="Кількість колонок (lg):">
            <USelect v-model="section.columns.lg" :options="[1, 2, 3, 4, 5, 6]" />
          </UFormGroup>
          <UFormGroup label="Кількість колонок (xl):">
            <USelect v-model="section.columns.xl" :options="[1, 2, 3, 4, 5, 6]" />
          </UFormGroup>
        </div>
        <CmsGrid :columns="section.columns">
          <div v-for="group, key in section.groups" :key class="flex items-center justify-center shadow-md hover:shadow-xl  p-2">
            <CmsSectionComposer :sections="group" :allowed-types="['card', 'image', 'text']" @update="section.groups[key] = $event" />
          </div>
          <div class="flex items-center justify-center shadow-md hover:shadow-xl  p-2">
            <UButton icon="i-heroicons-rectangle-group-20-solid" @click="section.groups.push([])">
              Додати комірку
            </UButton>
          </div>
        </CmsGrid>
      </div>
      <div v-else-if="section.type === 'card'">
        <CmsSectionComposer :sections="section.sections" :allowed-types="['image', 'text']" @update="section.sections = $event" />
      </div>
    </div>
    <UDivider>
      <UDropdown
        :items="menu"
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton icon="i-heroicons-folder-plus-16-solid">
          Додати секцію
        </UButton>
      </UDropdown>
    </UDivider>
  </div>
</template>
