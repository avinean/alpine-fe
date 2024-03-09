<script setup lang="ts">
import type { BrandEntity } from '~/types/entities'

const { data: brands } = await useAsyncData(() => useBrandRepository().get())

const brand = ref<BrandEntity>(brands.value?.[0] as BrandEntity)

const { data: categories } = useAsyncData(
  () => useCategoryRepository().get({ brands: [brand.value.id], published: true }),
  { watch: [brand] },
)
</script>

<template>
  <div class="divide-y">
    <nav
      v-if="brands"
      class="flex md:grid gap-4 py-2 overflow-x-auto"
      :style="{ gridTemplateColumns: `repeat(${brands.length}, 1fr)` }"
    >
      <button
        v-for="_brand in brands" :key="_brand.id"
        class="flex gap-2 p-2 items-center"
        :class="{ 'bg-white': brand === _brand }"
        @click="brand = _brand"
      >
        <base-image :src="_brand.image" :alt="_brand.title" class="h-10" />
        {{ _brand.title }}
      </button>
    </nav>
    <div v-if="brand" class="flex-col md:flex-row flex gap-2 justify-between py-2">
      <div class="space-y-2">
        <div class="text-2xl">
          Виробник {{ brand.title }}
        </div>
        <div>{{ brand.description }}</div>
      </div>
      <base-image :src="brand.image" class="md:w-40" />
    </div>
    <ul v-if="categories" class="grid gap-2 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <li
        v-for="category in categories"
        :key="category.title"
        class="flex flex-col gap-2 bg-white p-2 relative divide-y"
      >
        <base-image :src="category.image" :alt="category.title" class="object-cover aspect-square" />
        <div class="border-b-1 font-bold">
          {{ category.title }}
        </div>
        <ul class="text-sm flex-1">
          <li>{{ category.description }}</li>
        </ul>
        <ULink class="absolute inset-0" :to="`/category/${brand?.id}`" />
      </li>
    </ul>
  </div>
</template>
