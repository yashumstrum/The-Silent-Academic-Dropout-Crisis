"use client"

import { Atom, FlaskConical, Sigma, Brain, Menu, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SubjectData } from "@/lib/learning-data"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface MobileNavProps {
  subjects: SubjectData[]
  activeSubjectId: string | null
  onSubjectChange: (id: string | null) => void
}

const subjectIcons: Record<string, React.ReactNode> = {
  atom: <Atom className="size-4" />,
  flask: <FlaskConical className="size-4" />,
  sigma: <Sigma className="size-4" />,
}

export function MobileNav({ subjects, activeSubjectId, onSubjectChange }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const active = activeSubjectId ? subjects.find((s) => s.id === activeSubjectId) : null

  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border/50 bg-background/80 px-4 py-3 backdrop-blur-xl lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open navigation">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-sidebar p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex items-center gap-3 px-6 py-6 border-b border-border/50">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/20">
              <Brain className="size-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-sidebar-foreground">AI Learning</h1>
              <p className="text-xs text-muted-foreground">Adaptive Dashboard</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1.5 p-4" role="navigation" aria-label="Subject navigation">
            {/* Home / Overview */}
            <button
              onClick={() => {
                onSubjectChange(null)
                setOpen(false)
              }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all mb-2",
                activeSubjectId === null
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              )}
              aria-current={activeSubjectId === null ? "page" : undefined}
            >
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-lg",
                  activeSubjectId === null ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                )}
              >
                <LayoutDashboard className="size-4" />
              </span>
              Overview
            </button>

            {subjects.map((subject) => {
              const isActive = subject.id === activeSubjectId
              return (
                <button
                  key={subject.id}
                  onClick={() => {
                    onSubjectChange(subject.id)
                    setOpen(false)
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={cn(
                      "flex size-7 items-center justify-center rounded-lg",
                      isActive ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {subjectIcons[subject.icon]}
                  </span>
                  {subject.name}
                </button>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2">
        {active ? (
          <>
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
              {subjectIcons[active.icon]}
            </span>
            <h2 className="text-sm font-semibold text-foreground">{active.name}</h2>
          </>
        ) : (
          <>
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <LayoutDashboard className="size-4" />
            </span>
            <h2 className="text-sm font-semibold text-foreground">Overview</h2>
          </>
        )}
      </div>
    </header>
  )
}
