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
  <label class="cursor-pointer">
    <input
      type="file"
      hidden
      @change="handleFileChange"
    >
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Preview"
      width="100%"
      height="100%"
    >
    <base-image
      v-else
      :src="src"
      width="100%"
      height="100%"
    />
  </label>
</template>
