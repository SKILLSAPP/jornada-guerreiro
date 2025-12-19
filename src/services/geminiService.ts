
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, Quiz, GradedQuiz, Island, PlayerData, PlayerProgress } from '../types';
import { EXTRAORDINARY_CHALLENGE_CHANCE, EXTRAORDINARY_CHALLENGE_POINTS } from '../constants';


let geminiAiClient: GoogleGenAI | null = null;
export let geminiInitializationError: string | null = null;

// Self-invoking function to initialize on module load without throwing
(() => {
    // A chave é obtida exclusivamente do ambiente, mantendo o código limpo e seguro.
    const apiKey = process.env.API_KEY; 
    if (!apiKey) {
        geminiInitializationError = "A chave para o reino dos espíritos (API_KEY) não foi encontrada nos pergaminhos de configuração do ambiente.";
        console.error(geminiInitializationError);
        return;
    }
    try {
        geminiAiClient = new GoogleGenAI({ apiKey });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Erro desconhecido ao inicializar o Gemini AI.';
        geminiInitializationError = `A chave para o reino dos espíritos (API_KEY) foi rejeitada ou é inválida. Detalhes: ${message}`;
        console.error(geminiInitializationError, e);
    }
})();


// --- Centralized Error Handler ---
const handleApiError = (error: unknown, context: string): string => {
    console.error(`Erro na API Gemini durante ${context}:`, error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            return `A chave para o reino dos espíritos (API_KEY) foi rejeitada. Verifique se a chave é válida e possui as permissões necessárias.`;
        }
        return `Os ventos da magia estão turbulentos. Não foi possível completar a ação (${context}). Erro: ${error.message}`;
    }
    return `Os ventos da magia estão turbulentos. Ocorreu um erro desconhecido durante ${context}.`;
};

const generateQuizBase = async (context: string, challengeTitle: string, totalPoints: number, systemInstruction: string, schema: any): Promise<QuizQuestion[] | string> => {
    if (geminiInitializationError) return geminiInitializationError;
    if (!geminiAiClient) return "Cliente Gemini AI não inicializado.";

    try {
      const response = await geminiAiClient.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Aqui está o material de estudo para o desafio "${challengeTitle}". A pontuação total para o quiz é ${totalPoints}. Crie um quiz a partir dele:\n\n---\n${context}\n---`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature: 0.4, // Reduzido para garantir mais consistência e menos "alucinação" criativa nas opções
        },
      });
      
      const text = response.text;
      if (!text) {
        throw new Error("A IA retornou uma resposta JSON vazia.");
      }
      const jsonResponse = JSON.parse(text);

      if (!jsonResponse.questions || !jsonResponse.questions.length) {
          throw new Error("A IA não retornou o número esperado de perguntas.");
      }
      return jsonResponse.questions;

    } catch (error: unknown) {
      return handleApiError(error, `geração do quiz "${challengeTitle}"`);
    }
}

const baseQuizSchema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        description: 'Uma lista de perguntas para o quiz.',
        items: {
          type: Type.OBJECT,
          properties: {
            questionText: { type: Type.STRING, description: 'O texto da pergunta.' },
            difficulty: {
              type: Type.STRING,
              enum: ['Fácil', 'Médio', 'Difícil'],
              description: "O nível de dificuldade da pergunta."
            },
            points: { type: Type.INTEGER, description: 'A quantidade de pontos que esta questão vale.' },
            options: {
              type: Type.ARRAY,
              description: 'Uma lista de exatamente 3 opções de resposta.',
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING, description: 'O texto da opção de resposta.' },
                  isCorrect: { type: Type.BOOLEAN, description: 'Indica se esta é a resposta correta.' },
                },
                required: ['text', 'isCorrect'],
              },
            },
            rationale: { type: Type.STRING, description: 'Uma breve justificativa técnica para a resposta correta.' },
          },
          required: ['questionText', 'difficulty', 'points', 'options', 'rationale'],
        },
      },
    },
    required: ['questions'],
  };


export const geminiService = {
  evaluatePlan: async (plan: string, softSkill: string): Promise<string> => {
    if (geminiInitializationError) return geminiInitializationError;
    if (!geminiAiClient) return "Cliente Gemini AI não inicializado.";
    try {
      const systemInstruction = `Você é um mentor sábio e encorajador chamado Mestre Jin. Avalie o plano estratégico do guerreiro focado em "${softSkill}".
      Estruture seu feedback em markdown:
      - **### Pontos Fortes da Sua Abordagem**
      - **### Áreas para Aprofundar a Sabedoria**`;

      const response = await geminiAiClient.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: plan,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      return response.text || "Os ventos da magia estão turbulentos.";
    } catch (error) {
      return handleApiError(error, "avaliação de plano");
    }
  },

  generateQuiz: async (context: string, challengeTitle: string, totalPoints: number): Promise<QuizQuestion[] | string> => {
    const systemInstruction = `Você é um mestre examinador rigoroso. Sua missão é criar um quiz onde a resposta correta seja IMPOSSÍVEL de adivinhar apenas pela lógica de exclusão ou formato do texto.

REGRAS DE OURO CONTRA TRAPAÇA (CRÍTICO):
1. **SIMETRIA TOTAL**: As 3 alternativas DEVEM ter quase o mesmo número de palavras e a mesma estrutura gramatical. Nunca deixe a correta ser mais longa ou mais detalhada.
2. **PLAUSIBILIDADE**: As erradas não podem ser absurdas. Devem ser opções que pareçam corretas para quem não estudou profundamente (falsos amigos).
3. **SEM PISTAS**: Não use "sempre", "nunca", "apenas" ou "todos".
4. **FOCO EM APLICAÇÃO**: Em vez de "O que é X?", use "No cenário Y, qual a melhor forma de aplicar X?".

ESTRUTURA:
- 10 Perguntas (5 Fácil, 4 Médio, 1 Difícil).
- Fácil: Definições técnicas.
- Médio: Dilemas curtos (3-4 linhas).
- Difícil: Caso complexo onde as 3 opções são planos de ação bem escritos, mas apenas um segue o material estritamente.`;
      
    return generateQuizBase(context, challengeTitle, totalPoints, systemInstruction, baseQuizSchema);
  },

  generateRedemptionQuiz: async (context: string, challengeTitle: string, totalPoints: number): Promise<QuizQuestion[] | string> => {
    const systemInstruction = `Crie um Quiz de Redenção de alta complexidade. 
    Não deve haver margem para adivinhação. As opções devem ser tecnicamente densas e simétricas.
    Foque em 5 perguntas de nível Médio e 5 de nível Difícil.`;
      
    return generateQuizBase(context, challengeTitle, totalPoints, systemInstruction, baseQuizSchema);
  },

  getFinalResultFeedback: async (playerName: string, finalScore: number, requiredScore: number): Promise<string> => {
    if (geminiInitializationError) return geminiInitializationError;
    if (!geminiAiClient) return "Cliente Gemini AI não inicializado.";
    const prompt = `Guerreiro ${playerName} alcançou ${finalScore}/${requiredScore}. Escreva um veredito épico de RPG.`;
     try {
      const response = await geminiAiClient.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      return response.text || "Os espíritos estão confusos.";
    } catch (error) {
      return handleApiError(error, "geração de feedback final");
    }
  },
  
  gradeQuiz: async (quiz: Quiz, answers: number[]): Promise<{ suggestedScore: number; suggestedGeneralFeedback: string; gradedQuiz: GradedQuiz }> => {
    if (geminiInitializationError) throw new Error(geminiInitializationError);
    if (!geminiAiClient) throw new Error("Cliente Gemini AI não inicializado.");
    
    const promptPayload = { quiz, studentAnswers: answers };
    const schema = {
      type: Type.OBJECT,
      properties: {
        suggestedScore: { type: Type.INTEGER },
        suggestedGeneralFeedback: { type: Type.STRING },
        gradedQuiz: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  questionText: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { text: { type: Type.STRING } } } },
                  studentAnswerIndex: { type: Type.INTEGER },
                  correctAnswerIndex: { type: Type.INTEGER },
                  feedback: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  points: { type: Type.INTEGER },
                },
                required: ['questionText', 'options', 'studentAnswerIndex', 'correctAnswerIndex', 'feedback', 'difficulty', 'points']
              }
            }
          },
          required: ['questions'],
        },
      },
      required: ['suggestedScore', 'suggestedGeneralFeedback', 'gradedQuiz'],
    };

    try {
      const systemInstruction = `Você é um avaliador técnico. Calcule a soma dos pontos apenas dos acertos. Forneça feedback técnico para cada questão explicando o erro ou acerto com base no material original.`;

      const response = await geminiAiClient.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Corrija: ${JSON.stringify(promptPayload)}`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature: 0.2,
        },
      });

      return JSON.parse(response.text);
    } catch (error) {
       throw new Error("Erro na correção.");
    }
  },

  getStudentProgressAnalysis: async (playerName: string, currentIsland: Island, progress: PlayerProgress, taskFeedback?: PlayerData['taskFeedback']): Promise<string> => {
    if (geminiInitializationError) return geminiInitializationError;
    if (!geminiAiClient) return "Cliente Gemini AI não inicializado.";
    const prompt = `Analise a evolução de ${playerName} na ilha ${currentIsland.name} (${currentIsland.softSkill}).`;
    try {
      const response = await geminiAiClient.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      return response.text || "Sem análise.";
    } catch (error) {
      return handleApiError(error, "análise de progresso");
    }
  },
  
  generateProphecy: async (summary: string, island: Island): Promise<{ question: string; isTrue: boolean; points: number; } | null> => {
    if (geminiInitializationError) throw new Error(geminiInitializationError);
    if (!geminiAiClient) throw new Error("Cliente Gemini AI não inicializado.");
    if (Math.random() > EXTRAORDINARY_CHALLENGE_CHANCE) return null;

    const schema = {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        isTrue: { type: Type.BOOLEAN },
      },
      required: ['question', 'isTrue'],
    };

    try {
        const response = await geminiAiClient.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Crie uma afirmação sutilmente verdadeira ou falsa sobre ${island.softSkill}.`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: schema,
                temperature: 0.9,
            },
        });
        return { ...JSON.parse(response.text), points: EXTRAORDINARY_CHALLENGE_POINTS };
    } catch(error) {
        return null;
    }
  },
};
