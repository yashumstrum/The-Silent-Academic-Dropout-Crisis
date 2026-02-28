"use client";

import { useState, useCallback } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { StatsBar } from "@/components/stats-bar";
import { MasteryRadarChart } from "@/components/mastery-radar-chart";
import { ProgressGraph } from "@/components/progress-graph";
import { SubjectCard } from "@/components/subject-card";
import { SubjectLearningView } from "@/components/subject-learning-view";
import { AssessmentView } from "@/components/assessment-view";
import { subjects as initialSubjects, type Topic } from "@/lib/data";

type DashboardState =
  | { mode: "report" }
  | { mode: "learning"; subjectId: string }
  | { mode: "assessment"; subjectId: string; topic: Topic };

export default function Dashboard() {
  const [state, setState] = useState<DashboardState>({ mode: "report" });
  const [subjectsData] = useState(initialSubjects);

  const handleContinueLearning = useCallback((subjectId: string) => {
    setState({ mode: "learning", subjectId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBackToReport = useCallback(() => {
    setState({ mode: "report" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleStartAssessment = useCallback(
    (topic: Topic, subjectId: string) => {
      setState({ mode: "assessment", subjectId, topic });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  const currentSubject =
    state.mode !== "report"
      ? subjectsData.find((s) => s.id === state.subjectId)
      : null;

  return (
    <div className="min-h-screen cyber-grid">
      <DashboardHeader
        studentName="Alex Johnson"
        onLogoClick={handleBackToReport}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stage 1: Student Command Center (Report) */}
        {state.mode === "report" && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Welcome */}
            <div>
              <h2 className="text-3xl font-bold text-foreground text-balance">
                Student Command Center
              </h2>
              <p className="text-muted-foreground mt-1">
                Your personalized learning analytics and progress overview
              </p>
            </div>

            {/* Stats Row */}
            <StatsBar subjects={subjectsData} />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MasteryRadarChart subjects={subjectsData} />
              <ProgressGraph subjects={subjectsData} />
            </div>

            {/* Subject Cards */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Your Subjects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjectsData.map((subject, i) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    onContinueLearning={handleContinueLearning}
                    index={i}
                  />
                ))}
              </div>
            </div>

            {/* Per Subject Detailed Report */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Per-Subject Breakdown
              </h3>
              <div className="space-y-4">
                {subjectsData.map((subject) => (
                  <SubjectDetailRow
                    key={subject.id}
                    subject={subject}
                    onContinue={() => handleContinueLearning(subject.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stage 2: Subject Deep-Dive (Learning Mode) */}
        {state.mode === "learning" && currentSubject && (
          <SubjectLearningView
            subject={currentSubject}
            onBack={handleBackToReport}
            onStartAssessment={(topic) =>
              handleStartAssessment(topic, currentSubject.id)
            }
          />
        )}

        {/* Stage 3: Dynamic Assessment (AI Quiz Mode) */}
        {state.mode === "assessment" && currentSubject && (
          <AssessmentView
            subject={currentSubject}
            topic={state.topic}
            onBack={() =>
              setState({ mode: "learning", subjectId: currentSubject.id })
            }
            onBackToReport={handleBackToReport}
          />
        )}
      </main>
    </div>
  );
}

/* ============================================ */
/* Per-Subject Breakdown Row                     */
/* ============================================ */

import {
  Atom,
  Calculator,
  Brain,
  BookOpen,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import type { Subject } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Atom,
  Calculator,
  Brain,
};

function SubjectDetailRow({
  subject,
  onContinue,
}: {
  subject: Subject;
  onContinue: () => void;
}) {
  const Icon = iconMap[subject.icon] || BookOpen;

  const colorClasses: Record<string, string> = {
    "text-chart-1": "text-chart-1",
    "text-chart-2": "text-chart-2",
    "text-chart-4": "text-chart-4",
  };

  const bgClasses: Record<string, string> = {
    "text-chart-1": "bg-chart-1/10",
    "text-chart-2": "bg-chart-2/10",
    "text-chart-4": "bg-chart-4/10",
  };

  return (
    <div className="glass-card p-5">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Subject info */}
        <div className="flex items-center gap-3 md:w-48">
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              bgClasses[subject.color]
            )}
          >
            <Icon className={cn("w-5 h-5", colorClasses[subject.color])} />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm">
              {subject.name}
            </h4>
            <p className="text-xs text-muted-foreground">
              {subject.completedTopics}/{subject.totalTopics} topics
            </p>
          </div>
        </div>

        {/* Topic pills */}
        <div className="flex-1 flex flex-wrap gap-1.5">
          {subject.topics.map((topic) => (
            <div
              key={topic.id}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded text-xs",
                topic.mastered
                  ? "bg-chart-2/10 text-chart-2"
                  : topic.completed
                  ? "bg-chart-3/10 text-chart-3"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {topic.mastered ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : topic.completed ? (
                <XCircle className="w-3 h-3" />
              ) : null}
              <span className="truncate max-w-[100px]">{topic.title}</span>
              {topic.masteryScore > 0 && (
                <span className="font-mono ml-0.5">{topic.masteryScore}%</span>
              )}
            </div>
          ))}
        </div>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium text-foreground transition-colors flex-shrink-0"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
