"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  CreditCard,
  X,
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react"

const orders = [
  {
    id: "ORD202403150001",
    packageName: "GPT-4 企业版",
    amount: 5999,
    status: "paid",
    createdAt: "2024-03-15 14:30:00",
    paidAt: "2024-03-15 14:35:00",
  },
  {
    id: "ORD202403150002",
    packageName: "Embedding 基础版",
    amount: 999,
    status: "pending",
    createdAt: "2024-03-15 10:20:00",
    paidAt: null,
  },
  {
    id: "ORD202403140003",
    packageName: "视觉 API 企业版",
    amount: 4999,
    status: "pending",
    createdAt: "2024-03-14 16:45:00",
    paidAt: null,
  },
  {
    id: "ORD202403130004",
    packageName: "GPT-4 基础版",
    amount: 1999,
    status: "paid",
    createdAt: "2024-03-13 09:15:00",
    paidAt: "2024-03-13 09:20:00",
  },
  {
    id: "ORD202403120005",
    packageName: "Claude 旗舰版",
    amount: 19999,
    status: "cancelled",
    createdAt: "2024-03-12 11:30:00",
    paidAt: null,
  },
  {
    id: "ORD202403100006",
    packageName: "GPT-4 企业版",
    amount: 5999,
    status: "paid",
    createdAt: "2024-03-10 15:00:00",
    paidAt: "2024-03-10 15:05:00",
  },
]

const statusConfig = {
  pending: {
    label: "待支付",
    variant: "outline" as const,
    icon: Clock,
    color: "text-yellow-600",
  },
  paid: {
    label: "已支付",
    variant: "default" as const,
    icon: CheckCircle2,
    color: "text-green-600",
  },
  cancelled: {
    label: "已取消",
    variant: "secondary" as const,
    icon: XCircle,
    color: "text-muted-foreground",
  },
}

export function OrdersContent() {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.packageName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePay = (order: typeof orders[0]) => {
    setSelectedOrder(order)
    setPaymentDialogOpen(true)
  }

  const handleViewDetail = (order: typeof orders[0]) => {
    setSelectedOrder(order)
    setDetailDialogOpen(true)
  }

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    paid: orders.filter((o) => o.status === "paid").length,
    totalAmount: orders
      .filter((o) => o.status === "paid")
      .reduce((acc, o) => acc + o.amount, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">我的订单</h2>
        <p className="text-muted-foreground">管理您的套餐订购订单</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              全部订单
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              待支付
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              已支付
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.paid}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              累计支付
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ¥{stats.totalAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>订单列表</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索订单..."
                  className="w-64 pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>订单号</TableHead>
                <TableHead>套餐名称</TableHead>
                <TableHead>金额</TableHead>
                <TableHead>支付状态</TableHead>
                <TableHead>下单时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const config = statusConfig[order.status as keyof typeof statusConfig]
                const StatusIcon = config.icon
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">
                      {order.id}
                    </TableCell>
                    <TableCell>{order.packageName}</TableCell>
                    <TableCell className="font-medium">
                      ¥{order.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={config.variant} className="gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.createdAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetail(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            查看详情
                          </DropdownMenuItem>
                          {order.status === "pending" && (
                            <>
                              <DropdownMenuItem onClick={() => handlePay(order)}>
                                <CreditCard className="mr-2 h-4 w-4" />
                                去支付
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <X className="mr-2 h-4 w-4" />
                                取消订单
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>订单支付</DialogTitle>
            <DialogDescription>请完成网银Key认证后进行支付</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">订单号</p>
                    <p className="font-mono">{selectedOrder.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">支付金额</p>
                    <p className="text-xl font-bold">
                      ¥{selectedOrder.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">中信网银Key认证</p>
                  <p className="text-sm text-muted-foreground">
                    请插入网银Key并输入密码完成身份验证
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setPaymentDialogOpen(false)}>
              <ShieldCheck className="mr-2 h-4 w-4" />
              网银Key认证支付
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>订单详情</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">订单号</span>
                  <span className="font-mono">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">套餐名称</span>
                  <span>{selectedOrder.packageName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">订单金额</span>
                  <span className="font-medium">
                    ¥{selectedOrder.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">订单状态</span>
                  <Badge variant={statusConfig[selectedOrder.status as keyof typeof statusConfig].variant}>
                    {statusConfig[selectedOrder.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">下单时间</span>
                  <span>{selectedOrder.createdAt}</span>
                </div>
                {selectedOrder.paidAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">支付时间</span>
                    <span>{selectedOrder.paidAt}</span>
                  </div>
                )}
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
