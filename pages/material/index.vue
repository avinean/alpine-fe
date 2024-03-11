<script setup lang="ts">
import type { BrandEntity } from '~/types/entities'

const global = useGlobalStore()
const { data: brands } = await useAsyncData(
  () => useBrandRepository().get({ statuses: global.statuses }),
  { watch: [() => global.statuses] },
)
const brand = ref<BrandEntity>(brands.value?.[0] as BrandEntity)

watch(brands, () => {
  brand.value = brands.value?.[0] as BrandEntity
})
console.log('index page')
const { data: categories } = useAsyncData(
  () => useCategoryRepository().get({ brands: [brand.value.id], statuses: global.statuses }),
  { watch: [brand, () => global.statuses] },
)
</script>

<template>
  <div class="divide-y">
    <ul class="grid gap-2 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <li
        v-for="category in categories"
        :key="category.title"
        class="flex flex-col gap-2 bg-white p-2 relative divide-y"
      >
        <base-image :src="category.image" :alt="category.title" class="object-cover aspect-[1/1]" />
        <div class="border-b-1 font-bold">
          {{ category.title }}
        </div>
        <ul class="text-sm flex-1">
          <li>{{ category.description }}</li>
        </ul>
        <ULink class="absolute inset-0" :to="`/material/${brand?.id}`" />
      </li>
    </ul>
  </div>
</template>
