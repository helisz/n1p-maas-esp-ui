<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('admin@example.com')
const password = ref('admin123')
const showPassword = ref(false)
const error = ref('')
const submitting = ref(false)

watch(() => [auth.isLoading, auth.isLoggedIn], ([loading, loggedIn]) => {
  if (!loading && loggedIn) {
    router.replace('/')
  }
}, { immediate: true })

async function handleSubmit() {
  error.value = ''
  if (!email.value.trim()) { error.value = '请输入邮箱账号'; return }
  if (!password.value) { error.value = '请输入密码'; return }

  submitting.value = true
  const result = await auth.login(email.value.trim(), password.value)
  submitting.value = false

  if (result.success) {
    router.push('/')
  } else {
    error.value = result.error ?? '登录失败'
  }
}
</script>

<template>
  <div v-if="auth.isLoading" class="flex h-screen items-center justify-center bg-background">
    <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
  </div>
  <div v-else class="flex min-h-screen bg-background">
    <!-- Left panel -->
    <div class="hidden w-[46%] flex-col justify-between bg-foreground p-12 lg:flex">
      <div class="flex items-center gap-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-background">
          <span class="text-sm font-bold text-foreground">M</span>
        </div>
        <span class="text-base font-semibold text-background">MaaS Portal</span>
      </div>
      <div class="space-y-6">
        <div class="space-y-3">
          <p class="text-3xl font-bold leading-snug text-background text-balance">企业统一服务门户</p>
          <p class="text-sm leading-relaxed text-background/60">集成套餐管理、API 调用、计费审计、子账号权限于一体的企业级 MaaS 服务平台，助力企业安全高效地使用大模型服务。</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="f in [{ label: 'MaaS 套餐中心', desc: '灵活选购，按需开通' }, { label: 'API 密钥管理', desc: '安全管控，精细授权' }, { label: '账单与计费', desc: '透明账单，在线开票' }, { label: '操作审计', desc: '全程留痕，合规可查' }]" :key="f.label" class="rounded-lg border border-background/10 bg-background/5 p-3">
            <p class="text-xs font-medium text-background">{{ f.label }}</p>
            <p class="mt-0.5 text-xs text-background/50">{{ f.desc }}</p>
          </div>
        </div>
      </div>
      <p class="text-xs text-background/30">© 2025 MaaS Portal. All rights reserved.</p>
    </div>

    <!-- Right panel -->
    <div class="flex flex-1 items-center justify-center px-6 py-12">
      <div class="w-full max-w-sm">
        <div class="mb-8 flex items-center gap-2 lg:hidden">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground"><span class="text-xs font-bold text-background">M</span></div>
          <span class="text-sm font-semibold text-foreground">MaaS Portal</span>
        </div>
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-foreground">欢迎回来</h1>
          <p class="mt-1 text-sm text-muted-foreground">登录您的企业账号</p>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-1.5">
            <Label for="email" class="text-sm font-medium">邮箱账号</Label>
            <Input id="email" type="email" v-model="email" placeholder="请输入邮箱" autocomplete="email" :class="cn(error && !password ? 'border-destructive' : '')" />
          </div>
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <Label for="password" class="text-sm font-medium">密码</Label>
              <button type="button" class="text-xs text-muted-foreground hover:text-foreground transition-colors">忘记密码？</button>
            </div>
            <div class="relative">
              <Input id="password" :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="请输入密码" autocomplete="current-password" class="pr-10" />
              <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabindex="-1">
                <EyeOff v-if="showPassword" class="h-4 w-4" /><Eye v-else class="h-4 w-4" />
              </button>
            </div>
          </div>
          <p v-if="error" class="text-sm text-destructive">{{ error }}</p>
          <Button type="submit" class="w-full" :disabled="submitting">
            <template v-if="submitting"><Loader2 class="mr-2 h-4 w-4 animate-spin" />登录中...</template>
            <template v-else>登录</template>
          </Button>
        </form>
        <div class="mt-6 flex items-center gap-2 rounded-lg border border-border bg-muted/40 p-3">
          <ShieldCheck class="h-4 w-4 shrink-0 text-muted-foreground" />
          <p class="text-xs text-muted-foreground">演示账号：<span class="font-medium text-foreground">admin@example.com</span> / <span class="font-medium text-foreground">admin123</span></p>
        </div>
        <p class="mt-6 text-center text-sm text-muted-foreground">
          还没有账号？<router-link to="/register" class="font-medium text-foreground underline-offset-4 hover:underline">立即注册</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<!-- [AI_END LINES=89 TIMESTAMP=2025-06-15 12:00:00] -->
