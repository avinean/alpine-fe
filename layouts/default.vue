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
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <div class="border-b-1 bg-white">
      <div v-if="global.isLoggedIn" class="flex items-center md:justify-between p-2 bg-gray-300">
        <ULink to="/admin" class="flex items-center gap-2">
          <i class="i-heroicons-arrow-left-on-rectangle-20-solid text-2xl text-gray" />
          Перейти до адмін панелі
        </ULink>
        <div class="flex items-center gap-2">
          Режим попереднього перегляду <UToggle v-model="global.isPreview" color="primary" />
        </div>
      </div>
      <div class="container flex gap-4 items-center justify-center md:justify-between mx-auto p-2">
        <ULink to="/">
          <img src="/logo.jpg" alt="logo" class="h-24">
        </ULink>
        <nav class="flex gap-4">
          <ULink to="/material" active-class="border-b-2">
            Матеріали
          </ULink>
          <ULink to="/product" active-class="border-b-2">
            Вироби
          </ULink>
        </nav>
        <div class="hidden md:flex gap-4">
          <UseCall />
          <div class="flex gap-2 items-center">
            <div class="grid text-black/70">
              <a href="tel:+380 63 401 1986">
                +380 63 401 1986
                Київ
              </a>
            </div>
            <i class="i-heroicons-phone text-2xl text-gray" />
          </div>
        </div>
      </div>
    </div>

    <main class="container flex-1 mx-auto p-2">
      <NuxtPage />
      <div class="fixed bottom-12 right-5 animate-bounce rounded bg-white border">
        <UseCall>
          <i class="i-heroicons-phone text-6xl text-gray" />
        </UseCall>
      </div>
    </main>

    <div class="border-t-1 bg-white">
      <div class="container flex flex-col gap-4 p-2 items-center justify-center mx-auto">
        <ULink to="/">
          <img src="/logo.jpg" alt="logo" class="h-24">
        </ULink>
        <div class="flex gap-2 items-center">
          <div class="grid text-black/70">
            <a href="tel:+380 63 401 1986">
              +380 63 401 1986
              Київ
            </a>
          </div>
          <i class="i-heroicons-phone text-2xl text-gray" />
        </div>
        <div class="flex gap-2 items-center">
          <div class="grid text-black/70">
            <a href="https://wooden-dreamhouse.com.ua">
              wooden-dreamhouse.com.ua
            </a>
          </div>
        </div>
        <div>
          {{ yearString }}
        </div>
      </div>
    </div>
  </div>
</template>
