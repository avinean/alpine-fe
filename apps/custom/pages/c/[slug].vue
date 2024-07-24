<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'

const global = useGlobalStore()
const category = useRouteParams<string>('slug')
const categoryTitle = computed(() => global.categories?.find(_ => _.slug === category.value)?.title || '')

useBreadcrumbs(() => [
  {
    label: 'Каталог',
    to: '/catalog',
  },
  {
    label: global.categories?.find(_ => _.slug === category.value)?.title || '',
  },
])
</script>

<template>
  <main class="container flex-1 mx-auto py-8 px-2 md:px-0">
    <h1 v-if="categoryTitle" class="text-3xl">
      Товари категорії "{{ categoryTitle }}"
    </h1>
    <UseProductList />
  </main>
</template>
