<script setup lang="ts">
// import type { ProductEntity } from '~/types/entities'

// const global = useGlobalStore()
// const { search } = useProductRepository()
const router = useRouter()

const state = ref({
  q: '',
})
// const open = ref(false)
// const searchResults = ref<ProductEntity[]>([])

function goToSearch() {
  if (state.value.q.length > 2)
    router.push({ path: '/search', query: state.value })
}

// async function findPreview() {
//   if (query.value.length < 3) {
//     open.value = false
//     return
//   }

//   searchResults.value = (await search({
//     statuses: global.statuses,
//     search: query.value,
//     page: 1,
//     take: 6,
//   })).items

//   if (searchResults.value.length)
//     open.value = true
// }

// watchDebounced(query, findPreview, { debounce: 500 })

// router.beforeEach(() => {
//   open.value = false
// })
</script>

<template>
  <div class="container border-t mx-auto px-2">
    <UForm :state="state" class="flex flex-wrap" @submit="goToSearch">
      <input v-model="state.q" type="text" placeholder="Пошук" class="flex-1 h-10 outline-none border-none bg-transparent text-white">
      <UButton icon="i-heroicons-magnifying-glass" type="submit" trailing>
        Знайти
      </UButton>
    </UForm>
  </div>

  <!-- <UPopover
      v-model:open="open"
      :popper="{ placement: 'bottom-start', offsetDistance: 0, offsetSkid: 0 }"
      :ui="{
        trigger: 'w-1',
      }"
      :open-delay="500"
    >
      <template #panel>
        <ul v-if="searchResults.length" class="container p-4 grid gap-2 grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
          <ULink
            v-for="product in searchResults"
            :key="product.id"
            :to="`/p/${product.slug}`"
          >
            <UCard class="h-full">
              <BaseImage
                :src="product.primaryImage?.image"
                :alt="product.primaryImage?.title"
                class="object-cover w-full aspect-[1/1]"
              />
              <div class="border-b-1 text-xs font-bold mt-2">
                <span class="sr-only">
                  Детальніше про
                </span> {{ product.title }}
              </div>
              <div v-if="product.prices?.[0]?.price" class="text-sm border-b-1 font-black mt-2">
                {{ product.prices[0].price }} грн
              </div>
            </UCard>
          </ULink>
        </ul>
      </template>
    </UPopover> -->
</template>
