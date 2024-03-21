<script setup lang="ts">
import type { ColorEntity } from '~/types/entities'

defineProps<{
  colors?: ColorEntity[]
}>()

const model = defineModel<ColorEntity>()
</script>

<template>
  <div class="flex gap-2 flex-wrap">
    <UTooltip
      v-for="color in (colors || [])"
      :key="color.title"
      :text="color.title"
    >
      <span
        v-if="color.value"
        class="flex-shrink-0 w-8 h-8 mt-px rounded-full border cursor-pointer"
        :style="{ background: color.value }"
        :class="{ 'border-2 border-primary': model?.id === color.id}"
        @click="model = color"
      />
      <base-image
        v-else
        :src="color.image"
        class="w-8 h-8 mt-px rounded-full border cursor-pointer"
        :class="{ 'border-2 border-primary': model?.id === color.id}"
        @click="model = color"
      />
    </UTooltip>
  </div>
</template>
