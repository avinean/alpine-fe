<script setup lang="ts">
const open = ref(false);
const sent = ref(false);
const pending = ref(false);

const form = ref({
  name: '',
  phone: '',
});

async function send() {
  if (!form.value.name || !form.value.phone) {
    return;
  }
  pending.value = true;

  await $fetch('/api/message', {
    method: 'POST',
    body: form.value
  });

  sent.value = true;
  pending.value = false;

  setTimeout(() => {
    open.value = false;

    nextTick(() => {
      sent.value = false;
      form.value.name = '';
      form.value.phone = '';
    });
  }, 1000);
}
</script>

<template>
  <button @click="open = true">
    <slot>
      Передзвонити мені 
    </slot>
  </button>

  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="bg-black/20 fixed z-50 inset-0 duration flex justify-center items-center">
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
            <form class="grid gap-4" @submit.prevent="send">
              <input
                v-model="form.name"
                type="text"
                placeholder="Ваше ім'я" 
                class="border p-1"
              >
              <input
                v-model="form.phone"
                type="text"
                placeholder="Ваш номер телефону" 
                class="border p-1"
              >
              <button class="!bg-orange-500 p-2 color-white" type="submit">
                <span v-if="pending" class="i-heroicons-arrow-path-16-solid animate-spin text-2xl" />
                <span v-else-if="sent" class="i-heroicons-check-16-solid text-2xl" />
                <template v-else>
                  Відправити
                </template>
              </button>
            </form>
          </template>
        </div>
      </div>
    </Transition> 
  </Teleport>
</template>