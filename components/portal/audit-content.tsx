"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  Download,
  Filter,
  LogIn,
  ShoppingCart,
  CreditCard,
  Server,
  Key,
  ShieldCheck,
  UserCog,
  Eye,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const auditLogs = [
  {
    id: "LOG001",
    time: "2024-03-15 14:35:00",
    type: "payment",
    action: "订单支付成功",
    detail: "订单 #ORD202403150001 支付完成，金额 ¥5,999",
    ip: "218.76.xxx.xxx",
    authMethod: "网银Key",
    operator: "admin@company.com",
  },
  {
    id: "LOG002",
    time: "2024-03-15 14:32:00",
    type: "auth",
    action: "网银Key认证",
    detail: "完成中信网银Key身份认证",
    ip: "218.76.xxx.xxx",
    authMethod: "网银Key",
    operator: "admin@company.com",
  },
  {
    id: "LOG003",
    time: "2024-03-15 14:30:00",
    type: "order",
    action: "创建订单",
    detail: "创建订单 #ORD202403150001，套餐：GPT-4 企业版",
    ip: "218.76.xxx.xxx",
    authMethod: "密码登录",
    operator: "admin@company.com",
  },
  {
    id: "LOG004",
    time: "2024-03-15 10:20:00",
    type: "service",
    action: "服务开通",
    detail: "GPT-4 企业版服务开通成功",
    ip: "218.76.xxx.xxx",
    authMethod: "系统自动",
    operator: "系统",
  },
  {
    id: "LOG005",
    time: "2024-03-15 09:00:00",
    type: "login",
    action: "用户登录",
    detail: "管理员账号登录系统",
    ip: "218.76.xxx.xxx",
    authMethod: "密码登录",
    operator: "admin@company.com",
  },
  {
    id: "LOG006",
    time: "2024-03-14 16:45:00",
    type: "key",
    action: "密钥重置",
    detail: "重置 API SecretKey（生产环境密钥）",
    ip: "218.76.xxx.xxx",
    authMethod: "网银Key",
    operator: "admin@company.com",
  },
  {
    id: "LOG007",
    time: "2024-03-14 15:30:00",
    type: "account",
    action: "子账号创建",
    detail: "创建子账号 dev@company.com，角色：API调用员",
    ip: "218.76.xxx.xxx",
    authMethod: "密码登录",
    operator: "admin@company.com",
  },
  {
    id: "LOG008",
    time: "2024-03-14 14:00:00",
    type: "login",
    action: "用户登录",
    detail: "管理员账号登录系统",
    ip: "218.76.xxx.xxx",
    authMethod: "密码登录",
    operator: "admin@company.com",
  },
]

const typeConfig = {
  login: {
    label: "登录",
    icon: LogIn,
    color: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  order: {
    label: "订购",
    icon: ShoppingCart,
    color: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },
  payment: {
    label: "支付",
    icon: CreditCard,
    color: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  },
  service: {
    label: "开通服务",
    icon: Server,
    color: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  },
  key: {
    label: "密钥变更",
    icon: Key,
    color: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
  auth: {
    label: "网银Key认证",
    icon: ShieldCheck,
    color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  },
  account: {
    label: "账号管理",
    icon: UserCog,
    color: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },
}

export function AuditContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<typeof auditLogs[0] | null>(null)

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.operator.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || log.type === typeFilter
    return matchesSearch && matchesType
  })

  const handleViewDetail = (log: typeof auditLogs[0]) => {
    setSelectedLog(log)
    setDetailDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">操作审计</h2>
        <p className="text-muted-foreground">查看系统操作日志，全流程留痕可追溯</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              今日操作
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              本月操作
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              网银Key认证
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              关键操作
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>操作日志</CardTitle>
              <CardDescription>所有操作记录均不可删除、可追溯</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索操作..."
                  className="w-64 pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-36">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="操作类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="login">登录</SelectItem>
                  <SelectItem value="order">订购</SelectItem>
                  <SelectItem value="payment">支付</SelectItem>
                  <SelectItem value="service">开通服务</SelectItem>
                  <SelectItem value="key">密钥变更</SelectItem>
                  <SelectItem value="auth">网银Key认证</SelectItem>
                  <SelectItem value="account">账号管理</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                导出
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>操作时间</TableHead>
                <TableHead>操作类型</TableHead>
                <TableHead>操作内容</TableHead>
                <TableHead>IP 地址</TableHead>
                <TableHead>认证方式</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const config = typeConfig[log.type as keyof typeof typeConfig]
                const TypeIcon = config.icon
                return (
                  <TableRow key={log.id}>
                    <TableCell className="text-muted-foreground">
                      {log.time}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`gap-1 ${config.color}`}>
                        <TypeIcon className="h-3 w-3" />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {log.detail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.ip}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={log.authMethod === "网银Key" ? "default" : "secondary"}
                      >
                        {log.authMethod}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetail(log)}
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        详情
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>操作详情</DialogTitle>
            <DialogDescription>审计日志详细信息</DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">日志ID</span>
                  <span className="font-mono">{selectedLog.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">操作时间</span>
                  <span>{selectedLog.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">操作类型</span>
                  <Badge>
                    {typeConfig[selectedLog.type as keyof typeof typeConfig].label}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">操作者</span>
                  <span>{selectedLog.operator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IP 地址</span>
                  <span className="font-mono">{selectedLog.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">认证方式</span>
                  <Badge variant="outline">{selectedLog.authMethod}</Badge>
                </div>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-sm font-medium">操作详情</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedLog.detail}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
