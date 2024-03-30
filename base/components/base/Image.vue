<script setup lang="ts">
defineProps<{
  src?: string
  alt?: string
}>()
</script>

<template>
  <picture class="block">
    <img :src="src || '/placeholder.jpg'" loading="lazy" :alt class="w-full h-full object-contain">
  </picture>
</template>
