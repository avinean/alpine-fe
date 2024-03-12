<script setup lang="ts">
const global = useGlobalStore()
const route = useRoute()
const { data: category } = await useAsyncData(() => useCategoryRepository().getOne(route.params.slug as string | number))
const { get } = useProductRepository()

const { data } = useAsyncData(
  () => get({ categories: category.value?.id ? [category.value?.id] : [], statuses: global.statuses }),
  { watch: [() => global.statuses] },
)
</script>

<template>
  <div>
    <div v-if="category" class="flex-col md:flex-row flex gap-2 justify-between py-2">
      <div class="space-y-2">
        <div class="text-2xl">
          Категорія {{ category.title }}
        </div>
        <div>{{ category.description }}</div>
      </div>
      <base-image :src="category.image" class="md:w-40" />
    </div>
    <ul v-if="data" class="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <li
        v-for="product in data"
        :key="product.title"
        class="flex flex-col gap-2 bg-white p-2 divide-y"
      >
        <base-image :src="product.image" :alt="product.title" class="object-cover w-full aspect-[1/1]" width="100" height="100" />
        <div class="border-b-1 font-bold">
          {{ product.title }}
        </div>
        <ul class="text-sm flex-1">
          <li>
            {{ product.description }}
          </li>
          <li>
            {{ product.size }}
          </li>
          <li>
            Застосування: {{ product.application }}
          </li>
          <li>
            {{ product.standart }}
          </li>
        </ul>
        <div class="border-t-1 text-right font-bold">
          {{ product.price }}
        </div>
      </li>
    </ul>
  </div>
</template>
