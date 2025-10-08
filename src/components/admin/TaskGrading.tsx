import React, { useState, useEffect, useCallback } from 'react';
import { PlayerData, Island, Challenge, Quiz, GradedQuiz, PendingSubmission, PlayerProgress } from '../../types';
import { gameService } from '../../services/gameService';
import { contentService } from '../../services/contentService';
import { geminiService } from '../../services/geminiService';
import GradedQuizView from '../quiz/GradedQuizView';

interface GradingState {
    key: string;
    isLoading: boolean;
    feedback: string;
    score: string;
    gradedQuiz?: GradedQuiz;
    presentationScore?: string;
    finalFeedback?: string;
}

// Represents the state for the final judgment screen after a redemption quiz
interface JudgementState {
    player: PlayerData;
    islandId: number;
    challengeId: number;
    presentationScore: number;
    redemptionQuizScore: number;
    finalIslandScore: number;
    feedback: string;
    gradedQuiz: GradedQuiz;
}


export default function TaskGrading() {
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [islands, setIslands] = useState<Island[]>([]);
    const [gradingState, setGradingState] = useState<Partial<GradingState>>({});
    const [judgementState, setJudgementState] = useState<JudgementState | null>(null);
    const [desperationPoints, setDesperationPoints] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        const playersResult = await gameService.getAllPlayersData();
        if(playersResult.error) {
            setError(playersResult.error);
            setPlayers([]);
        } else {
            setPlayers(playersResult.data || []);
        }

        setIslands(contentService.getIslands());
        setGradingState({});
        setJudgementState(null);
        setDesperationPoints('');
        setLoading(false);
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleMarkMessageAsRead = async (player: PlayerData) => {
        const updatedPlayer = JSON.parse(JSON.stringify(player));
        delete updatedPlayer.pendingMentorMessage;
        await gameService.savePlayerData(updatedPlayer);
        await loadData();
    };

    const handleApproveSummary = async (player: PlayerData, islandId: number) => {
        const updatedPlayer = JSON.parse(JSON.stringify(player));
        const progress: PlayerProgress[number] = updatedPlayer.progress[islandId];
        
        if (progress?.extraordinaryChallenge) {
            progress.extraordinaryChallenge.summaryApproved = true;
            updatedPlayer.progress[islandId] = progress;
            await gameService.savePlayerData(updatedPlayer);
            await loadData(); // Refresh the list
        }
    };

    const handleGradeWithAI = async (player: PlayerData, islandId: number, challenge: Challenge, submission: PendingSubmission) => {
        const key = `${player.name}-${islandId}-${challenge.id}`;
        setGradingState({ ...gradingState, key, isLoading: true });

        let quizId: string | undefined;
        // Check if it's a redemption quiz submission for challenge 4
        if (challenge.id === 4 && submission.answers && submission.redemptionQuizOffered) {
            quizId = `island-${islandId}-challenge-${challenge.id}-redemption`;
        } else {
            quizId = challenge.quizId;
        }

        if (!quizId) {
             setGradingState({ ...gradingState, key, isLoading: false, feedback: 'Erro: ID do Quiz não encontrado.' });
             return;
        }
    
        const quiz = contentService.getQuiz(quizId);
        if (!quiz || !submission.answers) {
            setGradingState({ ...gradingState, key, isLoading: false, feedback: 'Erro: Quiz ou respostas não encontrados.' });
            return;
        }

        try {
            const { suggestedScore, suggestedGeneralFeedback, gradedQuiz } = await geminiService.gradeQuiz(quiz, submission.answers);
            setGradingState({ ...gradingState, key, isLoading: false, feedback: suggestedGeneralFeedback, score: suggestedScore.toString(), gradedQuiz });
        } catch (error) {
             console.error("Failed to grade with AI:", error);
             setGradingState({ ...gradingState, key, isLoading: false, feedback: 'Erro ao contatar IA.' });
        }
    };
    
    const handleCalculateInitialPresentationResult = async (player: PlayerData, islandId: number, challengeId: number) => {
        const key = `${player.name}-${islandId}-${challengeId}`;
        const score = parseInt(gradingState.presentationScore || '0', 10);
        if(isNaN(score)){
            alert("Por favor, insira uma nota válida.");
            return;
        }
        
        setGradingState({ ...gradingState, key, isLoading: true });

        const islandProgress = player.progress[islandId] || { score: 0 };
        const totalScore = islandProgress.score + score;

        const feedback = await geminiService.getFinalResultFeedback(player.name, totalScore, contentService.TOTAL_POINTS_TO_CONQUER);
        setGradingState({ ...gradingState, key, isLoading: false, finalFeedback: feedback, presentationScore: score.toString() });
    };

    const handleGuardianInitialDecision = async (player: PlayerData, islandId: number, challengeId: number, approve: boolean) => {
        const scoreValue = parseInt(gradingState.presentationScore || '0', 10);
        
        const updatedPlayer = JSON.parse(JSON.stringify(player));
        const progress: PlayerProgress[number] = updatedPlayer.progress[islandId];
        
        if (progress?.pendingSubmissions?.[challengeId]) {
             if (approve) {
                 progress.score = (progress.score || 0) + scoreValue;
                 if (!progress.completedChallenges) progress.completedChallenges = [];
                 progress.completedChallenges.push(challengeId);
                 delete progress.pendingSubmissions[challengeId];

                 if (!updatedPlayer.taskFeedback) updatedPlayer.taskFeedback = {};
                 updatedPlayer.taskFeedback[`${challengeId}-${islandId}`] = {
                     challengeTitle: `Desafio do Guardião (Avaliação Final)`,
                     feedback: gradingState.finalFeedback || 'Aprovado pelo Mestre.',
                     score: scoreValue,
                 };
             } else { // Offer redemption quiz
                progress.pendingSubmissions[challengeId].redemptionQuizOffered = true;
                progress.pendingSubmissions[challengeId].presentationScore = scoreValue;
             }
            
            updatedPlayer.progress[islandId] = progress;
            await gameService.savePlayerData(updatedPlayer);
            await loadData();
        }
    };

    const handleConfirmGrade = async (player: PlayerData, islandId: number, challenge: Challenge, submission: PendingSubmission) => {
        if (!gradingState.key || !gradingState.gradedQuiz || !gradingState.score) return;

        const scoreValue = parseInt(gradingState.score, 10);
        const isRedemptionQuiz = challenge.id === 4 && submission.redemptionQuizOffered === true;

        // If it's a redemption quiz, go to the judgement chamber instead of finishing
        if (isRedemptionQuiz) {
            const presentationScore = submission.presentationScore || 0;
            const finalIslandScore = (player.progress[islandId]?.score || 0) + presentationScore + scoreValue;
            
            setJudgementState({
                player,
                islandId,
                challengeId: challenge.id,
                presentationScore,
                redemptionQuizScore: scoreValue,
                finalIslandScore,
                feedback: gradingState.feedback || '',
                gradedQuiz: gradingState.gradedQuiz,
            });
            // Clear grading state as we are moving to a new view
            setGradingState({});

        } else { // Standard quiz flow
            const updatedPlayer = JSON.parse(JSON.stringify(player));
            const progress: PlayerProgress[number] = updatedPlayer.progress[islandId];
            
            if (progress?.pendingSubmissions?.[challenge.id]) {
                progress.score = (progress.score || 0) + scoreValue;
                if (!progress.completedChallenges) progress.completedChallenges = [];
                progress.completedChallenges.push(challenge.id);
                delete progress.pendingSubmissions[challenge.id];
                
                if (!updatedPlayer.taskFeedback) updatedPlayer.taskFeedback = {};
                updatedPlayer.taskFeedback[`${challenge.id}-${islandId}`] = {
                    challengeTitle: challenge.title,
                    feedback: gradingState.feedback || 'Avaliado pelo Mestre.',
                    score: scoreValue,
                    gradedQuiz: gradingState.gradedQuiz,
                };

                updatedPlayer.progress[islandId] = progress;
                await gameService.savePlayerData(updatedPlayer);
                await loadData();
            }
        }
    };

    const handleFinalJudgement = async (finalPointsToAdd: number, isDesperationChallenge: boolean = false) => {
        if (!judgementState) return;

        const { player, islandId, challengeId, feedback, gradedQuiz, redemptionQuizScore, presentationScore } = judgementState;

        const updatedPlayer = JSON.parse(JSON.stringify(player));
        const progress: PlayerProgress[number] = updatedPlayer.progress[islandId];

        if (progress?.pendingSubmissions?.[challengeId]) {
            // Add scores from all parts of the final challenge
            progress.score += presentationScore + redemptionQuizScore + finalPointsToAdd;

            if (!progress.completedChallenges) progress.completedChallenges = [];
            progress.completedChallenges.push(challengeId);
            delete progress.pendingSubmissions[challengeId];

            let finalFeedback = feedback;
            if (isDesperationChallenge) {
                finalFeedback += `\n\n**Veredito do Mestre:** Após o Desafio dos Desesperados, o guerreiro conquistou mais ${finalPointsToAdd} moedas de ouro e provou seu valor.`;
            } else {
                 finalFeedback += `\n\n**Veredito do Mestre:** O guerreiro provou seu valor e conquistou a ilha com honra.`;
            }

            if (!updatedPlayer.taskFeedback) updatedPlayer.taskFeedback = {};
            updatedPlayer.taskFeedback[`${challengeId}-${islandId}`] = {
                challengeTitle: `Desafio do Guardião (Quiz de Redenção)`,
                feedback: finalFeedback,
                score: redemptionQuizScore, // Score for the quiz part
                gradedQuiz: gradedQuiz,
            };

            updatedPlayer.progress[islandId] = progress;
            await gameService.savePlayerData(updatedPlayer);
            await loadData();
        }
    };

    const pendingMentorMessages = players.filter(p => p.pendingMentorMessage);

    const pendingSummaries = players.flatMap(player =>
        Object.entries(player.progress).map(([islandIdStr, islandProgress]) => {
            const islandId = Number(islandIdStr);
            const island = islands.find(i => i.id === islandId);
            // FIX: Added type assertion to resolve 'property does not exist on type unknown' error.
            const ecState = (islandProgress as PlayerProgress[number]).extraordinaryChallenge;
            if (island && ecState?.summarySubmitted && !ecState.summaryApproved) {
                return { player, island, summaryText: ecState.summaryText };
            }
            return null;
        })
    ).filter(Boolean);


    const pendingSubmissions = players.flatMap(player =>
        Object.entries(player.progress).flatMap(([islandIdStr, islandProgress]) => {
            const islandId = Number(islandIdStr);
            const island = islands.find(i => i.id === islandId);
            const typedIslandProgress = islandProgress as PlayerProgress[number];
            if (!island || !typedIslandProgress.pendingSubmissions) return [];
            
            return (Object.entries(typedIslandProgress.pendingSubmissions) as [string, PendingSubmission][]).map(([challengeIdStr, submission]) => {
                const challengeId = Number(challengeIdStr);
                const challenge = island.challenges.find(c => c.id === challengeId);
                // Don't show redemption quizzes that have been offered but not yet answered
                if (submission.redemptionQuizOffered && !submission.answers) return null;
                return { player, island, challenge, submission };
            }).filter(item => item && item.challenge);
        })
    ).filter(Boolean);
    
    if (error) {
        return <p className="text-center text-red-400 p-8">Falha ao carregar tarefas: {error}</p>;
    }

    if (loading) {
         return <p className="text-center text-gray-400 italic p-8">Buscando tarefas na fortaleza de dados...</p>
    }

    // Render Judgement Chamber if active
    if (judgementState) {
        const didPass = judgementState.finalIslandScore >= contentService.TOTAL_POINTS_TO_CONQUER;
        return (
            <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-yellow-500/50 animate-fade-in">
                <h2 className="text-2xl font-cinzel text-center text-yellow-400 mb-4">Câmara do Julgamento do Guardião</h2>
                <p className="text-center text-lg text-gray-300 mb-2">Guerreiro: <strong className="text-white">{judgementState.player.name}</strong></p>
                
                <div className="my-6 p-4 bg-black/30 rounded-lg text-center">
                    <h3 className="text-xl font-cinzel text-gray-200">A Balança da Sabedoria</h3>
                    <div className="flex justify-center items-center gap-4 my-2 text-lg">
                        <div>
                            <p className="text-gray-400 text-sm">Apresentação</p>
                            <p className="font-bold text-white">{judgementState.presentationScore}</p>
                        </div>
                        <span className="text-yellow-400 text-2xl">+</span>
                        <div>
                            <p className="text-gray-400 text-sm">Quiz Redenção</p>
                            <p className="font-bold text-white">{judgementState.redemptionQuizScore}</p>
                        </div>
                         <span className="text-yellow-400 text-2xl">=</span>
                         <div>
                            <p className="text-gray-400 text-sm">Total na Ilha</p>
                            <p className="font-bold text-2xl text-yellow-300">{judgementState.finalIslandScore}</p>
                        </div>
                    </div>
                     <p className="text-xs text-gray-500">(Pontuação base da ilha: {judgementState.finalIslandScore - judgementState.presentationScore - judgementState.redemptionQuizScore})</p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-yellow-500/30">
                    {didPass ? (
                        <div className="text-center">
                            <h3 className="text-xl font-cinzel text-green-400 mb-2">Veredito: APROVADO</h3>
                            <p className="text-gray-300 mb-4">O Guerreiro provou seu valor! Sua nota final é suficiente para a conquista.</p>
                            <button onClick={() => handleFinalJudgement(0)} className="w-full max-w-md mx-auto py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors">
                                Conceder Conquista da Ilha
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                             <h3 className="text-xl font-cinzel text-red-400 mb-2">Veredito: DERROTA PARA O GUARDIÃO</h3>
                             <p className="text-gray-300 mb-4">O Guerreiro lutou com bravura, mas sua sabedoria ainda não é suficiente. Ele precisa de <strong className="text-white">{contentService.TOTAL_POINTS_TO_CONQUER - judgementState.finalIslandScore}</strong> moedas para conquistar a ilha.</p>
                             <div className="mt-4 p-4 bg-purple-900/40 rounded-lg border border-purple-600/50 max-w-lg mx-auto">
                                 <h4 className="font-cinzel text-purple-300">O Desafio dos Desesperados</h4>
                                 <p className="text-sm text-gray-400 my-2">Descreva um desafio final para o guerreiro (offline). Após ele completar, insira os pontos que ele conquistou e finalize a jornada.</p>
                                 <div className="flex items-center gap-4">
                                     <input 
                                        type="number" 
                                        value={desperationPoints} 
                                        onChange={(e) => setDesperationPoints(e.target.value)} 
                                        placeholder="Pontos" 
                                        className="w-32 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200"
                                     />
                                     <button 
                                        onClick={() => handleFinalJudgement(parseInt(desperationPoints || '0'), true)} 
                                        disabled={!desperationPoints}
                                        className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors disabled:bg-gray-600"
                                     >
                                         Registrar Pontos e Conceder Conquista
                                     </button>
                                 </div>
                             </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    
    const hasPendingTasks = pendingMentorMessages.length > 0 || pendingSummaries.length > 0 || pendingSubmissions.length > 0;

    if (!hasPendingTasks) {
        return <p className="text-center text-gray-400 italic p-8">Nenhuma tarefa pendente de avaliação no momento.</p>
    }

    return (
        <div className="space-y-6">
            {pendingMentorMessages.length > 0 && (
                <div className="space-y-4">
                     <h2 className="text-xl font-cinzel text-red-400 border-b-2 border-red-500/30 pb-2">Mensagens Diretas dos Guerreiros</h2>
                     {pendingMentorMessages.map(({ name, pendingMentorMessage }) => (
                         <div key={`${name}-mentor-message`} className="bg-gray-800/50 p-4 rounded-lg border border-red-700/50">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                                 <div>
                                    <h3 className="font-bold text-lg text-red-300">{name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">Enviado em: {new Date(pendingMentorMessage!.submittedAt).toLocaleString()}</p>
                                </div>
                                <button
                                    onClick={() => handleMarkMessageAsRead(players.find(p => p.name === name)!)}
                                    className="w-full sm:w-auto py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                                >
                                    Marcar como Lida
                                </button>
                             </div>
                             <div className="mt-3 pt-3 border-t border-gray-600">
                                 <p className="text-gray-300 whitespace-pre-wrap">{pendingMentorMessage!.message}</p>
                                 <p className="text-xs text-red-400/80 italic mt-3">Para responder, vá para 'Gerenciar Alunos' e utilize o campo 'Feedback do Mestre'.</p>
                             </div>
                         </div>
                     ))}
                </div>
            )}

            {pendingSummaries.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-cinzel text-yellow-400 border-b-2 border-yellow-500/30 pb-2">Pergaminhos da Luz Aguardando Aprovação</h2>
                    {pendingSummaries.map(({ player, island, summaryText }) => (
                         <div key={`${player.name}-${island.id}-summary`} className="bg-gray-800/50 p-4 rounded-lg border border-yellow-700/50">
                             <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                                 <div>
                                    <h3 className="font-bold text-lg text-yellow-300">{player.name}</h3>
                                    <p className="text-gray-400">{island.name}</p>
                                </div>
                                <button
                                    onClick={() => handleApproveSummary(player, island.id)}
                                    className="w-full sm:w-auto py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition-colors"
                                >
                                    Liberar Sorteio Divino
                                </button>
                             </div>
                             <div className="mt-3 pt-3 border-t border-gray-600">
                                 <p className="text-gray-300 whitespace-pre-wrap">{summaryText}</p>
                             </div>
                         </div>
                    ))}
                </div>
            )}


            {pendingSubmissions.length > 0 && (
                 <div className="space-y-4">
                     <h2 className="text-xl font-cinzel text-teal-400 border-b-2 border-teal-500/30 pb-2">Desafios Padrão para Avaliação</h2>
                     {pendingSubmissions.map(({ player, island, challenge, submission }) => {
                        if (!challenge) return null;
                        const key = `${player.name}-${island.id}-${challenge.id}`;
                        const isGradingThis = gradingState?.key === key;
                        const submissionType = submission.submissionType || (submission.answers ? 'quiz' : 'submission');

                        return (
                            <div key={key} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                                    <div>
                                        <h3 className="font-bold text-lg text-yellow-300">{player.name}</h3>
                                        <p className="text-gray-400">{island.name} &rarr; {challenge.title}</p>
                                        <p className="text-sm text-gray-500 mt-1">Enviado em: {new Date(submission.submittedAt).toLocaleString()}</p>
                                    </div>
                                    <div className="flex-shrink-0 text-right">
                                        <p className="text-sm text-gray-400">Pontos do Desafio</p>
                                        <p className="font-bold text-lg text-yellow-400">{challenge.points}</p>
                                    </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-gray-600 space-y-4">
                                    {submissionType === 'quiz' && (
                                        <>
                                            {!isGradingThis && (
                                                <button onClick={() => handleGradeWithAI(player, island.id, challenge, submission)} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">Corrigir com IA</button>
                                            )}
                                            {isGradingThis && gradingState.isLoading && <p className="text-center text-yellow-300 animate-pulse">A IA está avaliando o quiz...</p>}
                                            {isGradingThis && !gradingState.isLoading && gradingState.gradedQuiz && (
                                                <div className="space-y-4">
                                                    <div className="max-h-[50vh] overflow-y-auto pr-2 bg-black/30 p-4 rounded-lg"><GradedQuizView gradedQuiz={gradingState.gradedQuiz} /></div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-1">Feedback Geral do Mestre (editável)</label>
                                                        <textarea value={gradingState.feedback} onChange={(e) => setGradingState({ ...gradingState, feedback: e.target.value })} rows={4} className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-gray-300"/>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <label className="block text-sm font-medium text-gray-300">Nota Final (editável)</label>
                                                        <input type="number" value={gradingState.score} onChange={(e) => setGradingState({ ...gradingState, score: e.target.value })} className="w-24 px-2 py-2 bg-gray-900 border border-gray-600 rounded-md text-gray-200" />
                                                        <button onClick={() => handleConfirmGrade(player, island.id, challenge, submission)} className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg">Confirmar Avaliação</button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {submissionType === 'presentation' && (
                                        <div className="space-y-4">
                                            <p className="text-center text-gray-300 italic">O guerreiro sinalizou que está pronto para a apresentação ao vivo.</p>
                                            <div className="flex items-end gap-4 p-4 bg-black/30 rounded-lg">
                                                <div className="flex-grow">
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">Nota da Apresentação (0-{challenge.points})</label>
                                                    <input type="number" value={isGradingThis ? gradingState.presentationScore : ''} onChange={(e) => setGradingState({ key, presentationScore: e.target.value })} min="0" max={challenge.points} className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-gray-200" />
                                                </div>
                                                <button onClick={() => handleCalculateInitialPresentationResult(player, island.id, challenge.id)} disabled={isGradingThis && gradingState.isLoading} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:bg-gray-600">Calcular Resultado</button>
                                            </div>

                                            {isGradingThis && gradingState.finalFeedback && (
                                                <div className="p-4 bg-gray-900/50 border border-yellow-500/30 rounded-lg space-y-4">
                                                    <h4 className="font-cinzel text-yellow-300">Conselho do Oráculo IA</h4>
                                                    <p className="text-gray-300 italic">"{gradingState.finalFeedback}"</p>
                                                    <div className="flex gap-4">
                                                        <button onClick={() => handleGuardianInitialDecision(player, island.id, challenge.id, false)} className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg">Oferecer Quiz de Redenção</button>
                                                        <button onClick={() => handleGuardianInitialDecision(player, island.id, challenge.id, true)} className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg">Aprovar e Conquistar a Ilha</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {submissionType === 'submission' && (
                                        <p className="whitespace-pre-wrap p-2 bg-black/30 rounded font-mono text-sm text-gray-300">{submission.submission || "N/A"}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                 </div>
            )}
        </div>
    );
}