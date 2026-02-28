"use client";

import {
  Atom,
  Calculator,
  Brain,
  ArrowRight,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import type { Subject } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Atom,
  Calculator,
  Brain,
};

interface SubjectCardProps {
  subject: Subject;
  onContinueLearning: (subjectId: string) => void;
  index: number;
}

export function SubjectCard({
  subject,
  onContinueLearning,
  index,
}: SubjectCardProps) {
  const Icon = iconMap[subject.icon] || BookOpen;
  const masteryPercent = Math.round(subject.masteryProbability * 100);

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

  const borderHoverClasses: Record<string, string> = {
    "text-chart-1": "hover:border-chart-1/30",
    "text-chart-2": "hover:border-chart-2/30",
    "text-chart-4": "hover:border-chart-4/30",
  };

  const progressBarClasses: Record<string, string> = {
    "text-chart-1": "bg-chart-1",
    "text-chart-2": "bg-chart-2",
    "text-chart-4": "bg-chart-4",
  };

  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300 animate-fade-in-up",
        borderHoverClasses[subject.color]
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              bgClasses[subject.color]
            )}
          >
            <Icon className={cn("w-5 h-5", colorClasses[subject.color])} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{subject.name}</h3>
            <p className="text-xs text-muted-foreground">
              {subject.completedTopics}/{subject.totalTopics} topics completed
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={cn("text-2xl font-bold font-mono", colorClasses[subject.color])}>
            {masteryPercent}%
          </p>
          <p className="text-xs text-muted-foreground">mastery</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground">Course Progress</span>
          <span className="text-xs font-mono text-muted-foreground">
            {subject.progress}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 animate-fill",
              progressBarClasses[subject.color]
            )}
            style={{ width: `${subject.progress}%` }}
          />
        </div>
      </div>

      {/* Topic summary */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {subject.topics.slice(0, 6).map((topic) => (
          <div
            key={topic.id}
            className={cn(
              "px-2 py-0.5 rounded text-xs",
              topic.mastered
                ? "bg-chart-2/15 text-chart-2"
                : topic.completed
                ? "bg-chart-3/15 text-chart-3"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {topic.mastered && (
              <CheckCircle2 className="w-3 h-3 inline mr-1" />
            )}
            {topic.title.length > 16
              ? topic.title.slice(0, 16) + "..."
              : topic.title}
          </div>
        ))}
        {subject.topics.length > 6 && (
          <div className="px-2 py-0.5 rounded text-xs bg-secondary text-muted-foreground">
            +{subject.topics.length - 6} more
          </div>
        )}
      </div>

      <button
        onClick={() => onContinueLearning(subject.id)}
        className={cn(
          "w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200",
          "bg-secondary hover:bg-secondary/80 text-foreground",
          "border border-transparent",
          borderHoverClasses[subject.color]
        )}
      >
        Continue Learning
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
