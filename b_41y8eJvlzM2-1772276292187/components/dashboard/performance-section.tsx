"use client"

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts"
import { AlertTriangle, AlertCircle, Info, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import type { SubjectData } from "@/lib/learning-data"

interface PerformanceSectionProps {
  subject: SubjectData
}

const severityConfig = {
  high: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", label: "High" },
  medium: { icon: AlertCircle, color: "text-chart-3", bg: "bg-chart-3/10", border: "border-chart-3/30", label: "Medium" },
  low: { icon: Info, color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", label: "Low" },
}

export function PerformanceSection({ subject }: PerformanceSectionProps) {
  const electricBlue = "#3b82f6"
  const emeraldGreen = "#10b981"

  return (
    <div className="flex flex-col gap-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        <TrendingUp className="size-5 text-primary" />
        Student Report
      </h3>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="border-border/50 bg-card/60 backdrop-blur-md shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Real-time Knowledge Trace</CardTitle>
            <CardDescription>Mastery progression over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                mastery: {
                  label: "Mastery %",
                  color: electricBlue,
                },
              }}
              className="h-[220px] w-full"
            >
              <AreaChart
                data={subject.masteryTrace}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                  <defs>
                    <linearGradient id="masteryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={electricBlue} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={electricBlue} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="mastery"
                    stroke={electricBlue}
                    strokeWidth={2}
                    fill="url(#masteryGradient)"
                  />
                </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/60 backdrop-blur-md shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Past Quiz Scores</CardTitle>
            <CardDescription>Performance by chapter</CardDescription>
          </CardHeader>
          <CardContent>
            {subject.quizScores.length > 0 ? (
              <div className="flex flex-col gap-3">
                {subject.quizScores.map((quiz) => (
                  <div
                    key={quiz.chapterId}
                    className="flex items-center justify-between rounded-lg border border-border/30 bg-secondary/30 px-4 py-3"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {quiz.chapterTitle}
                      </span>
                      <span className="text-xs text-muted-foreground">{quiz.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${quiz.score}%`,
                            background: quiz.score >= 90 ? emeraldGreen : electricBlue,
                          }}
                        />
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "min-w-12 justify-center text-xs tabular-nums",
                          quiz.score >= 90
                            ? "border-accent/50 text-accent"
                            : "border-primary/50 text-primary"
                        )}
                      >
                        {quiz.score}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No quizzes taken yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/60 backdrop-blur-md shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Identified Knowledge Gaps</CardTitle>
          <CardDescription>Areas that need attention based on AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {subject.knowledgeGaps.map((gap, index) => {
              const config = severityConfig[gap.severity]
              const Icon = config.icon
              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-3",
                    config.border,
                    config.bg
                  )}
                >
                  <Icon className={cn("mt-0.5 size-4 shrink-0", config.color)} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{gap.topic}</p>
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] uppercase tracking-wider", config.color)}
                      >
                        {config.label}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {gap.recommendation}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
