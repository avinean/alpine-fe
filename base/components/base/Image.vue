<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>

<template>
  <picture class="block">
    <img :src="src || '/placeholder.jpg'" loading="lazy" class="w-full h-full object-contain">
  </picture>
</template>
