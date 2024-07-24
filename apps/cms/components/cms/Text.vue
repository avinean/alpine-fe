<script lang="ts" setup>
import type { TextSection } from '~/types/cms'

withDefaults(defineProps<TextSection>(), {
  align: 'left',
  color: 'black',
  tag: 'p',
})
const alignment = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const colors = {
  black: 'text-black',
  white: 'text-white',
}

function replaceLinksWithHTML(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  return text.replace(regex, '<a href="$2" target="_blank" rel="noopener noreferer" class="link">$1</a>')
}
</script>

<template>
  <component :is="tag" :class="[alignment[align], colors[color], { list: tag === 'ul' }]">
    <template v-if="tag === 'ul'">
      <li v-for="item in replaceLinksWithHTML(content).split('\n')" :key="item" v-html="item" />
    </template>
    <span v-else v-html="replaceLinksWithHTML(content)" />
  </component>
</template>
