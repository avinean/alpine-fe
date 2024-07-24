<script lang="ts" setup>
import type { ButtonSection } from '~/types/cms'

const props = defineProps<ButtonSection>()
</script>

<template>
  <div class="inline-flex items-center justify-center">
    <UButton v-bind="props" />
  </div>
</template>
