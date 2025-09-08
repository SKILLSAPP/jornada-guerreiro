import { ISLANDS, TOTAL_POINTS_TO_CONQUER, MANDALA_PETAL_THRESHOLDS, MAIN_BACKGROUND_URL, WELCOME_BACKGROUND_URL, STORYTELLING_URL, CHALLENGE_PATH_BACKGROUND_URL, MANUAL_URL } from '../constants';
import { ALL_QUIZZES } from '../quizzes';
import { Island, Quiz } from '../types';

export const contentService = {
  getIslands: (): Island[] => {
    // Return a deep copy to prevent mutation of the original constants
    return JSON.parse(JSON.stringify(ISLANDS));
  },
  
  getQuizzes: (): Quiz[] => {
    // Return a deep copy
    return JSON.parse(JSON.stringify(ALL_QUIZZES));
  },

  getQuiz: (quizId: string): Quiz | null => {
    const quiz = ALL_QUIZZES.find(q => q.id === quizId);
    return quiz ? JSON.parse(JSON.stringify(quiz)) : null;
  },

  getStorytellingUrl: (): string => STORYTELLING_URL,
  getManualUrl: (): string => MANUAL_URL,
  getMainBackgroundUrl: (): string => MAIN_BACKGROUND_URL,
  getWelcomeBackgroundUrl: (): string => WELCOME_BACKGROUND_URL,
  getChallengePathBackgroundUrl: (): string => CHALLENGE_PATH_BACKGROUND_URL,
  TOTAL_POINTS_TO_CONQUER,
  MANDALA_PETAL_THRESHOLDS,
};