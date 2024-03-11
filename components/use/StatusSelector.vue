<script lang="ts" setup>
import { VisibilityStatus } from '~/types/enums'

const model = defineModel<string[]>({
  default: () => [],
})

const options = [
  {
    id: VisibilityStatus.Published,
    label: 'Опублікований',
    icon: 'i-heroicons-eye-solid'
  },
  {
    id: VisibilityStatus.Draft,
    label: 'Чорновик',
    icon: 'i-heroicons-eye-slash-solid'
  },
  {
    id: VisibilityStatus.Archived,
    label: 'Архівований',
    icon: 'i-heroicons-folder-minus-16-solid'
  },
]
</script>

<template>
  <USelectMenu
    v-model="model"
    :options="options"
    option-attribute="label"
    value-attribute="id"
    multiple
    placeholder="Select people"
  />
</template>
