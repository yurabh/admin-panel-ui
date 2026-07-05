<template>
  <div>
    <PageHeader :title="`Welcome back, ${authStore.user?.name}`"
                subtitle="Here's what's happening with your content."/>

    <StatsGrid>
      <StatCard label="Posts" :value="postsCount" :to="{ name: 'posts' }"/>
<!--      <StatCard label="Categories" :value="categoriesCount" :to="{ name: 'categories' }"/>-->
<!--      <StatCard label="Tags" value="—" :to="{ name: 'tags' }"/>-->
<!--      <StatCard label="Comments" value="—" :to="{ name: 'comments' }"/>-->
    </StatsGrid>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from '@/stores/auth'
import {useDashboardStats} from '@/composables/useDashboardStats'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatsGrid from '@/components/dashboard/StatsGrid.vue'
import StatCard from '@/components/dashboard/StatCard.vue'

const authStore = useAuthStore()
const {postsCount, categoriesCount} = useDashboardStats()
</script>