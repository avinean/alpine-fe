<script setup lang="ts">
const global = useGlobalStore()
const { get } = useProductRepository()

const { data } = await useAsyncData(
  () => get({ statuses: global.statuses }),
  { watch: [() => global.statuses] },
)
</script>

<template>
  <div>
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
