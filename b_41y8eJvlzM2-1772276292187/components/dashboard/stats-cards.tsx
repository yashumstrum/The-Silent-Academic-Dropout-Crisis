"use client"

import { TrendingUp, Target, BookCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { SubjectData } from "@/lib/learning-data"

interface StatsCardsProps {
  subject: SubjectData
}

export function StatsCards({ subject }: StatsCardsProps) {
  const stats = [
    {
      label: "Total Progress",
      value: `${subject.totalProgress}%`,
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-primary/10",
      ring: "ring-primary/20",
    },
    {
      label: "Average Mastery",
      value: `${subject.averageMastery}%`,
      icon: Target,
      color: "text-accent",
      bg: "bg-accent/10",
      ring: "ring-accent/20",
    },
    {
      label: "Chapters Mastered",
      value: `${subject.chaptersMastered}/${subject.chapters.length}`,
      icon: BookCheck,
      color: "text-accent",
      bg: "bg-accent/10",
      ring: "ring-accent/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="border-border/50 bg-card/60 backdrop-blur-md shadow-lg"
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className={`flex size-11 items-center justify-center rounded-xl ${stat.bg} ring-1 ${stat.ring}`}>
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
  )
}
