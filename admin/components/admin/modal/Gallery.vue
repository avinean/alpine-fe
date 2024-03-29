<script lang="ts" setup>
import type { GalleryEntity } from '~/types/entities';

const props = defineProps<{
  selected: GalleryEntity[]
}>()

const selected = ref<GalleryEntity[]>(props.selected)

const emit = defineEmits<{
  submit: [selected: GalleryEntity[]]
}>()


defineExpose({
  title: 'Додати зображення до галереї',
  props: {
    fullscreen: true,
  },
})
</script>

<template>
  <div>
    <AdminGallery v-model="selected"/>
    <div class="sticky bottom-0 flex justify-end p-2 bg-white border">
      <UButton @click="emit('submit', selected)">Зберегти</UButton>
    </div>
  </div>
</template>