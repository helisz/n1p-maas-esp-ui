"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const router = useRouter()
  const { login, user, isLoading } = useAuth()

  const [email, setEmail] = useState("admin@example.com")
  const [password, setPassword] = useState("admin123")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/")
    }
  }, [user, isLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError("请输入邮箱账号")
      return
    }
    if (!password) {
      setError("请输入密码")
      return
    }

    setSubmitting(true)
    const result = await login(email.trim(), password)
    setSubmitting(false)

    if (result.success) {
      router.push("/")
    } else {
      setError(result.error ?? "登录失败")
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
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

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-3xl font-bold leading-snug text-background text-balance">
              企业统一服务门户
            </p>
            <p className="text-sm leading-relaxed text-background/60">
              集套餐管理、API 调用、计费审计、子账号权限于一体的企业级 MaaS 服务平台，助力企业安全高效地使用大模型服务。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "MaaS 套餐中心", desc: "灵活选购，按需开通" },
              { label: "API 密钥管理", desc: "安全管控，精细授权" },
              { label: "账单与计费", desc: "透明账单，在线开票" },
              { label: "操作审计", desc: "全程留痕，合规可查" },
            ].map((f) => (
              <div key={f.label} className="rounded-lg border border-background/10 bg-background/5 p-3">
                <p className="text-xs font-medium text-background">{f.label}</p>
                <p className="mt-0.5 text-xs text-background/50">{f.desc}</p>
              </div>
            ))}
          </div>
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

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">欢迎回来</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              登录您的企业账号
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                邮箱账号
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="请输入邮箱"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(error && !password ? "border-destructive" : "")}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  密码
                </Label>
                <button
                  type="button"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  忘记密码？
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
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
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  登录中...
                </>
              ) : (
                "登录"
              )}
            </Button>
          </form>

          <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-muted/40 p-3">
            <ShieldCheck className="h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              演示账号：<span className="font-medium text-foreground">admin@example.com</span> / <span className="font-medium text-foreground">admin123</span>
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            还没有账号？{" "}
            <Link
              href="/register"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              立即注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
