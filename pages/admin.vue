<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  redirect: '/admin/brands',
  middleware: 'requires-auth'
})
</script>

<template>
  <NuxtPage />
</template>
