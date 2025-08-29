import React, { useMemo } from 'react';
import { PlayerData, Island } from '../types';
import { contentService } from '../services/contentService';

interface ChallengePathProps {
    island: Island;
    playerData: PlayerData;
    onBackToMap: () => void;
}

const CoinIcon = ({ isDimmed }: { isDimmed: boolean }) => (
    <div className={`relative w-16 h-16 transition-opacity duration-500 ${isDimmed ? 'opacity-40' : 'opacity-100'}`}>
        <svg className="w-full h-full text-yellow-400 drop-shadow-lg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="gold-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#facc15" />
                    <stop offset="100%" stopColor="#ca8a04" />
                </radialGradient>
            </defs>
            <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.5)" strokeWidth="1" fill="url(#gold-gradient)" />
            <rect x="10" y="7" width="4" height="10" fill="rgba(0,0,0,0.2)" rx="1" />
            <rect x="7" y="10" width="10" height="4" fill="rgba(0,0,0,0.2)" rx="1" />
        </svg>
    </div>
);


const CheckmarkIcon = () => (
    <svg className="w-12 h-12 text-green-400 drop-shadow-[0_2px_4px_rgba(0,255,0,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const ChallengePath = ({ island, playerData, onBackToMap }: ChallengePathProps) => {
    const islandProgress = playerData.progress[island.id] || { score: 0, completedChallenges: [] };
    const totalScore = Object.values(playerData.progress).reduce((acc, islandData) => acc + islandData.score, 0);
    const completedChallengeIds = islandProgress.completedChallenges;
    const currentChallengeIndex = completedChallengeIds.length;
    
    const allIslands = useMemo(() => contentService.getIslands(), []);

    return (
        <div className="relative text-white" style={{ background: 'black' }}>
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${contentService.getChallengePathBackgroundUrl()}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

            <div className="relative h-screen">
                <div className="absolute top-8 left-8">
                    <button onClick={onBackToMap} className="text-yellow-400 hover:text-yellow-300 font-semibold text-lg bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                        &larr; Voltar
                    </button>
                </div>

                <div className="absolute top-8 right-8 text-right">
                    <h1 className="text-5xl font-bold font-cinzel text-white tracking-widest" style={{ textShadow: '0 0 15px rgba(0,0,0,0.7)' }}>TRILHA MÁGICA</h1>
                    <div className="mt-2 bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                        <h2 className="text-2xl font-cinzel text-yellow-300">{island.name}</h2>
                        <p className="text-lg text-gray-300">{island.softSkill}</p>
                    </div>
                </div>


                <div className="absolute top-1/3 right-8 md:right-16 lg:right-24 w-auto max-w-sm md:max-w-md">
                    <div className="space-y-6">
                        {island.challenges.map((challenge, index) => {
                            const isCompleted = completedChallengeIds.includes(challenge.id);
                            const isCurrent = index === currentChallengeIndex;
                            const isLocked = index > currentChallengeIndex;

                            return (
                                <div key={challenge.id} className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                                    <CoinIcon isDimmed={isLocked} />
                                    <div className="text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
                                        <p className={`font-bold transition-opacity duration-500 ${isLocked ? 'opacity-50' : 'opacity-100'}`}>{challenge.title.replace(/Desafio \d: /, '')}</p>
                                        {isCurrent && <p className="text-yellow-300 font-semibold animate-pulse">"Você Está Aqui"</p>}
                                    </div>
                                    {isCompleted && <CheckmarkIcon />}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="relative w-full bg-black/80 p-6 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 pb-2 border-b border-yellow-500/20">
                    <h2 className="text-3xl font-cinzel text-yellow-300">Resumo da Jornada</h2>
                    <p className="text-xl font-bold text-gray-200">
                        Total de Moedas: <span className="text-3xl text-yellow-400">{totalScore}</span>
                    </p>
                </div>
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-cinzel text-yellow-400 mb-2">Conquistas das Ilhas</h3>
                        <div className="bg-black/40 border border-gray-700 rounded-lg p-4 h-48 overflow-y-auto">
                           <ul className="space-y-2">
                                {allIslands.map(isl => {
                                    const isConquered = playerData.progress[isl.id]?.score >= contentService.TOTAL_POINTS_TO_CONQUER;
                                    return (
                                        <li key={isl.id} className={`flex items-center transition-colors duration-300 ${isConquered ? 'text-gray-200' : 'text-gray-500'}`}>
                                            <span className={`mr-3 font-bold text-lg ${isConquered ? 'text-green-400' : 'text-gray-600'}`}>
                                                {isConquered ? '✔' : '•'}
                                            </span>
                                            <span className={isConquered ? 'font-semibold' : ''}>{isl.name}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-cinzel text-yellow-400 mb-2">Palavras do Mestre</h3>
                        <div className="bg-black/40 border border-gray-700 rounded-lg p-4 h-48 overflow-y-auto">
                           {playerData.mentorFeedback ? (
                                <p className="text-gray-300 italic whitespace-pre-wrap font-serif">{playerData.mentorFeedback}</p>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500 italic text-center">O Mestre ainda não deixou sua sabedoria registrada aqui.</p>
                                </div>
                            )}
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default ChallengePath;