<template>
  <p v-if="message" class="success-message">
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
.success-message {
  color: #166534;
  background-color: #dcfce7;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}
</style>