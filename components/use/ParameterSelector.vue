<script setup lang="ts">
defineProps<{
  multiple?: boolean
  disabled?: boolean
}>()
const model = defineModel<number[] | number>()
const { get } = useParameterRepository()
const { data } = useAsyncData(get)
</script>

<template>
  <USelectMenu
    v-model="model"
    :options="data || []"
    :multiple="multiple"
    :disabled="disabled"
    searchable
    :search-attributes="['type', 'value', 'unit']"
    value-attribute="id"
    placeholder="Обрати характеристику"
  >
    <template #option="{ option }">
      {{ option.type }}: {{ option.value }} {{ option.unit }}
    </template>
  </USelectMenu>
</template>
