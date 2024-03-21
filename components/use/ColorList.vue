<script setup lang="ts">
import type { ColorEntity } from '~/types/entities'

defineProps<{
  colors?: ColorEntity[]
}>()
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
        class="flex-shrink-0 w-8 h-8 mt-px rounded-full border"
        :style="{ background: color.value }"
      />
      <base-image
        v-else
        :src="color.image"
        class="w-8 h-8 mt-px rounded-full border"
      />
    </UTooltip>
  </div>
</template>
