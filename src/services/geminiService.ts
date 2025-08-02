
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, Quiz, GradedQuiz, Difficulty, GradedQuestion } from '../types';

// --- Bloco de Inicialização da API ---
let ai: GoogleGenAI | null = null;
let initializationError: string | null = null;

try {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("A chave para o reino dos espíritos (API_KEY) não foi encontrada nos pergaminhos de configuração do ambiente. O Mestre deve verificar se a chave foi configurada corretamente para o teste local.");
  }
  ai = new GoogleGenAI({ apiKey });
} catch (error) {
  if (error instanceof Error) {
    initializationError = error.message;
  } else {
    initializationError = "Ocorreu um erro desconhecido ao tentar estabelecer conexão com os espíritos ancestrais (API).";
  }
  console.error("Falha na inicialização da API Gemini:", initializationError);
}
// --- Fim do Bloco de Inicialização ---


const generateQuizBase = async (context: string, challengeTitle: string, totalPoints: number, systemInstruction: string, schema: any): Promise<QuizQuestion[] | string> => {
    if (!ai) {
      return initializationError || "A conexão com os espíritos ancestrais (API) não foi estabelecida.";
    }
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Aqui está o material de estudo para o desafio "${challengeTitle}". A pontuação total para o quiz é ${totalPoints}. Crie um quiz a partir dele:\n\n---\n${context}\n---`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature: 0.5,
        },
      });

      const jsonResponse = JSON.parse(response.text);
      if (!jsonResponse.questions || !jsonResponse.questions.length) {
          throw new Error("A IA não retornou o número esperado de perguntas.");
      }
      jsonResponse.questions.forEach((q: any) => {
          if (!q.options || q.options.length !== 3 || q.options.filter((opt: any) => opt.isCorrect).length !== 1) {
              throw new Error("A IA gerou uma pergunta com formato inválido de opções.");
          }
      });
      return jsonResponse.questions;

    } catch (error: unknown) {
      console.error("Erro ao gerar quiz com a API Gemini:", error);
      if (error instanceof Error && error.message.includes('API key not valid')) {
        return `A chave para o reino dos espíritos (API_KEY) foi rejeitada. Verifique se a chave é válida e possui as permissões necessárias.`;
      }
      if (error instanceof Error) {
        return `Os ventos da magia estão turbulentos. Não foi possível gerar o quiz. Erro: ${error.message}`;
      }
      return "Os ventos da magia estão turbulentos. Não foi possível gerar o quiz.";
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
            rationale: { type: Type.STRING, description: 'Uma breve justificativa para a resposta correta, baseada no texto.' },
          },
          required: ['questionText', 'difficulty', 'points', 'options', 'rationale'],
        },
      },
    },
    required: ['questions'],
  };


export const geminiService = {
  evaluatePlan: async (plan: string, softSkill: string): Promise<string> => {
    if (!ai) {
        return initializationError || "A conexão com os espíritos ancestrais (API) não foi estabelecida. Verifique a configuração do Mestre.";
    }
    try {
      const systemInstruction = `Você é um mentor sábio e encorajador chamado Mestre Jin, avaliando o plano estratégico de um jovem guerreiro. Seu feedback deve ser construtivo e focado na soft skill de "${softSkill}".
      Avalie o plano com base em:
      1. Clareza de pensamento.
      2. Identificação do problema central (causa raiz).
      3. Praticidade e criatividade das soluções propostas (ações corretivas/preventivas).
      
      Estruture seu feedback em markdown com duas seções:
      - **### Pontos Fortes da Sua Abordagem**
      - **### Áreas para Aprofundar a Sabedoria**
      
      Seu tom deve ser o de um mestre antigo e paciente, guiando um aluno promissor. Comece sua resposta com uma saudação apropriada como "Jovem guerreiro, analisei sua estratégia..." e termine com um encerramento encorajador. Não mencione que você é uma IA.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: plan,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      return response.text;
    } catch (error) {
      console.error("Erro ao avaliar o plano com a API Gemini:", error);
      return "Os ventos da magia estão turbulentos. Não consegui avaliar seu plano neste momento. Descanse e tente novamente quando a conexão com os espíritos estiver mais clara.";
    }
  },

  generateQuiz: async (context: string, challengeTitle: string, totalPoints: number): Promise<QuizQuestion[] | string> => {
    const systemInstruction = `Você é um especialista em criar quizzes educacionais para um jogo de RPG sobre soft skills.
      Seu objetivo é criar um quiz de 10 perguntas com base EXCLUSIVAMENTE no texto fornecido.
      As perguntas devem ser inteligentes, não triviais e testar a compreensão e aplicação do material, não apenas a memorização de frases.

      REGRAS ESTRITAS:
      1.  Crie EXATAMENTE 10 perguntas.
      2.  A distribuição de dificuldade DEVE SER: 5 perguntas 'Fácil', 4 'Médio', e 1 'Difícil'.
      3.  Cada pergunta deve ter EXATAMENTE 3 opções de resposta. Apenas UMA opção é a correta.
      4.  Para cada pergunta, forneça uma 'rationale' (justificativa) curta e clara.
      5.  **IMPORTANTE**: Mantenha um padrão de texto (tamanho, complexidade) similar entre as respostas corretas e incorretas para que a resposta certa não seja óbvia.
      6.  **PONTUAÇÃO**: Distribua um total de ${totalPoints} pontos entre as 10 questões, seguindo a proporção de dificuldade. A soma dos pontos de todas as 10 questões DEVE ser exatamente ${totalPoints}. Use uma proporção como: Difícil vale ~9x uma Fácil, e Médio vale ~4x uma Fácil. Calcule e atribua o valor em pontos para CADA questão.
      7.  NÃO use nenhuma informação externa. Baseie-se apenas no texto fornecido.
      8.  O resultado deve estar em JSON, seguindo o esquema fornecido.`;
      
    return generateQuizBase(context, challengeTitle, totalPoints, systemInstruction, baseQuizSchema);
  },

  generateRedemptionQuiz: async (context: string, challengeTitle: string, totalPoints: number): Promise<QuizQuestion[] | string> => {
    const systemInstruction = `Você é um especialista em criar quizzes educacionais para um jogo de RPG sobre soft skills.
    Seu objetivo é criar um quiz de 10 perguntas de ALTA DIFICULDADE com base EXCLUSIVAMENTE no texto fornecido. Este é um quiz de redenção para um aluno que precisa de uma segunda chance.

    REGRAS ESTRITAS:
    1.  Crie EXATAMENTE 10 perguntas.
    2.  A distribuição de dificuldade DEVE SER: 5 perguntas 'Médio', e 5 'Difícil'.
    3.  Cada pergunta deve ter EXATAMENTE 3 opções de resposta. Apenas UMA opção é a correta.
    4.  Para cada pergunta, forneça uma 'rationale' (justificativa) curta e clara.
    5.  **IMPORTANTE**: Mantenha um padrão de texto (tamanho, complexidade) similar entre as respostas corretas e incorretas. As respostas erradas devem ser plausíveis e exigir raciocínio para serem descartadas.
    6.  **PONTUAÇÃO**: Distribua um total de ${totalPoints} pontos entre as 10 questões, seguindo a proporção de dificuldade. A soma dos pontos de todas as 10 questões DEVE ser exatamente ${totalPoints}. Calcule e atribua o valor em pontos para CADA questão.
    7.  NÃO use nenhuma informação externa. Baseie-se apenas no texto fornecido.
    8.  O resultado deve estar em JSON, seguindo o esquema fornecido.`;
      
    return generateQuizBase(context, challengeTitle, totalPoints, systemInstruction, baseQuizSchema);
  },

  getFinalResultFeedback: async (playerName: string, finalScore: number, requiredScore: number): Promise<string> => {
     if (!ai) {
        return initializationError || "Os espíritos estão confusos devido a uma falha de conexão (API).";
    }
    const didPass = finalScore >= requiredScore;
    const prompt = `O guerreiro ${playerName} completou o desafio final da ilha e alcançou ${finalScore} moedas de ouro. A meta para conquistar a ilha era de ${requiredScore} moedas. Com base nisso, escreva um pequeno parágrafo de feedback para o Mestre do Jogo.
    
    - Se o guerreiro foi aprovado (${didPass}), escreva um texto de congratulações, declarando que ele provou seu valor e conquistou a ilha.
    - Se o guerreiro não foi aprovado (${!didPass}), escreva um texto de encorajamento, dizendo que ele demonstrou coragem, mas que ainda precisa de mais sabedoria (pontos) e que uma nova chance (um quiz de redenção) pode ser oferecida para provar seu valor.
    
    Seja direto e use uma linguagem que se encaixe num universo de RPG. Não mencione que você é uma IA.`;

     try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.8,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Erro ao gerar feedback final:", error);
      return "Os espíritos estão confusos. Não foi possível gerar um conselho neste momento.";
    }
  },
  
  gradeQuiz: async (quiz: Quiz, answers: number[]): Promise<{ suggestedScore: number; suggestedGeneralFeedback: string; gradedQuiz: GradedQuiz }> => {
    if (!ai) {
        const errorMsg = initializationError || "A conexão com os espíritos da IA não foi estabelecida.";
        throw new Error(errorMsg);
    }

    const systemInstruction = `Você é um mentor de um jogo de RPG, o Mestre Jin. Sua tarefa é corrigir o quiz de um aluno, fornecer feedback e uma nota.
O quiz já contém os pontos de cada questão. Sua tarefa é:

REGRAS ESTRITAS:
1.  **Calcular Nota Final:** A nota final do aluno ('suggestedScore') é a SOMA dos pontos APENAS das questões que ele acertou.
2.  **Gerar Feedback Geral:** Escreva um parágrafo como o Mestre Jin, resumindo o desempenho do aluno de forma encorajadora e sábia.
3.  **Gerar Feedback por Questão:** Para CADA questão, crie um feedback individual no formato "Frase épica e lúdica. Justificativa técnica."
4.  O resultado DEVE ser um objeto JSON que segue o schema, contendo a nota final, o feedback geral, e a lista de questões com seus pontos, dificuldade e feedbacks.`;
    
    const schema = {
        type: Type.OBJECT,
        properties: {
            suggestedScore: { type: Type.INTEGER, description: 'A nota final do aluno (soma dos pontos das questões corretas).' },
            suggestedGeneralFeedback: { type: Type.STRING, description: 'O feedback geral para o aluno, no tom do Mestre Jin.' },
            gradedQuiz: {
                type: Type.OBJECT,
                properties: {
                    questions: {
                        type: Type.ARRAY,
                        description: 'A lista de todas as questões do quiz, agora com o feedback.',
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                questionText: { type: Type.STRING },
                                options: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { text: { type: Type.STRING } } } },
                                studentAnswerIndex: { type: Type.INTEGER },
                                correctAnswerIndex: { type: Type.INTEGER },
                                feedback: { type: Type.STRING, description: 'O feedback individual no formato "Épico. Técnico."' },
                                difficulty: { type: Type.STRING, enum: ['Fácil', 'Médio', 'Difícil'] },
                                points: { type: Type.INTEGER, description: 'Os pontos que esta questão vale.' }
                            },
                            required: ['questionText', 'options', 'studentAnswerIndex', 'correctAnswerIndex', 'feedback', 'difficulty', 'points']
                        }
                    }
                },
                required: ['questions']
            }
        },
        required: ['suggestedScore', 'suggestedGeneralFeedback', 'gradedQuiz']
    };

    const promptData = {
        quiz,
        studentAnswers: answers,
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Corrija este quiz: ${JSON.stringify(promptData)}`,
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: schema,
                temperature: 0.7
            }
        });

        const jsonResponse = JSON.parse(response.text);
        
        if (!jsonResponse.gradedQuiz || !jsonResponse.gradedQuiz.questions || !jsonResponse.suggestedGeneralFeedback) {
            throw new Error("A resposta da IA não contém os campos esperados.");
        }
        
        let calculatedScore = 0;
        jsonResponse.gradedQuiz.questions.forEach((q: GradedQuestion) => {
            if(q.studentAnswerIndex === q.correctAnswerIndex){
                calculatedScore += q.points;
            }
        });

        jsonResponse.suggestedScore = jsonResponse.suggestedScore === calculatedScore ? jsonResponse.suggestedScore : calculatedScore;

        return {
            suggestedScore: jsonResponse.suggestedScore,
            suggestedGeneralFeedback: jsonResponse.suggestedGeneralFeedback,
            gradedQuiz: jsonResponse.gradedQuiz
        };

    } catch (error) {
        console.error("Erro ao gerar feedback do quiz:", error);
        let score = 0;
        const gradedQuestions = quiz.questions.map((q, i) => {
            const correctAnswerIndex = q.options.findIndex(opt => opt.isCorrect);
            if (answers[i] === correctAnswerIndex) {
                score += q.points;
            }
            return {
                questionText: q.questionText,
                options: q.options.map(opt => ({ text: opt.text })),
                studentAnswerIndex: answers[i],
                correctAnswerIndex: correctAnswerIndex,
                feedback: "A sabedoria dos espíritos ancestrais está turva. A correção automática não pôde gerar um feedback detalhado.",
                difficulty: q.difficulty,
                points: q.points
            };
        });

        return {
            suggestedScore: score,
            suggestedGeneralFeedback: `O guerreiro completou o desafio, mas a sabedoria dos espíritos ancestrais está turva e a correção automática não pôde ser concluída. A avaliação deverá ser manual.`,
            gradedQuiz: { questions: gradedQuestions }
        };
    }
  },
};