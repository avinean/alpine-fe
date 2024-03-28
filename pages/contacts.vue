<script setup lang="ts">
const global = useGlobalStore()

useBreadcrumbs([
  {
    label: 'Контакти',
  },
])
</script>

<template>
  <div class="space-y-2 py-2">
    <h1 class="text-3xl">
      Контакти
    </h1>
    <ul v-if="global.contacts" class="space-y-2">
      <li v-for="contact in global.contacts" :key="contact.address" class="grid lg:grid-cols-3 items-center bg-gray-100 text-center text-lg p-2">
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

    <div class="grid grid-cols-2 pt-10">
      <div>
        <h2 class="text-2xl">
          Потрібна допомога?
        </h2>
        <div class="text-sm">
          Залиште нам свої контактні дані, і менеджер Avenue зв’яжеться з Вами для уточнення деталей.
        </div>
      </div>
      <div>
        <FormCall />
      </div>
    </div>
  </div>
</template>
