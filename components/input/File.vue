<script setup lang="ts">
defineProps < {
  src?: string
} > ()

const emit = defineEmits<{
  change: [file: File]
}>()

const imageUrl = ref('')

function handleFileChange(event: any) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      imageUrl.value = e.target.result
      emit('change', file)
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <label class="cursor-pointer relative rounded-md overflow-hidden">
    <input
      type="file"
      hidden
      @change="handleFileChange"
    >
    <base-image
      :src="imageUrl || src"
      class="object-contain"
    />
    <div class="flex items-center justify-center bg-primary absolute bottom-0 left-0 right-0 p-2">
      <span class="i-heroicons-camera-20-solid text-white text-2xl" />
    </div>
  </label>
</template>
