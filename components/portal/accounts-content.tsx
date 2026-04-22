"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
  UserPlus,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  CheckCircle2,
  XCircle,
  Crown,
  UserCog,
  Wallet,
  Code,
} from "lucide-react"

const accounts = [
  {
    id: "user-001",
    email: "admin@zhongkeyunshu.com",
    name: "李四",
    role: "super_admin",
    status: "active",
    createdAt: "2024-01-15",
    lastLogin: "2024-03-15 14:30:00",
  },
  {
    id: "user-002",
    email: "ops@zhongkeyunshu.com",
    name: "王五",
    role: "ops_admin",
    status: "active",
    createdAt: "2024-02-01",
    lastLogin: "2024-03-14 16:20:00",
  },
  {
    id: "user-003",
    email: "finance@zhongkeyunshu.com",
    name: "赵六",
    role: "finance_admin",
    status: "active",
    createdAt: "2024-02-15",
    lastLogin: "2024-03-13 09:45:00",
  },
  {
    id: "user-004",
    email: "dev@zhongkeyunshu.com",
    name: "孙七",
    role: "api_user",
    status: "active",
    createdAt: "2024-03-01",
    lastLogin: "2024-03-15 10:15:00",
  },
  {
    id: "user-005",
    email: "test@zhongkeyunshu.com",
    name: "周八",
    role: "api_user",
    status: "inactive",
    createdAt: "2024-03-10",
    lastLogin: null,
  },
]

const roles = [
  {
    id: "super_admin",
    name: "超级管理员",
    description: "拥有全部权限，可管理所有功能和子账号",
    icon: Crown,
    color: "text-amber-500",
    permissions: ["all"],
  },
  {
    id: "ops_admin",
    name: "运营管理员",
    description: "可管理套餐订购、服务开通、API 密钥",
    icon: UserCog,
    color: "text-blue-500",
    permissions: ["packages", "services", "keys", "audit"],
  },
  {
    id: "finance_admin",
    name: "财务管理员",
    description: "可管理订单、账单、发票等财务相关功能",
    icon: Wallet,
    color: "text-green-500",
    permissions: ["orders", "billing", "invoices"],
  },
  {
    id: "api_user",
    name: "API 调用员",
    description: "仅可查看 API 密钥和调用统计",
    icon: Code,
    color: "text-purple-500",
    permissions: ["keys_readonly", "monitor"],
  },
]

const roleConfig: Record<string, { label: string; icon: typeof Crown; color: string }> = {
  super_admin: { label: "超级管理员", icon: Crown, color: "text-amber-500" },
  ops_admin: { label: "运营管理员", icon: UserCog, color: "text-blue-500" },
  finance_admin: { label: "财务管理员", icon: Wallet, color: "text-green-500" },
  api_user: { label: "API 调用员", icon: Code, color: "text-purple-500" },
}

export function AccountsContent() {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<typeof accounts[0] | null>(null)

  const handleEdit = (account: typeof accounts[0]) => {
    setSelectedAccount(account)
    setEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">子账号与权限</h2>
        <p className="text-muted-foreground">管理企业子账号和角色权限分配</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              总账号数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              已激活
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {accounts.filter((a) => a.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              已禁用
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">
              {accounts.filter((a) => a.status === "inactive").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              管理员
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {accounts.filter((a) => a.role.includes("admin")).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Accounts List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>子账号列表</CardTitle>
                <CardDescription>管理企业下所有子账号</CardDescription>
              </div>
              <Button onClick={() => setAddDialogOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                新增子账号
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>账号</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => {
                  const config = roleConfig[account.role]
                  const RoleIcon = config.icon
                  return (
                    <TableRow key={account.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{account.email}</p>
                          <p className="text-xs text-muted-foreground">
                            创建于 {account.createdAt}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <RoleIcon className={`h-4 w-4 ${config.color}`} />
                          <span className="text-sm">{config.label}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {account.status === "active" ? (
                          <Badge variant="outline" className="gap-1">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            已激活
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <XCircle className="h-3 w-3" />
                            已禁用
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(account)}>
                              <Edit className="mr-2 h-4 w-4" />
                              编辑
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              {account.status === "active" ? "禁用" : "启用"}
                            </DropdownMenuItem>
                            {account.role !== "super_admin" && (
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                删除
                              </DropdownMenuItem>
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

        {/* Roles */}
        <Card>
          <CardHeader>
            <CardTitle>角色权限</CardTitle>
            <CardDescription>系统预设角色说明</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roles.map((role) => {
              const RoleIcon = role.icon
              return (
                <div key={role.id} className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <RoleIcon className={`h-4 w-4 ${role.color}`} />
                    <span className="font-medium">{role.name}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Add Account Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新增子账号</DialogTitle>
            <DialogDescription>创建新的企业子账号</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" type="email" placeholder="user@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">姓名</Label>
              <Input id="name" placeholder="请输入姓名" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">角色</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择角色" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>发送邀请邮件</Label>
                <p className="text-xs text-muted-foreground">
                  账号创建后发送激活邮件
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setAddDialogOpen(false)}>创建账号</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Account Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑子账号</DialogTitle>
            <DialogDescription>修改账号信息和权限</DialogDescription>
          </DialogHeader>
          {selectedAccount && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-email">邮箱</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedAccount.email}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-name">姓名</Label>
                <Input id="edit-name" defaultValue={selectedAccount.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">角色</Label>
                <Select defaultValue={selectedAccount.role}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>账号状态</Label>
                  <p className="text-xs text-muted-foreground">
                    {selectedAccount.status === "active" ? "当前已激活" : "当前已禁用"}
                  </p>
                </div>
                <Switch defaultChecked={selectedAccount.status === "active"} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setEditDialogOpen(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
