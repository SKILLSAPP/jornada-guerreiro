
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
        return;
    }
    try {
        geminiAiClient = new GoogleGenAI({ apiKey });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Erro desconhecido ao inicializar o Gemini AI.';
        geminiInitializationError = `A chave para o reino dos espíritos (API_KEY) foi rejeitada ou é inválida. Detalhes: ${message}`;
    }
})();


// --- Centralized Error Handler ---
const handleApiError = (error: unknown, context: string): string => {
    console.error(`Erro na API Gemini durante ${context}:`, error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            return `A chave para o reino dos espíritos (API_KEY) foi rejeitada.`;
        }
        return `Os ventos da magia estão turbulentos. Erro: ${error.message}`;
    }
    return `Os ventos da magia estão turbulentos. Ocorreu um erro desconhecido.`;
};

const generateQuizBase = async (context: string, challengeTitle: string, totalPoints: number, systemInstruction: string, schema: any): Promise<QuizQuestion[] | string> => {
    if (geminiInitializationError) return geminiInitializationError;
    if (!geminiAiClient) return "Cliente Gemini AI não inicializado.";

    try {
      const response = await geminiAiClient.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Material de Estudo para "${challengeTitle}" (Pontuação Total: ${totalPoints}):\n\n---\n${context}\n---`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature: 0.5,
        },
      });
      
      const text = response.text;
      if (!text) throw new Error("IA retornou resposta vazia.");
      const jsonResponse = JSON.parse(text);

      if (!jsonResponse.questions || !jsonResponse.questions.length) {
          throw new Error("IA não retornou perguntas suficientes.");
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
        items: {
          type: Type.OBJECT,
          properties: {
            questionText: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ['Fácil', 'Médio', 'Difícil'] },
            points: { type: Type.INTEGER },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  isCorrect: { type: Type.BOOLEAN },
                },
                required: ['text', 'isCorrect'],
              },
            },
            rationale: { type: Type.STRING },
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
      const systemInstruction = `Você é o Mestre Jin. Avalie o plano estratégico sobre "${softSkill}" em markdown.`;
      const response = await geminiAiClient.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: plan,
        config: { systemInstruction, temperature: 0.7 },
      });
      return response.text || "Erro na avaliação.";
    } catch (error) {
      return handleApiError(error, "avaliação");
    }
  },

  generateQuiz: async (context: string, challengeTitle: string, totalPoints: number): Promise<QuizQuestion[] | string> => {
    const systemInstruction = `Você é um Consultor Sênior de RH e Mestre da Jornada. Sua missão é criar um quiz de ALTA QUALIDADE que misture interpretação de casos reais com conceitos técnicos.

ESTRUTURA OBRIGATÓRIA (10 Questões):
- 5 Fáceis: Conceitos, definições e fundamentos do material.
- 4 Médias: Mini-cases corporativos (3-5 linhas) apresentando um dilema de trabalho onde o aluno deve aplicar o conhecimento.
- 1 Difícil: Um "Grande Caso" complexo (6-8 linhas) que exige análise crítica de múltiplos fatores do material.

PROTOCOLO ANTI-TRAPAÇA E QUALIDADE (ESSENCIAL):
1. STORYTELLING CORPORATIVO: As perguntas médias e difíceis devem situar o aluno em um contexto (Ex: "Durante uma fusão de empresas...", "Ao liderar uma equipe remota...").
2. SIMETRIA NAS OPÇÕES: As 3 alternativas DEVEM ter quase o mesmo número de palavras e a mesma complexidade gramatical. Não deixe a resposta correta ser a mais longa ou a mais detalhada.
3. PLAUSIBILIDADE: Use distratores (respostas erradas) que pareçam escolhas profissionais sensatas para quem não estudou, mas que erram em detalhes técnicos específicos do material.
4. SEM PISTAS: Jamais use termos como "sempre", "nunca", "apenas" ou "somente".
5. INTERPRETAÇÃO: Evite perguntas de 'decoreba'. Foque em 'Como o conceito X resolve o problema do caso Y?'.`;
      
    return generateQuizBase(context, challengeTitle, totalPoints, systemInstruction, baseQuizSchema);
  },

  generateRedemptionQuiz: async (context: string, challengeTitle: string, totalPoints: number): Promise<QuizQuestion[] | string> => {
    const systemInstruction = `Crie um Quiz de Redenção. 
    Foque 100% em interpretação de casos de alta complexidade. 
    Todas as perguntas devem ser de nível Médio ou Difícil. 
    Mantenha o protocolo de simetria absoluta nas opções para evitar adivinhação.`;
      
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
      return handleApiError(error, "feedback");
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
      const systemInstruction = `Avalie as respostas comparando com o gabarito. Atribua pontos apenas para respostas corretas. Forneça feedback técnico-épico.`;
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
    const prompt = `Analise a evolução de ${playerName} na ilha ${currentIsland.name}.`;
    try {
      const response = await geminiAiClient.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      return response.text || "Sem análise.";
    } catch (error) {
      return handleApiError(error, "análise");
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
            contents: `Crie uma afirmação sobre ${island.softSkill}.`,
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
