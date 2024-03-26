<script setup lang="ts">
const global = useGlobalStore()
const { get } = useServiceRepository()
const { data } = useAsyncData(
  () => get({ statuses: global.statuses }),
  { watch: [() => global.statuses] },
)
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-3xl">
      Наші послуги
    </h1>
    <div class="text-xl">
      Пропонуємо для наших покупців можливість замовити різні види будівельних послуг, щоб зберегти свій дорогоцінний час та нерви на пошук бригади.
    </div>
    <ul class="grid gap-2 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <UCard v-for="service in data" :key="service.title">
        <BaseImage :src="service.image" :alt="service.title" class="object-cover aspect-[1/1]" />
        <div class="border-b-1 font-bold">
          {{ service.title }}
        </div>
      </UCard>
    </ul>
    <div class="space-y-2">
      <h2 class="text-2xl">
        Наші переваги:
      </h2>
      <ul class="list-disc">
        <li>Професійні майстри - досвід понад 10 років</li>
        <li>Тільки якісні, перевірені матеріали</li>
        <li>Індивідуальний підхід до кожного клієнта</li>
        <li>Гарантія на роботи і матеріали</li>
        <li>Доставка матеріалів власними маніпуляторами</li>
        <li>Працюємо оперативно та в узгоджені терміни</li>
      </ul>
      <p text-xl>
        МИ ЗНАЄМО ЯК ЗРОБИТИ ЯКІСНО ТА ЗА ДОСТУПНОЮ ЦІНОЮ
      </p>
    </div>
    <h1 class="text-3xl pt-12">
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
    <div class="pt-12 flex justify-center">
      <UseCall v-slot="{ call }">
        <UButton @click="call">
          Передзвонити мені
        </UButton>
      </UseCall>
    </div>
  </div>
</template>
