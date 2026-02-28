import { NextRequest, NextResponse } from "next/server";

/**
 * pyBKT (Bayesian Knowledge Tracing) Mastery Analysis API
 *
 * This implements the BKT algorithm to determine whether a student
 * has truly mastered a topic or just got lucky guesses.
 *
 * BKT Parameters:
 * - P(L0): Initial probability of knowing the skill (prior)
 * - P(T): Probability of learning the skill after each opportunity
 * - P(G): Probability of guessing correctly without knowing
 * - P(S): Probability of slipping (wrong answer despite knowing)
 *
 * The algorithm updates P(L) after each response using Bayesian inference.
 */

interface BKTParams {
  pL0: number; // Prior probability of mastery
  pT: number; // Probability of transitioning from unlearned to learned
  pG: number; // Probability of guessing
  pS: number; // Probability of slipping
}

interface AssessmentRequest {
  subjectId: string;
  topicTitle: string;
  responses: boolean[]; // true = correct, false = incorrect
  difficulty: "foundational" | "intermediate" | "advanced";
  questionConcepts: string[]; // concept tag for each question
}

function getDifficultyParams(difficulty: string): BKTParams {
  switch (difficulty) {
    case "foundational":
      return { pL0: 0.3, pT: 0.15, pG: 0.25, pS: 0.1 };
    case "intermediate":
      return { pL0: 0.2, pT: 0.1, pG: 0.2, pS: 0.15 };
    case "advanced":
      return { pL0: 0.1, pT: 0.08, pG: 0.15, pS: 0.2 };
    default:
      return { pL0: 0.2, pT: 0.1, pG: 0.2, pS: 0.15 };
  }
}

function runBKT(responses: boolean[], params: BKTParams) {
  let pL = params.pL0;
  const trace: number[] = [pL];

  for (const isCorrect of responses) {
    // Step 1: Update probability of knowing given the observation
    let pLGivenObs: number;

    if (isCorrect) {
      // P(L|correct) = P(correct|L)*P(L) / P(correct)
      const pCorrectGivenL = 1 - params.pS;
      const pCorrectGivenNotL = params.pG;
      const pCorrect = pCorrectGivenL * pL + pCorrectGivenNotL * (1 - pL);
      pLGivenObs = (pCorrectGivenL * pL) / pCorrect;
    } else {
      // P(L|incorrect) = P(incorrect|L)*P(L) / P(incorrect)
      const pIncorrectGivenL = params.pS;
      const pIncorrectGivenNotL = 1 - params.pG;
      const pIncorrect = pIncorrectGivenL * pL + pIncorrectGivenNotL * (1 - pL);
      pLGivenObs = (pIncorrectGivenL * pL) / pIncorrect;
    }

    // Step 2: Account for learning transition
    // P(L_new) = P(L|obs) + P(T) * (1 - P(L|obs))
    pL = pLGivenObs + params.pT * (1 - pLGivenObs);
    trace.push(pL);
  }

  return { finalMastery: pL, trace };
}

function identifyWeakConcepts(
  responses: boolean[],
  concepts: string[]
): string[] {
  const conceptResults: Record<string, { correct: number; total: number }> = {};

  for (let i = 0; i < responses.length; i++) {
    const concept = concepts[i] || "General";
    if (!conceptResults[concept]) {
      conceptResults[concept] = { correct: 0, total: 0 };
    }
    conceptResults[concept].total++;
    if (responses[i]) {
      conceptResults[concept].correct++;
    }
  }

  // Concepts where student got less than 50% correct are weak
  return Object.entries(conceptResults)
    .filter(([, data]) => data.correct / data.total < 0.5)
    .map(([concept]) => concept);
}

function getRemediationVideos(
  weakConcepts: string[],
  subjectId: string,
  topicTitle: string
) {
  // Map concepts to remediation resources
  const remediationMap: Record<string, { title: string; url: string }[]> = {
    "First Law (Inertia)": [
      {
        title: "Newton's First Law - Inertia Deep Dive",
        url: "https://www.youtube.com/watch?v=kKKM8Y-u7ds",
      },
    ],
    "Second Law (F=ma)": [
      {
        title: "F=ma Problem Solving Masterclass",
        url: "https://www.youtube.com/watch?v=kKKM8Y-u7ds",
      },
    ],
    "Third Law (Action-Reaction)": [
      {
        title: "Action-Reaction Pairs Explained",
        url: "https://www.youtube.com/watch?v=kKKM8Y-u7ds",
      },
    ],
    "Friction and Normal Force": [
      {
        title: "Friction Forces - Complete Guide",
        url: "https://www.youtube.com/watch?v=kKKM8Y-u7ds",
      },
    ],
    "Standard Limits": [
      {
        title: "Standard Limits You Must Know",
        url: "https://www.youtube.com/watch?v=riXcZT2ICjA",
      },
    ],
    "Continuity Definition": [
      {
        title: "Continuity - When Functions Break",
        url: "https://www.youtube.com/watch?v=riXcZT2ICjA",
      },
    ],
    "Euler's Limit": [
      {
        title: "The Number e and Euler's Limit",
        url: "https://www.youtube.com/watch?v=riXcZT2ICjA",
      },
    ],
    "ML Fundamentals": [
      {
        title: "Machine Learning Crash Course",
        url: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
      },
    ],
    "Supervised vs Unsupervised": [
      {
        title: "Supervised vs Unsupervised Learning Explained",
        url: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
      },
    ],
    Overfitting: [
      {
        title: "Overfitting vs Underfitting - How to Fix",
        url: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
      },
    ],
    "Cost Function": [
      {
        title: "Understanding Cost Functions in ML",
        url: "https://www.youtube.com/watch?v=nk2CQITm_eo",
      },
    ],
    "Bias-Variance Tradeoff": [
      {
        title: "Bias-Variance Tradeoff Explained Simply",
        url: "https://www.youtube.com/watch?v=nk2CQITm_eo",
      },
    ],
    "Gradient Descent": [
      {
        title: "Gradient Descent Step by Step",
        url: "https://www.youtube.com/watch?v=nk2CQITm_eo",
      },
    ],
  };

  return weakConcepts.map((concept) => {
    const videos = remediationMap[concept];
    if (videos && videos.length > 0) {
      return { ...videos[0], concept };
    }
    return {
      title: `Remediation: ${concept} in ${topicTitle}`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(
        concept + " " + subjectId + " tutorial"
      )}`,
      concept,
    };
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: AssessmentRequest = await request.json();
    const { subjectId, topicTitle, responses, difficulty, questionConcepts } =
      body;

    // Simulate network delay for "AI thinking" effect
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Get BKT parameters based on difficulty
    const params = getDifficultyParams(difficulty);

    // Run Bayesian Knowledge Tracing
    const { finalMastery, trace } = runBKT(responses, params);

    // Calculate basic score
    const correctAnswers = responses.filter(Boolean).length;
    const score = (correctAnswers / responses.length) * 100;

    // Determine pass/fail: Must have >90% score AND mastery probability > 0.7
    const passed = score >= 90 && finalMastery >= 0.7;

    // Identify weak concepts
    const weakConcepts = identifyWeakConcepts(responses, questionConcepts);

    // Get remediation videos if failed
    const remediationVideos = passed
      ? []
      : getRemediationVideos(weakConcepts, subjectId, topicTitle);

    return NextResponse.json({
      passed,
      masteryProbability: Math.round(finalMastery * 100) / 100,
      score: Math.round(score),
      totalQuestions: responses.length,
      correctAnswers,
      weakConcepts,
      remediationVideos,
      bktAnalysis: {
        pLearn: params.pT,
        pGuess: params.pG,
        pSlip: params.pS,
        pKnown: Math.round(finalMastery * 100) / 100,
        trace: trace.map((v) => Math.round(v * 100) / 100),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process assessment" },
      { status: 500 }
    );
  }
}
