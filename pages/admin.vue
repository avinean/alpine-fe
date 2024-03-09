<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  redirect: '/admin/brands',
  middleware: 'requires-auth',
})
</script>

<template>
  <UHorizontalNavigation
    :links="[
      {
        label: 'Бренди',
        to: '/admin/brands',
      },
      {
        label: 'Категорії',
        to: '/admin/categories',
      },
      {
        label: 'Продукти',
        to: '/admin/products',
      }
      ]"
    class="border-b border-gray-200 dark:border-gray-800"
  />
  <NuxtPage />
</template>
