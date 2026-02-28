"use client"

import { useState } from "react"
import type { SubjectData } from "@/lib/learning-data"
import { ConceptMap } from "./concept-map"
import { VideoPlayer } from "./video-player"
import { StatsCards } from "./stats-cards"
import { PerformanceSection } from "./performance-section"

interface SubjectViewProps {
  subject: SubjectData
}

export function SubjectView({ subject }: SubjectViewProps) {
  const [videoWatched, setVideoWatched] = useState(false)
  const [quizTaken, setQuizTaken] = useState(false)
  const [lastQuizScore, setLastQuizScore] = useState<number | null>(null)

  const currentChapter = subject.chapters.find((c) => c.status === "current")

  const handleQuizComplete = (score: number) => {
    setLastQuizScore(score)
    setQuizTaken(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground text-balance">{subject.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {currentChapter ? `Currently studying: ${currentChapter.title}` : "All chapters completed"}
        </p>
      </div>

      <StatsCards subject={subject} />

      <ConceptMap chapters={subject.chapters} subjectColor={subject.color} />

      {currentChapter && (
        <VideoPlayer
          chapter={currentChapter}
          videoWatched={videoWatched}
          onVideoWatched={() => setVideoWatched(true)}
          quizTaken={quizTaken}
          lastQuizScore={lastQuizScore}
          onQuizComplete={handleQuizComplete}
        />
      )}

      <PerformanceSection subject={subject} />
    </div>
  )
}
