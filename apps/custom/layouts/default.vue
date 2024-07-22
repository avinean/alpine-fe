<script setup lang="ts">
const global = useGlobalStore()

onMounted(() => {
  global.checkLogin()
})

const startYear = 2024
const currentYear = new Date().getFullYear()
const yearString = startYear === currentYear ? currentYear : `${startYear}-${currentYear}`
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div :ref="e => global.headerRef = e" class="border-b shadow-md bg-white/80 sticky left-0 right-0 top-0 z-10">
      <LHeader />
      <LSearch />
    </div>

    <div v-if="global.breadcrumbs?.length" class="container py-2 mx-auto">
      <UBreadcrumb
        divider="/"
        :links="[{ label: 'Головна', to: '/' }, ...global.breadcrumbs]"
      />
    </div>

    <NuxtPage />
    <!-- <div class="fixed bottom-12 right-5 animate- bg-white border">
      <UseCall v-slot="{ call }">
        <button @click="call">
          <i class="i-heroicons-phone text-6xl text-gray" />
        </button>
      </UseCall>
    </div> -->

    <div class="border-t bg-white">
      <div class="container flex flex-col items-center py-4 mx-auto">
        <ULink to="/" class="h-24 w-24 mx-auto">
          <CmsSection slug="logo" />
        </ULink>
        <span>{{ yearString }}</span>
      </div>
    </div>

    <div v-if="global.isLoggedIn" class="fixed right-0 bottom-10  p-2 bg-black text-white">
      <ULink to="/admin" class="flex items-center gap-2">
        До адмінки
        <i class="i-heroicons-arrow-right-on-rectangle-20-solid text-2xl text-gray" />
      </ULink>
      <!-- <div class="flex items-center gap-2">
        Режим попереднього перегляду <UToggle v-model="global.isPreview" color="primary" />
      </div> -->
    </div>
  </div>
</template>
