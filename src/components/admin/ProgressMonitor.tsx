
import React, { useState, useEffect, useMemo } from 'react';
import { PlayerData, Island, Challenge, PlayerProgress } from '../../types';
import { gameService } from '../../services/gameService';
import { contentService } from '../../services/contentService';
import { geminiService } from '../../services/geminiService';
import CertificateModal from '../CertificateModal';

interface PlayerStatus {
    totalScore: number;
    currentIsland: Island | null;
    currentChallenge: Challenge | null;
    statusText: string;
    conqueredIslands: Island[];
}

const PlayerProgressCard: React.FC<{ player: PlayerData, islands: Island[], onEmitCert: (player: PlayerData, island: Island) => void }> = ({ player, islands, onEmitCert }) => {
    const [analysis, setAnalysis] = useState<{ loading: boolean; text: string | null }>({ loading: false, text: null });

    const status: PlayerStatus = useMemo(() => {
        const totalScore = Object.values(player.progress).reduce((acc: number, island) => acc + (island as { score: number }).score, 0);
        
        const currentIslandId = contentService.getCurrentIslandId(player);
        const currentIsland = islands.find(i => i.id === currentIslandId) || null;

        // CORREÇÃO: Utilizando a lógica centralizada que considera o Desafio 4 (Guardião) concluído
        const conquered = islands.filter(isl => 
            contentService.isIslandConquered(player, isl.id)
        );

        if (!currentIsland) {
            return { totalScore, currentIsland: null, currentChallenge: null, statusText: 'Jornada Concluída', conqueredIslands: conquered };
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

        return { totalScore, currentIsland, currentChallenge, statusText, conqueredIslands: conquered };
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
                    <p className="text-xs text-gray-400">Status</p>
                    <p className="text-sm">{status.statusText}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400">Moedas de Ouro</p>
                    <p className="font-bold">{status.totalScore.toLocaleString()}</p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700/50 flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/2">
                    <h4 className="font-cinzel text-teal-400 mb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Ilhas Conquistadas (Certificados)
                    </h4>
                    {status.conqueredIslands.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {status.conqueredIslands.map(isl => (
                                <button
                                    key={isl.id}
                                    onClick={() => onEmitCert(player, isl)}
                                    className="text-left p-2 bg-teal-900/20 border border-teal-500/30 rounded hover:bg-teal-900/40 transition-colors flex justify-between items-center group"
                                >
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-bold text-teal-300 truncate">{isl.name}</p>
                                        <p className="text-[10px] text-gray-500">{isl.softSkill}</p>
                                    </div>
                                    <span className="text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">Emitir &rarr;</span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-gray-500 italic">Nenhuma ilha conquistada ainda.</p>
                    )}
                </div>

                <div className="lg:w-1/2">
                    <h4 className="font-cinzel text-yellow-400 mb-2">Análise do Mentor IA</h4>
                    {analysis.loading ? (
                        <p className="text-yellow-300 italic animate-pulse">Consultando os oráculos...</p>
                    ) : analysis.text ? (
                        <div className="text-gray-300 text-sm whitespace-pre-wrap bg-black/20 p-3 rounded-md max-h-32 overflow-y-auto">{analysis.text}</div>
                    ) : (
                        <button 
                            onClick={handleGenerateAnalysis} 
                            disabled={!status.currentIsland}
                            className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded transition-colors disabled:opacity-50"
                        >
                            Gerar Análise Crítica
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};


export default function ProgressMonitor() {
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [islands, setIslands] = useState<Island[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Estado para o Modal de Certificado
    const [certData, setCertData] = useState<{ player: PlayerData, island: Island } | null>(null);
    const [fullPlayerName, setFullPlayerName] = useState('');
    const [proficiencyLevel, setProficiencyLevel] = useState('Máxima');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const playersResult = await gameService.getAllPlayersData();
            if(playersResult.error) {
                setError(playersResult.error);
            } else {
                setPlayers(playersResult.data || []);
            }
            setIslands(contentService.getIslands());
            setLoading(false);
        };
        fetchData();
    }, []);

    const openEmitForm = (player: PlayerData, island: Island) => {
        setCertData({ player, island });
        setFullPlayerName(''); // Inicia vazio para o mestre digitar
        setProficiencyLevel('Máxima');
    };

    if (loading) return <p className="text-center text-gray-400 italic p-8">Buscando guerreiros...</p>;

    return (
        <div className="space-y-4">
            {/* Formulário de Preenchimento antes de gerar o Modal Real */}
            {certData && !showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[110] p-4">
                    <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500/50 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-cinzel text-yellow-400 mb-4">Configurar Certificado</h3>
                        <p className="text-gray-300 text-sm mb-4">
                            Emissão para: <span className="font-bold">{certData.player.name}</span> na ilha <span className="font-bold">{certData.island.name}</span>.
                        </p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Nome Completo do Aluno</label>
                                <input 
                                    type="text" 
                                    value={fullPlayerName}
                                    onChange={(e) => setFullPlayerName(e.target.value)}
                                    placeholder="Ex: João da Silva Sauro"
                                    className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Grau de Proficiência</label>
                                <input 
                                    type="text" 
                                    value={proficiencyLevel}
                                    onChange={(e) => setProficiencyLevel(e.target.value)}
                                    placeholder="Ex: Máxima, Notável, Plena..."
                                    className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white"
                                />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button 
                                    onClick={() => setCertData(null)}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    disabled={!fullPlayerName.trim()}
                                    onClick={() => setShowModal(true)}
                                    className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded disabled:opacity-50"
                                >
                                    Gerar Visualização
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && certData && (
                <CertificateModal 
                    fullPlayerName={fullPlayerName}
                    proficiencyLevel={proficiencyLevel}
                    island={certData.island}
                    date={new Date().toISOString()}
                    onClose={() => {
                        setShowModal(false);
                        setCertData(null);
                    }}
                />
            )}

            {players.map(player => (
                <PlayerProgressCard 
                    key={player.name} 
                    player={player} 
                    islands={islands} 
                    onEmitCert={openEmitForm}
                />
            ))}
        </div>
    );
}
