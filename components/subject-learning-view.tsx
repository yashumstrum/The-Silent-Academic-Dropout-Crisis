"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Lock,
  CircleDot,
  Zap,
} from "lucide-react";
import type { Subject, Topic } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SubjectLearningViewProps {
  subject: Subject;
  onBack: () => void;
  onStartAssessment: (topic: Topic) => void;
}

export function SubjectLearningView({
  subject,
  onBack,
  onStartAssessment,
}: SubjectLearningViewProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(
    subject.topics.find((t) => !t.completed) || subject.topics[0]
  );
  const [videoWatched, setVideoWatched] = useState(selectedTopic.completed);
  const [watchProgress, setWatchProgress] = useState(
    selectedTopic.completed ? 100 : 0
  );

  useEffect(() => {
    setVideoWatched(selectedTopic.completed);
    setWatchProgress(selectedTopic.completed ? 100 : 0);
  }, [selectedTopic]);

  // Simulate video watching progress
  useEffect(() => {
    if (videoWatched || selectedTopic.completed) return;

    const interval = setInterval(() => {
      setWatchProgress((prev) => {
        if (prev >= 100) {
          setVideoWatched(true);
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [videoWatched, selectedTopic]);

  const textColorMap: Record<string, string> = {
    "text-chart-1": "text-chart-1",
    "text-chart-2": "text-chart-2",
    "text-chart-4": "text-chart-4",
  };

  const bgColorMap: Record<string, string> = {
    "text-chart-1": "bg-chart-1",
    "text-chart-2": "bg-chart-2",
    "text-chart-4": "bg-chart-4",
  };

  const textClass = textColorMap[subject.color] || "text-chart-1";
  const bgClass = bgColorMap[subject.color] || "bg-chart-1";

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h2 className={cn("text-2xl font-bold", textClass)}>
            {subject.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {subject.completedTopics}/{subject.totalTopics} topics completed
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Video Player Area */}
        <div className="flex-1">
          <div className="glass-card overflow-hidden">
            {/* Video Embed */}
            <div className="aspect-video bg-background relative">
              <iframe
                src={selectedTopic.videoUrl}
                title={selectedTopic.videoTitle}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-foreground text-lg mb-1">
                {selectedTopic.videoTitle}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Duration: {selectedTopic.duration}
              </p>

              {/* Watch progress bar */}
              {!selectedTopic.completed && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">
                      Watch Progress
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {Math.round(watchProgress)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", bgClass)}
                      style={{ width: `${watchProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Assessment Button */}
              <button
                onClick={() => onStartAssessment(selectedTopic)}
                disabled={!videoWatched}
                className={cn(
                  "w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300",
                  videoWatched
                    ? cn(bgClass, "text-background hover:opacity-90")
                    : "bg-secondary text-muted-foreground cursor-not-allowed"
                )}
              >
                {videoWatched ? (
                  <>
                    <Zap className="w-4 h-4" />
                    Start Assessment
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Complete Video to Unlock Assessment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Topic Roadmap Sidebar */}
        <div className="w-full lg:w-80">
          <div className="glass-card p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 tracking-wide uppercase">
              Topic Roadmap
            </h3>
            <div className="space-y-1">
              {subject.topics.map((topic, i) => {
                const isSelected = topic.id === selectedTopic.id;
                const isAccessible =
                  i === 0 ||
                  subject.topics[i - 1].completed;

                return (
                  <button
                    key={topic.id}
                    onClick={() => isAccessible && setSelectedTopic(topic)}
                    disabled={!isAccessible}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200",
                      isSelected
                        ? "bg-secondary border border-glass-border"
                        : isAccessible
                        ? "hover:bg-secondary/50"
                        : "opacity-40 cursor-not-allowed"
                    )}
                  >
                    {/* Node indicator */}
                    <div className="flex-shrink-0">
                      {topic.mastered ? (
                        <CheckCircle2 className="w-5 h-5 text-chart-2" />
                      ) : topic.completed ? (
                        <CircleDot className={`w-5 h-5 text-chart-3`} />
                      ) : isAccessible ? (
                        <Play className={cn("w-5 h-5", textClass)} />
                      ) : (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm font-medium truncate",
                          isSelected
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {topic.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {topic.duration}
                        {topic.masteryScore > 0 && (
                          <span
                            className={cn(
                              "ml-2 font-mono",
                              topic.mastered
                                ? "text-chart-2"
                                : "text-chart-3"
                            )}
                          >
                            {topic.masteryScore}%
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Connection line */}
                    {i < subject.topics.length - 1 && (
                      <div
                        className="absolute left-[30px] top-[48px] w-[2px] h-[16px]"
                        style={{
                          background: topic.completed
                            ? `hsl(var(--${colorToken}))`
                            : "hsl(var(--border))",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
