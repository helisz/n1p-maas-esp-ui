"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Server,
  Receipt,
  FileText,
  Building2,
  Users,
  ChevronLeft,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"

const menuItems = [
  {
    title: "控制台首页",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "MaaS 套餐中心",
    href: "/packages",
    icon: Package,
  },
  {
    title: "我的订单",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "服务管理",
    href: "/services",
    icon: Server,
  },
  {
    title: "账单与计费",
    href: "/billing",
    icon: Receipt,
  },
  {
    title: "操作审计",
    href: "/audit",
    icon: FileText,
  },
  {
    title: "企业信息管理",
    href: "/enterprise",
    icon: Building2,
  },
  {
    title: "子账号与权限",
    href: "/accounts",
    icon: Users,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
            <span className="text-sm font-bold text-background">M</span>
          </div>
          {!collapsed && (
            <span className="text-sm font-semibold text-foreground">MaaS Portal</span>
          )}
        </div>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索..."
              className="h-9 pl-8 text-sm bg-muted/50 border-0"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Button */}
      <div className="border-t border-border p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
          {!collapsed && <span>收起菜单</span>}
        </button>
      </div>
    </aside>
  )
}
