
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available as an environment variable
const apiKey = process.env.API_KEY;
if (!apiKey) {
  // For this project, we assume the key is set in the deployment environment.
  // The UI or service layer should handle the 'null' key case gracefully.
  console.error("Variável de ambiente API_KEY não definida.");
}

// Initialize AI with a potentially null key.
// The service functions will handle the case where the AI client is not available.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const geminiService = {
  evaluatePlan: async (plan: string, softSkill: string): Promise<string> => {
    if (!ai) {
        return "A conexão com os espíritos ancestrais (API) não foi estabelecida. Verifique a configuração do Mestre.";
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
};