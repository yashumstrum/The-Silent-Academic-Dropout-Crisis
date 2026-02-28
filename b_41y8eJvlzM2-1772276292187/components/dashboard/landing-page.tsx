"use client"

import {
  Brain,
  Sparkles,
  Target,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface LandingPageProps {
  onStartAssessment: () => void
  onSkipToDashboard: () => void
}

const features = [
  {
    icon: Target,
    title: "Adaptive Assessments",
    description:
      "Choose your question types and difficulty. Our AI tailors every quiz to your learning style.",
    color: "text-primary",
    bg: "bg-primary/10",
    ring: "ring-primary/20",
  },
  {
    icon: TrendingUp,
    title: "Real-time Knowledge Trace",
    description:
      "Track your mastery progression with live analytics and personalized insights.",
    color: "text-accent",
    bg: "bg-accent/10",
    ring: "ring-accent/20",
  },
  {
    icon: Zap,
    title: "Gamified Learning",
    description:
      "Unlock chapters by mastering quizzes. Earn your way through a structured learning path.",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
    ring: "ring-chart-3/20",
  },
  {
    icon: Shield,
    title: "Knowledge Gap Analysis",
    description:
      "AI identifies your weak areas and recommends targeted resources for improvement.",
    color: "text-primary",
    bg: "bg-primary/10",
    ring: "ring-primary/20",
  },
]

export function LandingPage({ onStartAssessment, onSkipToDashboard }: LandingPageProps) {
  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-card/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-primary/30">
              <Brain className="size-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground">AI Learning</h1>
              <p className="text-xs text-muted-foreground">Adaptive Platform</p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={onSkipToDashboard}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            <BookOpen className="mr-2 size-4" />
            Go to Dashboard
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 size-80 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-32">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              AI-Powered Adaptive Learning
            </div>

            <h2 className="max-w-3xl text-4xl font-bold leading-tight text-foreground lg:text-6xl text-balance">
              Learn Smarter with{" "}
              <span className="text-primary">Personalized</span>{" "}
              Assessments
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
              Configure your ideal quiz experience from 20+ question types across 5 categories.
              Our AI adapts to your performance in real-time, identifying gaps and
              accelerating mastery.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={onStartAssessment}
                className="gap-2 bg-primary px-8 text-primary-foreground shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"
              >
                <BarChart3 className="size-4" />
                Take Assessment
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onSkipToDashboard}
                className="gap-2 border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
              >
                Explore Dashboard
              </Button>
            </div>

            {/* Stats row */}
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border/30 pt-10 lg:gap-16">
              {[
                { value: "20+", label: "Question Types" },
                { value: "5", label: "Categories" },
                { value: "3", label: "Subjects" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-bold text-foreground lg:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground lg:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/30 bg-card/20">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-semibold text-foreground lg:text-3xl text-balance">
              Everything you need to{" "}
              <span className="text-accent">master</span> any subject
            </h3>
            <p className="mt-3 text-sm text-muted-foreground lg:text-base">
              A complete adaptive learning system powered by AI
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group border-border/40 bg-card/60 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-border/60 hover:shadow-xl"
              >
                <CardContent className="flex flex-col gap-4 p-6">
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl ${feature.bg} ring-1 ${feature.ring} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className={`size-5 ${feature.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      {feature.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border/30">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h3 className="text-xl font-semibold text-foreground lg:text-2xl text-balance">
            Ready to discover your strengths?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Configure your assessment and start your personalized learning journey.
          </p>
          <Button
            size="lg"
            onClick={onStartAssessment}
            className="mt-8 gap-2 bg-primary px-8 text-primary-foreground shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:bg-primary/90"
          >
            Configure Assessment
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}
