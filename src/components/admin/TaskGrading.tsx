import React, { useState, useEffect, useCallback } from 'react';
import { PlayerData, Island } from '../../types';
import { gameService } from '../../services/gameService';
import { contentService } from '../../services/contentService';

export default function TaskGrading() {
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [islands, setIslands] = useState<Island[]>([]);
    const [scores, setScores] = useState<{ [key: string]: string }>({});

    const loadData = useCallback(() => {
        setPlayers(gameService.getAllPlayersData());
        setIslands(contentService.getIslands());
        setScores({}); // Reset scores on reload
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleScoreChange = (key: string, value: string) => {
        const sanitizedValue = value.replace(/[^0-9]/g, '');
        setScores(prev => ({...prev, [key]: sanitizedValue}));
    };

    const handleGradeSubmission = (player: PlayerData, islandId: number, challengeId: number) => {
        const key = `${player.name}-${islandId}-${challengeId}`;
        const scoreValue = parseInt(scores[key], 10);

        const island = islands.find(i => i.id === islandId);
        const challenge = island?.challenges.find(c => c.id === challengeId);
        
        if (!challenge || isNaN(scoreValue) || scoreValue < 0) {
            alert("Por favor, insira uma nota válida.");
            return;
        }

        const updatedPlayer = JSON.parse(JSON.stringify(player));
        const progress = updatedPlayer.progress[islandId] || { score: 0, completedChallenges: [], pendingSubmissions: {} };

        if (progress.pendingSubmissions && progress.pendingSubmissions[challengeId]) {
            if(!progress.completedChallenges) progress.completedChallenges = [];
            progress.score = (progress.score || 0) + scoreValue;
            progress.completedChallenges.push(challengeId);
            delete progress.pendingSubmissions[challengeId];
            
            updatedPlayer.progress[islandId] = progress;
            gameService.savePlayerData(updatedPlayer);
            loadData();
        }
    };
    
    const pendingSubmissions = players.flatMap(player => 
        islands.flatMap(island => {
            const pending = player.progress[island.id]?.pendingSubmissions;
            if (!pending) return [];
            return Object.keys(pending).map(challengeIdStr => {
                const challengeId = Number(challengeIdStr);
                return {
                    player,
                    island,
                    challenge: island.challenges.find(c => c.id === challengeId),
                    submission: pending[challengeId],
                };
            }).filter(item => item.challenge);
        })
    );
    
    if (pendingSubmissions.length === 0) {
        return <p className="text-center text-gray-400 italic p-8">Nenhuma tarefa pendente de avaliação no momento.</p>
    }

    return (
        <div className="space-y-4">
          {pendingSubmissions.map(({player, island, challenge, submission}) => {
               if(!challenge) return null;
               const key = `${player.name}-${island.id}-${challenge.id}`;
               return (
                <div key={key} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <h3 className="font-bold text-lg text-yellow-300">{player.name}</h3>
                            <p className="text-gray-400">{island.name} &rarr; {challenge.title}</p>
                            <p className="text-sm text-gray-500 mt-1">Enviado em: {new Date(submission.submittedAt).toLocaleString()}</p>
                            <p className="text-sm text-gray-500">Pontuação Máxima: <span className="font-semibold text-gray-300">{challenge.points}</span></p>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto self-start sm:self-center">
                            <input
                                type="number"
                                placeholder="Nota"
                                value={scores[key] || ''}
                                onChange={(e) => handleScoreChange(key, e.target.value)}
                                min="0"
                                max={challenge.points}
                                className="w-24 px-2 py-2 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-yellow-500 focus:border-yellow-500"
                            />
                            <button onClick={() => handleGradeSubmission(player, island.id, challenge.id)} disabled={!scores[key]} className="flex-1 sm:flex-initial px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                                Confirmar Nota
                            </button>
                        </div>
                    </div>
                    {challenge.quizUrl === undefined && ( // Show submission text for guardian challenges
                       <div className="mt-3 pt-3 border-t border-gray-600">
                           <p className="whitespace-pre-wrap p-2 bg-black/30 rounded font-mono text-sm text-gray-300">{submission.submission}</p>
                       </div>
                    )}
                    {challenge.quizUrl !== undefined && (
                       <div className="mt-3 pt-3 border-t border-gray-600">
                           <p className="italic text-gray-400">O guerreiro marcou este quiz como concluído. Atribua a nota manualmente após verificar a plataforma externa.</p>
                       </div>
                   )}
                </div>
          )})}
        </div>
    );
}