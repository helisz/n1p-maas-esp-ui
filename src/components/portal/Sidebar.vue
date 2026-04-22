<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Server,
  Wallet,
  Receipt,
  FileText,
  Building2,
  Users,
  ChevronLeft,
  Search,
} from 'lucide-vue-next'
import Input from '@/components/ui/Input.vue'

const route = useRoute()
const router = useRouter()
const collapsed = ref(false)

const menuItems = [
  { title: '控制台首页', href: '/', icon: LayoutDashboard },
  { title: 'MaaS 套餐中心', href: '/packages', icon: Package },
  { title: '我的订单', href: '/orders', icon: ShoppingCart },
  { title: '服务管理', href: '/services', icon: Server },
  { title: '智信钱包', href: '/wallet', icon: Wallet },
  { title: '账单与计费', href: '/billing', icon: Receipt },
  { title: '操作审计', href: '/audit', icon: FileText },
  { title: '企业信息管理', href: '/enterprise', icon: Building2 },
  { title: '子账号与权限', href: '/accounts', icon: Users },
]

function navigate(href: string) {
  router.push(href)
}
</script>

<template>
  <aside
    :class="cn(
      'flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300',
      collapsed ? 'w-16' : 'w-60'
    )"
  >
    <!-- Logo -->
    <div class="flex h-14 items-center border-b border-border px-4">
      <div class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
          <span class="text-sm font-bold text-background">M</span>
        </div>
        <span v-if="!collapsed" class="text-sm font-semibold text-foreground">MaaS Portal</span>
      </div>
    </div>

    <!-- Search -->
    <div v-if="!collapsed" class="p-3">
      <div class="relative">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="搜索..." class="h-9 pl-8 text-sm bg-muted/50 border-0" />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-2">
      <button
        v-for="item in menuItems"
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
    </nav>

    <!-- Collapse Button -->
    <div class="border-t border-border p-3">
      <button
        @click="collapsed = !collapsed"
        class="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <ChevronLeft
          :class="cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')"
        />
        <span v-if="!collapsed">收起菜单</span>
      </button>
    </div>
  </aside>
</template>
<!-- [AI_END LINES=84 TIMESTAMP=2025-06-15 12:00:00] -->
