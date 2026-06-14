<template>
  <div class="app-input-wrap"
       :class=" {
            required,
            large: size === 'large'
  }">
    <label v-if="label" class="app-input-label">{{ label }}</label>
    <input
        class="app-input-field"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        @input="update"
    />
    <slot name="error"></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  size?: 'large' | 'medium' | 'small'
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  size: 'medium',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function update(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
.app-input-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.app-input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

.app-input-field {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.app-input-field:focus {
  outline: none;
  border-color: #2563eb;
}

.large .app-input-field {
  padding: 0.75rem;
  font-size: 1.1rem;
}
</style>