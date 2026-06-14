<template>
  <button
      class="app-btn"
      :class="{
      large: size === 'large',
      medium: size === 'medium',
      small: size === 'small',
    }"
      :type="type"
      :disabled="disabled || loading"
      @click="emit('click')"
  >
    <span v-if="loading" class="btn-spinner"></span>
    {{ loading ? loadingLabel : label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string
  loadingLabel?: string
  loading?: boolean
  disabled?: boolean
  size?: 'large' | 'medium' | 'small'
  type?: 'button' | 'submit' | 'reset'
}

withDefaults(defineProps<Props>(), {
  loadingLabel: 'Loading...',
  loading: false,
  disabled: false,
  size: 'medium',
  type: 'submit',
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.app-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;
}

.app-btn:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.app-btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.app-btn.large {
  padding: 0.875rem;
  font-size: 1.1rem;
}

.app-btn.small {
  padding: 0.5rem;
  font-size: 0.875rem;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
