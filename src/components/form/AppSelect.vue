<template>
  <div class="app-select-wrap">
    <label v-if="label" class="app-select-label">{{ label }}</label>
    <select class="app-select-field" :value="modelValue" @change="update">
      <slot></slot>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: number | string | null
  label?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function update(event: Event): void {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<style scoped>
.app-select-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.app-select-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

.app-select-field {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  background: white;
  box-sizing: border-box;
}

.app-select-field:focus {
  outline: none;
  border-color: #2563eb;
}
</style>