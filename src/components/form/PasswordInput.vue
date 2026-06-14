<template>
  <div class="password-wrap">
    <AppInput
        :model-value="modelValue"
        :label="label"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="placeholder"
        :required="required"
        :size="size"
        @update:model-value="emit('update:modelValue', $event)"
    />
    <button
        type="button"
        class="toggle-btn"
        @click="showPassword = !showPassword"
    >
      {{ showPassword ? 'Hide' : 'Show' }}
    </button>
    <slot name="error"></slot>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import AppInput from './AppInput.vue'

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  required?: boolean
  size?: 'large' | 'medium' | 'small'
}

withDefaults(defineProps<Props>(), {
  required: false,
  size: 'medium',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const showPassword = ref(false)
</script>

<style scoped>
.password-wrap {
  position: relative;
}

.toggle-btn {
  position: absolute;
  right: 10px;
  top: 38px;
  background: none;
  border: none;
  color: rgba(116, 235, 37, 0.99);
  cursor: pointer;
  font-size: 0.8rem;
}
</style>