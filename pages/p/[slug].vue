<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'

const { getOne } = useProductRepository()
const slug = useRouteParams<string>('slug')
const { data } = await useAsyncData(
  () => getOne(slug.value),
)
</script>

<template>
  <main>
    <div class="grid gap-2 md:grid-cols-[60%_30%]">
      <UCard>
        <BaseImage :src="data?.image" />
      </UCard>
      <div class="space-y-2 divide-y">
        <h1 class="text-2xl">
          {{ data?.title }}
        </h1>
        <h2 v-if="data?.description" class="text-xl">
          {{ data?.description }}
        </h2>
        <p>
          Категорія: {{ data?.category?.title }}
        </p>
        <p>
          Виробник: {{ data?.brand?.title }}
        </p>
        <p>
          Стандарт: {{ data?.standart }}
        </p>
        <div v-if="data?.colors">
          <p class="pb-2 font-bold">
            Кольори
          </p>
          <UseColorList :colors="data?.colors" />
        </div>
        <ul v-if="data?.parameters?.length">
          <p class="pb-2 font-bold">
            Характеристики
          </p>
          <li v-for="parameter in data?.parameters" :key="parameter.id">
            <span class="font-bold">{{ parameter.type }}:</span> {{ parameter.value }} {{ parameter.unit }}
          </li>
        </ul>
        <ul v-if="data?.applications?.length">
          <p class="pb-2 font-bold">
            Застосування
          </p>
          <li v-for="application in data?.applications" :key="application.id">
            {{ application.title }}
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
