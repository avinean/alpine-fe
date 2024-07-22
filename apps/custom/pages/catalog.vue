<script setup lang="ts">
useBreadcrumbs([
  {
    label: 'Каталог',
  },
])
const global = useGlobalStore()
</script>

<template>
  <main class="container flex-1 mx-auto space-y-2 py-2">
    <h1 class="text-3xl">
      Категорії товарів
    </h1>
    <div class="flex-1">
      <div v-if="!global.categories?.length" class="h-full border-b">
        <div class="text-center text-xl font-bold">
          Немає результатів
        </div>
      </div>
      <ul v-if="global.categories?.length" class="grid gap-2 grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <ULink
          v-for="category in global.categories"
          :key="category.id"
          :to="`/c/${category.slug}`"
        >
          <UCard class="h-full">
            <BaseImage
              :src="category.image"
              :alt="category.title"
              class="w-full aspect-[1/1]"
              fit="contain"
            />
            <div class="border-b-1 text-lg font-bold mt-2">
              <span class="sr-only">
                Перейти в категорію
              </span>
              {{ category.title }}
            </div>
            <div class="text-sm font-bold mt-2">
              {{ category.description }}
            </div>
          </UCard>
        </ULink>
      </ul>
    </div>
  </main>
</template>
