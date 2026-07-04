<template>
  <div class="dashboard-layout">
    <AppSidebar/>
    <main class="content">
      <RouterView/>
    </main>
  </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import AppSidebar from '@/components/layout/AppSidebar.vue'
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
}

.content {
  flex: 1;
  padding: 2rem;
  max-width: calc(100% - 240px);
}
</style>