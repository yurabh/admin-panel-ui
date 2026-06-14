<template>
  <div class="auth-layout">
    <div class="auth-card">
      <RouterView/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
</script>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(17, 17, 39, 0.32);
}
</style>
