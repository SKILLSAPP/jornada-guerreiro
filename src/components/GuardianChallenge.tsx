
import React, { useState } from 'react';
import { Challenge, PlayerData } from '../types';

interface GuardianChallengeProps {
  challenge: Challenge;
  softSkill: string;
  playerData: PlayerData;
  onSubmitForReview: (challengeId: number, submissionText: string, submissionType: 'presentation') => void;
  onClose: () => void;
}

const GuardianChallenge = ({ challenge, softSkill, playerData, onSubmitForReview, onClose }: GuardianChallengeProps) => {
  const [submission, setSubmission] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submission.trim().length < 50) {
      alert("Guerreiro, seu plano de ação deve ser mais detalhado (mínimo 50 caracteres).");
      return;
    }
    setIsSubmitting(true);
    onSubmitForReview(challenge.id, submission, 'presentation');
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200] p-4 font-inter">
      <div className="bg-gray-900 w-full max-w-4xl rounded-2xl border border-red-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gray-800 p-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            <h2 className="font-cinzel text-yellow-400 font-bold tracking-widest uppercase text-sm">Desafio do Guardião: {softSkill}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Lado Esquerdo: O Caso */}
            <div className="space-y-6">
              <div className="bg-red-900/10 border border-red-500/20 p-5 rounded-xl">
                <h3 className="font-cinzel text-red-400 text-lg mb-3">O Case Corporativo</h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {challenge.description}
                </p>
              </div>

              <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                <h4 className="font-bold text-gray-200 text-sm mb-3">Recursos Estratégicos:</h4>
                <div className="flex flex-col gap-2">
                  {challenge.resources.map((res, idx) => (
                    <a 
                      key={idx} 
                      href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs bg-gray-700 hover:bg-gray-600 p-2 rounded text-blue-300 transition-colors flex items-center justify-between"
                    >
                      <span>{res.label} ({res.type})</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Lado Direito: A Solução */}
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <h3 className="font-cinzel text-yellow-500 text-lg mb-3">Seu Plano de Ação</h3>
              <p className="text-xs text-gray-400 mb-4 italic">
                Apresente sua solução detalhada para o problema. Como você aplicaria a {softSkill} para resolver este case?
              </p>
              
              <textarea
                value={submission}
                onChange={(e) => setSubmission(e.target.value)}
                placeholder="Escreva seu plano de ação aqui..."
                disabled={isSubmitting}
                className="flex-grow w-full bg-black/40 border border-gray-700 rounded-xl p-4 text-gray-200 text-sm focus:border-yellow-500 outline-none transition-colors min-h-[300px]"
              />

              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting || submission.trim().length < 10}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 disabled:bg-gray-700 disabled:text-gray-500"
                >
                  {isSubmitting ? "ENVIANDO AO CONSELHO..." : "SUBMETER PLANO DE AÇÃO"}
                </button>
                <p className="text-[10px] text-gray-500 text-center">
                  Após o envio, o Mestre avaliará sua proposta para conceder a conquista da ilha.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianChallenge;
