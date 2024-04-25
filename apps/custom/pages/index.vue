<script setup lang="ts">
useBreadcrumbs([])

definePageMeta({
  keepalive: true,
})
</script>

<template>
  <div>
    <CmsSection key="golovna-pered-spiskom" slug="golovna-pered-spiskom" />
    <UseProductList />
    <CmsSection key="golovna-pislya-spisku" slug="golovna-pislya-spisku" />
  </div>
</template>
