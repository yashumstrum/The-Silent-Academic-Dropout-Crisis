"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { SubjectView } from "@/components/dashboard/subject-view"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { LandingPage } from "@/components/dashboard/landing-page"
import { AssessmentConfig } from "@/components/dashboard/assessment-config"
import { subjectsData } from "@/lib/learning-data"

type AppView = "landing" | "assessment-config" | "dashboard"

export default function DashboardPage() {
  const [view, setView] = useState<AppView>("landing")
  const [activeSubjectId, setActiveSubjectId] = useState("physics")
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>([])

  const activeSubject = subjectsData.find((s) => s.id === activeSubjectId)!

  if (view === "landing") {
    return (
      <LandingPage
        onStartAssessment={() => setView("assessment-config")}
        onSkipToDashboard={() => setView("dashboard")}
      />
    )
  }

  if (view === "assessment-config") {
    return (
      <AssessmentConfig
        onBack={() => setView("landing")}
        onStartQuiz={(types) => {
          setSelectedQuestionTypes(types)
          setView("dashboard")
        }}
      />
    )
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Sidebar
        subjects={subjectsData}
        activeSubjectId={activeSubjectId}
        onSubjectChange={setActiveSubjectId}
      />
      <main className="flex-1 overflow-y-auto">
        <MobileNav
          subjects={subjectsData}
          activeSubjectId={activeSubjectId}
          onSubjectChange={setActiveSubjectId}
        />
        <div className="p-4 lg:p-8">
          <SubjectView subject={activeSubject} />
        </div>
      </main>
    </div>
  )
}
