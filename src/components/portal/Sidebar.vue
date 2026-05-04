// [AI_START TIMESTAMP=2026-05-04 09:47:00]
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import {
  Squares2X2Icon,
  CubeIcon,
  ShoppingCartIcon,
  ServerIcon,
  CpuChipIcon,
  WalletIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
  UsersIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import Input from '@/components/ui/Input.vue'

const route = useRoute()
const router = useRouter()
const collapsed = ref(false)

const props = withDefaults(defineProps<{
  mobileOpen?: boolean
}>(), {
  mobileOpen: false,
})

const emit = defineEmits<{
  close: []
}>()

// Close sidebar on route change for mobile
watch(() => route.path, () => {
  emit('close')
})
const menuGroups = [
  {
// [AI_START TIMESTAMP=2025-06-17 10:15:00]
    items: [
      { title: '控制台首页', href: '/dashboard', icon: Squares2X2Icon },
    ],
  },
  {
    label: '服务',
    items: [
      { title: '服务订购', href: '/packages', icon: CubeIcon },
      { title: '模型广场', href: '/models', icon: CpuChipIcon },
      { title: '我的订单', href: '/orders', icon: ShoppingCartIcon },
      { title: '服务管理', href: '/services', icon: ServerIcon },
    ],
  },
  {
    label: '费用',
    items: [
      { title: '智信钱包', href: '/wallet', icon: WalletIcon },
      { title: '账单与计费', href: '/billing', icon: ClipboardDocumentListIcon },
    ],
  },
  {
    label: '管理',
    items: [
      { title: '企业信息管理', href: '/enterprise', icon: BuildingOffice2Icon },
      { title: '子账号与权限', href: '/accounts', icon: UsersIcon },
      { title: '操作审计', href: '/audit', icon: DocumentTextIcon },
    ],
  },
]

function navigate(href: string) {
  router.push(href)
}
</script>

<template>
  <!-- Mobile overlay backdrop -->
  <Transition name="sidebar-fade">
    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="emit('close')"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    :class="cn(
      'flex h-screen flex-col border-border bg-background transition-all duration-300',
      // Desktop: normal sidebar
      'fixed lg:static z-50',
      // Mobile: drawer that slides in/out
      mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      collapsed ? 'w-16' : 'w-60'
    )"
  >
    <!-- Logo + Close button -->
    <div class="flex h-14 items-center justify-between border-b border-border px-4">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 rounded-lg">
          <rect width="32" height="32" rx="8" fill="#18181B"/>
          <path d="M16 7L7 12.5l9 5.5 9-5.5z" fill="#fff" opacity="0.95"/>
          <path d="M7 16.5l9 5.5 9-5.5" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.55" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 20l9 5.5 9-5.5" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span v-if="!collapsed" class="text-sm font-semibold text-foreground whitespace-nowrap">智信MaaS服务管理平台</span>
      </div>
      <!-- Mobile close button -->
      <button
        v-if="!collapsed"
        class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
        @click="emit('close')"
      >
        <XMarkIcon class="h-4 w-4" />
      </button>
    </div>

    <!-- Search -->
    <div v-if="!collapsed" class="border-r bg-sidebar p-3">
      <div class="relative">
        <MagnifyingGlassIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="搜索..." class="h-9 pl-8 text-sm bg-muted/50 border-0" />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-1 overflow-y-auto bg-sidebar border-r px-3 py-2">
      <template v-for="(group, gi) in menuGroups" :key="gi">
        <div v-if="group.label && !collapsed" class="pt-4 pb-1 px-3 text-[12px] uppercase tracking-wider text-muted-foreground/50">
          {{ group.label }}
        </div>
        <div v-if="group.label && collapsed" class="my-2 mx-2 border-t border-border" />
        <button
          v-for="item in group.items"
          :key="item.href"
          @click="navigate(item.href)"
          :class="cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
            route.path === item.href
              ? 'bg-accent text-accent-foreground font-medium'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )"
        >
          <component :is="item.icon" class="h-4 w-4 shrink-0" />
          <span v-if="!collapsed">{{ item.title }}</span>
        </button>
      </template>
    </nav>

    <!-- Collapse Button -->
    <div class="border-t border-border border-r bg-sidebar p-3">
      <button
        @click="collapsed = !collapsed"
        class="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <ChevronLeftIcon
          :class="cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')"
        />
        <span v-if="!collapsed">收起菜单</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.2s ease;
}
.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}
</style>
<!-- [AI_END LINES=84 TIMESTAMP=2025-06-15 12:00:00] -->
