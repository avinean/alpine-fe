<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'

const global = useGlobalStore()
const { search } = useProductRepository()

const _search = useRouteQuery<string>('q')

const page = ref(1)
const take = ref(12)

const { data, refresh, pending } = useAsyncData(
  () => search({
    statuses: global.statuses,
    search: _search.value,
    page: page.value,
    take: take.value,
  }),
  { watch: [() => global.statuses, page] },
)

watch([_search, take], () => {
  if (page.value === 1)
    refresh()
  else
    page.value = 1
})
</script>

<template>
  <main class="container flex flex-col flex-1 mx-auto space-y-2 py-8 px-2 md:px-0">
    <h1 class="text-3xl">
      Результати за запитом "{{ _search }}"
    </h1>
    <div v-if="data?.items && !data.items.length" class="text-center text-xl font-boldpy-10">
      За вашим запитом немає результатів
    </div>
    <div class="flex-1">
      <ul v-if="data?.items" class="grid gap-2 grid-cols-2 md:col-span-2 lg:grid-cols-3 lg:col-span-3 xl:grid-cols-4">
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
    </div>

    <div class="flex gap-2 justify-end mt-10">
      <USelect v-model="take" :options="[12, 24, 48, 100]" />
      <UPagination v-model="page" size="sm" :total="data?.pages!" :page-count="1" :max="5" />
    </div>
  </main>
</template>
