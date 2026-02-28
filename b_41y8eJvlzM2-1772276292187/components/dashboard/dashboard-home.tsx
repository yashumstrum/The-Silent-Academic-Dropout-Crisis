"use client"

import {
  Atom,
  FlaskConical,
  Sigma,
  TrendingUp,
  Target,
  BookCheck,
  ArrowRight,
  AlertTriangle,
  AlertCircle,
  Info,
  GraduationCap,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
  Line,
  LineChart,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import type { SubjectData } from "@/lib/learning-data"

interface DashboardHomeProps {
  subjects: SubjectData[]
  onSelectSubject: (id: string) => void
}

const subjectIcons: Record<string, React.ReactNode> = {
  atom: <Atom className="size-5" />,
  flask: <FlaskConical className="size-5" />,
  sigma: <Sigma className="size-5" />,
}

const severityConfig = {
  high: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", label: "High" },
  medium: { icon: AlertCircle, color: "text-chart-3", bg: "bg-chart-3/10", border: "border-chart-3/30", label: "Medium" },
  low: { icon: Info, color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", label: "Low" },
}

export function DashboardHome({ subjects, onSelectSubject }: DashboardHomeProps) {
  // Compute aggregate stats
  const totalChapters = subjects.reduce((sum, s) => sum + s.chapters.length, 0)
  const totalMastered = subjects.reduce((sum, s) => sum + s.chaptersMastered, 0)
  const overallProgress = Math.round(
    subjects.reduce((sum, s) => sum + s.totalProgress, 0) / subjects.length
  )
  const overallMastery = Math.round(
    subjects.reduce((sum, s) => sum + s.averageMastery, 0) / subjects.length
  )
  const totalQuizzes = subjects.reduce((sum, s) => sum + s.quizScores.length, 0)

  // Combine all knowledge gaps across subjects
  const allGaps = subjects.flatMap((s) =>
    s.knowledgeGaps.map((gap) => ({ ...gap, subject: s.name, subjectColor: s.color }))
  )
  const highPriorityGaps = allGaps.filter((g) => g.severity === "high")

  // Build combined mastery trace for the multi-line chart
  // Normalize to same week axis
  const maxWeeks = Math.max(...subjects.map((s) => s.masteryTrace.length))
  const combinedTrace = Array.from({ length: maxWeeks }, (_, i) => {
    const point: Record<string, string | number> = { date: `Week ${i + 1}` }
    for (const s of subjects) {
      if (i < s.masteryTrace.length) {
        point[s.id] = s.masteryTrace[i].mastery
      }
    }
    return point
  })

  const overallStats = [
    {
      label: "Overall Progress",
      value: `${overallProgress}%`,
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-primary/10",
      ring: "ring-primary/20",
    },
    {
      label: "Average Mastery",
      value: `${overallMastery}%`,
      icon: Target,
      color: "text-accent",
      bg: "bg-accent/10",
      ring: "ring-accent/20",
    },
    {
      label: "Chapters Mastered",
      value: `${totalMastered}/${totalChapters}`,
      icon: BookCheck,
      color: "text-accent",
      bg: "bg-accent/10",
      ring: "ring-accent/20",
    },
    {
      label: "Quizzes Completed",
      value: `${totalQuizzes}`,
      icon: GraduationCap,
      color: "text-primary",
      bg: "bg-primary/10",
      ring: "ring-primary/20",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground text-balance">
          Welcome back, Alex
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Here is your learning overview across all subjects.
        </p>
      </div>

      {/* Aggregate stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {overallStats.map((stat) => (
          <Card
            key={stat.label}
            className="border-border/50 bg-card/60 backdrop-blur-md shadow-lg"
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div
                className={`flex size-11 items-center justify-center rounded-xl ${stat.bg} ring-1 ${stat.ring}`}
              >
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Combined mastery trace chart */}
      <Card className="border-border/50 bg-card/60 backdrop-blur-md shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Knowledge Trace - All Subjects</CardTitle>
          <CardDescription>Mastery progression across your enrolled subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={Object.fromEntries(
              subjects.map((s) => [s.id, { label: s.name, color: s.color }])
            )}
            className="h-[260px] w-full"
          >
            <LineChart data={combinedTrace} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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
              {subjects.map((s) => (
                <Line
                  key={s.id}
                  type="monotone"
                  dataKey={s.id}
                  stroke={s.color}
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                />
              ))}
            </LineChart>
          </ChartContainer>
          {/* Legend */}
          <div className="mt-3 flex flex-wrap items-center gap-5 border-t border-border/30 pt-3">
            {subjects.map((s) => (
              <div key={s.id} className="flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-xs text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Per-subject cards with Continue Learning */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Your Subjects</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {subjects.map((subject) => {
            const currentChapter = subject.chapters.find((c) => c.status === "current")
            return (
              <Card
                key={subject.id}
                className="group border-border/50 bg-card/60 backdrop-blur-md shadow-lg transition-all duration-200 hover:border-border hover:shadow-xl"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex size-10 items-center justify-center rounded-xl"
                        style={{ background: `${subject.color}20` }}
                      >
                        <span style={{ color: subject.color }}>{subjectIcons[subject.icon]}</span>
                      </div>
                      <div>
                        <CardTitle className="text-sm">{subject.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {currentChapter
                            ? `Up next: ${currentChapter.title}`
                            : "All chapters completed"}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="tabular-nums text-xs"
                      style={{ color: subject.color, borderColor: `${subject.color}50` }}
                    >
                      {subject.averageMastery}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {/* Progress bar */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span className="tabular-nums">{subject.totalProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${subject.totalProgress}%`,
                          background: subject.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Quick stats row */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {subject.chaptersMastered}/{subject.chapters.length} chapters
                    </span>
                    <span>
                      {subject.quizScores.length} quizzes
                    </span>
                    <span>
                      {subject.knowledgeGaps.filter((g) => g.severity === "high").length} gaps
                    </span>
                  </div>

                  {/* Mini mastery sparkline */}
                  <div className="h-12">
                    <ChartContainer
                      config={{
                        mastery: { label: "Mastery", color: subject.color },
                      }}
                      className="h-full w-full"
                    >
                      <AreaChart
                        data={subject.masteryTrace}
                        margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id={`spark-${subject.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={subject.color} stopOpacity={0.3} />
                            <stop offset="100%" stopColor={subject.color} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="mastery"
                          stroke={subject.color}
                          strokeWidth={1.5}
                          fill={`url(#spark-${subject.id})`}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>

                  <Button
                    onClick={() => onSelectSubject(subject.id)}
                    variant="secondary"
                    className="gap-2 text-sm transition-colors group-hover:bg-primary/15 group-hover:text-primary"
                  >
                    Continue Learning
                    <ArrowRight className="size-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* High-priority knowledge gaps across all subjects */}
      {highPriorityGaps.length > 0 && (
        <Card className="border-border/50 bg-card/60 backdrop-blur-md shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Priority Knowledge Gaps</CardTitle>
            <CardDescription>
              High-severity gaps across all subjects that need your attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {allGaps
                .sort((a, b) => {
                  const order = { high: 0, medium: 1, low: 2 }
                  return order[a.severity] - order[b.severity]
                })
                .slice(0, 6)
                .map((gap, index) => {
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
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{gap.topic}</p>
                          <Badge
                            variant="outline"
                            className={cn("text-[10px] uppercase tracking-wider", config.color)}
                          >
                            {config.label}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[10px] text-muted-foreground"
                          >
                            {gap.subject}
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
      )}

      {/* Recent quiz performance */}
      <Card className="border-border/50 bg-card/60 backdrop-blur-md shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Recent Quiz Scores</CardTitle>
          <CardDescription>Your latest results across all subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {subjects
              .flatMap((s) =>
                s.quizScores.map((q) => ({
                  ...q,
                  subjectName: s.name,
                  subjectColor: s.color,
                }))
              )
              .reverse()
              .slice(0, 8)
              .map((quiz, i) => (
                <div
                  key={`${quiz.chapterId}-${i}`}
                  className="flex items-center justify-between rounded-lg border border-border/30 bg-secondary/30 px-4 py-3"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {quiz.chapterTitle}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {quiz.subjectName} &middot; {quiz.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${quiz.score}%`,
                          background: quiz.score >= 90 ? "#10b981" : quiz.subjectColor,
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
        </CardContent>
      </Card>
    </div>
  )
}
