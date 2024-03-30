<script lang="ts" setup>
import type { TextSection } from '~/types/cms'

withDefaults(defineProps<TextSection>(), {
  align: 'left',
  tag: 'p',
})
const alignment = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}
</script>

<template>
  <component :is="tag" :class="alignment[align]">
    <template v-if="tag === 'ul'">
      <li v-for="item in content.split('\n')" :key="item">
        {{ item }}
      </li>
    </template>
    <template v-else>
      {{ content }}
    </template>
  </component>
</template>
