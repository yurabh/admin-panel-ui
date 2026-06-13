<template>
  <p v-if="message" class="error-message">
    {{ message }}
  </p>
</template>

<script setup lang="ts">
interface Props {
  message?: string | null
}

defineProps<Props>()
</script>

<style scoped>
.error-message {
  color: rgba(235, 37, 166, 0.98);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}
</style>