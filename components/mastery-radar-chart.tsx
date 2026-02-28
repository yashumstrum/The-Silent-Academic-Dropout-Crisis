"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { Subject } from "@/lib/data";

export function MasteryRadarChart({ subjects }: { subjects: Subject[] }) {
  const data = subjects.map((s) => ({
    subject: s.name,
    mastery: Math.round(s.masteryProbability * 100),
    progress: s.progress,
  }));

  return (
    <div className="glass-card p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-1 tracking-wide uppercase">
        Mastery Radar
      </h3>
      <p className="text-lg font-semibold text-foreground mb-4">
        Knowledge Overview
      </p>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            />
            <Radar
              name="Mastery %"
              dataKey="mastery"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Radar
              name="Progress %"
              dataKey="progress"
              stroke="hsl(var(--chart-2))"
              fill="hsl(var(--chart-2))"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
                fontSize: "12px",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-1" />
          <span className="text-xs text-muted-foreground">Mastery</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-2" />
          <span className="text-xs text-muted-foreground">Progress</span>
        </div>
      </div>
    </div>
  );
}
