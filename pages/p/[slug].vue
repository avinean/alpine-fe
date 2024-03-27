<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import type { ColorEntity, ParameterEntity } from '~/types/entities'

const { getOne } = useProductRepository()
const slug = useRouteParams<string>('slug')
const { data } = await useAsyncData(() => getOne(slug.value))

const quantity = ref(1)
const selectedColor = ref<string | undefined>(undefined)
const selectedParameters = ref<string[]>([])

const galleryItems = computed(() => {
  return data.value?.images?.toSorted(item => -(item.id === data.value?.primaryImage?.id))
})

const colors = computed(() => {
  return data.value?.prices?.flatMap(price => price.colors).reduce((acc, _) =>
    acc.find(color => color?.id === _?.id) ? acc : [...acc, _], [] as ColorEntity[]) || []
})

const availableParameters = computed(() => {
  return data.value?.prices
    ?.filter(({ colors }) => colors.find(({ slug }) => slug === selectedColor.value))
    ?.filter(({ parameters }) =>
      selectedParameters.value.every(slug => parameters.some(parameter => parameter.slug === slug)),
    )
    ?.flatMap(({ parameters }) => parameters.map(({ slug }) => slug)) || []
})

const parameterGroups = computed(() => {
  const groups: Record<string, ParameterEntity[]> = {}

  data.value?.prices?.flatMap(price => price.parameters)?.forEach((parameter) => {
    if (!groups[parameter.type])
      groups[parameter.type] = []

    const existing = groups[parameter.type].find(({ id }) => id === parameter?.id)
    if (!existing)
      groups[parameter.type].push(parameter)
  })

  return groups
})

const price = computed(() => {
  return data.value?.prices?.find((_) => {
    if (!(selectedColor.value && selectedParameters.value.length))
      return false
    return _.colors.some(({ slug }) => slug === selectedColor.value)
      && selectedParameters.value.every(
        slug => _.parameters.some(parameter => parameter.slug === slug),
      )
  })
})

function selectParameter(parameter: ParameterEntity, group: ParameterEntity[]) {
  const groupSlugs = group.map(({ slug }) => slug)
  if (selectedParameters.value.includes(parameter.slug)) { selectedParameters.value = selectedParameters.value.filter(slug => slug !== parameter.slug) }
  else {
    selectedParameters.value = [
      ...selectedParameters.value
        .filter(slug => availableParameters.value.includes(slug) && !groupSlugs.includes(slug)),
      parameter.slug,
    ]
  }
}

watch(quantity, (v) => {
  if (v < 1)
    quantity.value = 1
})

watch(selectedColor, () => {
  selectedParameters.value = []
  Object.entries(parameterGroups.value).forEach(([group, list]) => {
    const available = list.find(({ slug }) => availableParameters.value.includes(slug))
    if (available)
      selectedParameters.value.push(available.slug)
  })
})

onMounted(() => {
  watch(colors, () => {
    selectedColor.value = colors.value?.[0].slug
  }, { immediate: true })
})
</script>

<template>
  <div class="py-2">
    <div class="grid items-start gap-2 md:grid-cols-[50%_50%]">
      <UCarousel
        v-if="galleryItems"
        v-slot="{ item }"
        :items="galleryItems.map(({ image }) => image)"
        :ui="{ item: 'basis-full' }"
        class="rounded-lg overflow-hidden border"
        :arrows="galleryItems.length > 1"
      >
        <BaseImage :src="item" class="w-full aspect-[1/1] object-contain" draggable="false" />
      </UCarousel>
      <BaseImage v-else :src="data?.primaryImage?.image" />
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
        <div v-for="group, name in parameterGroups" :key="name" class="py-2">
          <p class="pb-2 font-bold">
            {{ name }}
          </p>
          <div class="flex flex-wrap gap-2 py-2">
            <UButton
              v-for="parameter in group"
              :key="parameter.id"
              :label="[parameter.value, parameter.unit].filter(Boolean).join(' ')"
              :color="availableParameters.includes(parameter.slug) && selectedParameters.find(slug => slug === parameter.slug) ? undefined : 'gray'"
              :disabled="!availableParameters.includes(parameter.slug)"
              @click="selectParameter(parameter, group)"
            />
          </div>
        </div>
        <template v-if="price">
          <div class="py-2">
            Кількість:
            <div class="flex w-32">
              <UButton icon="i-heroicons-minus-20-solid" class="w-8" @click="quantity--" />
              <UInput v-model.number="quantity" type="number" step="any" />
              <UButton icon="i-heroicons-plus-20-solid" class="w-8" @click="quantity++" />
            </div>
          </div>
          <div class="py-2">
            Ціна: <span class="text-2xl font-bold">{{ price.price * quantity }}</span> грн
          </div>
        </template>
        <div v-else-if="!price && selectedParameters.length" class="py-2">
          Немає в наявності
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
                v-if="row.colors"
                :colors="row.colors"
              />
              <UBadge v-else label="Не вказано" color="gray" />
            </template>
            <template #parameters-data="{ row }">
              <div class="flex gap-2 flex-wrap">
                <template v-if="row.parameters.length">
                  <UBadge
                    v-for="parameter in row.parameters"
                    :key="parameter.id"
                    color="gray"
                    :label="[parameter.type, parameter.value, parameter.unit].filter(Boolean).join(' ')"
                  />
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
