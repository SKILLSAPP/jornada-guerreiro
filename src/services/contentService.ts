
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

  // Retorna os IDs das ilhas na ordem correta para o jogador
  getIslandSequence: (playerData: PlayerData): number[] => {
    if (playerData.customIslandOrder && playerData.customIslandOrder.length > 0) {
      return playerData.customIslandOrder;
    }
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  },

  // Retorna o ID da ilha que o jogador deve estar enfrentando agora
  getCurrentIslandId: (playerData: PlayerData): number => {
    const sequence = contentService.getIslandSequence(playerData);
    const conqueredIds = Object.keys(playerData.progress)
      .filter(id => (playerData.progress[Number(id)]?.score || 0) >= TOTAL_POINTS_TO_CONQUER)
      .map(Number);
    
    // A primeira ilha da sequência que ainda não foi conquistada
    const nextId = sequence.find(id => !conqueredIds.includes(id));
    return nextId || sequence[sequence.length - 1]; // Se todas conquistadas, retorna a última
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
