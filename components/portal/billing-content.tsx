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
  Download,
  FileText,
  Receipt,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Building2,
} from "lucide-react"

const bills = [
  {
    id: "BILL202403",
    month: "2024年3月",
    amount: 12997,
    status: "unpaid",
    dueDate: "2024-04-15",
    items: [
      { name: "GPT-4 企业版", amount: 5999 },
      { name: "Embedding 基础版", amount: 999 },
      { name: "超量调用费用", amount: 5999 },
    ],
  },
  {
    id: "BILL202402",
    month: "2024年2月",
    amount: 6998,
    status: "paid",
    paidAt: "2024-03-10",
    items: [
      { name: "GPT-4 企业版", amount: 5999 },
      { name: "Embedding 基础版", amount: 999 },
    ],
  },
  {
    id: "BILL202401",
    month: "2024年1月",
    amount: 5999,
    status: "paid",
    paidAt: "2024-02-08",
    items: [{ name: "GPT-4 企业版", amount: 5999 }],
  },
]

const usageStats = [
  {
    package: "GPT-4 企业版",
    quota: 200000,
    used: 189456,
    overage: 0,
    overagePrice: 0.05,
  },
  {
    package: "Embedding 基础版",
    quota: 100000,
    used: 78000,
    overage: 0,
    overagePrice: 0.01,
  },
  {
    package: "Claude 基础版",
    quota: 50000,
    used: 62000,
    overage: 12000,
    overagePrice: 0.08,
  },
]

const invoices = [
  {
    id: "INV202403001",
    billId: "BILL202402",
    type: "增值税专用发票",
    amount: 6998,
    status: "issued",
    issuedAt: "2024-03-15",
  },
  {
    id: "INV202402001",
    billId: "BILL202401",
    type: "增值税专用发票",
    amount: 5999,
    status: "issued",
    issuedAt: "2024-02-20",
  },
]

export function BillingContent() {
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false)
  const [billDetailOpen, setBillDetailOpen] = useState(false)
  const [selectedBill, setSelectedBill] = useState<typeof bills[0] | null>(null)

  const handleViewBill = (bill: typeof bills[0]) => {
    setSelectedBill(bill)
    setBillDetailOpen(true)
  }

  const totalUnpaid = bills
    .filter((b) => b.status === "unpaid")
    .reduce((acc, b) => acc + b.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">账单与计费</h2>
        <p className="text-muted-foreground">查看账单、用量统计和发票管理</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              待支付账单
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              ¥{totalUnpaid.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {bills.filter((b) => b.status === "unpaid").length} 笔待支付
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              本月消费
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥12,997</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              较上月 +85%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              累计消费
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥25,994</div>
            <p className="text-xs text-muted-foreground">自 2024 年起</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              账户余额
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">¥5,000</div>
            <Button variant="link" className="h-auto p-0 text-xs">
              充值
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bills" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bills">我的账单</TabsTrigger>
          <TabsTrigger value="usage">用量统计</TabsTrigger>
          <TabsTrigger value="invoices">发票管理</TabsTrigger>
        </TabsList>

        {/* Bills Tab */}
        <TabsContent value="bills">
          <Card>
            <CardHeader>
              <CardTitle>账单列表</CardTitle>
              <CardDescription>按月查看消费明细</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>账单月份</TableHead>
                    <TableHead>账单编号</TableHead>
                    <TableHead>应付金额</TableHead>
                    <TableHead>支付状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium">{bill.month}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {bill.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        ¥{bill.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {bill.status === "paid" ? (
                          <Badge variant="outline" className="gap-1">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            已支付
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="gap-1">
                            <Clock className="h-3 w-3" />
                            待支付
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewBill(bill)}
                          >
                            查看
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="mr-1 h-3 w-3" />
                            下载
                          </Button>
                          {bill.status === "unpaid" && (
                            <Button size="sm">去支付</Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>用量统计</CardTitle>
              <CardDescription>各套餐额度使用情况</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {usageStats.map((stat) => {
                const usagePercent = Math.min(
                  Math.round((stat.used / stat.quota) * 100),
                  100
                )
                const hasOverage = stat.overage > 0
                return (
                  <div key={stat.package} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{stat.package}</p>
                        <p className="text-sm text-muted-foreground">
                          已用 {stat.used.toLocaleString()} / 额度 {stat.quota.toLocaleString()} 次
                        </p>
                      </div>
                      {hasOverage && (
                        <Badge variant="destructive" className="gap-1">
                          <AlertCircle className="h-3 w-3" />
                          超量 {stat.overage.toLocaleString()} 次
                        </Badge>
                      )}
                    </div>
                    <Progress
                      value={usagePercent}
                      className={
                        usagePercent >= 100
                          ? "[&>div]:bg-destructive"
                          : usagePercent > 80
                            ? "[&>div]:bg-yellow-500"
                            : ""
                      }
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{usagePercent}% 已使用</span>
                      {hasOverage && (
                        <span className="text-destructive">
                          超量费用：¥{(stat.overage * stat.overagePrice).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>开票信息</CardTitle>
                    <CardDescription>发票抬头和税号信息</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    修改信息
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">发票抬头</p>
                    <p className="font-medium">中科云数科技有限公司</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">税号</p>
                    <p className="font-mono">91110108MA01XXXXXX</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">开户银行</p>
                    <p>中信银行北京分行</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">银行账号</p>
                    <p className="font-mono">6217 **** **** 8888</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>发票记录</CardTitle>
                  <Button onClick={() => setInvoiceDialogOpen(true)}>
                    <FileText className="mr-2 h-4 w-4" />
                    申请发票
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>发票编号</TableHead>
                      <TableHead>关联账单</TableHead>
                      <TableHead>发票类型</TableHead>
                      <TableHead>金额</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-mono text-sm">
                          {invoice.id}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {invoice.billId}
                        </TableCell>
                        <TableCell>{invoice.type}</TableCell>
                        <TableCell>¥{invoice.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            已开具
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="mr-1 h-3 w-3" />
                            下载
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bill Detail Dialog */}
      <Dialog open={billDetailOpen} onOpenChange={setBillDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>账单详情</DialogTitle>
            <DialogDescription>
              {selectedBill?.month} 消费明细
            </DialogDescription>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-4">
              <div className="space-y-2">
                {selectedBill.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span>¥{item.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium">
                    <span>合计</span>
                    <span>¥{selectedBill.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setBillDetailOpen(false)}>
              关闭
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              下载账单
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Application Dialog */}
      <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>申请发票</DialogTitle>
            <DialogDescription>选择需要开具发票的账单</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">中科云数科技有限公司</p>
                  <p className="text-sm text-muted-foreground">
                    税号：91110108MA01XXXXXX
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">可开票账单</p>
              {bills
                .filter((b) => b.status === "paid")
                .map((bill) => (
                  <div
                    key={bill.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{bill.month}</p>
                      <p className="text-sm text-muted-foreground">{bill.id}</p>
                    </div>
                    <p className="font-medium">¥{bill.amount.toLocaleString()}</p>
                  </div>
                ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInvoiceDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setInvoiceDialogOpen(false)}>
              提交申请
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
