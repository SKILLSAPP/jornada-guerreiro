
import { ISLANDS, TOTAL_POINTS_TO_CONQUER, MANDALA_PETAL_THRESHOLDS, MAIN_BACKGROUND_URL, WELCOME_BACKGROUND_URL, STORYTELLING_URL, CHALLENGE_PATH_BACKGROUND_URL, MANUAL_URL, MENTOR_EMAIL } from '../constants';
import { ALL_QUIZZES } from '../quizzes';
import { Island, Quiz, PlayerData } from '../types';

export const contentService = {
  getIslands: (): Island[] => {
    return JSON.parse(JSON.stringify(ISLANDS));
  },
  
  getQuizzes: (): Quiz[] => {
    return JSON.parse(JSON.stringify(ALL_QUIZZES));
  },

  getQuiz: (quizId: string): Quiz | null => {
    const quiz = ALL_QUIZZES.find(q => q.id === quizId);
    return quiz ? JSON.parse(JSON.stringify(quiz)) : null;
  },

  getIslandSequence: (playerData: PlayerData): number[] => {
    if (playerData.customIslandOrder && playerData.customIslandOrder.length > 0) {
      // Garante que todos os IDs na sequência sejam números
      return playerData.customIslandOrder.map(id => Number(id));
    }
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  },

  isIslandConquered: (playerData: PlayerData, islandId: number): boolean => {
    const id = Number(islandId);
    const progress = playerData.progress[id];
    if (!progress) return false;
    
    const score = progress.score || 0;
    const hasMinScore = score >= TOTAL_POINTS_TO_CONQUER;
    const finishedLastChallenge = progress.completedChallenges?.includes(4);
    
    // Ilha conquistada se atingiu a pontuação OU concluiu o desafio final (Guardião)
    return hasMinScore || finishedLastChallenge || false;
  },

  getCurrentIslandId: (playerData: PlayerData): number => {
    const sequence = contentService.getIslandSequence(playerData);
    
    // A ilha atual é a primeira da sequência que ainda não foi conquistada
    const currentId = sequence.find(id => !contentService.isIslandConquered(playerData, id));
    
    // Se não encontrou nenhuma (todas conquistadas), retorna a última da sequência
    return currentId !== undefined ? currentId : sequence[sequence.length - 1];
  },

  getStorytellingUrl: (): string => STORYTELLING_URL,
  getManualUrl: (): string => MANUAL_URL,
  getMentorEmail: (): string => MENTOR_EMAIL,
  getMainBackgroundUrl: (): string => MAIN_BACKGROUND_URL,
  getWelcomeBackgroundUrl: (): string => WELCOME_BACKGROUND_URL,
  getChallengePathBackgroundUrl: (): string => CHALLENGE_PATH_BACKGROUND_URL,
  TOTAL_POINTS_TO_CONQUER,
  MANDALA_PETAL_THRESHOLDS,
};
