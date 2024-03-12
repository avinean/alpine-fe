<script setup lang="ts">
import type { BrandEntity } from '~/types/entities'
import type { BrandType } from '~/types/enums'

const route = useRoute()
const router = useRouter()
const global = useGlobalStore()
const { data: brands } = await useAsyncData(
  () => useBrandRepository().get({ statuses: global.statuses, type: route.params.slug as BrandType }),
  { watch: [() => global.statuses] },
)
const brand = ref(currentBrand())

watch(brands, () => brand.value = currentBrand())

const { data: categories } = useAsyncData(
  () => useCategoryRepository().get({ brands: [brand.value.id], statuses: global.statuses }),
  { watch: [brand, () => global.statuses] },
)

function currentBrand() {
  const slug = route.query.brand
  return (brands.value?.find(b => b.slug === slug) || brands.value?.[0]) as BrandEntity
}

function selectBrand(_brand: BrandEntity) {
  brand.value = _brand
  router.push({ query: { brand: _brand.slug } })
}
</script>

<template>
  <div class="divide-y">
    <template v-if="brands?.length! > 1">
      <nav
        v-if="brands"
        class="flex justify-around gap-4 py-2 overflow-x-auto"
      >
        <button
          v-for="_brand in brands" :key="_brand.id"
          class="flex gap-2 p-2 items-center whitespace-nowrap"
          :class="{ 'bg-white': brand === _brand }"
          @click="selectBrand(_brand)"
        >
          <base-image :src="_brand.image" :alt="_brand.title" class="h-10" />
          {{ _brand.title }}
        </button>
      </nav>
      <div v-if="brand" class="flex-col md:flex-row flex gap-2 items-start justify-between py-2">
        <div class="space-y-2">
          <div class="text-2xl">
            Виробник {{ brand.title }}
          </div>
          <div>{{ brand.description }}</div>
        </div>
        <base-image :src="brand.image" class="md:w-40" />
      </div>
    </template>
    <ul v-if="categories" class="grid gap-2 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        <ULink class="absolute inset-0" :to="`/c/${category?.slug}`" />
      </li>
    </ul>
  </div>
</template>
