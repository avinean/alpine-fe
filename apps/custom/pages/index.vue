<script setup lang="ts">
import type { CarouselSection, CmsEntity } from '~/types/cms'

useBreadcrumbs([])

definePageMeta({
  keepalive: true,
})

const { getOne } = useCmsRepository()
const global = useGlobalStore()
const headerRef = computed(() => global.headerRef)
// @ts-expect-error it's a ref
const { height } = useElementSize(headerRef)

const { data } = await useAsyncData(
  () => getOne<CmsEntity<CarouselSection>>('golovna-pered-spiskom', { statuses: global.statuses }),
  { watch: [() => global.statuses] },
)
</script>

<template>
  <!-- <div
        class="absolute inset-0 z-[-1] [&>picture]:w-full [&>picture]:h-full [&>picture]:object-cover"
        :style="{
          marginTop: `-${height}px`,
        }"
      >
        <CmsSection key="golovna-banner" slug="golovna-banner" />
      </div>
      <div class="container flex-1 mx-auto py-4 h-full flex items-center justify-center text-white">
        <CmsSection key="golovna-pered-spiskom" slug="golovna-pered-spiskom" class="absolute inset-0 z-[-1] [&>picture]:w-full [&>picture]:h-full [&>picture]:object-cover" />
      </div> -->
  <main>
    <div
      class="w-screen h-screen relative" :style="{
        height: `calc(100vh - ${height}px)`,
      }"
    >
      <CmsCarousel
        v-if="data?.content?.length"
        v-slot="{ item }"
        v-bind="data.content[0]"
        class="absolute inset-0 [&_picture]:z-[-1] [&_picture]:w-full [&_picture]:h-full [&_picture]:object-cover [&>div]:h-full"
        :style="{
          marginTop: `-${height}px`,
        }"
      >
        <div class="relative w-full">
          <template v-for="el, i in item" :key="i">
            <template v-if="el.type === 'group'">
              <template v-for="section, j in el.sections" :key="j">
                <CmsImage v-if="section.type === 'image'" v-bind="section" />
                <CmsGroup
                  v-else-if="section.type === 'group'"
                  v-bind="section"
                  class="absolute inset-0 flex flex-col align-center justify-center"
                />
                <CmsGrid
                  v-else-if="section.type === 'grid'"
                  v-bind="section"
                  class="absolute inset-0 align-center justify-center"
                >
                  <CmsSection v-for="group, k in section.groups" :key="k" :content="group" />
                </CmsGrid>
              </template>
            </template>
          </template>
        </div>
      </CmsCarousel>
    </div>
    <UseProductList class="container flex-1 mx-auto py-8 px-2 md:px-0" />
  </main>
</template>
