<script setup lang="ts">
defineProps<{
  multiple?: boolean
  disabled?: boolean
}>()
const model = defineModel<number[] | number>()
const brandRepository = useBrandRepository()
const { data } = useAsyncData(() => brandRepository.get())
</script>

<template>
  <USelectMenu
    v-model="model"
    :options="data || []"
    :multiple="multiple"
    :disabled="disabled"
    value-attribute="id"
    option-attribute="title"
    placeholder="Обрати бренд"
  />
</template>
