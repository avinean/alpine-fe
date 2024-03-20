<script setup lang="ts">
const open = ref(false)
const sent = ref(false)
const pending = ref(false)

const form = ref({
  name: '',
  phone: '',
})

async function send() {
  if (!form.value.name || !form.value.phone)
    return

  pending.value = true

  await $fetch('/api/message', {
    method: 'POST',
    body: form.value,
  })

  sent.value = true
  pending.value = false

  setTimeout(() => {
    open.value = false

    nextTick(() => {
      sent.value = false
      form.value.name = ''
      form.value.phone = ''
    })
  }, 1000)
}
</script>

<template>
  <slot :call="() => open = true">
    <button>
      Передзвонити мені
    </button>
  </slot>

  <UModal v-model="open">
    <div class="bg-white p-4 w-90">
      <h2 v-if="sent" class="flex justify-between items-center">
        <span class="text-xl">
          Дякуємо за звернення!
        </span>
      </h2>
      <template v-else>
        <h2 class="flex justify-between items-center mb-4">
          <span class="text-xl">
            Замовити зворотній дзвінок
          </span>
          <button class="i-heroicons-x-mark-16-solid text-gray text-2xl" @click="open = false" />
        </h2>
        <UForm :state="form" class="space-y-2" @submit="send">
          <UFormGroup name="name" label="Ваше ім'я">
            <UInput v-model="form.name" />
          </UFormGroup>
          <UFormGroup
            name="phone"
            label="Ваш номер телефону"
          >
            <UInput v-model="form.phone" />
          </UFormGroup>
          <div class="flex justify-right">
          <UButton :loading="pending" type="submit">
            Відправити
          </UButton>
          </div>
        </UForm>
      </template>
    </div>
  </UModal>
</template>
