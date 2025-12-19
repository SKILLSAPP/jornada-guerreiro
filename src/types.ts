
export type Difficulty = 'Fácil' | 'Médio' | 'Difícil';

export interface QuizQuestion {
  questionText: string;
  difficulty: Difficulty;
  points: number;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  rationale: string;
}

export interface Quiz {
  id: string; // Composite key like `island-1-challenge-1` or `island-1-challenge-4-redemption`
  name: string;
  islandId: number;
  challengeId: number;
  questions: QuizQuestion[];
}

export interface Challenge {
  id: number;
  title: string;
  description:string;
  points: number;
  resources: {
    type: 'article' | 'book' | 'video' | 'podcast' | 'case_study' | 'audio';
    label: string;
    url: string;
  }[];
  quizUrl?: string;
  quizId?: string; // ID for internal, AI-generated quizzes
}

export interface Island {
  id: number;
  pinyinName: string;
  name: string;
  softSkill: string;
  story: string;
  guardian: string;
  imageUrl: string;
  challenges: Challenge[];
}

export interface PendingSubmission {
  submissionType: 'submission' | 'quiz' | 'presentation';
  submittedAt: string;
  submission?: string; // For text submissions
  answers?: number[];   // For internal quizzes
  redemptionQuizOffered?: boolean; // For Challenge 4
  presentationScore?: number; // Temp score for Challenge 4 presentation
}

export interface ExtraordinaryChallengeState {
  summarySubmitted: boolean;
  summaryText?: string;
  summaryApproved?: boolean;
  prophecyOffered?: boolean;
  prophecy?: {
    question: string;
    isTrue: boolean;
    points: number;
  } | null;
  prophecyAnswered?: boolean;
  prophecyCorrect?: boolean | null;
}

export interface PlayerProgress {
  [islandId: number]: {
    score: number;
    completedChallenges: number[];
    pendingSubmissions?: {
      [challengeId: number]: PendingSubmission;
    };
    extraordinaryChallenge?: ExtraordinaryChallengeState;
  };
}

export interface GradedQuestion {
  questionText: string;
  options: { text: string }[];
  studentAnswerIndex: number;
  correctAnswerIndex: number;
  feedback: string; // Epic + technical feedback per question
  difficulty: Difficulty;
  points: number;
}

export interface GradedQuiz {
  questions: GradedQuestion[];
}


export interface PlayerData {
  id?: string; // Changed from number for Supabase UUID
  created_at?: string;
  name: string;
  progress: PlayerProgress;
  storySeen?: boolean;
  isAdmin?: boolean;
  isTester?: boolean;
  customIslandOrder?: number[]; // Lista de IDs das ilhas na ordem personalizada
  mentorFeedback?: string; // General feedback
  pendingMentorMessage?: {
    message: string;
    submittedAt: string;
  };
  taskFeedback?: {
    [challengeId_islandId: string]: {
      challengeTitle: string;
      feedback: string; // Final master's feedback
      score: number; // Final score
      gradedQuiz?: GradedQuiz;
    };
  };
  claimedTrainingDates?: string[]; // Array of 'YYYY-MM-DD' strings
}
