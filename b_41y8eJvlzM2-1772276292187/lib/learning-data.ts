// --- Question type categories for assessment config ---

export interface QuestionType {
  id: string
  label: string
  icon: string
  isNew?: boolean
}

export interface QuestionCategory {
  id: string
  label: string
  color: string
  types: QuestionType[]
}

export const questionCategories: QuestionCategory[] = [
  {
    id: "basic",
    label: "Basic",
    color: "#ec4899",
    types: [
      { id: "multiple-choice", label: "Multiple choice", icon: "check-square" },
      { id: "multi-select", label: "Multi-select", icon: "check-check" },
      { id: "true-or-false", label: "True or false", icon: "circle-dot" },
      { id: "fill-blanks", label: "Fill in the blanks", icon: "pen-line" },
      { id: "open-ended-basic", label: "Open ended", icon: "align-left" },
      { id: "passage", label: "Passage", icon: "book-open" },
    ],
  },
  {
    id: "interactive",
    label: "Interactive & higher order",
    color: "#10b981",
    types: [
      { id: "drag-and-drop", label: "Drag and drop", icon: "hand" },
      { id: "dropdown", label: "Dropdown", icon: "chevron-down-square" },
      { id: "categorize", label: "Categorize", icon: "layout-grid" },
      { id: "reorder", label: "Reorder", icon: "arrow-down-up" },
      { id: "match", label: "Match", icon: "puzzle" },
      { id: "hot-text", label: "Hot text", icon: "text-select", isNew: true },
    ],
  },
  {
    id: "visual",
    label: "Visual learning",
    color: "#ef4444",
    types: [
      { id: "labeling", label: "Labeling", icon: "image" },
      { id: "hotspot", label: "Hotspot", icon: "target" },
    ],
  },
  {
    id: "math",
    label: "Math",
    color: "#f59e0b",
    types: [
      { id: "graphing", label: "Graphing", icon: "line-chart" },
      { id: "math-response", label: "Math response", icon: "function-square" },
    ],
  },
  {
    id: "open-ended",
    label: "Open ended",
    color: "#3b82f6",
    types: [
      { id: "draw", label: "Draw", icon: "pen-tool" },
      { id: "video-response", label: "Video response", icon: "video" },
      { id: "audio-response", label: "Audio response", icon: "volume-2" },
      { id: "poll", label: "Poll", icon: "bar-chart-3" },
      { id: "word-cloud", label: "Word cloud", icon: "cloud" },
    ],
  },
]

// --- Subject & chapter types ---

export type ChapterStatus = "completed" | "current" | "locked"

export interface Chapter {
  id: string
  title: string
  status: ChapterStatus
  videoUrl: string
  videoDuration: string
}

export interface QuizScore {
  chapterId: string
  chapterTitle: string
  score: number
  date: string
}

export interface KnowledgeGap {
  topic: string
  severity: "high" | "medium" | "low"
  recommendation: string
}

export interface MasteryPoint {
  date: string
  mastery: number
}

export interface SubjectData {
  id: string
  name: string
  icon: string
  color: string
  chapters: Chapter[]
  quizScores: QuizScore[]
  knowledgeGaps: KnowledgeGap[]
  masteryTrace: MasteryPoint[]
  totalProgress: number
  averageMastery: number
  chaptersMastered: number
}

export const subjectsData: SubjectData[] = [
  {
    id: "physics",
    name: "Physics",
    icon: "atom",
    color: "#3b82f6",
    chapters: [
      { id: "p1", title: "Kinematics", status: "completed", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "24:30" },
      { id: "p2", title: "Newton's Laws", status: "completed", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "31:15" },
      { id: "p3", title: "Work & Energy", status: "completed", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "28:45" },
      { id: "p4", title: "Rotational Motion", status: "current", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "35:20" },
      { id: "p5", title: "Gravitation", status: "locked", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "27:10" },
      { id: "p6", title: "Oscillations", status: "locked", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "22:55" },
      { id: "p7", title: "Waves", status: "locked", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "30:00" },
    ],
    quizScores: [
      { chapterId: "p1", chapterTitle: "Kinematics", score: 95, date: "Jan 15" },
      { chapterId: "p2", chapterTitle: "Newton's Laws", score: 88, date: "Jan 28" },
      { chapterId: "p3", chapterTitle: "Work & Energy", score: 92, date: "Feb 10" },
    ],
    knowledgeGaps: [
      { topic: "Torque in non-inertial frames", severity: "high", recommendation: "Review angular momentum conservation" },
      { topic: "Friction on inclined planes", severity: "medium", recommendation: "Practice free-body diagram problems" },
      { topic: "Energy-momentum relation", severity: "low", recommendation: "Solve more collision problems" },
    ],
    masteryTrace: [
      { date: "Week 1", mastery: 42 },
      { date: "Week 2", mastery: 55 },
      { date: "Week 3", mastery: 61 },
      { date: "Week 4", mastery: 68 },
      { date: "Week 5", mastery: 74 },
      { date: "Week 6", mastery: 78 },
      { date: "Week 7", mastery: 82 },
      { date: "Week 8", mastery: 76 },
      { date: "Week 9", mastery: 83 },
      { date: "Week 10", mastery: 87 },
    ],
    totalProgress: 43,
    averageMastery: 87,
    chaptersMastered: 3,
  },
  {
    id: "chemistry",
    name: "Organic Chemistry",
    icon: "flask",
    color: "#10b981",
    chapters: [
      { id: "c1", title: "Hydrocarbons", status: "completed", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "26:40" },
      { id: "c2", title: "Stereochemistry", status: "completed", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "33:20" },
      { id: "c3", title: "Alkyl Halides", status: "current", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "29:15" },
      { id: "c4", title: "Alcohols & Ethers", status: "locked", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "25:50" },
      { id: "c5", title: "Carbonyl Compounds", status: "locked", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "38:30" },
      { id: "c6", title: "Amines", status: "locked", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "21:45" },
    ],
    quizScores: [
      { chapterId: "c1", chapterTitle: "Hydrocarbons", score: 91, date: "Jan 20" },
      { chapterId: "c2", chapterTitle: "Stereochemistry", score: 85, date: "Feb 5" },
    ],
    knowledgeGaps: [
      { topic: "SN1 vs SN2 mechanisms", severity: "high", recommendation: "Compare reaction conditions side by side" },
      { topic: "E/Z nomenclature in alkenes", severity: "medium", recommendation: "Practice Cahn-Ingold-Prelog rules" },
    ],
    masteryTrace: [
      { date: "Week 1", mastery: 35 },
      { date: "Week 2", mastery: 48 },
      { date: "Week 3", mastery: 56 },
      { date: "Week 4", mastery: 63 },
      { date: "Week 5", mastery: 59 },
      { date: "Week 6", mastery: 67 },
      { date: "Week 7", mastery: 72 },
      { date: "Week 8", mastery: 78 },
    ],
    totalProgress: 33,
    averageMastery: 78,
    chaptersMastered: 2,
  },
  {
    id: "calculus",
    name: "Calculus",
    icon: "sigma",
    color: "#8b5cf6",
    chapters: [
      { id: "m1", title: "Limits & Continuity", status: "completed", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "27:00" },
      { id: "m2", title: "Differentiation", status: "completed", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "34:10" },
      { id: "m3", title: "Applications of Derivatives", status: "completed", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "29:45" },
      { id: "m4", title: "Integration", status: "completed", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "36:20" },
      { id: "m5", title: "Definite Integrals", status: "current", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "31:30" },
      { id: "m6", title: "Differential Equations", status: "locked", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "40:15" },
      { id: "m7", title: "Vector Calculus", status: "locked", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "35:55" },
      { id: "m8", title: "Multivariable Calculus", status: "locked", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", videoDuration: "42:00" },
    ],
    quizScores: [
      { chapterId: "m1", chapterTitle: "Limits & Continuity", score: 97, date: "Jan 10" },
      { chapterId: "m2", chapterTitle: "Differentiation", score: 94, date: "Jan 24" },
      { chapterId: "m3", chapterTitle: "Applications of Derivatives", score: 91, date: "Feb 8" },
      { chapterId: "m4", chapterTitle: "Integration", score: 89, date: "Feb 22" },
    ],
    knowledgeGaps: [
      { topic: "Integration by parts strategy", severity: "medium", recommendation: "Practice LIATE selection rule" },
      { topic: "Improper integrals convergence", severity: "high", recommendation: "Review comparison tests" },
      { topic: "Partial fractions decomposition", severity: "low", recommendation: "Drill more examples" },
    ],
    masteryTrace: [
      { date: "Week 1", mastery: 50 },
      { date: "Week 2", mastery: 58 },
      { date: "Week 3", mastery: 66 },
      { date: "Week 4", mastery: 73 },
      { date: "Week 5", mastery: 79 },
      { date: "Week 6", mastery: 82 },
      { date: "Week 7", mastery: 86 },
      { date: "Week 8", mastery: 84 },
      { date: "Week 9", mastery: 88 },
      { date: "Week 10", mastery: 91 },
      { date: "Week 11", mastery: 93 },
    ],
    totalProgress: 50,
    averageMastery: 93,
    chaptersMastered: 4,
  },
]
