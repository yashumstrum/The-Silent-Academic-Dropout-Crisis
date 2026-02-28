"use client"

import { useState, useRef, useCallback } from "react"
import { Play, Pause, CheckCircle2, Lock, Unlock, ArrowRight, Trophy, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Chapter } from "@/lib/learning-data"

interface VideoPlayerProps {
  chapter: Chapter
  videoWatched: boolean
  onVideoWatched: () => void
  quizTaken: boolean
  lastQuizScore: number | null
  onQuizComplete: (score: number) => void
}

export function VideoPlayer({
  chapter,
  videoWatched,
  onVideoWatched,
  quizTaken,
  lastQuizScore,
  onQuizComplete,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return
    const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100
    setProgress(pct)
    if (pct > 85 && !videoWatched) {
      onVideoWatched()
    }
  }, [videoWatched, onVideoWatched])

  const canUnlock = quizTaken && lastQuizScore !== null && lastQuizScore >= 90

  const quizQuestions = [
    {
      question: `Which concept is fundamental to ${chapter.title}?`,
      options: ["Core principle", "Secondary effect", "Unrelated concept", "None of these"],
      correct: 0,
    },
    {
      question: `What is the primary application of ${chapter.title}?`,
      options: ["Theoretical only", "Real-world modeling", "Historical context", "Aesthetic design"],
      correct: 1,
    },
    {
      question: `How does ${chapter.title} relate to previous topics?`,
      options: ["No connection", "Builds directly on them", "Contradicts them", "Replaces them"],
      correct: 1,
    },
  ]

  const handleSubmitQuiz = () => {
    let correct = 0
    quizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) correct++
    })
    const score = Math.round((correct / quizQuestions.length) * 100)
    onQuizComplete(score)
    setShowQuiz(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="border-border/50 bg-card/60 backdrop-blur-md shadow-lg overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Lesson: {chapter.title}</CardTitle>
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                videoWatched
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-border text-muted-foreground"
              )}
            >
              {videoWatched ? (
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="size-3" /> Watched
                </span>
              ) : (
                <span>{chapter.videoDuration}</span>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-secondary/80 ring-1 ring-border/30">
            <video
              ref={videoRef}
              src={chapter.videoUrl}
              crossOrigin="anonymous"
              className="size-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => {
                setIsPlaying(false)
                onVideoWatched()
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 transition-opacity hover:opacity-100"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-xl backdrop-blur-sm">
                {isPlaying ? <Pause className="size-6" /> : <Play className="size-6 ml-0.5" />}
              </div>
            </button>
            {!isPlaying && progress === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handlePlayPause}
                  className="flex size-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-xl transition-transform hover:scale-110"
                  aria-label="Play video"
                >
                  <Play className="size-6 ml-0.5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Progress value={progress} className="h-1.5 flex-1 bg-secondary" />
            <span className="text-xs tabular-nums text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              onClick={() => {
                setShowQuiz(true)
                setQuizAnswers([])
              }}
              disabled={!videoWatched}
              className={cn(
                "gap-2 transition-all",
                videoWatched
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {!videoWatched && <Lock className="size-4" />}
              Take Quiz
            </Button>

            <Button
              disabled={!canUnlock}
              variant={canUnlock ? "default" : "secondary"}
              className={cn(
                "gap-2 transition-all",
                canUnlock
                  ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "text-muted-foreground"
              )}
            >
              {canUnlock ? <Unlock className="size-4" /> : <Lock className="size-4" />}
              Next Topic
              <ArrowRight className="size-4" />
            </Button>
          </div>

          {quizTaken && lastQuizScore !== null && (
            <div
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3",
                lastQuizScore >= 90
                  ? "border-accent/30 bg-accent/5"
                  : "border-destructive/30 bg-destructive/5"
              )}
            >
              <Trophy
                className={cn(
                  "size-5",
                  lastQuizScore >= 90 ? "text-accent" : "text-destructive"
                )}
              />
              <div>
                <p className={cn("text-sm font-medium", lastQuizScore >= 90 ? "text-accent" : "text-destructive")}>
                  Quiz Score: {lastQuizScore}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {lastQuizScore >= 90
                    ? "Excellent! Next topic unlocked."
                    : "Score 90%+ to unlock the next topic."}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg border-border/50 bg-card shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Quiz: {chapter.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowQuiz(false)}
                  aria-label="Close quiz"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {quizQuestions.map((q, qi) => (
                <div key={qi} className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-foreground">
                    {qi + 1}. {q.question}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {q.options.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => {
                          const newAnswers = [...quizAnswers]
                          newAnswers[qi] = oi
                          setQuizAnswers(newAnswers)
                        }}
                        className={cn(
                          "rounded-lg border px-3 py-2 text-left text-sm transition-all",
                          quizAnswers[qi] === oi
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/50 bg-secondary/50 text-muted-foreground hover:border-border hover:text-foreground"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <Button
                onClick={handleSubmitQuiz}
                disabled={quizAnswers.length < quizQuestions.length || quizAnswers.some((a) => a === undefined)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Submit Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
