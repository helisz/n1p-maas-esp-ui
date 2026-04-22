"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Key,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Activity,
  TrendingUp,
  Clock,
  Server,
} from "lucide-react"

const myPackages = [
  {
    id: "pkg-001",
    name: "GPT-4 企业版",
    status: "active",
    startDate: "2024-03-15",
    endDate: "2024-06-15",
    usedCalls: 89456,
    totalCalls: 200000,
    apiEndpoint: "https://api.maas-portal.com/v1/gpt4",
  },
  {
    id: "pkg-002",
    name: "Embedding 基础版",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    usedCalls: 78000,
    totalCalls: 100000,
    apiEndpoint: "https://api.maas-portal.com/v1/embedding",
  },
  {
    id: "pkg-003",
    name: "Claude 基础版",
    status: "expiring",
    startDate: "2024-01-15",
    endDate: "2024-04-01",
    usedCalls: 45000,
    totalCalls: 50000,
    apiEndpoint: "https://api.maas-portal.com/v1/claude",
  },
]

const apiKeys = [
  {
    id: "key-001",
    name: "生产环境密钥",
    accessKey: "ak_prod_xxxxxxxxxxxx1234",
    secretKey: "sk_prod_xxxxxxxxxxxxxxxxxxxxxxxx5678",
    createdAt: "2024-03-15 10:30:00",
    status: "active",
  },
  {
    id: "key-002",
    name: "测试环境密钥",
    accessKey: "ak_test_xxxxxxxxxxxx9876",
    secretKey: "sk_test_xxxxxxxxxxxxxxxxxxxxxxxx4321",
    createdAt: "2024-03-10 14:20:00",
    status: "active",
  },
]

const apiCallStats = [
  { date: "03-10", calls: 4500 },
  { date: "03-11", calls: 5200 },
  { date: "03-12", calls: 4800 },
  { date: "03-13", calls: 6100 },
  { date: "03-14", calls: 5500 },
  { date: "03-15", calls: 7200 },
  { date: "03-16", calls: 6800 },
]

const errorLogs = [
  {
    time: "2024-03-15 14:32:15",
    api: "/v1/gpt4/completions",
    error: "Rate limit exceeded",
    code: 429,
  },
  {
    time: "2024-03-15 12:15:30",
    api: "/v1/embedding/create",
    error: "Invalid input format",
    code: 400,
  },
  {
    time: "2024-03-14 18:45:00",
    api: "/v1/gpt4/completions",
    error: "Token limit exceeded",
    code: 400,
  },
]

export function ServicesContent() {
  const [showSecretKey, setShowSecretKey] = useState<string | null>(null)
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState<typeof apiKeys[0] | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleResetKey = (key: typeof apiKeys[0]) => {
    setSelectedKey(key)
    setResetDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">服务管理</h2>
        <p className="text-muted-foreground">管理您的套餐、API密钥和调用监控</p>
      </div>

      <Tabs defaultValue="packages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="packages">我的套餐</TabsTrigger>
          <TabsTrigger value="keys">API 密钥</TabsTrigger>
          <TabsTrigger value="monitor">调用监控</TabsTrigger>
        </TabsList>

        {/* Packages Tab */}
        <TabsContent value="packages" className="space-y-4">
          <div className="grid gap-4">
            {myPackages.map((pkg) => {
              const usagePercent = Math.round((pkg.usedCalls / pkg.totalCalls) * 100)
              return (
                <Card key={pkg.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <Server className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{pkg.name}</CardTitle>
                          <CardDescription>
                            有效期：{pkg.startDate} 至 {pkg.endDate}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={
                          pkg.status === "active"
                            ? "default"
                            : pkg.status === "expiring"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {pkg.status === "active"
                          ? "运行中"
                          : pkg.status === "expiring"
                            ? "即将到期"
                            : "已过期"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">API 调用额度</span>
                        <span>
                          {pkg.usedCalls.toLocaleString()} / {pkg.totalCalls.toLocaleString()} 次
                        </span>
                      </div>
                      <Progress
                        value={usagePercent}
                        className={
                          usagePercent > 90
                            ? "[&>div]:bg-destructive"
                            : usagePercent > 70
                              ? "[&>div]:bg-yellow-500"
                              : ""
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        已使用 {usagePercent}%，剩余 {(pkg.totalCalls - pkg.usedCalls).toLocaleString()} 次
                      </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                      <span className="text-sm text-muted-foreground">API 端点：</span>
                      <code className="flex-1 text-sm">{pkg.apiEndpoint}</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(pkg.apiEndpoint)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        查看文档
                      </Button>
                      <Button variant="outline" size="sm">
                        在线调试
                      </Button>
                      {pkg.status === "expiring" && (
                        <Button size="sm">立即续费</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="keys" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API 密钥管理</CardTitle>
                  <CardDescription>
                    用于 API 接口调用的访问凭证
                  </CardDescription>
                </div>
                <Button>
                  <Key className="mr-2 h-4 w-4" />
                  创建密钥
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名称</TableHead>
                    <TableHead>AccessKey</TableHead>
                    <TableHead>SecretKey</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-sm">{key.accessKey}</code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(key.accessKey)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-sm">
                            {showSecretKey === key.id
                              ? key.secretKey
                              : "••••••••••••••••••••••••"}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              setShowSecretKey(
                                showSecretKey === key.id ? null : key.id
                              )
                            }
                          >
                            {showSecretKey === key.id ? (
                              <EyeOff className="h-3 w-3" />
                            ) : (
                              <Eye className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(key.secretKey)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {key.createdAt}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          正常
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResetKey(key)}
                        >
                          <RefreshCw className="mr-1 h-3 w-3" />
                          重置
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitor Tab */}
        <TabsContent value="monitor" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  今日调用量
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">6,842</span>
                  <span className="flex items-center text-sm text-green-500">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +12%
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  本月调用量
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">128,456</span>
                  <span className="text-sm text-muted-foreground">次</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  平均响应时间
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">245</span>
                  <span className="text-sm text-muted-foreground">ms</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>调用趋势</CardTitle>
              <CardDescription>最近 7 天 API 调用统计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-end gap-2">
                {apiCallStats.map((stat, index) => {
                  const maxCalls = Math.max(...apiCallStats.map((s) => s.calls))
                  const height = (stat.calls / maxCalls) * 100
                  return (
                    <div
                      key={index}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <div className="relative w-full">
                        <div
                          className="w-full rounded-t bg-primary transition-all hover:bg-primary/80"
                          style={{ height: `${height * 1.5}px` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {stat.date}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Error Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                异常记录
              </CardTitle>
              <CardDescription>最近的 API 调用错误</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>时间</TableHead>
                    <TableHead>API 接口</TableHead>
                    <TableHead>错误信息</TableHead>
                    <TableHead>状态码</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-muted-foreground">
                        {log.time}
                      </TableCell>
                      <TableCell>
                        <code className="text-sm">{log.api}</code>
                      </TableCell>
                      <TableCell>{log.error}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {log.code}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reset Key Dialog */}
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>重置 SecretKey</DialogTitle>
            <DialogDescription>
              重置后原密钥将立即失效，请确保更新所有使用该密钥的应用
            </DialogDescription>
          </DialogHeader>
          {selectedKey && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    警告：此操作不可逆
                  </p>
                  <p className="mt-1 text-yellow-700 dark:text-yellow-300">
                    密钥 &quot;{selectedKey.name}&quot; 重置后，使用旧密钥的所有请求将被拒绝。
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={() => setResetDialogOpen(false)}>
              确认重置
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
