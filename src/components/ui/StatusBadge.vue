<template>
  <span class="status-badge" :class="published ? 'published' : 'draft'">
    {{ published ? 'Published' : 'Draft' }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  published: boolean
}

defineProps<Props>()
</script>

<style scoped>
.status-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.published {
  background-color: #dcfce7;
  color: #166534;
}

.status-badge.draft {
  background-color: #f3f4f6;
  color: #6b7280;
}
</style>