<script setup lang="ts">
useBreadcrumbs([])

definePageMeta({
  keepalive: true,
})
const global = useGlobalStore()
const headerRef = computed(() => global.headerRef)
// @ts-expect-error it's a ref
const { height } = useElementSize(headerRef)
</script>

<template>
  <main>
    <div
      class="w-screen relative" :style="{
        height: `calc(100vh - ${height}px)`,
      }"
    >
      <div
        class="absolute inset-0 z-[-1] [&>picture]:w-full [&>picture]:h-full [&>picture]:object-cover"
        :style="{
          marginTop: `-${height}px`,
        }"
      >
        <CmsSection key="golovna-banner" slug="golovna-banner" />
      </div>
      <div class="container flex-1 mx-auto py-4 h-full flex items-center justify-center text-white">
        <CmsSection key="golovna-pered-spiskom" slug="golovna-pered-spiskom" />
      </div>
    </div>
    <UseProductList class="container flex-1 mx-auto" />
  </main>
</template>
