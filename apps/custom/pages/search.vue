<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import type { PaginationResponse } from '~/types/api'
import type { ProductEntity } from '~/types/entities'

const global = useGlobalStore()
const { search } = useProductRepository()

const loadMoreRef = ref()
const loadMoreVisible = useElementVisibility(loadMoreRef)
const _search = useRouteQuery<string>('q')

const page = ref(1)
const take = ref(24)

const { data, refresh, pending } = useAsyncData(
  () => search({
    statuses: global.statuses,
    search: _search.value,
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

watch([_search], () => {
  page.value = 1
  refresh()
})

const hasMore = computed(() => {
  const max = (data.value?.pages || 1) * take.value
  const current = page.value * take.value
  return current < max
})

whenever(loadMoreVisible, () => {
  if (!hasMore.value)
    return
  page.value++
})
</script>

<template>
  <main class="container flex-1 mx-auto space-y-2 py-2">
    <h1 class="text-3xl">
      Результати за запитом "{{ _search }}"
    </h1>
    <div v-if="data?.items && !data.items.length" class="text-center text-xl font-boldpy-10">
      За вашим запитом немає результатів
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
            class="w-full aspect-[1/1]"
            fit="contain"
          />
          <div class="border-b-1 text-sm font-bold mt-2">
            <span class="sr-only">
              Детальніше про
            </span> {{ product.title }}
          </div>
          <div v-if="product.prices?.[0]?.price" class="border-b-1 font-black mt-2">
            {{ product.prices[0].price }} грн
          </div>
        </UCard>
      </ULink>
      <template v-if="page > 1 && pending">
        <USkeleton v-for="key in take" :key />
      </template>
    </ul>
    <div ref="loadMoreRef" class="relative -top-20" />
  </main>
</template>
