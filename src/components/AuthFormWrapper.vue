<template>
  <div class="form-container">
    <div class="form-wrap">
      <header class="form-header">
        <slot name="header"></slot>
      </header>
      <form class="form" @submit.prevent="emit('submit')">
        <slot></slot>
        <footer class="form-footer">
          <slot name="footer"></slot>
        </footer>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'submit'): void
}>()
</script>

<style scoped>
.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 28px 16px;
  background-color: #f9fafb;
}

.form-wrap {
  width: 100%;
  max-width: 480px;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.form-header {
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  color: #4b5563;
}

.form-footer {
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
}
</style>