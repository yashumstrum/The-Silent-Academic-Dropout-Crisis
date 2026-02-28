export interface Topic {
  id: string;
  title: string;
  videoUrl: string;
  videoTitle: string;
  duration: string;
  completed: boolean;
  mastered: boolean;
  masteryScore: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  glowClass: string;
  progress: number;
  masteryProbability: number;
  totalTopics: number;
  completedTopics: number;
  topics: Topic[];
  weeklyScores: number[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  type: "basic" | "logic" | "blunder-check";
  conceptTag: string;
}

export interface AssessmentResult {
  passed: boolean;
  masteryProbability: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  weakConcepts: string[];
  remediationVideos: { title: string; url: string; concept: string }[];
  bktAnalysis: {
    pLearn: number;
    pGuess: number;
    pSlip: number;
    pKnown: number;
  };
}

export const subjects: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    icon: "Atom",
    color: "text-chart-1",
    glowClass: "glow-cyan",
    progress: 65,
    masteryProbability: 0.72,
    totalTopics: 8,
    completedTopics: 5,
    weeklyScores: [45, 52, 60, 58, 65, 72, 70],
    topics: [
      {
        id: "ph-1",
        title: "Newton's Laws of Motion",
        videoUrl: "https://www.youtube.com/embed/kKKM8Y-u7ds",
        videoTitle: "Newton's Laws of Motion - Complete Guide",
        duration: "18:30",
        completed: true,
        mastered: true,
        masteryScore: 95,
      },
      {
        id: "ph-2",
        title: "Work, Energy & Power",
        videoUrl: "https://www.youtube.com/embed/w4QFJb9a8vo",
        videoTitle: "Work Energy and Power - Physics",
        duration: "22:15",
        completed: true,
        mastered: true,
        masteryScore: 88,
      },
      {
        id: "ph-3",
        title: "Rotational Mechanics",
        videoUrl: "https://www.youtube.com/embed/fmXFWi-WfyU",
        videoTitle: "Rotational Motion - Complete Lecture",
        duration: "25:00",
        completed: true,
        mastered: false,
        masteryScore: 62,
      },
      {
        id: "ph-4",
        title: "Gravitation",
        videoUrl: "https://www.youtube.com/embed/MTY1Kje0yLg",
        videoTitle: "Gravitation - Physics Lecture",
        duration: "20:00",
        completed: true,
        mastered: true,
        masteryScore: 91,
      },
      {
        id: "ph-5",
        title: "Fluid Mechanics",
        videoUrl: "https://www.youtube.com/embed/on2sIZKKgOI",
        videoTitle: "Fluid Mechanics Explained",
        duration: "19:45",
        completed: true,
        mastered: false,
        masteryScore: 58,
      },
      {
        id: "ph-6",
        title: "Thermodynamics",
        videoUrl: "https://www.youtube.com/embed/F4MlLf2jFJc",
        videoTitle: "Thermodynamics - Laws and Applications",
        duration: "24:10",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
      {
        id: "ph-7",
        title: "Waves & Oscillations",
        videoUrl: "https://www.youtube.com/embed/Y50MIxIEMYc",
        videoTitle: "Waves and Oscillations Full Lecture",
        duration: "21:30",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
      {
        id: "ph-8",
        title: "Electrostatics",
        videoUrl: "https://www.youtube.com/embed/mdulzEfQXDE",
        videoTitle: "Electrostatics - Charge and Fields",
        duration: "23:00",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
    ],
  },
  {
    id: "math",
    name: "Mathematics",
    icon: "Calculator",
    color: "text-chart-2",
    glowClass: "glow-green",
    progress: 48,
    masteryProbability: 0.55,
    totalTopics: 8,
    completedTopics: 3,
    weeklyScores: [30, 35, 40, 42, 48, 52, 55],
    topics: [
      {
        id: "ma-1",
        title: "Sets & Relations",
        videoUrl: "https://www.youtube.com/embed/tyDKR4FG3Yw",
        videoTitle: "Sets and Relations - Mathematics",
        duration: "16:20",
        completed: true,
        mastered: true,
        masteryScore: 92,
      },
      {
        id: "ma-2",
        title: "Functions & Graphs",
        videoUrl: "https://www.youtube.com/embed/kvGsIo1TmsM",
        videoTitle: "Functions and Graphs Explained",
        duration: "20:00",
        completed: true,
        mastered: true,
        masteryScore: 85,
      },
      {
        id: "ma-3",
        title: "Limits & Continuity",
        videoUrl: "https://www.youtube.com/embed/riXcZT2ICjA",
        videoTitle: "Limits and Continuity - Calculus",
        duration: "23:30",
        completed: true,
        mastered: false,
        masteryScore: 64,
      },
      {
        id: "ma-4",
        title: "Differentiation",
        videoUrl: "https://www.youtube.com/embed/WUvTyaaNkzM",
        videoTitle: "Differentiation - Complete Guide",
        duration: "28:00",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
      {
        id: "ma-5",
        title: "Integration",
        videoUrl: "https://www.youtube.com/embed/rfG8ce4nNh0",
        videoTitle: "Integration Techniques",
        duration: "30:00",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
      {
        id: "ma-6",
        title: "Differential Equations",
        videoUrl: "https://www.youtube.com/embed/p_di4Zn4wz4",
        videoTitle: "Differential Equations Basics",
        duration: "25:00",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
      {
        id: "ma-7",
        title: "Matrices & Determinants",
        videoUrl: "https://www.youtube.com/embed/Ip3X9LOh2dk",
        videoTitle: "Matrices and Determinants",
        duration: "22:30",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
      {
        id: "ma-8",
        title: "Probability & Statistics",
        videoUrl: "https://www.youtube.com/embed/sZkOBlCf8Qk",
        videoTitle: "Probability and Statistics",
        duration: "26:00",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
    ],
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    icon: "Brain",
    color: "text-chart-4",
    glowClass: "glow-amber",
    progress: 30,
    masteryProbability: 0.38,
    totalTopics: 8,
    completedTopics: 2,
    weeklyScores: [10, 15, 18, 22, 25, 30, 35],
    topics: [
      {
        id: "ai-1",
        title: "Introduction to ML",
        videoUrl: "https://www.youtube.com/embed/ukzFI9rgwfU",
        videoTitle: "Machine Learning Introduction",
        duration: "20:00",
        completed: true,
        mastered: true,
        masteryScore: 90,
      },
      {
        id: "ai-2",
        title: "Linear Regression",
        videoUrl: "https://www.youtube.com/embed/nk2CQITm_eo",
        videoTitle: "Linear Regression Explained",
        duration: "18:30",
        completed: true,
        mastered: false,
        masteryScore: 68,
      },
      {
        id: "ai-3",
        title: "Classification Algorithms",
        videoUrl: "https://www.youtube.com/embed/TkIg1K1KCA0",
        videoTitle: "Classification in Machine Learning",
        duration: "24:00",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
      {
        id: "ai-4",
        title: "Neural Networks",
        videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
        videoTitle: "Neural Networks - Deep Learning",
        duration: "26:30",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
      {
        id: "ai-5",
        title: "Convolutional Neural Networks",
        videoUrl: "https://www.youtube.com/embed/YRhxdVk_sIs",
        videoTitle: "CNN Explained",
        duration: "22:00",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
      {
        id: "ai-6",
        title: "Natural Language Processing",
        videoUrl: "https://www.youtube.com/embed/CMrHM8a3hqw",
        videoTitle: "NLP Fundamentals",
        duration: "25:00",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
      {
        id: "ai-7",
        title: "Reinforcement Learning",
        videoUrl: "https://www.youtube.com/embed/2pWv7GOvuf0",
        videoTitle: "Reinforcement Learning Basics",
        duration: "23:00",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
      {
        id: "ai-8",
        title: "Generative AI & Transformers",
        videoUrl: "https://www.youtube.com/embed/wjZofJX0v4M",
        videoTitle: "Transformers and Generative AI",
        duration: "28:00",
        completed: false,
        mastered: false,
        masteryScore: 0,
      },
    ],
  },
];

// Question bank per subject per topic
export const questionBank: Record<string, Record<string, QuizQuestion[]>> = {
  physics: {
    "Newton's Laws of Motion": [
      {
        id: "q1",
        question: "A body of mass 5 kg is at rest. What is the net force acting on it?",
        options: ["5 N", "0 N", "9.8 N", "49 N"],
        correctAnswer: 1,
        type: "basic",
        conceptTag: "First Law (Inertia)",
      },
      {
        id: "q2",
        question: "If F = ma, and a 10 kg object accelerates at 3 m/s^2, what is the force?",
        options: ["30 N", "13 N", "3.33 N", "10 N"],
        correctAnswer: 0,
        type: "logic",
        conceptTag: "Second Law (F=ma)",
      },
      {
        id: "q3",
        question: "A rocket propels gas downward. Which law explains why the rocket goes up?",
        options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
        correctAnswer: 2,
        type: "blunder-check",
        conceptTag: "Third Law (Action-Reaction)",
      },
      {
        id: "q4",
        question: "What happens to friction when you double the normal force on a rough surface?",
        options: ["Halves", "Doubles", "Stays same", "Quadruples"],
        correctAnswer: 1,
        type: "logic",
        conceptTag: "Friction and Normal Force",
      },
      {
        id: "q5",
        question: "An object moves at constant velocity in space. What is the net force on it?",
        options: ["Equal to its weight", "Equal to its mass", "0 N", "Cannot determine"],
        correctAnswer: 2,
        type: "basic",
        conceptTag: "First Law (Inertia)",
      },
    ],
    "Thermodynamics": [
      {
        id: "q1",
        question: "What is the first law of thermodynamics essentially about?",
        options: ["Energy creation", "Energy conservation", "Entropy increase", "Heat flow direction"],
        correctAnswer: 1,
        type: "basic",
        conceptTag: "First Law",
      },
      {
        id: "q2",
        question: "In an isothermal process, what stays constant?",
        options: ["Pressure", "Volume", "Temperature", "Entropy"],
        correctAnswer: 2,
        type: "logic",
        conceptTag: "Isothermal Process",
      },
      {
        id: "q3",
        question: "A heat engine cannot have 100% efficiency. Which law states this?",
        options: ["Zeroth Law", "First Law", "Second Law", "Third Law"],
        correctAnswer: 2,
        type: "blunder-check",
        conceptTag: "Second Law / Carnot",
      },
      {
        id: "q4",
        question: "What happens to entropy in an irreversible process?",
        options: ["Decreases", "Stays same", "Increases", "Becomes zero"],
        correctAnswer: 2,
        type: "logic",
        conceptTag: "Entropy",
      },
      {
        id: "q5",
        question: "Work done in a cyclic process equals the area enclosed by which?",
        options: ["T-S diagram", "P-V diagram", "Both", "Neither"],
        correctAnswer: 2,
        type: "logic",
        conceptTag: "Cyclic Process",
      },
    ],
  },
  math: {
    "Limits & Continuity": [
      {
        id: "q1",
        question: "What is lim(x->0) sin(x)/x?",
        options: ["0", "1", "Infinity", "Undefined"],
        correctAnswer: 1,
        type: "basic",
        conceptTag: "Standard Limits",
      },
      {
        id: "q2",
        question: "A function f(x) is continuous at x=a if f(a) equals what?",
        options: ["f'(a)", "lim(x->a) f(x)", "0", "f(0)"],
        correctAnswer: 1,
        type: "logic",
        conceptTag: "Continuity Definition",
      },
      {
        id: "q3",
        question: "Is f(x) = |x| continuous at x = 0?",
        options: ["Yes", "No", "Only from left", "Only from right"],
        correctAnswer: 0,
        type: "blunder-check",
        conceptTag: "Absolute Value Continuity",
      },
      {
        id: "q4",
        question: "What is lim(x->infinity) (1 + 1/x)^x?",
        options: ["1", "0", "e", "Infinity"],
        correctAnswer: 2,
        type: "logic",
        conceptTag: "Euler's Limit",
      },
      {
        id: "q5",
        question: "L'Hopital's rule applies when the limit has which form?",
        options: ["0/0 or inf/inf", "0*inf", "1^inf", "All of the above"],
        correctAnswer: 0,
        type: "basic",
        conceptTag: "L'Hopital's Rule",
      },
    ],
    "Differentiation": [
      {
        id: "q1",
        question: "What is the derivative of x^n?",
        options: ["nx^(n+1)", "nx^(n-1)", "x^(n-1)/n", "(n-1)x^n"],
        correctAnswer: 1,
        type: "basic",
        conceptTag: "Power Rule",
      },
      {
        id: "q2",
        question: "If f(x) = sin(x), what is f'(x)?",
        options: ["-cos(x)", "cos(x)", "sin(x)", "-sin(x)"],
        correctAnswer: 1,
        type: "basic",
        conceptTag: "Trigonometric Derivatives",
      },
      {
        id: "q3",
        question: "The chain rule states d/dx[f(g(x))] = ?",
        options: ["f'(x)*g'(x)", "f'(g(x))*g'(x)", "f(g'(x))", "f'(g(x))"],
        correctAnswer: 1,
        type: "logic",
        conceptTag: "Chain Rule",
      },
      {
        id: "q4",
        question: "At a point of local maxima, f'(x) is?",
        options: ["Positive", "Negative", "Zero", "Undefined"],
        correctAnswer: 2,
        type: "logic",
        conceptTag: "Maxima/Minima",
      },
      {
        id: "q5",
        question: "Is d/dx[e^x] = e^x a correct statement?",
        options: ["Yes", "No, it's xe^(x-1)", "No, it's e^(x-1)", "Only for x>0"],
        correctAnswer: 0,
        type: "blunder-check",
        conceptTag: "Exponential Derivative",
      },
    ],
  },
  ai: {
    "Introduction to ML": [
      {
        id: "q1",
        question: "Machine learning is a subset of which field?",
        options: ["Data Science", "Artificial Intelligence", "Statistics", "Computer Vision"],
        correctAnswer: 1,
        type: "basic",
        conceptTag: "ML Fundamentals",
      },
      {
        id: "q2",
        question: "Which type of ML requires labeled data?",
        options: ["Unsupervised", "Reinforcement", "Supervised", "Semi-supervised"],
        correctAnswer: 2,
        type: "logic",
        conceptTag: "Supervised vs Unsupervised",
      },
      {
        id: "q3",
        question: "Overfitting means the model performs well on?",
        options: ["Test data only", "Training data only", "Both equally", "Neither"],
        correctAnswer: 1,
        type: "blunder-check",
        conceptTag: "Overfitting",
      },
      {
        id: "q4",
        question: "Which metric is best for imbalanced classification?",
        options: ["Accuracy", "F1 Score", "MSE", "R-squared"],
        correctAnswer: 1,
        type: "logic",
        conceptTag: "Evaluation Metrics",
      },
      {
        id: "q5",
        question: "K-Means clustering is an example of?",
        options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "Transfer learning"],
        correctAnswer: 1,
        type: "basic",
        conceptTag: "Clustering",
      },
    ],
    "Linear Regression": [
      {
        id: "q1",
        question: "Linear regression predicts a _____ output.",
        options: ["Categorical", "Continuous", "Binary", "Discrete"],
        correctAnswer: 1,
        type: "basic",
        conceptTag: "Regression Basics",
      },
      {
        id: "q2",
        question: "The cost function in linear regression minimizes?",
        options: ["Absolute error", "Squared error", "Log loss", "Hinge loss"],
        correctAnswer: 1,
        type: "logic",
        conceptTag: "Cost Function",
      },
      {
        id: "q3",
        question: "Adding more features always reduces training error. Does it always reduce test error?",
        options: ["Yes", "No", "Only with regularization", "Only for linear models"],
        correctAnswer: 1,
        type: "blunder-check",
        conceptTag: "Bias-Variance Tradeoff",
      },
      {
        id: "q4",
        question: "What does the 'R-squared' value represent?",
        options: ["Error rate", "Variance explained", "Bias", "Learning rate"],
        correctAnswer: 1,
        type: "basic",
        conceptTag: "R-Squared",
      },
      {
        id: "q5",
        question: "Gradient descent updates weights in the direction of?",
        options: ["Gradient", "Negative gradient", "Random direction", "Positive gradient"],
        correctAnswer: 1,
        type: "logic",
        conceptTag: "Gradient Descent",
      },
    ],
  },
};

// Default fallback questions for any topic
export const defaultQuestions: QuizQuestion[] = [
  {
    id: "dq1",
    question: "What is the fundamental concept behind this topic?",
    options: [
      "Pattern recognition and memorization",
      "Understanding core principles and applying them",
      "Speed of computation",
      "Volume of data processed",
    ],
    correctAnswer: 1,
    type: "basic",
    conceptTag: "Core Concepts",
  },
  {
    id: "dq2",
    question: "When solving problems in this area, what should you do first?",
    options: [
      "Apply the formula directly",
      "Identify the key variables and relationships",
      "Guess and check",
      "Look at similar problems",
    ],
    correctAnswer: 1,
    type: "logic",
    conceptTag: "Problem Solving Approach",
  },
  {
    id: "dq3",
    question: "Which common misconception do students have about this topic?",
    options: [
      "Confusing correlation with causation",
      "The topic is easy and needs no practice",
      "Formulas alone guarantee correct answers",
      "All of the above can be misconceptions",
    ],
    correctAnswer: 3,
    type: "blunder-check",
    conceptTag: "Common Misconceptions",
  },
  {
    id: "dq4",
    question: "What is the best way to verify your understanding of this topic?",
    options: [
      "Re-read the textbook",
      "Teach it to someone else or solve varied problems",
      "Memorize all formulas",
      "Watch more videos",
    ],
    correctAnswer: 1,
    type: "logic",
    conceptTag: "Self Assessment",
  },
  {
    id: "dq5",
    question: "How does this topic connect to the overall subject?",
    options: [
      "It doesn't connect",
      "It builds on previous concepts and enables advanced topics",
      "It is completely independent",
      "Only useful for exams",
    ],
    correctAnswer: 1,
    type: "basic",
    conceptTag: "Topic Integration",
  },
];
