<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { DropdownItem } from '#ui/types'

const global = useGlobalStore()
const menuOpen = ref(false)

onMounted(() => {
  global.checkLogin()
})

const categories = computed(() => [
  global.categories?.map(category => ({
    label: category.title,
    to: `/c/${category.slug}`,
    image: category.image,
  })) as DropdownItem[],
])

const phones = computed(() => global.contacts?.flatMap(({ phones }) => phones.split(',')))
</script>

<template>
  <header class="container flex flex-wrap gap-4 items-center justify-between mx-auto p-2">
    <ULink to="/" class="h-24 w-24">
      <CmsSection slug="logo" />
    </ULink>

    <button class="flex md:hidden" @click="menuOpen = !menuOpen">
      <i v-if="menuOpen" class="i-heroicons-x-mark-16-solid text-4xl text-gray" />
      <i v-else class="i-heroicons-bars-3-16-solid text-4xl text-gray" />
    </button>

    <nav
      class="hidden md:flex md:flex-row md:w-auto text-lg"
      :class="{ '!flex w-full flex-col items-center': menuOpen }"
      @click="menuOpen = !menuOpen"
    >
      <UDropdown
        :items="categories"
        mode="hover"
        :ui="{ width: 'w-82', height: 'max-h-96', padding: 'grid grid-cols-2' }"
        :popper="{ placement: 'bottom-start' }"
      >
        <ULink to="/catalog" class="p-2" active-class="border-b-2" inactive-class="border-b-2 border-transparent">
          Каталог
        </ULink>
        <template #item="{ item }">
          <BaseImage
            :src="item.image"
            :alt="item.label"
            class="w-16 h-16 aspect-[1/1]"
            fit="contain"
          />
          {{ item.label }}
        </template>
      </UDropdown>
      <LNavigation />

      <address class="grid md:hidden gap-2 not-italic mt-4">
        <a v-for="phone in phones" :key="phone" :href="`tel:${phone}`">{{ phone }}</a>
      </address>
    </nav>

    <address class="hidden md:grid gap-2 not-italic">
      <a v-for="phone in phones" :key="phone" :href="`tel:${phone}`">{{ phone }}</a>
    </address>
  </header>
</template>
