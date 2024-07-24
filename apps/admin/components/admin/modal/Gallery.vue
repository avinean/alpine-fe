<script lang="ts" setup>
import type { GalleryEntity } from '~/types/entities'

const props = defineProps<{
  multiple?: boolean
  selected?: GalleryEntity[]
}>()

const emit = defineEmits<{
  submit: [selected: GalleryEntity[]]
}>()

const selected = ref<GalleryEntity[]>(props.selected || [])

defineExpose({
  title: 'Додати зображення до галереї',
  props: {
    fullscreen: true,
  },
})
</script>

<template>
  <div>
    <AdminGallery v-model="selected" :multiple="multiple" />
    <div class="sticky bottom-0 bg-white p-2 shadow-2xl sticky bottom-0 flex justify-end p-2 bg-white border">
      <UButton @click="emit('submit', selected)">
        Зберегти
      </UButton>
    </div>
  </div>
</template>
