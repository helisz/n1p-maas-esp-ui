<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = ref({ company: '', name: '', email: '', phone: '', password: '', confirmPassword: '', agreed: false })
const errors = ref<Record<string, string | undefined>>({})
const showPassword = ref(false)
const showConfirm = ref(false)
const submitting = ref(false)
const success = ref(false)

watch(() => [auth.isLoading, auth.isLoggedIn], ([loading, loggedIn]) => {
  if (!loading && loggedIn) router.replace('/')
}, { immediate: true })

function set(field: keyof typeof form.value) {
  return (e: Event) => {
    const target = e.target as HTMLInputElement
    form.value[field] = target.type === 'checkbox' ? target.checked : target.value
    errors.value = { ...errors.value, [field]: undefined, general: undefined }
  }
}

function validate(): boolean {
  const errs: Record<string, string> = {}
  if (!form.value.company.trim()) errs.company = '请输入企业名称'
  if (!form.value.name.trim()) errs.name = '请输入联系人姓名'
  if (!form.value.email.trim()) errs.email = '请输入邮箱'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) errs.email = '邮箱格式不正确'
  if (!form.value.phone.trim()) errs.phone = '请输入手机号'
  else if (!/^1[3-9]\d{9}$/.test(form.value.phone)) errs.phone = '手机号格式不正确'
  if (!form.value.password) errs.password = '请设置密码'
  else if (form.value.password.length < 6) errs.password = '密码至少 6 位'
  if (!form.value.confirmPassword) errs.confirmPassword = '请再次输入密码'
  else if (form.value.password !== form.value.confirmPassword) errs.confirmPassword = '两次密码不一致'
  if (!form.value.agreed) errs.agreed = '请阅读并同意服务协议'
  errors.value = errs
  return Object.keys(errs).length === 0
}

async function handleSubmit() {
  if (!validate()) return
  submitting.value = true
  const result = await auth.register({ company: form.value.company, name: form.value.name, email: form.value.email, phone: form.value.phone, password: form.value.password })
  submitting.value = false
  if (result.success) {
    success.value = true
    setTimeout(() => router.push('/'), 1500)
  } else {
    errors.value = { general: result.error }
  }
}
</script>

<template>
  <div v-if="auth.isLoading" class="flex h-screen items-center justify-center bg-background"><Loader2 class="h-6 w-6 animate-spin text-muted-foreground" /></div>
  <div v-else-if="success" class="flex h-screen flex-col items-center justify-center gap-4 bg-background">
    <CheckCircle2 class="h-12 w-12 text-foreground" />
    <div class="text-center"><p class="text-lg font-semibold text-foreground">注册成功</p><p class="mt-1 text-sm text-muted-foreground">正在跳转到控制台...</p></div>
  </div>
  <div v-else class="flex min-h-screen bg-background">
    <!-- Left panel -->
    <div class="hidden w-[46%] flex-col justify-between bg-foreground p-12 lg:flex">
      <div class="flex items-center gap-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-background"><span class="text-sm font-bold text-foreground">M</span></div>
        <span class="text-base font-semibold text-background">MaaS Portal</span>
      </div>
      <div class="space-y-5">
        <div class="space-y-3">
          <p class="text-3xl font-bold leading-snug text-background text-balance">加入企业统一服务门户</p>
          <p class="text-sm leading-relaxed text-background/60">注册企业账号，立即开始使用大模型 API 服务。支持多套餐选购、子账号管理、精细权限控制。</p>
        </div>
        <ul class="space-y-2">
          <li v-for="item in ['免费注册，即刻开通测试配额', '支持多种 MaaS 套餐灵活选购', '企业级安全，数据隔离可审计', '专属售后，7×24 小时技术支持']" :key="item" class="flex items-start gap-2">
            <CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-background/60" />
            <span class="text-sm text-background/70">{{ item }}</span>
          </li>
        </ul>
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
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-foreground">创建企业账号</h1>
          <p class="mt-1 text-sm text-muted-foreground">填写企业信息完成注册</p>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-3.5">
          <div class="space-y-1.5">
            <Label for="company" class="text-sm font-medium">企业名称 <span class="text-destructive">*</span></Label>
            <Input id="company" placeholder="请输入企业全称" :model-value="form.company" @input="set('company')" :class="cn(errors.company && 'border-destructive')" />
            <p v-if="errors.company" class="text-xs text-destructive">{{ errors.company }}</p>
          </div>
          <div class="space-y-1.5">
            <Label for="name" class="text-sm font-medium">联系人姓名 <span class="text-destructive">*</span></Label>
            <Input id="name" placeholder="请输入联系人姓名" :model-value="form.name" @input="set('name')" :class="cn(errors.name && 'border-destructive')" />
            <p v-if="errors.name" class="text-xs text-destructive">{{ errors.name }}</p>
          </div>
          <div class="space-y-1.5">
            <Label for="reg-email" class="text-sm font-medium">邮箱 <span class="text-destructive">*</span></Label>
            <Input id="reg-email" type="email" placeholder="请输入邮箱" :model-value="form.email" @input="set('email')" :class="cn(errors.email && 'border-destructive')" />
            <p v-if="errors.email" class="text-xs text-destructive">{{ errors.email }}</p>
          </div>
          <div class="space-y-1.5">
            <Label for="phone" class="text-sm font-medium">手机号 <span class="text-destructive">*</span></Label>
            <Input id="phone" placeholder="请输入手机号" :model-value="form.phone" @input="set('phone')" :class="cn(errors.phone && 'border-destructive')" />
            <p v-if="errors.phone" class="text-xs text-destructive">{{ errors.phone }}</p>
          </div>
          <div class="space-y-1.5">
            <Label for="reg-password" class="text-sm font-medium">密码 <span class="text-destructive">*</span></Label>
            <div class="relative">
              <Input id="reg-password" :type="showPassword ? 'text' : 'password'" placeholder="请设置密码" :model-value="form.password" @input="set('password')" :class="cn(errors.password && 'border-destructive', 'pr-10')" />
              <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" tabindex="-1">
                <EyeOff v-if="showPassword" class="h-4 w-4" /><Eye v-else class="h-4 w-4" />
              </button>
            </div>
            <p v-if="errors.password" class="text-xs text-destructive">{{ errors.password }}</p>
          </div>
          <div class="space-y-1.5">
            <Label for="confirmPassword" class="text-sm font-medium">确认密码 <span class="text-destructive">*</span></Label>
            <div class="relative">
              <Input id="confirmPassword" :type="showConfirm ? 'text' : 'password'" placeholder="请再次输入密码" :model-value="form.confirmPassword" @input="set('confirmPassword')" :class="cn(errors.confirmPassword && 'border-destructive', 'pr-10')" />
              <button type="button" @click="showConfirm = !showConfirm" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" tabindex="-1">
                <EyeOff v-if="showConfirm" class="h-4 w-4" /><Eye v-else class="h-4 w-4" />
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="text-xs text-destructive">{{ errors.confirmPassword }}</p>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="agreed" :checked="form.agreed" @change="set('agreed')" class="rounded" />
            <Label for="agreed" class="text-sm">我已阅读并同意 <span class="text-primary cursor-pointer">服务协议</span></Label>
          </div>
          <p v-if="errors.agreed" class="text-xs text-destructive">{{ errors.agreed }}</p>
          <p v-if="errors.general" class="text-sm text-destructive">{{ errors.general }}</p>
          <Button type="submit" class="w-full" :disabled="submitting">
            <template v-if="submitting"><Loader2 class="mr-2 h-4 w-4 animate-spin" />注册中...</template>
            <template v-else>注册</template>
          </Button>
        </form>
        <p class="mt-6 text-center text-sm text-muted-foreground">
          已有账号？<router-link to="/login" class="font-medium text-foreground underline-offset-4 hover:underline">立即登录</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<!-- [AI_END LINES=128 TIMESTAMP=2025-06-15 12:00:00] -->
