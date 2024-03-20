<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  redirect: '/admin/brands',
  middleware: 'requires-auth',
})
</script>

<template>
  <div>
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
        },
        {
          label: 'Характеристики продуктів',
          to: '/admin/products-meta',
        },
        {
          label: 'Контакти',
          to: '/admin/contacts',
        },
        {
          label: 'Послуги',
          to: '/admin/services',
        },
      ]"
      class="border-b border-gray-200 dark:border-gray-800"
    />
    <NuxtPage />
  </div>
</template>
