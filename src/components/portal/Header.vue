// [AI_START TIMESTAMP=2026-05-04 09:48:00]
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { BellIcon, QuestionMarkCircleIcon, ArrowRightOnRectangleIcon, ChevronDownIcon, UserIcon, Cog6ToothIcon, Bars3Icon, PhoneIcon } from '@heroicons/vue/24/outline';
import ContactForm from '@/components/portal/ContactForm.vue';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const auth = useAuthStore();

const emit = defineEmits<{
  toggleSidebar: [];
}>();

const showContact = ref(false);

// [AI_START TIMESTAMP=2025-06-17 10:15:00]
function handleLogout() {
  auth.logout();
  router.push('/');
}

const initials = auth.user?.name?.charAt(0) ?? '企';
</script>

<template>
  <header class="border-border bg-background flex h-14 items-center justify-between border-b px-4 lg:px-6">
    <div class="flex items-center gap-2">
      <!-- Hamburger menu for mobile -->
      <Button variant="ghost" size="icon" class="lg:hidden" @click="emit('toggleSidebar')">
        <Bars3Icon class="h-5 w-5" />
      </Button>
      <h1 class="text-foreground text-lg font-semibold"></h1>
    </div>

    <div class="flex items-center gap-1 lg:gap-2">
      <!-- Notifications -->
      <Button variant="ghost" size="icon" class="relative">
        <BellIcon class="h-4 w-4" />
        <Badge class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px] leading-none"> 3 </Badge>
      </Button>

      <!-- Help -->
      <Button variant="ghost" size="icon" class="hidden sm:flex">
        <QuestionMarkCircleIcon class="h-4 w-4" />
      </Button>

      <!-- User Menu -->
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" class="flex items-center gap-2 px-2">
            <Avatar size="sm">
              <AvatarFallback class="bg-primary text-primary-foreground text-xs">
                {{ initials }}
              </AvatarFallback>
            </Avatar>
            <div class="hidden flex-col items-start text-xs sm:flex">
              <span class="font-medium">{{ auth.user?.company ?? '企业账号' }}</span>
              <span class="text-muted-foreground">{{ auth.user?.role ?? '管理员' }}</span>
            </div>
            <ChevronDownIcon class="text-muted-foreground h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-48">
          <div class="px-2 py-1.5">
            <p class="text-foreground text-xs font-medium">
              {{ auth.user?.name }}
            </p>
            <p class="text-muted-foreground truncate text-xs">
              {{ auth.user?.email ?? '' }}
            </p>
          </div>
          <DropdownMenuSeparator />
          <!-- [AI_START TIMESTAMP=2025-07-15 06:00:00] -->
          <DropdownMenuItem @click="router.push('/profile')">
            <UserIcon class="mr-2 h-4 w-4" />
            <span>个人中心</span>
          </DropdownMenuItem>
          <!-- [AI_END LINES=4 TIMESTAMP=2025-07-15 06:00:00] -->
          <DropdownMenuItem @click="router.push('/profile')">
            <Cog6ToothIcon class="mr-2 h-4 w-4" />
            <span>账号设置</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-destructive focus:text-destructive" @click="handleLogout">
            <ArrowRightOnRectangleIcon class="mr-2 h-4 w-4" />
            <span>退出登录</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
<!-- [AI_END LINES=80 TIMESTAMP=2025-06-15 12:00:00] -->
