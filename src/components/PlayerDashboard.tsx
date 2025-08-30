import React, { useMemo, useState } from 'react';
import { PlayerData, GradedQuiz } from '../types';
import { contentService } from '../services/contentService';
import Mandala from './Mandala';
import GradedQuizView from './quiz/GradedQuizView';

interface PlayerDashboardProps {
    playerData: PlayerData;
    onBackToMap: () => void;
}

interface TaskFeedback {
    challengeTitle: string;
    feedback: string;
    score: number;
    gradedQuiz?: GradedQuiz;
}

const FeedbackModal = ({ task, onClose }: { task: TaskFeedback, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] flex flex-col border border-yellow-500/50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-cinzel text-yellow-400">{task.challengeTitle}</h3>
                <p className="text-lg text-yellow-200">Nota Final: {task.score}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 space-y-6">
                 {task.gradedQuiz && (
                  <div>
                    <h4 className="text-xl font-cinzel text-gray-200 mb-4 border-b border-gray-600 pb-2">Sua Avaliação Detalhada</h4>
                    <GradedQuizView gradedQuiz={task.gradedQuiz} />
                  </div>
                )}
                
                <div>
                  <h4 className="text-xl font-cinzel text-gray-200 mb-2">{task.gradedQuiz ? 'Comentários Finais do Mestre' : 'Feedback do Mestre'}</h4>
                  <div 
                    className="prose prose-invert prose-p:text-gray-300 prose-headings:text-yellow-400 text-gray-300 whitespace-pre-wrap bg-black/20 p-4 rounded-md" 
                    dangerouslySetInnerHTML={{ __html: task.feedback.replace(/\n/g, '<br />') }} 
                  />
                </div>
            </div>

            <button 
                onClick={onClose} 
                className="mt-6 w-full bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded transition-colors"
            >
                Fechar
            </button>
        </div>
    </div>
);

const PlayerDashboard = ({ playerData, onBackToMap }: PlayerDashboardProps) => {
  const islands = useMemo(() => contentService.getIslands(), []);
  const [selectedFeedback, setSelectedFeedback] = useState<TaskFeedback | null>(null);
  
  const totalScore = Object.values(playerData.progress).reduce((acc, island: { score: number }) => acc + island.score, 0);
  
  const petalsEarned = contentService.MANDALA_PETAL_THRESHOLDS.filter(threshold => totalScore >= threshold).length;
  
  const nextPetalThreshold = contentService.MANDALA_PETAL_THRESHOLDS[petalsEarned];

  const conqueredIslands = Object.keys(playerData.progress)
    .filter(id => playerData.progress[Number(id)].score >= contentService.TOTAL_POINTS_TO_CONQUER)
    .map(Number);
  
  const currentIslandId = conqueredIslands.length + 1;

  const feedbacks: TaskFeedback[] = playerData.taskFeedback ? Object.values(playerData.taskFeedback) : [];

  return (
    <>
    {selectedFeedback && <FeedbackModal task={selectedFeedback} onClose={() => setSelectedFeedback(null)} />}
    <div className="bg-gray-800/60 p-6 rounded-lg border border-yellow-500/20 backdrop-blur-sm">
      <button onClick={onBackToMap} className="mb-6 text-yellow-400 hover:text-yellow-300 font-semibold">
        &larr; Voltar ao Mapa-Múndi
      </button>

      <h2 className="text-4xl font-cinzel text-center text-yellow-400 mb-8">Pergaminho da Jornada</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1 lg:order-2 bg-gray-900/40 p-6 rounded-xl border border-gray-700/50 flex flex-col items-center">
            <h3 className="text-2xl font-cinzel text-yellow-300 mb-4">A Mandala Mágica</h3>
            <Mandala petalsEarned={petalsEarned} />
            <p className="text-gray-300 mt-4 text-center">Você reuniu <span className="font-bold text-white">{petalsEarned} de 5</span> pétalas.</p>
            <p className="text-3xl font-cinzel text-white my-4">{totalScore.toLocaleString()} <span className="text-yellow-400 text-2xl">Moedas de Ouro</span></p>
            {petalsEarned < 5 && nextPetalThreshold &&(
                 <p className="text-sm text-gray-400 text-center">A próxima pétala será sua ao atingir {nextPetalThreshold.toLocaleString()} moedas.</p>
            )}
            {petalsEarned === 5 && (
                 <p className="font-bold text-yellow-300 text-center">A MANDALA ESTÁ COMPLETA!</p>
            )}
        </div>

        <div className="lg:col-span-2 lg:order-1 flex flex-col gap-8">
            <div className="bg-gray-900/40 p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-2xl font-cinzel text-yellow-300 mb-4">Progresso nas Ilhas</h3>
              <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-3">
                {islands.map(island => {
                  const islandProgress = playerData.progress[island.id] || { score: 0 };
                  const isConquered = conqueredIslands.includes(island.id);
                  const isCurrent = island.id === currentIslandId;
                  
                  let statusIcon;
                  if (isConquered) statusIcon = <span title="Conquistada" className="text-green-400">✔</span>;
                  else if (isCurrent) statusIcon = <span title="Jornada Atual" className="text-blue-400">»</span>;
                  else statusIcon = <span title="Bloqueada" className="text-gray-500">🔒</span>;

                  return (
                    <div key={island.id} className="flex items-center justify-between bg-black/20 p-3 rounded-lg">
                      <div className="flex items-center gap-3"><div className="text-lg font-bold">{statusIcon}</div>
                        <div>
                          <p className="font-semibold text-gray-200">{island.name}</p>
                          <p className="text-sm text-gray-400">{island.softSkill}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-yellow-400">{islandProgress.score.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Moedas</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-gray-900/40 p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-2xl font-cinzel text-yellow-300 mb-4">Feedbacks dos Desafios</h3>
               <div className="space-y-2 max-h-[25vh] overflow-y-auto pr-3">
                    {feedbacks.length > 0 ? feedbacks.map((fb, index) => (
                        <div key={index} className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
                            <p className="font-semibold text-gray-200">{fb.challengeTitle}</p>
                            <button onClick={() => setSelectedFeedback(fb)} className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-md">Ver Feedback</button>
                        </div>
                    )) : (
                        <p className="text-gray-500 italic text-center p-4">Nenhum feedback de desafio recebido ainda.</p>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PlayerDashboard;