<script setup lang="ts">
import type { ColorEntity } from '~/types/entities'

const props = defineProps<{
  colors?: ColorEntity[]
  multiple?: boolean
}>()

const model = defineModel<string | string[]>()

function isSelected(color: ColorEntity) {
  if (Array.isArray(model.value))
    return model.value?.find(slug => slug === color.slug)
  else if (model.value && !props.multiple)
    return model.value === color.slug
}

function toggleColor(color: ColorEntity) {
  if (Array.isArray(model.value)) {
    if (model.value.find(_ => _ === color.slug))
      model.value = model.value.filter(_ => _ !== color.slug)
    else
      model.value = [...model.value, color.slug]
  }
  else if (model.value && !props.multiple) { model.value = color.slug }
}
</script>

<template>
  <div class="flex gap-2 flex-wrap">
    <UTooltip
      v-for="color in (colors || [])"
      :key="color.title"
      :text="color.title"
    >
      <button
        class="w-8 h-8 mt-px rounded-full border cursor-pointer overflow-hidden"
        :class="{ 'border-primary border-4': isSelected(color) }"
        @click="toggleColor(color)"
      >
        <span v-if="color.value" class="w-full h-full block" :style="{ background: color.value }" />
        <BaseImage v-else :src="color.image" class="w-full h-full block" />
      </button>
    </UTooltip>
  </div>
</template>
