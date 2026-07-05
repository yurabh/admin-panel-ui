<template>
  <div class="empty-state">
    <slot></slot>
  </div>
</template>

<style scoped>
.empty-state {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 3rem;
  text-align: center;
  color: #6b7280;
}
</style>