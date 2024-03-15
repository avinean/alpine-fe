<script setup lang="ts">
defineProps<{
  multiple?: boolean
  disabled?: boolean
}>()
const model = defineModel<number[] | number>()
const { get } = useColorRepository()
const { data } = useAsyncData(get)
</script>

<template>
  <USelectMenu
    v-model="model"
    :options="data || []"
    :multiple="multiple"
    :disabled="disabled"
    value-attribute="id"
    option-attribute="title"
    placeholder="Обрати колір"
  >
    <template #option="{ option }">
      <span
        v-if="option.value"
        class="flex-shrink-0 w-8 h-8 mt-px rounded-full"
        :style="{ background: option.value }"
      />
      <base-image
        v-else
        :src="option.image"
        class="w-8 h-8 mt-px rounded-full"
      />
      <span class="truncate">{{ option.title }}</span>
    </template>
  </USelectMenu>
</template>
