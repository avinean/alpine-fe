<script setup lang="ts">
import { VisibilityStatus } from '~/types/enums'

definePageMeta({
  layout: 'admin',
  redirect: '/admin/brands',
  middleware: 'requires-auth',
})

const query = `?statuses=${[
  VisibilityStatus.Published,
  VisibilityStatus.Draft,
].join(',')}`
</script>

<template>
  <div>
    <UHorizontalNavigation
      :links="[
        {
          label: 'Продукти',
          to: `/admin/products${query}`,
        },
        {
          label: 'Категорії продуктів',
          to: `/admin/categories${query}`,
        },
        {
          label: 'Бренди',
          to: `/admin/brands${query}`,
        },
        {
          label: 'Характеристики продуктів',
          to: '/admin/products-meta',
        },
        {
          label: 'Контакти',
          to: `/admin/contacts${query}`,
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
