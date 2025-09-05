import React, { useState, useEffect } from 'react';
import { Island, PlayerData } from '../types';
import { geminiService } from '../services/geminiService';
import { EXTRAORDINARY_CHALLENGE_SUMMARY_MIN_WORDS } from '../constants';

interface ExtraordinaryChallengeProps {
    island: Island;
    playerData: PlayerData;
    onUpdateProgress: (newProgress: PlayerData) => void;
}

// --- Modal de Submissão ---
const SummaryModal = ({
    onClose,
    onSubmit,
}: {
    onClose: () => void;
    onSubmit: (summary: string) => void;
}) => {
    const [summary, setSummary] = useState('');
    const wordCount = summary.trim().split(/\s+/).filter(Boolean).length;
    const isReady = wordCount >= EXTRAORDINARY_CHALLENGE_SUMMARY_MIN_WORDS;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isReady) {
            onSubmit(summary);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl border-2 border-yellow-400/50">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-cinzel text-yellow-300">O Pergaminho da Luz</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                <p className="text-gray-300 mb-4">
                    Guerreiro, concentre sua sabedoria. Escreva um resumo dos ensinamentos desta ilha e envie-o como uma oferenda aos Deuses da Sabedoria Milenar. Se seu esforço os agradar, eles poderão lhe enviar um desafio secreto.
                </p>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="w-full h-40 p-3 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-yellow-500 focus:border-yellow-500"
                        placeholder="Descreva aqui o que você aprendeu..."
                    />
                    <div className="text-right text-sm mt-2 font-semibold" style={{ color: isReady ? '#4ade80' : '#f87171' }}>
                        {wordCount} / {EXTRAORDINARY_CHALLENGE_SUMMARY_MIN_WORDS} palavras
                    </div>
                    <button
                        type="submit"
                        disabled={!isReady}
                        className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Enviar aos Deuses
                    </button>
                </form>
            </div>
        </div>
    );
};


// --- Componente Principal ---
const ExtraordinaryChallenge = ({ island, playerData, onUpdateProgress }: ExtraordinaryChallengeProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading for AI call

    const challengeState = playerData.progress[island.id]?.extraordinaryChallenge;

    // This effect triggers the AI prophecy generation only AFTER the mentor approves it.
    useEffect(() => {
        const needsProphecyCheck = challengeState?.summaryApproved && challengeState.prophecyOffered === undefined;
        
        if (needsProphecyCheck) {
            const generateAndSaveProphecy = async () => {
                setIsLoading(true);
                const prophecy = await geminiService.generateProphecy(challengeState.summaryText || '', island);

                const newProgress = JSON.parse(JSON.stringify(playerData));
                const islandProgress = newProgress.progress[island.id];
                
                if (prophecy) {
                    islandProgress.extraordinaryChallenge.prophecyOffered = true;
                    islandProgress.extraordinaryChallenge.prophecy = prophecy;
                } else {
                    islandProgress.extraordinaryChallenge.prophecyOffered = false;
                }
                onUpdateProgress(newProgress);
                setIsLoading(false);
            };

            generateAndSaveProphecy();
        }
    }, [challengeState, island, playerData, onUpdateProgress]);


    const handleSummarySubmit = (summary: string) => {
        setIsModalOpen(false);

        const newProgress = JSON.parse(JSON.stringify(playerData));
        if (!newProgress.progress[island.id]) {
            newProgress.progress[island.id] = { score: 0, completedChallenges: [] };
        }
        newProgress.progress[island.id].extraordinaryChallenge = {
            summarySubmitted: true,
            summaryText: summary,
            summaryApproved: false, // Explicitly set to false, awaiting mentor
        };
        onUpdateProgress(newProgress);
    };

    const handleProphecyAnswer = (answer: boolean) => {
        if (!challengeState?.prophecy) return;

        const isCorrect = answer === challengeState.prophecy.isTrue;
        const newProgress = JSON.parse(JSON.stringify(playerData));
        const islandProgress = newProgress.progress[island.id];

        islandProgress.extraordinaryChallenge.prophecyAnswered = true;
        islandProgress.extraordinaryChallenge.prophecyCorrect = isCorrect;

        if (isCorrect) {
            islandProgress.score += challengeState.prophecy.points;
        }
        
        onUpdateProgress(newProgress);
    };


    const renderContent = () => {
        if (challengeState?.prophecyAnswered) {
             const result = challengeState.prophecyCorrect;
             return (
                <div className="text-center">
                    <h4 className="font-bold text-lg mb-2">{result ? "Profecia Decifrada!" : "A Profecia era Enganosa"}</h4>
                    <p className={result ? "text-green-300" : "text-red-300"}>
                        {result ? `Sua sabedoria lhe rendeu ${challengeState.prophecy?.points} Moedas de Ouro extras!` : "Você não perdeu nada, mas a experiência lhe trouxe mais conhecimento."}
                    </p>
                </div>
             );
        }
        
        if (challengeState?.prophecyOffered && challengeState.prophecy) {
            return (
                <div className="text-center animate-fade-in">
                    <h4 className="font-bold text-lg text-yellow-200 mb-2">Um Mensageiro Divino Aparece!</h4>
                    <p className="text-gray-300 mb-4">Os Deuses se agradaram de sua oferenda e lhe enviam uma Profecia Sagrada para testar sua percepção.</p>
                    <div className="bg-black/30 p-4 rounded-lg border border-yellow-500/30 my-4">
                        <p className="font-serif italic text-xl text-white">"{challengeState.prophecy.question}"</p>
                    </div>
                    <p className="mb-4 font-semibold">Esta profecia é Certa ou Errada?</p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={() => handleProphecyAnswer(true)} className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-transform hover:scale-105">Certo</button>
                        <button onClick={() => handleProphecyAnswer(false)} className="px-8 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-transform hover:scale-105">Errado</button>
                    </div>
                </div>
            )
        }

        if (isLoading) {
             return <p className="text-yellow-300 animate-pulse text-center">Os Deuses da Sabedoria analisam seu pedido...</p>;
        }
        
        if (challengeState?.summarySubmitted) {
             if (!challengeState.summaryApproved) {
                 return <p className="text-yellow-300 italic text-center">Seu pergaminho foi enviado para avaliação do Mestre. Ele liberará o sorteio divino em breve...</p>;
             }
             // Summary is approved, but prophecy wasn't offered (bad luck)
             if (challengeState.prophecyOffered === false) {
                 return <p className="text-gray-400 mt-4 italic text-center">"O Mestre aprovou sua sabedoria e os Deuses notaram seu esforço, mas permaneceram em silêncio desta vez. Continue sua jornada, nobre guerreiro."</p>
             }
        }


        return (
            <div className="text-center">
                <p className="mb-4 text-gray-300">Prove seu valor. Envie um resumo de seus aprendizados aos Deuses e talvez receba uma bênção.</p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all"
                >
                    Enviar Pergaminho da Luz
                </button>
            </div>
        );
    }

    return (
        <>
            {isModalOpen && <SummaryModal onClose={() => setIsModalOpen(false)} onSubmit={handleSummarySubmit} />}
            <div className="p-5 rounded-lg border-2 border-dashed border-yellow-500/40 bg-gradient-to-br from-yellow-500/5 via-yellow-500/10 to-yellow-500/5 relative">
                <h3 className="font-cinzel text-xl text-center text-yellow-400 mb-4">Desafio Extraordinário</h3>
                {renderContent()}
            </div>
        </>
    );
};

export default ExtraordinaryChallenge;