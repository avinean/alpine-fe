<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { useRouteParams, useRouteQuery } from '@vueuse/router'

const global = useGlobalStore()
const { get } = useProductRepository()

const filtersOpen = ref(false)
const header = computed(() => global.headerRef)
// @ts-expect-error it's a ref
const { height } = useElementSize(header)
const _category = useRouteParams<string>('slug')
const _categories = useRouteQuery<string>('c')
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

const { data } = await useAsyncData(
  () => get({ statuses: global.statuses, categories: categories.value.length ? categories.value : undefined, pure: true }),
  { watch: [() => global.statuses, _categories] },
)

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <div class="flex flex-col md:flex-row items-start gap-2">
    <DefineTemplate>
      <UCard>
        <div class="divide-y">
          <div class="text-xl font-bold mb-2">
            Фільтри
          </div>
          <div v-if="!_category">
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
    <ul v-if="data" class="grid gap-2 sm:grid-cols-2 md:col-span-2 lg:grid-cols-3 lg:col-span-3">
      <ULink
        v-for="product in data"
        :key="product.title"
        :to="`/p/${product.slug}`"
      >
        <UCard>
          <base-image :src="product.image" :alt="product.title" class="object-cover w-full aspect-[1/1]" width="100" height="100" />
          <div class="border-b-1 font-bold">
            {{ product.title }}
          </div>
          <span class="sr-only">
            Детальніше про {{ product.title }}
          </span>
        </UCard>
      </ULink>
    </ul>
  </div>
</template>
