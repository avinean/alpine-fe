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
    <div class="grid items-start gap-2 md:grid-cols-[60%_30%]">
      <UCard>
        <BaseImage :src="data?.image" />
      </UCard>
      <div class="space-y-2 divide-y">
        <div>
          <h1 class="text-3xl">
            {{ data?.title }}
          </h1>
          <p class="text-sm">
            Категорія: {{ data?.category?.title }}
          </p>
          <p class="text-sm">
            Виробник: {{ data?.brand?.title }}
          </p>
        </div>
        <p>
          Стандарт: {{ data?.standart }}
        </p>
        <!-- <div v-if="data?.colors">
          <p class="pb-2 font-bold">
            Кольори
          </p>
          <UseColorList :colors="data?.colors" />
        </div> -->
      </div>
    </div>
    <UTabs
      :items="[
        { label: 'Опис', key: 'description' },
        { label: 'Характеристики', key: 'parameters' },
        { label: 'Застосування', key: 'applications' },
      ]"
      class="mt-2"
    >
      <template #item="{ item }">
        <ul v-if="item.key === 'applications'">
          <li v-for="application in data?.applications" :key="application.id">
            {{ application.title }}
          </li>
        </ul>
        <ul v-else-if="item.key === 'parameters'">
          <!-- <li v-for="parameter in data?.parameters" :key="parameter.id">
            <span class="font-bold">{{ parameter.type }}:</span> {{ parameter.value }} {{ parameter.unit }}
          </li> -->
        </ul>
        <template v-else>
          {{ data?.description }}
        </template>
      </template>
    </UTabs>
  </main>
</template>
