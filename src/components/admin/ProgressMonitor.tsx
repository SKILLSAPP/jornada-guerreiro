import React, { useState, useEffect, useMemo } from 'react';
import { PlayerData, Island, Challenge, PlayerProgress } from '../../types';
import { gameService } from '../../services/gameService';
import { contentService } from '../../services/contentService';
import { geminiService } from '../../services/geminiService';

interface PlayerStatus {
    totalScore: number;
    currentIsland: Island | null;
    currentChallenge: Challenge | null;
    statusText: string;
}

// FIX: Changed component to be typed as React.FC to correctly handle the 'key' prop.
const PlayerProgressCard: React.FC<{ player: PlayerData, islands: Island[] }> = ({ player, islands }) => {
    const [analysis, setAnalysis] = useState<{ loading: boolean; text: string | null }>({ loading: false, text: null });

    const status: PlayerStatus = useMemo(() => {
        // FIX: Explicitly type `island` to resolve TypeScript error where `score` property is not found on type `unknown`.
        const totalScore = Object.values(player.progress).reduce((acc, island: { score: number }) => acc + island.score, 0);
        const conqueredIslandsCount = Object.keys(player.progress).filter(id => player.progress[Number(id)].score >= contentService.TOTAL_POINTS_TO_CONQUER).length;
        const currentIslandId = conqueredIslandsCount + 1;
        const currentIsland = islands.find(i => i.id === currentIslandId) || null;

        if (!currentIsland) {
            return { totalScore, currentIsland: null, currentChallenge: null, statusText: 'Jornada Concluída' };
        }

        const islandProgress = player.progress[currentIsland.id] || { score: 0, completedChallenges: [], pendingSubmissions: {} };
        const completedChallengeIds = islandProgress.completedChallenges || [];
        const pendingSubmissionChallengeId = Object.keys(islandProgress.pendingSubmissions || {})[0];
        
        let currentChallenge: Challenge | null = null;
        let statusText = '';
        
        if (pendingSubmissionChallengeId) {
            currentChallenge = currentIsland.challenges.find(c => c.id === Number(pendingSubmissionChallengeId)) || null;
            statusText = 'Aguardando Avaliação';
        } else {
            currentChallenge = currentIsland.challenges.find(c => !completedChallengeIds.includes(c.id)) || null;
            statusText = currentChallenge ? 'Em Andamento' : 'Ilha Concluída';
        }

        return { totalScore, currentIsland, currentChallenge, statusText };
    }, [player, islands]);

    const handleGenerateAnalysis = async () => {
        if (!status.currentIsland) return;
        setAnalysis({ loading: true, text: null });
        const result = await geminiService.getStudentProgressAnalysis(
            player.name,
            status.currentIsland,
            player.progress,
            player.taskFeedback
        );
        setAnalysis({ loading: false, text: result });
    };

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <div className="font-semibold text-lg text-yellow-300">{player.name}</div>
                <div>
                    <p className="text-xs text-gray-400">Ilha Atual</p>
                    <p>{status.currentIsland?.name || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400">Desafio Atual</p>
                    <p>{status.currentChallenge?.title || status.statusText}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400">Moedas de Ouro</p>
                    <p className="font-bold">{status.totalScore.toLocaleString()}</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700/50">
                <h4 className="font-cinzel text-yellow-400 mb-2">Análise do Mentor IA</h4>
                {analysis.loading ? (
                    <p className="text-yellow-300 italic animate-pulse">O Mentor IA está consultando os oráculos...</p>
                ) : analysis.text ? (
                    <div className="text-gray-300 text-sm whitespace-pre-wrap bg-black/20 p-3 rounded-md">{analysis.text}</div>
                ) : (
                    <button 
                        onClick={handleGenerateAnalysis} 
                        disabled={!status.currentIsland}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Gerar Análise Crítica
                    </button>
                )}
            </div>
        </div>
    );
};


export default function ProgressMonitor() {
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [islands, setIslands] = useState<Island[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
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
            setLoading(false);
        };
        fetchData();
    }, []);

    if (error) {
        return <p className="text-center text-red-400 p-8">Falha ao carregar progresso: {error}</p>;
    }
    
    if (loading) {
        return <p className="text-center text-gray-400 italic p-8">Buscando progresso dos guerreiros...</p>;
    }

    if (players.length === 0) {
        return <p className="text-center text-gray-400 italic p-8">Nenhum guerreiro ativo para monitorar.</p>
    }

    return (
        <div className="space-y-4">
            {players.map(player => (
                <PlayerProgressCard key={player.name} player={player} islands={islands} />
            ))}
        </div>
    );
}
