// [AI_START TIMESTAMP=2026-05-04 09:48:00]
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const mobileSidebarOpen = ref(false)

function toggleSidebar() {
  mobileSidebarOpen.value = !mobileSidebarOpen.value
}

function closeSidebar() {
  mobileSidebarOpen.value = false
}

// [AI_START TIMESTAMP=2025-06-17 10:15:00]
watch(
  () => [auth.isLoading, auth.isLoggedIn],
  ([loading, loggedIn]) => {
    if (!loading && !loggedIn) {
      router.replace('/')
    }
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="auth.isLoading || !auth.isLoggedIn" class="flex h-screen items-center justify-center bg-background">
    <ArrowPathIcon class="h-6 w-6 animate-spin text-muted-foreground" />
  </div>
  <div v-else class="flex h-screen overflow-hidden">
    <Sidebar :mobile-open="mobileSidebarOpen" @close="closeSidebar" />
    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <Header @toggle-sidebar="toggleSidebar" />
      <main class="flex-1 overflow-y-auto bg-muted/30 p-4 lg:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
<!-- [AI_END LINES=36 TIMESTAMP=2025-06-15 12:00:00] -->
