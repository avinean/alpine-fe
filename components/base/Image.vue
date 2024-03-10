<template>
  <img v-bind="$attrs" :src="$attrs.src?.toString() || '/placeholder.jpg'">
</template>
