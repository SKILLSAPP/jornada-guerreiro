
export interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  resources: {
    type: 'article' | 'book' | 'video' | 'podcast' | 'case_study' | 'audio';
    label: string;
    url: string;
  }[];
  quizUrl?: string;
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

export interface PlayerProgress {
  [islandId: number]: {
    score: number;
    completedChallenges: number[];
    pendingSubmissions?: {
      [challengeId: number]: {
        submission: string;
        submittedAt: string;
      };
    };
  };
}

export interface PlayerData {
  name: string;
  progress: PlayerProgress;
  storySeen?: boolean;
  isAdmin?: boolean;
  isTester?: boolean;
  mentorFeedback?: string;
}