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

const PASSING_SCORE_THRESHOLD = 700;

export default function TaskGrading() {
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [islands, setIslands] = useState<Island[]>([]);
    const [gradingState, setGradingState] = useState<Partial<GradingState>>({});

    const loadData = useCallback(() => {
        setPlayers(gameService.getAllPlayersData());
        setIslands(contentService.getIslands());
        setGradingState({});
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleGradeWithAI = async (player: PlayerData, islandId: number, challenge: Challenge, submission: PendingSubmission) => {
        const key = `${player.name}-${islandId}-${challenge.id}`;
        setGradingState({ ...gradingState, key, isLoading: true });

        const quiz = contentService.getQuiz(challenge.quizId!);
        if (!quiz || !submission.answers) {
            setGradingState({ ...gradingState, key, isLoading: false, feedback: 'Erro: Quiz/respostas não encontrados.' });
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
    
    const handleCalculateFinalResult = async (player: PlayerData, islandId: number, challengeId: number) => {
        const key = `${player.name}-${islandId}-${challengeId}`;
        const score = parseInt(gradingState.presentationScore || '0', 10);
        if(isNaN(score)){
            alert("Por favor, insira uma nota válida.");
            return;
        }
        
        setGradingState({ ...gradingState, key, isLoading: true });

        const islandProgress = player.progress[islandId] || { score: 0 };
        const totalScore = islandProgress.score + score;

        const feedback = await geminiService.getFinalResultFeedback(player.name, totalScore, PASSING_SCORE_THRESHOLD);
        setGradingState({ ...gradingState, key, isLoading: false, finalFeedback: feedback, presentationScore: score.toString() });
    };

    const handleGuardianDecision = (player: PlayerData, islandId: number, challengeId: number, approve: boolean) => {
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
            gameService.savePlayerData(updatedPlayer);
            loadData();
        }
    };


    const handleConfirmGrade = (player: PlayerData, islandId: number, challenge: Challenge) => {
        if (!gradingState.key || !gradingState.gradedQuiz) return;

        const scoreValue = parseInt(gradingState.score || '0', 10);
        if (isNaN(scoreValue) || !gradingState.feedback) {
            alert("A nota e o feedback devem ser preenchidos.");
            return;
        }

        const updatedPlayer = JSON.parse(JSON.stringify(player));
        const progress: PlayerProgress[number] = updatedPlayer.progress[islandId];
        const presentationScore = progress.pendingSubmissions?.[challenge.id]?.presentationScore || 0;
        
        if (progress?.pendingSubmissions?.[challenge.id]) {
            progress.score = (progress.score || 0) + scoreValue + presentationScore;
            if (!progress.completedChallenges) progress.completedChallenges = [];
            progress.completedChallenges.push(challenge.id);
            delete progress.pendingSubmissions[challenge.id];
            
            if (!updatedPlayer.taskFeedback) updatedPlayer.taskFeedback = {};
            updatedPlayer.taskFeedback[`${challenge.id}-${islandId}`] = {
                challengeTitle: challenge.title,
                feedback: gradingState.feedback,
                score: scoreValue,
                gradedQuiz: gradingState.gradedQuiz,
            };

            updatedPlayer.progress[islandId] = progress;
            gameService.savePlayerData(updatedPlayer);
            loadData();
        }
    };

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

    if (pendingSubmissions.length === 0) {
        return <p className="text-center text-gray-400 italic p-8">Nenhuma tarefa pendente de avaliação no momento.</p>
    }

    return (
        <div className="space-y-4">
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
                                                <button onClick={() => handleConfirmGrade(player, island.id, challenge)} className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg">Confirmar Avaliação</button>
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
                                        <button onClick={() => handleCalculateFinalResult(player, island.id, challenge.id)} disabled={isGradingThis && gradingState.isLoading} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:bg-gray-600">Calcular Resultado</button>
                                    </div>

                                    {isGradingThis && gradingState.finalFeedback && (
                                        <div className="p-4 bg-gray-900/50 border border-yellow-500/30 rounded-lg space-y-4">
                                            <h4 className="font-cinzel text-yellow-300">Conselho do Oráculo IA</h4>
                                            <p className="text-gray-300 italic">"{gradingState.finalFeedback}"</p>
                                            <div className="flex gap-4">
                                                <button onClick={() => handleGuardianDecision(player, island.id, challenge.id, false)} className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg">Oferecer Quiz de Redenção</button>
                                                <button onClick={() => handleGuardianDecision(player, island.id, challenge.id, true)} className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg">Aprovar e Conquistar a Ilha</button>
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
    );
}