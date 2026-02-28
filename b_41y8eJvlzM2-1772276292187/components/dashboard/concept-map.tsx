"use client"

import { CheckCircle2, PlayCircle, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import type { Chapter } from "@/lib/learning-data"

interface ConceptMapProps {
  chapters: Chapter[]
  subjectColor: string
}

export function ConceptMap({ chapters, subjectColor }: ConceptMapProps) {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-md shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="flex size-2 rounded-full" style={{ background: subjectColor }} />
          Conceptual Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full pb-2">
          <div className="flex items-center gap-0 min-w-max pb-3">
            {chapters.map((chapter, index) => (
              <div key={chapter.id} className="flex items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "relative flex flex-col items-center gap-2",
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-12 items-center justify-center rounded-xl border-2 transition-all duration-300",
                          chapter.status === "completed" &&
                            "border-accent bg-accent/15 text-accent shadow-[0_0_15px_rgba(16,185,129,0.2)]",
                          chapter.status === "current" &&
                            "border-primary bg-primary/15 text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-pulse",
                          chapter.status === "locked" &&
                            "border-border/50 bg-secondary/50 text-muted-foreground"
                        )}
                      >
                        {chapter.status === "completed" && <CheckCircle2 className="size-5" />}
                        {chapter.status === "current" && <PlayCircle className="size-5" />}
                        {chapter.status === "locked" && <Lock className="size-4" />}
                      </div>
                      <span
                        className={cn(
                          "max-w-20 text-center text-[11px] leading-tight font-medium",
                          chapter.status === "completed" && "text-accent",
                          chapter.status === "current" && "text-primary",
                          chapter.status === "locked" && "text-muted-foreground"
                        )}
                      >
                        {chapter.title}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">{chapter.title}</p>
                    <p className="text-muted-foreground">
                      {chapter.status === "completed" && "Completed"}
                      {chapter.status === "current" && "In Progress"}
                      {chapter.status === "locked" && "Locked"}
                      {" \u00B7 "}{chapter.videoDuration}
                    </p>
                  </TooltipContent>
                </Tooltip>

                {index < chapters.length - 1 && (
                  <div className="mx-2 flex items-center">
                    <div
                      className={cn(
                        "h-0.5 w-8 rounded-full transition-colors",
                        chapter.status === "completed" && chapters[index + 1].status !== "locked"
                          ? "bg-accent"
                          : chapter.status === "completed"
                          ? "bg-accent/40"
                          : "bg-border"
                      )}
                    />
                    <div
                      className={cn(
                        "size-1.5 rounded-full -ml-0.5",
                        chapter.status === "completed" && chapters[index + 1].status !== "locked"
                          ? "bg-accent"
                          : "bg-border"
                      )}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="mt-4 flex items-center gap-6 border-t border-border/30 pt-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-border" />
            <span className="text-xs text-muted-foreground">Locked</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
