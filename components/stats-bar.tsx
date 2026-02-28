"use client";

import { BookOpen, CheckCircle2, TrendingUp, Target } from "lucide-react";
import type { Subject } from "@/lib/data";

export function StatsBar({ subjects }: { subjects: Subject[] }) {
  const totalTopics = subjects.reduce((acc, s) => acc + s.totalTopics, 0);
  const completedTopics = subjects.reduce(
    (acc, s) => acc + s.completedTopics,
    0
  );
  const avgMastery = Math.round(
    (subjects.reduce((acc, s) => acc + s.masteryProbability, 0) /
      subjects.length) *
      100
  );
  const avgProgress = Math.round(
    subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length
  );

  const stats = [
    {
      label: "Total Topics",
      value: totalTopics,
      icon: BookOpen,
      color: "text-chart-1",
      bg: "bg-chart-1/10",
    },
    {
      label: "Completed",
      value: completedTopics,
      icon: CheckCircle2,
      color: "text-chart-2",
      bg: "bg-chart-2/10",
    },
    {
      label: "Avg. Mastery",
      value: `${avgMastery}%`,
      icon: Target,
      color: "text-chart-3",
      bg: "bg-chart-3/10",
    },
    {
      label: "Avg. Progress",
      value: `${avgProgress}%`,
      icon: TrendingUp,
      color: "text-chart-4",
      bg: "bg-chart-4/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={`text-xl font-bold font-mono ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
