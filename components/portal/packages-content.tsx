"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check, Zap, Building2, Crown, Info, ArrowRight } from "lucide-react"

const packages = {
  llm: [
    {
      id: "gpt4-basic",
      name: "GPT-4 基础版",
      description: "适合小型团队和个人开发者",
      price: 1999,
      period: "月",
      apiCalls: "50,000",
      features: [
        "50,000 次/月 API 调用",
        "标准响应速度",
        "基础技术支持",
        "API 文档访问",
        "调用统计报表",
      ],
      tier: "basic",
      popular: false,
    },
    {
      id: "gpt4-enterprise",
      name: "GPT-4 企业版",
      description: "适合中大型企业日常使用",
      price: 5999,
      period: "月",
      apiCalls: "200,000",
      features: [
        "200,000 次/月 API 调用",
        "优先响应队列",
        "7x24 技术支持",
        "专属客户经理",
        "自定义限流规则",
        "高级调用分析",
      ],
      tier: "enterprise",
      popular: true,
    },
    {
      id: "gpt4-flagship",
      name: "GPT-4 旗舰版",
      description: "适合大规模企业应用场景",
      price: 19999,
      period: "月",
      apiCalls: "1,000,000",
      features: [
        "1,000,000 次/月 API 调用",
        "最高响应优先级",
        "专属技术团队支持",
        "SLA 99.99% 保障",
        "私有化部署支持",
        "定制化功能开发",
        "专属网络通道",
      ],
      tier: "flagship",
      popular: false,
    },
  ],
  embedding: [
    {
      id: "embed-basic",
      name: "Embedding 基础版",
      description: "文本向量化基础服务",
      price: 999,
      period: "月",
      apiCalls: "100,000",
      features: [
        "100,000 次/月 API 调用",
        "1536 维向量输出",
        "批量处理支持",
        "标准技术支持",
      ],
      tier: "basic",
      popular: false,
    },
    {
      id: "embed-enterprise",
      name: "Embedding 企业版",
      description: "企业级向量化服务",
      price: 2999,
      period: "月",
      apiCalls: "500,000",
      features: [
        "500,000 次/月 API 调用",
        "多维度向量支持",
        "高并发处理",
        "7x24 技术支持",
        "向量存储服务",
      ],
      tier: "enterprise",
      popular: true,
    },
  ],
  vision: [
    {
      id: "vision-basic",
      name: "视觉 API 基础版",
      description: "图像识别与分析服务",
      price: 1499,
      period: "月",
      apiCalls: "30,000",
      features: [
        "30,000 次/月 API 调用",
        "图像分类与识别",
        "OCR 文字提取",
        "标准技术支持",
      ],
      tier: "basic",
      popular: false,
    },
    {
      id: "vision-enterprise",
      name: "视觉 API 企业版",
      description: "企业级图像处理服务",
      price: 4999,
      period: "月",
      apiCalls: "150,000",
      features: [
        "150,000 次/月 API 调用",
        "高级图像分析",
        "视频处理支持",
        "自定义模型训练",
        "7x24 技术支持",
      ],
      tier: "enterprise",
      popular: true,
    },
  ],
}

const tierConfig = {
  basic: {
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  enterprise: {
    icon: Building2,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  flagship: {
    icon: Crown,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
}

export function PackagesContent() {
  const [selectedPackage, setSelectedPackage] = useState<typeof packages.llm[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handlePurchase = (pkg: typeof packages.llm[0]) => {
    setSelectedPackage(pkg)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">MaaS 套餐中心</h2>
        <p className="text-muted-foreground">
          选择适合您业务需求的 AI 服务套餐
        </p>
      </div>

      {/* Package Tabs */}
      <Tabs defaultValue="llm" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="llm">大语言模型</TabsTrigger>
          <TabsTrigger value="embedding">向量服务</TabsTrigger>
          <TabsTrigger value="vision">视觉服务</TabsTrigger>
        </TabsList>

        {Object.entries(packages).map(([key, pkgList]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pkgList.map((pkg) => {
                const config = tierConfig[pkg.tier as keyof typeof tierConfig]
                const TierIcon = config.icon
                return (
                  <Card
                    key={pkg.id}
                    className={`relative flex flex-col ${pkg.popular ? "border-primary shadow-md" : ""}`}
                  >
                    {pkg.popular && (
                      <Badge className="absolute -top-2.5 right-4">
                        推荐
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${config.bgColor}`}>
                          <TierIcon className={`h-4 w-4 ${config.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{pkg.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {pkg.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="mb-4">
                        <span className="text-3xl font-bold">¥{pkg.price.toLocaleString()}</span>
                        <span className="text-muted-foreground">/{pkg.period}</span>
                      </div>
                      <div className="mb-4 flex items-center gap-2 rounded-lg bg-muted/50 p-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">API 调用额度：{pkg.apiCalls} 次/月</span>
                      </div>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={pkg.popular ? "default" : "outline"}
                        onClick={() => handlePurchase(pkg)}
                      >
                        立即订购
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Purchase Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认订购</DialogTitle>
            <DialogDescription>
              您即将订购以下套餐，请确认订单信息
            </DialogDescription>
          </DialogHeader>
          {selectedPackage && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedPackage.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedPackage.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ¥{selectedPackage.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      /{selectedPackage.period}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-sm">
                <p className="font-medium">订购说明：</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• 订购后需进行网银Key认证</li>
                  <li>• 支付成功后服务自动开通</li>
                  <li>• 套餐有效期从开通之日起计算</li>
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => {
              setDialogOpen(false)
              // Navigate to orders page
              window.location.href = "/orders"
            }}>
              确认订购
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
