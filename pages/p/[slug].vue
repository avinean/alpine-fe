<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import type { ColorEntity, ParameterEntity } from '~/types/entities'

const { getOne } = useProductRepository()
const slug = useRouteParams<string>('slug')
const { data } = await useAsyncData(() => getOne(slug.value))

const quantity = ref(1)
const selectedColor = ref<string | undefined>(undefined)
const selectedParameter = ref<ParameterEntity | undefined>(undefined)

const colors = computed(() => {
  return data.value?.prices?.flatMap(price => price.colors).reduce((acc, _) => {
    if (acc.find(color => color?.id === _?.id))
      return acc
    return [...acc, _]
  }, [] as ColorEntity[]) || []
})

const parameters = computed(() => {
  return data.value?.prices?.flatMap(price => price.parameters.map(p => ({
    ...p,
    available: price.colors.length ? !!(selectedColor.value && price.colors.find(({ slug }) => slug === selectedColor.value)) : true,
  }))).reduce((acc, _) => {
    const existing = acc.find(parameter => parameter?.id === _?.id)
    if (existing) {
      existing.available = _.available || existing.available
      return acc
    }
    return [...acc, _]
  }, [] as (ParameterEntity & { available: boolean })[]) || []
})

const price = computed(() => {
  return data.value?.prices?.find((_) => {
    if (!(selectedColor.value && selectedParameter.value))
      return false

    return _.colors.some(({ slug }) => slug === selectedColor.value)
      && _.parameters.some(parameter => parameter.id === selectedParameter.value?.id)
  })
})

watch(quantity, (v) => {
  if (v < 1)
    quantity.value = 1
})

watch(selectedColor, () => {
  if (parameters.value.length)
    selectedParameter.value = parameters.value.find(({ available }) => available)
})

onMounted(() => {
  watch(colors, () => {
    selectedColor.value = colors.value?.[0].slug
  }, { immediate: true })
})
</script>

<template>
  <div class="py-2">
    <div class="grid items-start gap-2 md:grid-cols-[60%_40%]">
      <UCard>
        <BaseImage :src="data?.image" />
      </UCard>
      <div class="divide-y">
        <div class="py-2">
          <h1 class="text-3xl">
            {{ data?.title }}
          </h1>
          <p class="text-sm">
            <span class="font-bold">Категорія:</span> {{ data?.category?.title }}
          </p>
          <p class="text-sm">
            <span class="font-bold">Виробник:</span> {{ data?.brand?.title }}
          </p>
        </div>
        <p v-if="data?.size" class="py-2">
          <span class="font-bold">Розмір:</span> {{ data?.size }}
        </p>
        <p class="py-2">
          <span class="font-bold">Стандарт:</span> {{ data?.standart }}
        </p>
        <div v-if="colors" class="py-2">
          <p class="pb-2 font-bold">
            Кольори
          </p>
          <UseColorList v-model="selectedColor" :colors="colors" />
        </div>
        <div v-if="parameters" class="py-2">
          <p class="pb-2 font-bold">
            Харатеристики
          </p>
          <div class="flex flex-wrap gap-2 py-2">
            <UButton
              v-for="parameter in parameters"
              :key="parameter.id"
              :label="`${parameter.type} ${parameter.value} ${parameter.unit}`"
              :color="selectedParameter?.id === parameter.id ? undefined : 'gray'"
              :disabled="!parameter.available"
              @click="selectedParameter = parameter"
            />
          </div>
        </div>
        <div v-if="price" class="py-2">
          Кількість:
          <div class="flex w-32">
            <UButton icon="i-heroicons-minus-20-solid" class="w-8" @click="quantity--" />
            <UInput v-model.number="quantity" type="number" step="any" />
            <UButton icon="i-heroicons-plus-20-solid" class="w-8" @click="quantity++" />
          </div>
        </div>
        <div v-if="price" class="py-2">
          Ціна: <span class="text-2xl font-bold">{{ price.price * quantity }}</span> грн
        </div>
      </div>
    </div>
    <UTabs
      :items="[
        { label: 'Опис', key: 'description' },
        { label: 'Характеристики/Ціни', key: 'parameters' },
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
          <UTable
            v-if="data?.prices"
            :rows="data.prices"
            :columns="[
              { key: 'article', label: 'Артикул' },
              { key: 'price', label: 'Ціна, грн' },
              { key: 'color', label: 'Колір' },
              { key: 'parameters', label: 'Характеристики' },
            ]"
          >
            <template #article-data="{ row }">
              {{ row.article.toString().padStart(6, '0') }}
            </template>
            <template #color-data="{ row }">
              <UseColorList
                v-if="row.color"
                :colors="[row.color]"
              />
              <UBadge v-else label="Не вказано" color="gray" />
            </template>
            <template #parameters-data="{ row }">
              <div class="flex gap-2 flex-wrap">
                <template v-if="row.parameters.length">
                  <span
                    v-for="parameter in row.parameters"
                    :key="parameter.id"
                  >
                    {{ parameter.type }} {{ parameter.value }} {{ parameter.unit }}
                  </span>
                </template>
                <UBadge v-else label="Не вказано" color="gray" />
              </div>
            </template>
          </UTable>
        </ul>
        <template v-else>
          {{ data?.description }}
        </template>
      </template>
    </UTabs>
  </div>
</template>
