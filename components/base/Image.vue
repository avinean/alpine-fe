<script setup lang="ts">
defineProps<{
  src?: string
  srcset?: string
  loading?: 'lazy' | 'eager'
  width?: number | string
  height?: number | string
}>()
</script>

<template>
  <nuxt-img v-if="src" v-bind="$props" provider="upload" />
  <nuxt-img v-else v-bind="$props" src="/placeholder.jpg" />
</template>
