<script setup lang="ts">
if (process.client)
  localStorage.removeItem('nuxt-color-mode')
</script>

<template>
  <NuxtLayout />
</template>