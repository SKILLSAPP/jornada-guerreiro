import { ISLANDS, TOTAL_POINTS_TO_CONQUER, MANDALA_PETAL_THRESHOLDS, MAIN_BACKGROUND_URL, WELCOME_BACKGROUND_URL } from '../constants';
import { Island } from '../types';

// O serviço de conteúdo agora atua como um leitor direto do arquivo de constantes.
// Todo o conteúdo é gerenciado pelo Mestre através da atualização do código-fonte.

const getIslands = (): Island[] => {
  // Retorna diretamente a lista de ilhas do arquivo de constantes.
  return ISLANDS;
};

export const contentService = {
  getIslands,
  // O link do Storytelling é fixo, mas pode ser movido para constants.ts no futuro se necessário.
  getStorytellingUrl: () => '#',
  getMainBackgroundUrl: () => MAIN_BACKGROUND_URL,
  getWelcomeBackgroundUrl: () => WELCOME_BACKGROUND_URL,
  TOTAL_POINTS_TO_CONQUER,
  MANDALA_PETAL_THRESHOLDS,
};