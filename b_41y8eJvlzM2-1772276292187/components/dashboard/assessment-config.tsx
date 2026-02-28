"use client"

import { useState } from "react"
import {
  Brain,
  ArrowLeft,
  ArrowRight,
  CheckSquare,
  CheckCheck,
  CircleDot,
  PenLine,
  AlignLeft,
  BookOpen,
  Hand,
  ChevronDownSquare,
  LayoutGrid,
  ArrowDownUp,
  Puzzle,
  TextSelect,
  Image,
  Target,
  LineChart,
  FunctionSquare,
  PenTool,
  Video,
  Volume2,
  BarChart3,
  Cloud,
  Sparkles,
  ListChecks,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { questionCategories, type QuestionCategory, type QuestionType } from "@/lib/learning-data"

interface AssessmentConfigProps {
  onBack: () => void
  onStartQuiz: (selectedTypes: string[]) => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "check-square": CheckSquare,
  "check-check": CheckCheck,
  "circle-dot": CircleDot,
  "pen-line": PenLine,
  "align-left": AlignLeft,
  "book-open": BookOpen,
  hand: Hand,
  "chevron-down-square": ChevronDownSquare,
  "layout-grid": LayoutGrid,
  "arrow-down-up": ArrowDownUp,
  puzzle: Puzzle,
  "text-select": TextSelect,
  image: Image,
  target: Target,
  "line-chart": LineChart,
  "function-square": FunctionSquare,
  "pen-tool": PenTool,
  video: Video,
  "volume-2": Volume2,
  "bar-chart-3": BarChart3,
  cloud: Cloud,
}

export function AssessmentConfig({ onBack, onStartQuiz }: AssessmentConfigProps) {
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set())

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev)
      if (next.has(typeId)) {
        next.delete(typeId)
      } else {
        next.add(typeId)
      }
      return next
    })
  }

  const selectAllInCategory = (category: QuestionCategory) => {
    const categoryIds = category.types.map((t) => t.id)
    const allSelected = categoryIds.every((id) => selectedTypes.has(id))
    setSelectedTypes((prev) => {
      const next = new Set(prev)
      if (allSelected) {
        categoryIds.forEach((id) => next.delete(id))
      } else {
        categoryIds.forEach((id) => next.add(id))
      }
      return next
    })
  }

  const selectAll = () => {
    const allIds = questionCategories.flatMap((c) => c.types.map((t) => t.id))
    const allSelected = allIds.every((id) => selectedTypes.has(id))
    if (allSelected) {
      setSelectedTypes(new Set())
    } else {
      setSelectedTypes(new Set(allIds))
    }
  }

  const totalAvailable = questionCategories.reduce((acc, c) => acc + c.types.length, 0)
  const allSelected = selectedTypes.size === totalAvailable

  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Go back"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-primary/30">
                <Brain className="size-4 text-primary" />
              </div>
              <div>
                <h1 className="text-base font-semibold text-foreground">Configure Assessment</h1>
                <p className="text-xs text-muted-foreground">Choose your question types</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className={cn(
                "tabular-nums text-xs",
                selectedTypes.size > 0
                  ? "border-primary/50 text-primary"
                  : "border-border text-muted-foreground"
              )}
            >
              {selectedTypes.size} selected
            </Badge>
            <Button
              onClick={() => onStartQuiz(Array.from(selectedTypes))}
              disabled={selectedTypes.size === 0}
              className={cn(
                "gap-2 transition-all",
                selectedTypes.size > 0
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-primary/90"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              Start Assessment
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100dvh-65px)]">
        <div className="mx-auto max-w-5xl px-6 py-8">
          {/* Description + select all */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground text-balance">
                Question Types
              </h2>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="size-3.5 text-primary" />
                Select the formats you want in your assessment
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={selectAll}
              className="gap-2 border-border/60 text-muted-foreground hover:text-foreground"
            >
              <ListChecks className="size-4" />
              {allSelected ? "Deselect all" : "Select all"}
            </Button>
          </div>

          {/* Category sections */}
          <div className="flex flex-col gap-10">
            {questionCategories.map((category) => {
              const categoryIds = category.types.map((t) => t.id)
              const selectedCount = categoryIds.filter((id) =>
                selectedTypes.has(id)
              ).length
              const allCatSelected = selectedCount === categoryIds.length

              return (
                <section key={category.id}>
                  {/* Category header */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-1.5 rounded-full"
                        style={{ background: category.color }}
                      />
                      <h3 className="text-sm font-semibold text-foreground">
                        {category.label}
                      </h3>
                      {selectedCount > 0 && (
                        <Badge
                          variant="outline"
                          className="text-[10px] tabular-nums"
                          style={{
                            borderColor: `${category.color}40`,
                            color: category.color,
                          }}
                        >
                          {selectedCount}/{categoryIds.length}
                        </Badge>
                      )}
                    </div>
                    <button
                      onClick={() => selectAllInCategory(category)}
                      className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {allCatSelected ? "Deselect all" : "Select all"}
                    </button>
                  </div>

                  {/* Type cards grid */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {category.types.map((type) => {
                      const isSelected = selectedTypes.has(type.id)
                      const Icon = iconMap[type.icon]

                      return (
                        <button
                          key={type.id}
                          onClick={() => toggleType(type.id)}
                          className={cn(
                            "group relative flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200",
                            isSelected
                              ? "border-transparent bg-card/80 shadow-lg backdrop-blur-md ring-2"
                              : "border-border/40 bg-card/40 backdrop-blur-sm hover:border-border/60 hover:bg-card/60"
                          )}
                          style={
                            isSelected
                              ? {
                                  boxShadow: `0 0 20px ${category.color}15`,
                                  // @ts-expect-error CSS custom properties
                                  "--tw-ring-color": `${category.color}60`,
                                }
                              : undefined
                          }
                        >
                          <div
                            className={cn(
                              "flex size-10 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                              isSelected
                                ? "scale-110"
                                : "group-hover:scale-105"
                            )}
                            style={{
                              background: isSelected
                                ? `${category.color}20`
                                : "var(--secondary)",
                              color: isSelected
                                ? category.color
                                : "var(--muted-foreground)",
                            }}
                          >
                            {Icon && <Icon className="size-5" />}
                          </div>
                          <span
                            className={cn(
                              "text-sm font-medium transition-colors",
                              isSelected
                                ? "text-foreground"
                                : "text-muted-foreground group-hover:text-foreground"
                            )}
                          >
                            {type.label}
                          </span>
                          {type.isNew && (
                            <Badge className="absolute -right-1 -top-1 bg-primary px-1.5 py-0 text-[9px] uppercase text-primary-foreground">
                              New
                            </Badge>
                          )}
                          {isSelected && (
                            <div
                              className="absolute right-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full"
                              style={{ background: category.color }}
                            >
                              <svg
                                className="size-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>

          {/* Bottom summary bar */}
          {selectedTypes.size > 0 && (
            <div className="sticky bottom-4 mt-10">
              <Card className="border-border/50 bg-card/80 shadow-2xl backdrop-blur-xl">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                      <ListChecks className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {selectedTypes.size} question type
                        {selectedTypes.size !== 1 ? "s" : ""} selected
                      </p>
                      <p className="text-xs text-muted-foreground">
                        from{" "}
                        {
                          questionCategories.filter((c) =>
                            c.types.some((t) => selectedTypes.has(t.id))
                          ).length
                        }{" "}
                        {questionCategories.filter((c) =>
                          c.types.some((t) => selectedTypes.has(t.id))
                        ).length === 1
                          ? "category"
                          : "categories"}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => onStartQuiz(Array.from(selectedTypes))}
                    className="gap-2 bg-primary text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-primary/90"
                  >
                    Start Assessment
                    <ArrowRight className="size-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
