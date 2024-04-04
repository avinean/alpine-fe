<script setup lang="ts">
import { useRouteParams, useRouteQuery } from '@vueuse/router'
import type { PaginationResponse } from '~/types/api'
import type { ProductEntity } from '~/types/entities'

const global = useGlobalStore()
const { getByPage, getFilters } = useProductRepository()

const filtersOpen = ref(false)
const header = computed(() => global.headerRef)
// @ts-expect-error it's a ref
const { height } = useElementSize(header)
const _category = useRouteParams<string>('slug')
const _brands = useRouteQuery<string>('b')
const _categories = useRouteQuery<string>('c')
const _colors = useRouteQuery<string>('colors')
const _parameters = useRouteQuery<string>('parameters')

const brands = computed({
  get() {
    return _brands.value?.split(',').filter(Boolean) || []
  },
  set(value: string[]) {
    _brands.value = value.join(',')
  },
})

const categories = computed({
  get() {
    if (_category.value)
      return [_category.value]

    return _categories.value?.split(',').filter(Boolean) || []
  },
  set(value: string[]) {
    _categories.value = value.join(',')
  },
})

const colors = computed({
  get() {
    return _colors.value?.split(',').filter(Boolean) || []
  },
  set(value: string[]) {
    _colors.value = value.join(',')
  },
})

const parameters = computed({
  get() {
    return _parameters.value?.split(',').filter(Boolean) || []
  },
  set(value: string[]) {
    _parameters.value = value.join(',')
  },
})

function toggleParameter(slug: string) {
  if (parameters.value.includes(slug))
    parameters.value = parameters.value.filter(_ => _ !== slug)
  else
    parameters.value = [...parameters.value, slug]
}

const brandRepository = useBrandRepository()
const { data: awailableBrands } = useAsyncData(
  () => brandRepository.get({ statuses: global.statuses.join(','), categories: categories.value.join(',') }),
  { watch: [() => global.statuses, _category, _categories] },
)

const page = ref(1)
const take = ref(10)

const { data, refresh } = useAsyncData(
  () => getByPage({
    statuses: global.statuses,
    brands: brands.value.length ? brands.value : undefined,
    categories: categories.value.length ? categories.value : undefined,
    colors: colors.value.length ? colors.value : undefined,
    parameters: parameters.value.length ? parameters.value : undefined,
    page: page.value,
    take: take.value,
  }),
  {
    watch: [() => global.statuses, page],
    transform({ items, pages }: PaginationResponse<ProductEntity>): PaginationResponse<ProductEntity> {
      return {
        items: page.value === 1 ? items : [...(data.value?.items || []), ...items],
        pages,
      } satisfies PaginationResponse<ProductEntity>
    },
  },
)

watch([_brands, _categories, _colors, _parameters], () => {
  page.value = 1
  refresh()
})

const { data: filters } = useAsyncData(
  () => getFilters({ categories: categories.value.length ? categories.value : undefined }),
  {
    watch: [() => global.statuses],
  },
)

const hasMore = computed(() => {
  const max = (data.value?.pages || 1) * take.value
  const current = page.value * take.value
  return current < max
})

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <div class="flex flex-col md:flex-row gap-2 py-2">
    <DefineTemplate>
      <UCard>
        <div class="divide-y">
          <div class="text-xl font-bold mb-2">
            Фільтри
          </div>
          <div v-if="awailableBrands?.length" class="py-2">
            <div class="font-bold text-lg mb-2">
              Виробники
            </div>
            <div class="space-y-2">
              <UCheckbox
                v-for="brand in awailableBrands"
                :key="brand.slug"
                v-model="brands"
                :label="brand.title"
                :value="brand.slug"
                name="brands"
              />
            </div>
          </div>
          <div v-if="!_category" class="py-2">
            <div class="font-bold text-lg mb-2">
              Категорії
            </div>
            <div class="space-y-2">
              <UCheckbox
                v-for="category in global.categories"
                :key="category.slug"
                v-model="categories"
                :label="category.title"
                :value="category.slug"
                name="categories"
              />
            </div>
          </div>
          <div v-if="filters?.colors" class="py-2">
            <div class="font-bold text-lg mb-2">
              Кольори
            </div>
            <UseColorList
              v-model="colors"
              :colors="filters?.colors"
              multiple
              exclude-mix
            />
          </div>
          <div
            v-for="parameterFilters, title in filters?.parameters"
            :key="title"
            class="py-2"
          >
            <p class="pb-2 font-bold">
              {{ title }}
            </p>
            <div class="flex flex-wrap gap-2 py-2">
              <UBadge
                v-for="parameter in parameterFilters"
                :key="parameter.id"
                :label="[parameter.value, parameter.unit].filter(Boolean).join(' ')"
                :color="parameters.includes(parameter.slug) ? undefined : 'gray'"
                class="cursor-pointer"
                @click="toggleParameter(parameter.slug)"
              />
            </div>
          </div>
        </div>
      </UCard>
    </DefineTemplate>
    <div
      :style="{ top: `calc(${height}px + 0.5rem)` }"
      class="sticky top-0 w-full md:w-60 md:min-w-60"
    >
      <div class="hidden md:block">
        <ReuseTemplate />
      </div>
      <div class="flex justify-between p-2 md:hidden bg-white">
        <span>Фільтри</span>
        <button class="flex md:hidden" @click="filtersOpen = true">
          <i class="i-heroicons-adjustments-horizontal text-4xl text-gray" />
        </button>
      </div>
    </div>
    <UModal v-model="filtersOpen" fullscreen>
      <ReuseTemplate />
      <div class="flex justify-center p-2 mt-auto">
        <UButton @click="filtersOpen = false">
          Застосувати
        </UButton>
      </div>
    </UModal>
    <div class="flex-1">
      <div v-if="data?.items && !data.items.length" class="h-full border-b">
        <div class="text-center text-xl font-bold">
          Немає результатів
        </div>
      </div>
      <ul v-if="data?.items" class="grid gap-2 sm:grid-cols-2 md:col-span-2 lg:grid-cols-3 lg:col-span-3 xl:grid-cols-4">
        <ULink
          v-for="product in data.items"
          :key="product.id"
          :to="`/p/${product.slug}`"
        >
          <UCard class="h-full">
            <BaseImage
              :src="product.primaryImage?.image"
              :alt="product.primaryImage?.title"
              class="object-cover w-full aspect-[1/1]"
            />
            <div class="border-b-1 font-bold">
              {{ product.title }}
            </div>
            <span class="sr-only">
              Детальніше про {{ product.title }}
            </span>
          </UCard>
        </ULink>
      </ul>
      <div v-if="hasMore" class="p-2 flex justify-center col-span-100">
        <UButton color="white" @click="page++">
          Завантажити ще
        </UButton>
      </div>
    </div>
  </div>
</template>
