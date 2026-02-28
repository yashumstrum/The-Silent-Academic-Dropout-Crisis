"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Subject } from "@/lib/data";

export function ProgressGraph({ subjects }: { subjects: Subject[] }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = days.map((day, i) => ({
    day,
    ...Object.fromEntries(subjects.map((s) => [s.id, s.weeklyScores[i] || 0])),
  }));

  const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

  return (
    <div className="glass-card p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-1 tracking-wide uppercase">
        Weekly Progress
      </h3>
      <p className="text-lg font-semibold text-foreground mb-4">
        Knowledge Growth Trend
      </p>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              {subjects.map((s, i) => (
                <linearGradient
                  key={s.id}
                  id={`gradient-${s.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={colors[i]} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={colors[i]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              opacity={0.3}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
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
            <Legend />
            {subjects.map((s, i) => (
              <Area
                key={s.id}
                type="monotone"
                dataKey={s.id}
                name={s.name}
                stroke={colors[i]}
                fill={`url(#gradient-${s.id})`}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
