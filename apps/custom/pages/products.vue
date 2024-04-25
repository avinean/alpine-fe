<script setup lang="ts">
useBreadcrumbs([
  {
    label: 'Продукція',
  },
])

definePageMeta({
  keepalive: true,
})
</script>

<template>
  <div class="space-y-2 py-2">
    <UseProductList />
  </div>
</template>
