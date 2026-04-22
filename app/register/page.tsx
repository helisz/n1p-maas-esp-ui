"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

interface FormData {
  company: string
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreed: boolean
}

interface FormErrors {
  company?: string
  name?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
  agreed?: string
  general?: string
}

export default function RegisterPage() {
  const router = useRouter()
  const { register, user, isLoading } = useAuth()

  const [form, setForm] = useState<FormData>({
    company: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/")
    }
  }, [user, isLoading, router])

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }))
  }

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!form.company.trim()) errs.company = "请输入企业名称"
    if (!form.name.trim()) errs.name = "请输入联系人姓名"
    if (!form.email.trim()) errs.email = "请输入邮箱"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "邮箱格式不正确"
    if (!form.phone.trim()) errs.phone = "请输入手机号"
    else if (!/^1[3-9]\d{9}$/.test(form.phone)) errs.phone = "手机号格式不正确"
    if (!form.password) errs.password = "请设置密码"
    else if (form.password.length < 6) errs.password = "密码至少 6 位"
    if (!form.confirmPassword) errs.confirmPassword = "请再次输入密码"
    else if (form.password !== form.confirmPassword) errs.confirmPassword = "两次密码不一致"
    if (!form.agreed) errs.agreed = "请阅读并同意服务协议"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    const result = await register({
      company: form.company,
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    })
    setSubmitting(false)

    if (result.success) {
      setSuccess(true)
      setTimeout(() => router.push("/"), 1500)
    } else {
      setErrors({ general: result.error })
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (success) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background">
        <CheckCircle2 className="h-12 w-12 text-foreground" />
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">注册成功</p>
          <p className="mt-1 text-sm text-muted-foreground">正在跳转到控制台...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel */}
      <div className="hidden w-[46%] flex-col justify-between bg-foreground p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background">
            <span className="text-sm font-bold text-foreground">M</span>
          </div>
          <span className="text-base font-semibold text-background">MaaS Portal</span>
        </div>

        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-3xl font-bold leading-snug text-background text-balance">
              加入企业统一服务门户
            </p>
            <p className="text-sm leading-relaxed text-background/60">
              注册企业账号，立即开始使用大模型 API 服务。支持多套餐选购、子账号管理、精细权限控制。
            </p>
          </div>

          <ul className="space-y-2">
            {[
              "免费注册，即刻开通测试配额",
              "支持多种 MaaS 套餐灵活选购",
              "企业级安全，数据隔离可审计",
              "专属售后，7×24 小时技术支持",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-background/60" />
                <span className="text-sm text-background/70">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-background/30">© 2025 MaaS Portal. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
              <span className="text-xs font-bold text-background">M</span>
            </div>
            <span className="text-sm font-semibold text-foreground">MaaS Portal</span>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">创建企业账号</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              填写企业信息完成注册
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Company */}
            <div className="space-y-1.5">
              <Label htmlFor="company" className="text-sm font-medium">
                企业名称 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="company"
                placeholder="请输入企业全称"
                value={form.company}
                onChange={set("company")}
                className={cn(errors.company && "border-destructive")}
              />
              {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium">
                联系人姓名 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="请输入姓名"
                value={form.name}
                onChange={set("name")}
                className={cn(errors.name && "border-destructive")}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="reg-email" className="text-sm font-medium">
                邮箱账号 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="将作为登录账号"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                className={cn(errors.email && "border-destructive")}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm font-medium">
                手机号码 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="请输入手机号"
                value={form.phone}
                onChange={set("phone")}
                className={cn(errors.phone && "border-destructive")}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="reg-password" className="text-sm font-medium">
                设置密码 <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="至少 6 位"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={set("password")}
                  className={cn("pr-10", errors.password && "border-destructive")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password" className="text-sm font-medium">
                确认密码 <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="再次输入密码"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={set("confirmPassword")}
                  className={cn("pr-10", errors.confirmPassword && "border-destructive")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
            </div>

            {/* Agreement */}
            <div className="flex items-start gap-2 pt-0.5">
              <input
                id="agreed"
                type="checkbox"
                checked={form.agreed}
                onChange={set("agreed")}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-border accent-foreground"
              />
              <label htmlFor="agreed" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                我已阅读并同意{" "}
                <button type="button" className="text-foreground underline-offset-2 hover:underline">
                  《服务使用协议》
                </button>{" "}
                和{" "}
                <button type="button" className="text-foreground underline-offset-2 hover:underline">
                  《隐私政策》
                </button>
              </label>
            </div>
            {errors.agreed && <p className="text-xs text-destructive">{errors.agreed}</p>}

            {errors.general && (
              <p className="text-sm text-destructive">{errors.general}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  注册中...
                </>
              ) : (
                "立即注册"
              )}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            已有账号？{" "}
            <Link
              href="/login"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              返回登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
