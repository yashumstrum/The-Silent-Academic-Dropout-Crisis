"use client"

import { Atom, FlaskConical, Sigma, Brain, Sparkles, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SubjectData } from "@/lib/learning-data"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
  subjects: SubjectData[]
  activeSubjectId: string | null
  onSubjectChange: (id: string | null) => void
}

const subjectIcons: Record<string, React.ReactNode> = {
  atom: <Atom className="size-5" />,
  flask: <FlaskConical className="size-5" />,
  sigma: <Sigma className="size-5" />,
}

export function Sidebar({ subjects, activeSubjectId, onSubjectChange }: SidebarProps) {
  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-border/50 bg-sidebar">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-border/50">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20">
          <Brain className="size-5 text-primary" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-sidebar-foreground">AI Learning</h1>
          <p className="text-xs text-muted-foreground">Adaptive Dashboard</p>
        </div>
      </div>

      <ScrollArea className="flex-1 py-4">
        <div className="px-4">
          {/* Home / Overview button */}
          <button
            onClick={() => onSubjectChange(null)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 mb-4",
              activeSubjectId === null
                ? "bg-primary/15 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
            )}
            aria-current={activeSubjectId === null ? "page" : undefined}
          >
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-lg transition-colors",
                activeSubjectId === null ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
              )}
            >
              <LayoutDashboard className="size-5" />
            </span>
            <span>Overview</span>
            {activeSubjectId === null && (
              <span className="ml-auto size-1.5 rounded-full bg-primary" />
            )}
          </button>

          <p className="mb-3 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Subjects
          </p>
          <nav className="flex flex-col gap-1.5" role="navigation" aria-label="Subject navigation">
            {subjects.map((subject) => {
              const isActive = subject.id === activeSubjectId
              return (
                <button
                  key={subject.id}
                  onClick={() => onSubjectChange(subject.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/15 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-lg transition-colors",
                      isActive ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {subjectIcons[subject.icon]}
                  </span>
                  <span>{subject.name}</span>
                  {isActive && (
                    <span className="ml-auto size-1.5 rounded-full bg-primary" />
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="mx-4 mt-8 rounded-xl border border-border/50 bg-secondary/50 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Sparkles className="size-4 text-primary" />
            AI Insights
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Your learning pace is 23% faster than average. Keep up the momentum!
          </p>
        </div>
      </ScrollArea>

      <div className="border-t border-border/50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">
            AK
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Alex Kumar</p>
            <p className="text-xs text-muted-foreground">Grade 12</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
