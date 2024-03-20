<script setup lang="ts">
const global = useGlobalStore()
const { get } = useServiceRepository()
const { data } = useAsyncData(
  () => get({ statuses: global.statuses }),
  { watch: [() => global.statuses] },
)
</script>

<template>
  <main class="space-y-2">
    <h1 class="text-3xl">
      Наші послуги
    </h1>
    <ul class="grid gap-2 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <li
        v-for="service in data"
        :key="service.title"
        class="flex flex-col gap-2 bg-white p-2 relative divide-y shadow-md"
      >
        <base-image :src="service.image" :alt="service.title" class="object-cover aspect-[1/1]" />
        <div class="border-b-1 font-bold">
          {{ service.title }}
        </div>
        <ul class="text-sm flex-1">
          <li>{{ service.description }}</li>
        </ul>
      </li>
    </ul>
    <h1 class="text-3xl pt-12">
      Контакти
    </h1>
    <ul v-if="global.contacts" class="space-y-2">
      <li v-for="contact in global.contacts" :key="contact.address" class="grid grid-cols-3 items-center bg-gray-100 text-center text-xl p-2">
        <div>{{ contact.address }}</div>
        <div class="grid gap-2">
          <a
            v-for="phone in contact.phones.split(',')"
            :key="phone"
            :href="`tel:${phone}`"
          >
            {{ phone }}
          </a>
        </div>
        <div class="grid gap-2">
          <a
            v-for="email in contact.emails.split(',')"
            :key="email"
            :href="`mailto:${email}`"
          >
            {{ email }}
          </a>
        </div>
      </li>
    </ul>
    <div class="pt-12 flex justify-center">
      <UseCall v-slot="{ call }">
        <UButton @click="call">
          Передзвонити мені
        </UButton>
      </UseCall>
    </div>
  </main>
</template>
