<script lang="ts" setup>
import type { CmsEntity } from '~/types/cms'

const props = defineProps<{
  slug?: string
  content?: CmsEntity['content']
}>()

const global = useGlobalStore()
const { getOne } = useCmsRepository()
const { data } = props.slug
  ? await useAsyncData(
    () => getOne(props.slug!, { statuses: global.statuses }),
    {
      watch: [() => global.statuses],
      transform(data) {
        return data.content
      },
    },
  )
  : { data: props.content }
</script>

<template>
  <template v-for="section, key in (data || [])" :key>
    <CmsText v-if="section.type === 'text'" v-bind="section" />
    <CmsImage v-else-if="section.type === 'image'" v-bind="section" />
    <CmsCard v-else-if="section.type === 'card'" v-bind="section" />
    <CmsGrid v-else-if="section.type === 'grid'" v-bind="section">
      <CmsSection v-for="group, i in section.groups" :key="i" :content="group" />
    </CmsGrid>
  </template>
</template>
