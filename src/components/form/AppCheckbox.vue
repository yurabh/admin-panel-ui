<template>
  <label class="app-checkbox-label">
    <input
        type="checkbox"
        :checked="modelValue"
        @change="update"
    />
    {{ label }}
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  label: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function update(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>

<style scoped>
.app-checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #374151;
  cursor: pointer;
}
</style>