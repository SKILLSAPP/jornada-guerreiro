
import { ISLANDS, TOTAL_POINTS_TO_CONQUER, MANDALA_PETAL_THRESHOLDS, MAIN_BACKGROUND_URL, WELCOME_BACKGROUND_URL, STORYTELLING_URL } from '../constants';
import { Island } from '../types';
import { gameService } from './gameService';

// Este serviço agora atua como um provedor de conteúdo estático,
// lendo diretamente do arquivo de constantes. O painel do mestre
// irá gerar o código para atualizar o arquivo `constants.ts`.

export const contentService = {
  getIslands: (): Island[] => {
    // Deep copy to prevent mutation of the original constants
    const baseIslands: Island[] = JSON.parse(JSON.stringify(ISLANDS));
    const quizzes = gameService.getAllQuizzes();

    if (!quizzes || quizzes.length === 0) {
      return baseIslands;
    }

    const quizMap = new Map<string, string>();
    quizzes.forEach(quiz => {
        quizMap.set(`${quiz.islandId}-${quiz.challengeId}`, quiz.id);
    });

    baseIslands.forEach(island => {
      island.challenges.forEach(challenge => {
        const quizId = quizMap.get(`${island.id}-${challenge.id}`);
        if (quizId) {
          challenge.quizId = quizId;
        }
      });
    });

    return baseIslands;
  },
  getStorytellingUrl: (): string => STORYTELLING_URL,
  getMainBackgroundUrl: (): string => MAIN_BACKGROUND_URL,
  getWelcomeBackgroundUrl: (): string => WELCOME_BACKGROUND_URL,
  TOTAL_POINTS_TO_CONQUER,
  MANDALA_PETAL_THRESHOLDS,
};
