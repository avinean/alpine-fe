<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <div class="border-t-1 bg-white p-2">
      <ULink to="/" class="flex gap-2 items-center">
        <img src="/logo.jpg" alt="logo" class="h-10"> Admin
      </ULink>
    </div>
    <main class="flex-1 p-2">
      <NuxtPage />
    </main>
    <ClientOnly>
      <UseModal />
    </ClientOnly>
  </div>
</template>
