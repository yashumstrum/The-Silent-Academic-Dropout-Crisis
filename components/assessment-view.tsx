"use client";

import { useState, useCallback, useEffect } from "react";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  BarChart3,
  Sparkles,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import type { Subject, Topic, QuizQuestion, AssessmentResult } from "@/lib/data";
import { questionBank, defaultQuestions } from "@/lib/data";
import { cn } from "@/lib/utils";

type Difficulty = "foundational" | "intermediate" | "advanced";
type Phase = "setup" | "generating" | "quiz" | "analyzing" | "results";

interface AssessmentViewProps {
  subject: Subject;
  topic: Topic;
  onBack: () => void;
  onBackToReport: () => void;
}

export function AssessmentView({
  subject,
  topic,
  onBack,
  onBackToReport,
}: AssessmentViewProps) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);

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
  const bgFaintMap: Record<string, string> = {
    "text-chart-1": "bg-chart-1/10",
    "text-chart-2": "bg-chart-2/10",
    "text-chart-4": "bg-chart-4/10",
  };
  const borderMap: Record<string, string> = {
    "text-chart-1": "border-chart-1/50",
    "text-chart-2": "border-chart-2/50",
    "text-chart-4": "border-chart-4/50",
  };
  const bgVFaintMap: Record<string, string> = {
    "text-chart-1": "bg-chart-1/5",
    "text-chart-2": "bg-chart-2/5",
    "text-chart-4": "bg-chart-4/5",
  };
  const bgFaint20Map: Record<string, string> = {
    "text-chart-1": "bg-chart-1/20",
    "text-chart-2": "bg-chart-2/20",
    "text-chart-4": "bg-chart-4/20",
  };

  const textClass = textColorMap[subject.color] || "text-chart-1";
  const bgClass = bgColorMap[subject.color] || "bg-chart-1";
  const bgFaintClass = bgFaintMap[subject.color] || "bg-chart-1/10";
  const borderClass = borderMap[subject.color] || "border-chart-1/50";
  const bgVFaintClass = bgVFaintMap[subject.color] || "bg-chart-1/5";
  const bgFaint20Class = bgFaint20Map[subject.color] || "bg-chart-1/20";

  const handleStartAssessment = useCallback(async () => {
    setPhase("generating");

    // Simulate AI question generation delay
    await new Promise((r) => setTimeout(r, 2500));

    // Get questions from the bank or use defaults
    const subjectQuestions = questionBank[subject.id];
    const topicQuestions = subjectQuestions?.[topic.title];
    const qs = topicQuestions || defaultQuestions;

    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrentQ(0);
    setSelectedAnswer(null);
    setPhase("quiz");
  }, [subject.id, topic.title]);

  const handleSelectAnswer = (answerIdx: number) => {
    setSelectedAnswer(answerIdx);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQ] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
    } else {
      // Submit for analysis
      submitForAnalysis(newAnswers);
    }
  };

  const submitForAnalysis = async (finalAnswers: (number | null)[]) => {
    setPhase("analyzing");

    const responses = finalAnswers.map(
      (ans, i) => ans === questions[i].correctAnswer
    );
    const questionConcepts = questions.map((q) => q.conceptTag);

    try {
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectId: subject.id,
          topicTitle: topic.title,
          responses,
          difficulty,
          questionConcepts,
        }),
      });

      const data = await res.json();
      setResult(data);
      setPhase("results");
    } catch {
      // Fallback result on error
      const correct = responses.filter(Boolean).length;
      setResult({
        passed: correct >= 4,
        masteryProbability: correct / responses.length,
        score: (correct / responses.length) * 100,
        totalQuestions: responses.length,
        correctAnswers: correct,
        weakConcepts: questions
          .filter((_, i) => !responses[i])
          .map((q) => q.conceptTag),
        remediationVideos: [],
        bktAnalysis: { pLearn: 0.1, pGuess: 0.2, pSlip: 0.15, pKnown: correct / responses.length },
      });
      setPhase("results");
    }
  };

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
            Assessment: {topic.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {subject.name} - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Difficulty
          </p>
        </div>
      </div>

      {/* Phase: Setup */}
      {phase === "setup" && (
        <SetupPhase
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onStart={handleStartAssessment}
          textClass={textClass}
          bgClass={bgClass}
          bgFaintClass={bgFaintClass}
          borderClass={borderClass}
          bgVFaintClass={bgVFaintClass}
          topicTitle={topic.title}
        />
      )}

      {/* Phase: Generating Questions */}
      {phase === "generating" && <GeneratingPhase topicTitle={topic.title} />}

      {/* Phase: Quiz */}
      {phase === "quiz" && questions.length > 0 && (
        <QuizPhase
          question={questions[currentQ]}
          questionIndex={currentQ}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          onNext={handleNextQuestion}
          bgClass={bgClass}
          borderClass={borderClass}
          bgVFaintClass={bgVFaintClass}
          bgFaint20Class={bgFaint20Class}
          textClass={textClass}
          isLast={currentQ === questions.length - 1}
        />
      )}

      {/* Phase: Analyzing */}
      {phase === "analyzing" && <AnalyzingPhase />}

      {/* Phase: Results */}
      {phase === "results" && result && (
        <ResultsPhase
          result={result}
          questions={questions}
          answers={answers}
          bgClass={bgClass}
          onRetry={handleStartAssessment}
          onBackToReport={onBackToReport}
        />
      )}
    </div>
  );
}

/* ================================================================ */
/* Sub-components                                                    */
/* ================================================================ */

function SetupPhase({
  difficulty,
  setDifficulty,
  onStart,
  textClass,
  bgClass,
  bgFaintClass,
  borderClass,
  bgVFaintClass,
  topicTitle,
}: {
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  onStart: () => void;
  textClass: string;
  bgClass: string;
  bgFaintClass: string;
  borderClass: string;
  bgVFaintClass: string;
  topicTitle: string;
}) {
  const difficulties: { value: Difficulty; label: string; desc: string }[] = [
    {
      value: "foundational",
      label: "Foundational",
      desc: "Core concepts and basic recall questions",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      desc: "Application-based and logic questions",
    },
    {
      value: "advanced",
      label: "Advanced",
      desc: "Complex reasoning and blunder-check questions",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-8 text-center">
        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4", bgFaintClass)}>
          <Sparkles className={cn("w-8 h-8", textClass)} />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          AI-Powered Assessment
        </h3>
        <p className="text-muted-foreground mb-6">
          Test your mastery of <span className="text-foreground font-medium">{topicTitle}</span>. 
          The AI will generate personalized questions and use Bayesian Knowledge Tracing 
          to analyze whether you truly understand the concepts.
        </p>

        <div className="space-y-3 mb-8">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Select Difficulty
          </p>
          {difficulties.map((d) => (
            <button
              key={d.value}
              onClick={() => setDifficulty(d.value)}
              className={cn(
                "w-full p-4 rounded-lg text-left transition-all duration-200 border",
                difficulty === d.value
                  ? cn(borderClass, bgVFaintClass)
                  : "border-border hover:border-glass-border bg-secondary/30"
              )}
            >
              <p
                className={cn(
                  "font-medium",
                  difficulty === d.value
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {d.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{d.desc}</p>
            </button>
          ))}
        </div>

        <button
          onClick={onStart}
          className={cn("w-full py-3 rounded-lg font-semibold text-sm text-background hover:opacity-90 transition-opacity flex items-center justify-center gap-2", bgClass)}
        >
          <Play className="w-4 h-4" />
          Start Assessment
        </button>
      </div>
    </div>
  );
}

function GeneratingPhase({ topicTitle }: { topicTitle: string }) {
  return (
    <div className="max-w-lg mx-auto">
      <div className="glass-card p-12 text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <Sparkles className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">
          AI is Generating Questions
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Scanning video transcript for{" "}
          <span className="text-foreground font-medium">{topicTitle}</span> to
          generate personalized questions...
        </p>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden max-w-xs mx-auto">
          <div className="h-full rounded-full bg-primary animate-scanning w-1/3" />
        </div>
      </div>
    </div>
  );
}

function QuizPhase({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  bgClass,
  borderClass,
  bgVFaintClass,
  bgFaint20Class,
  textClass,
  isLast,
}: {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (idx: number) => void;
  onNext: () => void;
  bgClass: string;
  borderClass: string;
  bgVFaintClass: string;
  bgFaint20Class: string;
  textClass: string;
  isLast: boolean;
}) {
  const typeLabels: Record<string, { label: string; color: string }> = {
    basic: { label: "Basic Recall", color: "text-chart-2" },
    logic: { label: "Logic Based", color: "text-chart-1" },
    "blunder-check": { label: "Blunder Check", color: "text-chart-3" },
  };

  const typeInfo = typeLabels[question.type] || typeLabels.basic;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          <span className={cn("text-xs font-medium px-2 py-0.5 rounded", typeInfo.color, "bg-secondary")}>
            {typeInfo.label}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-300", bgClass)}
            style={{
              width: `${((questionIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="glass-card p-8">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
          Concept: {question.conceptTag}
        </p>
        <h3 className="text-lg font-semibold text-foreground mb-6">
          {question.question}
        </h3>

        <div className="space-y-3 mb-8">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onSelectAnswer(idx)}
              className={cn(
                "w-full p-4 rounded-lg text-left transition-all duration-200 border",
                selectedAnswer === idx
                  ? cn(borderClass, bgVFaintClass)
                  : "border-border hover:border-glass-border bg-secondary/30"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono flex-shrink-0",
                    selectedAnswer === idx
                      ? cn(bgFaint20Class, textClass)
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <span
                  className={cn(
                    "text-sm",
                    selectedAnswer === idx
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {option}
                </span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={selectedAnswer === null}
          className={cn(
            "w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all",
            selectedAnswer !== null
              ? `bg-${colorToken} text-background hover:opacity-90`
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          )}
        >
          {isLast ? "Submit Assessment" : "Next Question"}
        </button>
      </div>
    </div>
  );
}

function AnalyzingPhase() {
  const steps = [
    "Collecting response data...",
    "Running Bayesian Knowledge Tracing...",
    "Calculating mastery probability...",
    "Identifying conceptual gaps...",
    "Preparing recommendations...",
  ];

  const [step, setStep] = useState(0);

  // Advance steps
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < steps.length) {
        setStep(i);
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <div className="glass-card p-12 text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-chart-3/20" />
          <div className="absolute inset-0 rounded-full border-2 border-chart-3 border-t-transparent animate-spin" />
          <BarChart3 className="w-8 h-8 text-chart-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">
          Calculating Mastery Probability...
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          pyBKT engine is analyzing your responses
        </p>
        <div className="space-y-2 text-left max-w-xs mx-auto">
          {steps.map((s, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-2 text-xs transition-all duration-300",
                i <= step ? "text-foreground" : "text-muted-foreground/40"
              )}
            >
              {i < step ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-chart-2 flex-shrink-0" />
              ) : i === step ? (
                <Loader2 className="w-3.5 h-3.5 text-chart-3 animate-spin flex-shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-muted-foreground/30 flex-shrink-0" />
              )}
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultsPhase({
  result,
  questions,
  answers,
  colorToken,
  onRetry,
  onBackToReport,
}: {
  result: AssessmentResult;
  questions: QuizQuestion[];
  answers: (number | null)[];
  colorToken: string;
  onRetry: () => void;
  onBackToReport: () => void;
}) {
  const bktTrace = (result.bktAnalysis as Record<string, unknown>).trace as number[] | undefined;

  const traceData = bktTrace
    ? bktTrace.map((v, i) => ({
        step: i === 0 ? "Prior" : `Q${i}`,
        mastery: Math.round(v * 100),
      }))
    : [];

  const questionResults = questions.map((q, i) => ({
    question: `Q${i + 1}`,
    correct: answers[i] === q.correctAnswer ? 1 : 0,
    concept: q.conceptTag,
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Result Banner */}
      <div
        className={cn(
          "glass-card p-8 text-center border-2",
          result.passed ? "border-chart-2/30" : "border-destructive/30"
        )}
      >
        <div
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
            result.passed ? "bg-chart-2/10" : "bg-destructive/10"
          )}
        >
          {result.passed ? (
            <CheckCircle2 className="w-10 h-10 text-chart-2" />
          ) : (
            <AlertTriangle className="w-10 h-10 text-destructive" />
          )}
        </div>
        <h3
          className={cn(
            "text-2xl font-bold mb-2",
            result.passed ? "text-chart-2" : "text-destructive"
          )}
        >
          {result.passed ? "Concept Mastered!" : "Knowledge Gap Detected"}
        </h3>
        <p className="text-muted-foreground">
          {result.passed
            ? "Bayesian analysis confirms true understanding. You can proceed to the next topic."
            : "The BKT engine detected potential guessing patterns. Review the weak concepts below."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Score"
          value={`${result.score}%`}
          color={result.score >= 90 ? "text-chart-2" : result.score >= 50 ? "text-chart-3" : "text-destructive"}
        />
        <StatCard
          label="Correct"
          value={`${result.correctAnswers}/${result.totalQuestions}`}
          color="text-foreground"
        />
        <StatCard
          label="Mastery P(L)"
          value={`${Math.round(result.masteryProbability * 100)}%`}
          color={result.masteryProbability >= 0.7 ? "text-chart-2" : "text-chart-3"}
        />
        <StatCard
          label="P(Guess)"
          value={`${Math.round(result.bktAnalysis.pGuess * 100)}%`}
          color="text-muted-foreground"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BKT Trace */}
        {traceData.length > 0 && (
          <div className="glass-card p-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
              BKT Mastery Trace
            </h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={traceData}>
                  <CartesianGrid stroke="hsl(var(--border))" opacity={0.3} strokeDasharray="3 3" />
                  <XAxis dataKey="step" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mastery"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                    name="Mastery %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Question Results */}
        <div className="glass-card p-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Question Breakdown
          </h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={questionResults}>
                <CartesianGrid stroke="hsl(var(--border))" opacity={0.3} strokeDasharray="3 3" />
                <XAxis dataKey="question" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis domain={[0, 1]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [value === 1 ? "Correct" : "Incorrect"]}
                />
                <Bar
                  dataKey="correct"
                  fill="hsl(var(--chart-2))"
                  radius={[4, 4, 0, 0]}
                  name="Result"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weak Concepts & Remediation */}
      {!result.passed && result.weakConcepts.length > 0 && (
        <div className="glass-card p-6 border border-destructive/20">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-chart-3" />
            <h4 className="text-sm font-medium text-foreground uppercase tracking-wide">
              Conceptual Blunders Identified
            </h4>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {result.weakConcepts.map((concept) => (
              <span
                key={concept}
                className="px-3 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20"
              >
                {concept}
              </span>
            ))}
          </div>

          {result.remediationVideos.length > 0 && (
            <>
              <h5 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                Remediation Videos
              </h5>
              <div className="space-y-3">
                {result.remediationVideos.map((video, i) => (
                  <a
                    key={i}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-transparent hover:border-glass-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-chart-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {video.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Remediation for: {video.concept}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {!result.passed && (
          <button
            onClick={onRetry}
            className={`flex-1 py-3 rounded-lg font-semibold text-sm bg-${colorToken} text-background hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
          >
            Retry Assessment
          </button>
        )}
        <button
          onClick={onBackToReport}
          className="flex-1 py-3 rounded-lg font-semibold text-sm bg-secondary text-foreground hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="glass-card p-4 text-center">
      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
        {label}
      </p>
      <p className={cn("text-2xl font-bold font-mono", color)}>{value}</p>
    </div>
  );
}
