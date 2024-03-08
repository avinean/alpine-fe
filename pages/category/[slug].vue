<script setup lang="ts">
import type { CategoryEntity } from '~/types/entities';

const router = useRouter()

const category = computed(() => router.options.history.state as unknown as CategoryEntity)

const {get} = useProductRepository()
const {data} = useAsyncData(() => get(category.value.id))

</script>

<template>
  <div>
    <div v-if="category" class="flex-col md:flex-row flex gap-2 justify-between py-2">
      <div class="space-y-2">
        <div class="text-2xl">Категорія {{ category.title }}</div>
        <div>{{ category.description }}</div>
      </div>
      <base-image :src="category.image" class="md:w-40"/>
    </div>
    <ul v-if="data" class="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
      <li 
        v-for="product in data"
        :key="product.title"
        class="flex flex-col gap-2 bg-white p-2"
      >
        <base-image :src="product.image" :alt="product.title" class="object-cover" />
        <div class="border-b-1 font-bold">
          {{ product.title }}
        </div>
        <ul class="text-sm flex-1">
          <li>{{ product.description }}</li>
          <!-- <li>
            {{ product.size }}
          </li>
          <li>
            Застосування: {{ product.application }}
          </li>
          <li>
            {{ product.standard }}
          </li> -->
        </ul>
        <div class="border-t-1 text-right font-bold">
          {{ product.price }}
        </div>
      </li>
    </ul>
  </div>
</template>
