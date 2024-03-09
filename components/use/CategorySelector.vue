<script setup lang="ts">
const props = defineProps<{
  brands: number[]
  multiple?: boolean
  disabled?: boolean
}>()
const model = defineModel<number[] | number>()
const { get } = useCategoryRepository()
const { data } = useAsyncData(
  () => get({ brands: props.brands }),
  { watch: [() => props.brands] },
)
</script>

<template>
  <USelectMenu
    v-model="model"
    :options="data || []"
    :multiple="multiple"
    :disabled="disabled"
    value-attribute="id"
    option-attribute="title"
    placeholder="Обрати категорію"
  />
</template>
