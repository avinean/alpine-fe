<script setup lang="ts">
defineProps<{
  src?: string
  alt?: string
  cover?: boolean
}>()
</script>

<template>
  <picture class="block">
    <img
      :src="src || '/placeholder.jpg'"
      loading="lazy"
      :alt
      class="w-full h-full"
      :class="cover ? 'object-cover' : 'object-contain'"
    >
  </picture>
</template>
