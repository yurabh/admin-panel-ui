<template>
  <div class="app-textarea-wrap">
    <label v-if="label" class="app-textarea-label">{{ label }}</label>
    <textarea
        class="app-textarea-field"
        :value="modelValue"
        :rows="rows"
        :required="required"
        @input="update"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  rows?: number
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  rows: 6,
  required: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function update(event: Event): void {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}
</script>

<style scoped>
.app-textarea-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.app-textarea-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

.app-textarea-field {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
}

.app-textarea-field:focus {
  outline: none;
  border-color: #2563eb;
}
</style>