<template>
  <div class="auth-layout">
    <div class="auth-card">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
`
<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #111827;
}

.auth-card {
  background: rgb(255, 255, 255);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}
</style>
