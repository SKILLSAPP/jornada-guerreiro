import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, Quiz, GradedQuiz, Island, PlayerData, PlayerProgress } from '../types';

let geminiAiClient: GoogleGenAI | null = null;
export let geminiInitializationError: string | null = null;

// Self-invoking function to initialize on module load without throwing
(() => {
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
        model: 'gemini-2.5-flash',
        contents: `Aqui está o material de estudo para o desafio "${challengeTitle}". A pontuação total para o quiz é ${totalPoints}. Crie um quiz a partir dele:\n\n---\n${context}\n---`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature: 0.5,
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
      jsonResponse.questions.forEach((q: any) => {
          if (!q.options || q.options.length !== 3 || q.options.filter((opt: any) => opt.isCorrect).length !== 1) {
              throw new Error("A IA gerou uma pergunta com formato inválido de opções.");
          }
      });
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
    if (geminiInitializationError) return geminiInitializationError;
    if (!geminiAiClient) return "Cliente Gemini AI não inicializado.";
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

      const response = await geminiAiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: plan,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      return response.text || "Os ventos da magia estão turbulentos. Não consegui avaliar seu plano neste momento.";
    } catch (error) {
      return handleApiError(error, "avaliação de plano");
    }
  },

  generateQuiz: async (context: string, challengeTitle: string, totalPoints: number): Promise<QuizQuestion[] | string> => {
    const systemInstruction = `Você é um especialista em criar quizzes para um jogo de RPG sobre soft skills. Sua finalidade é avaliar de forma justa, rigorosa e técnica a compreensão, aplicação e análise dos conceitos abordados no material, respeitando a curva de dificuldade.

REGRAS GERAIS ESTRITAS:
1.  **Foco no Material:** Baseie-se ESTRITAMENTE no material de estudo fornecido. Não invente conceitos.
2.  **Formato do Quiz:**
    *   Crie EXATAMENTE 10 perguntas.
    *   Cada pergunta deve ter EXATAMENTE 3 alternativas de resposta, com apenas UMA correta.
    *   Para cada pergunta, forneça uma 'rationale' (justificativa) curta e clara para a resposta correta.
3.  **Balanceamento e Qualidade:**
    *   **CRÍTICO - BALANCEAMENTO DE RESPOSTAS:** As 3 alternativas de resposta (correta e incorretas) DEVEM ter tamanho, estrutura e nível de detalhe muito semelhantes. A resposta correta NUNCA deve ser visivelmente mais longa ou mais detalhada. Este é um requisito fundamental para evitar dicas.
    *   Todas as questões devem exigir raciocínio, não apenas memorização.
    *   Todas as alternativas, mesmo as incorretas, devem ser verossímeis e plausíveis dentro do contexto. Evite respostas absurdas.
    *   Evite palavras-chave como "sempre", "nunca" que entreguem a resposta.
4.  **Distribuição e Pontuação:**
    *   **Dificuldade:** A distribuição DEVE SER: 5 'Fácil', 4 'Médio', e 1 'Difícil'.
    *   **Pontuação Fixa por Desafio:** Você DEVE atribuir pontos fixos para cada questão com base na sua dificuldade e no desafio correspondente. A soma total dos pontos DEVE corresponder exatamente ao valor total do desafio (informado no prompt). Siga ESTAS regras ESTRITAMENTE, que foram validadas pelo Mestre do Jogo:
        *   **Desafio 1 (vale 150 pontos):** Questões 'Fácil' valem 5 pontos, 'Médio' valem 20 pontos, e 'Difícil' vale 45 pontos.
        *   **Desafio 2 (vale 200 pontos):** Questões 'Fácil' valem 8 pontos, 'Médio' valem 25 pontos, e 'Difícil' vale 60 pontos.
        *   **Desafio 3 (vale 250 pontos):** Questões 'Fácil' valem 10 pontos, 'Médio' valem 30 pontos, e 'Difícil' vale 80 pontos.
5.  **JSON Output:** O resultado DEVE ser um objeto JSON que segue o schema fornecido.

---

### PADRÕES DETALHADOS POR NÍVEL DE DIFICULDADE

#### 1. NÍVEL FÁCIL (5 perguntas)
*   **Objetivo:** Avaliar a compreensão de conceitos básicos.
*   **Formato:** Perguntas curtas e diretas (conceituais, de definição ou aplicação simples).
*   **Diretriz:** Exigir raciocínio básico. As três respostas devem ser verossímeis, forçando o aluno a pensar em vez de apenas excluir opções obviamente erradas.

#### 2. NÍVEL MÉDIO (4 perguntas)
*   **Objetivo:** Avaliar a aplicação de conceitos em situações práticas.
*   **Formato:** Apresente um mini-caso ou uma situação do cotidiano corporativo em 3 a 4 linhas.
*   **Diretriz:** A pergunta deve explorar um dilema ou decisão. As alternativas devem ser elaboradas (1 a 2 linhas cada), com argumentos lógicos, exigindo análise para escolher a correta.

#### 3. NÍVEL DIFÍCIO (1 pergunta)
*   **Objetivo:** Avaliar a análise crítica de um cenário complexo.
*   **Formato:** Elabore um pequeno storytelling (6 a 8 linhas) descrevendo um problema corporativo realista e desafiador. A pergunta deve derivar desse cenário.
*   **Diretriz:** O problema deve ter contexto e detalhes. As alternativas devem ser plausíveis e bem argumentadas, forçando o raciocínio crítico para encontrar a melhor solução baseada no material.
*   **ATENÇÃO MÁXIMA A ESTA REGRA CRÍTICA:** Para a pergunta difícil, as três alternativas de resposta (a correta e as duas incorretas) DEVEM ser meticulosamente elaboradas para serem quase IDÊNTICAS em tamanho (contagem de palavras/linhas), estrutura e profundidade de argumentação. O guerreiro não pode, de forma alguma, deduzir a resposta correta porque ela é mais completa ou detalhada. As respostas incorretas devem ser igualmente detalhadas e plausíveis, representando caminhos de raciocínio lógicos, porém equivocados, dentro do cenário apresentado. Sem dicas!
`;
      
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
    5.  **CRÍTICO - BALANCEAMENTO DE RESPOSTAS:** Mantenha um padrão de texto (tamanho, estrutura, complexidade) similar entre as respostas corretas e incorretas. As respostas erradas devem ser plausíveis e exigir raciocínio para serem descartadas. A resposta correta não deve se destacar.
    6.  **PONTUAÇÃO**: Atribua pontos FIXOS com base na dificuldade. As pontuações DEVEM ser:
        *   **Médio:** 20 pontos.
        *   **Difícil:** 45 pontos.
    7.  NÃO use nenhuma informação externa. Baseie-se apenas no texto fornecido.
    8.  O resultado deve estar em JSON, seguindo o esquema fornecido.`;
      
    return generateQuizBase(context, challengeTitle, totalPoints, systemInstruction, baseQuizSchema);
  },

  getFinalResultFeedback: async (playerName: string, finalScore: number, requiredScore: number): Promise<string> => {
    if (geminiInitializationError) return geminiInitializationError;
    if (!geminiAiClient) return "Cliente Gemini AI não inicializado.";
    const didPass = finalScore >= requiredScore;
    const prompt = `O guerreiro ${playerName} completou o desafio final da ilha e alcançou ${finalScore} moedas de ouro. A meta para conquistar a ilha era de ${requiredScore} moedas. Com base nisso, escreva um pequeno parágrafo de feedback para o Mestre do Jogo.
    
    - Se o guerreiro foi aprovado (${didPass}), escreva um texto de congratulações, declarando que ele provou seu valor e conquistou a ilha.
    - Se o guerreiro não foi aprovado (${!didPass}), escreva um texto de encorajamento, dizendo que ele demonstrou coragem, mas que ainda precisa de mais sabedoria (pontos) e que uma nova chance (um quiz de redenção) pode ser oferecida para provar seu valor.
    
    Seja direto e use uma linguagem que se encaixe num universo de RPG. Não mencione que você é uma IA.`;

     try {
      const response = await geminiAiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.8,
        },
      });
      return response.text || "Os espíritos estão confusos. Não foi possível gerar um conselho neste momento.";
    } catch (error) {
      return handleApiError(error, "geração de feedback final");
    }
  },
  
  gradeQuiz: async (quiz: Quiz, answers: number[]): Promise<{ suggestedScore: number; suggestedGeneralFeedback: string; gradedQuiz: GradedQuiz }> => {
    if (geminiInitializationError) throw new Error(geminiInitializationError);
    if (!geminiAiClient) throw new Error("Cliente Gemini AI não inicializado.");
    
    const promptPayload = {
      quiz,
      studentAnswers: answers,
    };

    const schema = {
      type: Type.OBJECT,
      properties: {
        suggestedScore: { type: Type.INTEGER, description: 'A pontuação total calculada para o aluno.' },
        suggestedGeneralFeedback: { type: Type.STRING, description: 'Um parágrafo de feedback geral sobre o desempenho.' },
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
                  feedback: { type: Type.STRING, description: 'O feedback combinado (épico + técnico) para a questão.' },
                  difficulty: { type: Type.STRING, enum: ['Fácil', 'Médio', 'Difícil'] },
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
      const systemInstruction = `Você é um mentor de um jogo de RPG, o Mestre Jin. Sua tarefa é corrigir o quiz de um aluno, fornecer feedback e uma nota.
O quiz já contém os pontos de cada questão. Sua tarefa é:

REGRAS ESTRITAS:
1.  **Calcular Nota Final:** A nota final do aluno ('suggestedScore') é a SOMA dos pontos APENAS das questões que ele acertou.
2.  **Gerar Feedback Geral:** Escreva um parágrafo como o Mestre Jin, resumindo o desempenho do aluno de forma encorajadora e sábia.
3.  **Gerar Feedback por Questão:** Para o campo \`feedback\` de CADA questão, use o seguinte formato de duas partes:
    *   **Parte 1 (Lúdica):** Uma frase curta, épica e sábia no tom do Mestre Jin. Use termos como "Jovem Guerreiro", "Aprendiz", "Guerreiro". Use um tom de humor inteligente. Exemplo: "Ah, Jovem Guerreiro, aqui o caminho ficou um pouco turvo." ou "Excelente, sua lâmina de raciocínio cortou o âmago da questão!".
    *   **Parte 2 (Técnica):** Uma explicação técnica e clara, baseada na 'rationale' da pergunta, explicando por que a resposta do aluno está certa ou errada.
4.  **JSON Output:** O resultado DEVE ser um objeto JSON que segue o schema fornecido.`;

      const response = await geminiAiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Corrija este quiz para mim. Aqui estão os dados em JSON:\n\n${JSON.stringify(promptPayload, null, 2)}`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature: 0.4,
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error("A IA retornou uma resposta JSON vazia.");
      }

      const gradedResult = JSON.parse(text);

      if (gradedResult.suggestedScore === undefined || !gradedResult.suggestedGeneralFeedback || !gradedResult.gradedQuiz?.questions) {
        throw new Error("A resposta da IA não contém todos os campos esperados.");
      }

      return gradedResult;

    } catch (error) {
       console.error("Erro ao avaliar o quiz com a IA:", error);
       if (error instanceof Error) {
         throw new Error(`O Mestre Jin está meditando e não pôde avaliar o quiz agora. Erro: ${error.message}`);
       }
       throw new Error("O Mestre Jin está meditando e não pôde avaliar o quiz agora.");
    }
  },

  getStudentProgressAnalysis: async (
    playerName: string,
    currentIsland: Island,
    progress: PlayerProgress,
    taskFeedback?: PlayerData['taskFeedback']
  ): Promise<string> => {
    if (geminiInitializationError) return geminiInitializationError;
    if (!geminiAiClient) return "Cliente Gemini AI não inicializado.";

    const islandProgress = progress[currentIsland.id] || { score: 0, completedChallenges: [] };
    
    const islandFeedbacks = taskFeedback ? Object.entries(taskFeedback)
      .filter(([key]) => key.endsWith(`-${currentIsland.id}`))
      .map(([_, value]) => `Desafio: "${value.challengeTitle}", Nota: ${value.score}, Feedback: "${value.feedback}"`)
      .join('\n') : "Nenhum feedback recebido ainda.";

    const prompt = `Você é um Mentor IA para um jogo de RPG de soft skills. Sua tarefa é fornecer uma análise técnica e crítica sobre a evolução do guerreiro ${playerName} na ilha "${currentIsland.name}", que foca na soft skill "${currentIsland.softSkill}".

Dados do Guerreiro:
- Pontuação na Ilha: ${islandProgress.score}
- Desafios Completados na Ilha: ${islandProgress.completedChallenges.length} de ${currentIsland.challenges.length}
- Feedbacks Recebidos nesta Ilha:
${islandFeedbacks}

Com base nesses dados, escreva uma análise concisa (2-3 parágrafos) que aborde:
1.  **Pontos Fortes:** Destaque o bom desempenho, como notas altas ou progresso rápido.
2.  **Pontos de Melhoria:** Identifique áreas onde o guerreiro pode melhorar com base nos feedbacks ou em desafios ainda não concluídos.
3.  **Próximo Passo Sugerido:** Ofereça um conselho tático para o próximo desafio ou para a conclusão da ilha.

Mantenha um tom de mentor, sendo técnico, mas encorajador. Não mencione que você é uma IA.`;

    try {
      const response = await geminiAiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.6,
        },
      });
      return response.text || "Os espíritos ancestrais permaneceram em silêncio. Nenhuma análise foi retornada.";
    } catch (error) {
      return handleApiError(error, `análise de progresso de ${playerName}`);
    }
  },
};