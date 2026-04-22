"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  Edit,
  Upload,
  Key,
  RefreshCw,
  AlertCircle,
} from "lucide-react"

const enterpriseInfo = {
  name: "中科云数科技有限公司",
  creditCode: "91110108MA01XXXXXX",
  legalPerson: "张三",
  contactPerson: "李四",
  contactPhone: "138****8888",
  contactEmail: "admin@zhongkeyunshu.com",
  address: "北京市海淀区中关村科技园区XX号",
  registeredAt: "2024-01-15",
  verifiedAt: "2024-01-16",
  status: "verified",
}

const uKeyInfo = {
  serialNumber: "CITIC2024XXXXXXXX",
  boundAt: "2024-01-16 10:30:00",
  expiry: "2025-01-16",
  status: "active",
  lastUsed: "2024-03-15 14:32:00",
}

export function EnterpriseContent() {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [rebindDialogOpen, setRebindDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">企业信息管理</h2>
        <p className="text-muted-foreground">查看和管理企业认证信息</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>企业基本信息</CardTitle>
                  <CardDescription>工商注册信息</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                已认证
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-1">
                <Label className="text-muted-foreground">企业名称</Label>
                <p className="font-medium">{enterpriseInfo.name}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground">统一社会信用代码</Label>
                <p className="font-mono">{enterpriseInfo.creditCode}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground">法定代表人</Label>
                <p>{enterpriseInfo.legalPerson}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground">企业地址</Label>
                <p>{enterpriseInfo.address}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>注册时间：{enterpriseInfo.registeredAt}</span>
              <span>认证时间：{enterpriseInfo.verifiedAt}</span>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>联系人信息</CardTitle>
                <CardDescription>企业管理员联系方式</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setEditDialogOpen(true)}>
                <Edit className="mr-1 h-3 w-3" />
                修改
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-1">
                <Label className="text-muted-foreground">联系人</Label>
                <p className="font-medium">{enterpriseInfo.contactPerson}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground">联系电话</Label>
                <p>{enterpriseInfo.contactPhone}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground">联系邮箱</Label>
                <p>{enterpriseInfo.contactEmail}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* UKey Binding */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 dark:bg-cyan-950">
                  <ShieldCheck className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <CardTitle>网银Key绑定状态</CardTitle>
                  <CardDescription>中信网银Key认证信息</CardDescription>
                </div>
              </div>
              <Badge className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                已绑定
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Key 序列号</Label>
                  <p className="font-mono">{uKeyInfo.serialNumber}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">绑定时间</Label>
                  <p>{uKeyInfo.boundAt}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">证书有效期</Label>
                  <p>{uKeyInfo.expiry}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">最近使用</Label>
                  <p>{uKeyInfo.lastUsed}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">状态</Label>
                  <Badge variant="outline" className="gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    正常
                  </Badge>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setRebindDialogOpen(true)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                重新绑定
              </Button>
              <Button variant="outline">
                <Key className="mr-2 h-4 w-4" />
                测试认证
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Qualification Documents */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>资质文件</CardTitle>
            <CardDescription>企业认证上传的资质文件</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">营业执照</p>
                      <p className="text-xs text-muted-foreground">
                        business_license.pdf
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    已上传
                  </Badge>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                      <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">法人身份证</p>
                      <p className="text-xs text-muted-foreground">
                        legal_person_id.pdf
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    已上传
                  </Badge>
                </div>
              </div>
              <div className="rounded-lg border border-dashed p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">其他资质</p>
                      <p className="text-xs text-muted-foreground">可选上传</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    上传
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Contact Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>修改联系人信息</DialogTitle>
            <DialogDescription>更新企业管理员联系方式</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactPerson">联系人</Label>
              <Input
                id="contactPerson"
                defaultValue={enterpriseInfo.contactPerson}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">联系电话</Label>
              <Input
                id="contactPhone"
                defaultValue={enterpriseInfo.contactPhone}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">联系邮箱</Label>
              <Input
                id="contactEmail"
                type="email"
                defaultValue={enterpriseInfo.contactEmail}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setEditDialogOpen(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rebind UKey Dialog */}
      <Dialog open={rebindDialogOpen} onOpenChange={setRebindDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>重新绑定网银Key</DialogTitle>
            <DialogDescription>更换绑定的中信网银Key</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-600" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    重要提示
                  </p>
                  <p className="mt-1 text-yellow-700 dark:text-yellow-300">
                    重新绑定后，原网银Key将立即失效。请确保新Key可用后再进行操作。
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <Key className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                请插入新的网银Key并点击下方按钮开始绑定
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRebindDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setRebindDialogOpen(false)}>
              <ShieldCheck className="mr-2 h-4 w-4" />
              开始绑定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
