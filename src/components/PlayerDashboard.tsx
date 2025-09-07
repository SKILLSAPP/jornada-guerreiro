import React, { useMemo, useState } from 'react';
import { PlayerData, GradedQuiz } from '../types';
import { contentService } from '../services/contentService';
import Mandala from './Mandala';
import GradedQuizView from './quiz/GradedQuizView';

interface PlayerDashboardProps {
    playerData: PlayerData;
    onBackToMap: () => void;
    onUpdateProgress: (newProgress: PlayerData) => void;
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

const PlayerDashboard = ({ playerData, onBackToMap, onUpdateProgress }: PlayerDashboardProps) => {
  const islands = useMemo(() => contentService.getIslands(), []);
  const [selectedFeedback, setSelectedFeedback] = useState<TaskFeedback | null>(null);
  const [trainingCode, setTrainingCode] = useState('');
  const [rewardMessage, setRewardMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const totalScore = Object.values(playerData.progress).reduce((acc, island: { score: number }) => acc + island.score, 0);
  
  const petalsEarned = contentService.MANDALA_PETAL_THRESHOLDS.filter(threshold => totalScore >= threshold).length;
  
  const nextPetalThreshold = contentService.MANDALA_PETAL_THRESHOLDS[petalsEarned];

  const conqueredIslands = Object.keys(playerData.progress)
    .filter(id => playerData.progress[Number(id)].score >= contentService.TOTAL_POINTS_TO_CONQUER)
    .map(Number);
  
  const currentIslandId = conqueredIslands.length + 1;

  const feedbacks: TaskFeedback[] = playerData.taskFeedback ? Object.values(playerData.taskFeedback) : [];

  const handleRedeemCode = () => {
    setRewardMessage(null);
    if (!trainingCode.trim()) {
        setRewardMessage({ type: 'error', text: 'Por favor, insira um código de mérito.' });
        return;
    }

    try {
        const decodedJson = atob(trainingCode);
        const data = JSON.parse(decodedJson);

        if (!data.date || data.duration === undefined || typeof data.duration !== 'number') {
            throw new Error('Formato de código inválido.');
        }
        
        if (playerData.claimedTrainingDates?.includes(data.date)) {
            setRewardMessage({ type: 'error', text: 'A recompensa para esta data já foi resgatada.' });
            return;
        }

        if (data.duration < 15) {
            setRewardMessage({ type: 'error', text: "Jovem Guerreiro, você não tem direito à recompensa pois treinou suas habilidades por menos de 15 minutos." });
            return;
        }

        // All checks passed, grant reward
        const newPlayerData = JSON.parse(JSON.stringify(playerData));
        const islandForPoints = currentIslandId <= islands.length ? currentIslandId : islands.length;
        
        if (!newPlayerData.progress[islandForPoints]) {
            newPlayerData.progress[islandForPoints] = { score: 0, completedChallenges: [] };
        }
        newPlayerData.progress[islandForPoints].score += 5;

        if (!newPlayerData.claimedTrainingDates) {
            newPlayerData.claimedTrainingDates = [];
        }
        newPlayerData.claimedTrainingDates.push(data.date);

        onUpdateProgress(newPlayerData);
        setRewardMessage({ type: 'success', text: "Parabéns Jovem Guerreiro! Você fez um belo treinamento e por isso ganhou a sua recompensa em moedas de ouro!" });
        setTrainingCode('');

    } catch (error) {
        setRewardMessage({ type: 'error', text: 'Código Inválido ou corrompido.' });
        console.error("Erro ao resgatar código:", error);
    }
  };

  const handleGoToTraining = () => {
    const trainingAppUrl = "https://warriorskills.netlify.app/";

    // 1. Criar o payload (o conteúdo do token)
    const payload = {
        name: playerData.name,
        timestamp: Date.now() // Timestamp em milissegundos
    };

    // 2. Converter para JSON e depois para Base64
    const token = btoa(JSON.stringify(payload));

    // 3. Montar a URL final e abrir em uma nova aba
    const finalUrl = `${trainingAppUrl}?token=${token}`;
    window.open(finalUrl, '_blank');
  };


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

            <div className="bg-gray-900/40 p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-2xl font-cinzel text-green-300 mb-4">Treinamento e Recompensas</h3>
              <p className="text-gray-400 mb-4 text-center max-w-md mx-auto">Use o tabuleiro para refinar suas táticas e fortalecer seu espírito.</p>
              <div className="text-center mb-6">
                <button
                    onClick={handleGoToTraining}
                    className="inline-block px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 font-cinzel tracking-wider"
                >
                    TREINAMENTO DO GUERREIRO
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-green-500/20">
                <h4 className="text-xl font-cinzel text-yellow-300 text-center mb-2">Resgatar Recompensa de Treino</h4>
                <p className="text-xs text-center text-gray-400 mb-4">Treinou por 15 minutos ou mais? Cole seu código aqui para ganhar 5 moedas de ouro (recompensa diária).</p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                    <input 
                        type="text"
                        value={trainingCode}
                        onChange={(e) => setTrainingCode(e.target.value)}
                        placeholder="Cole o código de mérito aqui"
                        className="flex-grow px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200 placeholder-gray-500 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                    <button 
                        onClick={handleRedeemCode}
                        className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold rounded-md transition-colors"
                    >
                        Resgatar
                    </button>
                </div>
                {rewardMessage && (
                    <p className={`mt-3 text-center text-sm font-semibold ${rewardMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {rewardMessage.text}
                    </p>
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