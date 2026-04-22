"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Server,
  Activity,
  Receipt,
  Clock,
  ArrowRight,
  Key,
  FileText,
  TrendingUp,
  ShieldCheck,
} from "lucide-react"

const stats = [
  {
    title: "已开通服务",
    value: "5",
    unit: "个",
    icon: Server,
    change: "+2",
    changeLabel: "本月新增",
  },
  {
    title: "本月API调用",
    value: "128,456",
    unit: "次",
    icon: Activity,
    change: "+12.5%",
    changeLabel: "较上月",
  },
  {
    title: "待支付订单",
    value: "2",
    unit: "笔",
    icon: Receipt,
    change: "¥3,600",
    changeLabel: "待付金额",
  },
  {
    title: "即将到期套餐",
    value: "1",
    unit: "个",
    icon: Clock,
    change: "15天后",
    changeLabel: "到期",
  },
]

const quickActions = [
  {
    title: "订购套餐",
    description: "浏览并购买 MaaS 服务套餐",
    icon: Server,
    href: "/packages",
  },
  {
    title: "查看 API 密钥",
    description: "管理您的 API 访问凭证",
    icon: Key,
    href: "/services",
  },
  {
    title: "查看账单",
    description: "查看账单详情和支付记录",
    icon: FileText,
    href: "/billing",
  },
]

const recentActivities = [
  {
    type: "service",
    title: "GPT-4 API 服务开通成功",
    time: "10分钟前",
    status: "success",
  },
  {
    type: "payment",
    title: "订单 #ORD202403150001 支付成功",
    time: "2小时前",
    status: "success",
  },
  {
    type: "auth",
    title: "网银Key认证完成",
    time: "2小时前",
    status: "success",
  },
  {
    type: "order",
    title: "创建订单 #ORD202403150002",
    time: "3小时前",
    status: "pending",
  },
  {
    type: "login",
    title: "管理员登录系统",
    time: "昨天 14:30",
    status: "info",
  },
]

const activePackages = [
  {
    name: "GPT-4 企业版",
    status: "active",
    usage: 45,
    expiry: "2024-06-15",
  },
  {
    name: "Claude 基础版",
    status: "active",
    usage: 78,
    expiry: "2024-05-20",
  },
  {
    name: "Embedding 旗舰版",
    status: "expiring",
    usage: 92,
    expiry: "2024-04-01",
  },
]

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            欢迎回来，中科云数科技
          </h2>
          <p className="text-muted-foreground">
            以下是您的服务概览和最新动态
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <ShieldCheck className="h-3 w-3" />
            已认证企业
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.unit}</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">{stat.change}</span>
                <span>{stat.changeLabel}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>快捷入口</CardTitle>
            <CardDescription>常用功能快速访问</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                className="flex h-auto w-full items-center justify-between p-4"
                asChild
              >
                <a href={action.href}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <action.icon className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Active Packages */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>我的套餐</CardTitle>
            <CardDescription>当前已开通的服务套餐</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activePackages.map((pkg) => (
              <div
                key={pkg.name}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{pkg.name}</span>
                    {pkg.status === "expiring" && (
                      <Badge variant="destructive" className="text-xs">
                        即将到期
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    到期日期：{pkg.expiry}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{pkg.usage}%</div>
                  <div className="text-xs text-muted-foreground">已用额度</div>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-sm" asChild>
              <a href="/services">
                查看全部套餐
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>最近动态</CardTitle>
            <CardDescription>系统操作记录</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm leading-tight">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="mt-4 w-full text-sm" asChild>
              <a href="/audit">
                查看全部记录
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
