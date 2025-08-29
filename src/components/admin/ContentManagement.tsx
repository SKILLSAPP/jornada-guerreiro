import React, { useState, useEffect } from 'react';
import { Island, Challenge } from '../../types';
import { contentService } from '../../services/contentService';

export default function ContentManagement() {
    const [islands, setIslands] = useState<Island[]>([]);
    const [storytellingUrl, setStorytellingUrl] = useState<string>('');
    const [mainBgUrl, setMainBgUrl] = useState('');
    const [welcomeBgUrl, setWelcomeBgUrl] = useState('');
    const [challengePathBgUrl, setChallengePathBgUrl] = useState('');
    const [status, setStatus] = useState<{type: 'success' | 'error', text: string} | null>(null);
    const [generatedCode, setGeneratedCode] = useState<string>('');

    useEffect(() => {
        setIslands(contentService.getIslands());
        setStorytellingUrl(contentService.getStorytellingUrl());
        setMainBgUrl(contentService.getMainBackgroundUrl());
        setWelcomeBgUrl(contentService.getWelcomeBackgroundUrl());
        setChallengePathBgUrl(contentService.getChallengePathBackgroundUrl());
    }, []);

    const handleIslandDataChange = (islandId: number, field: keyof Island, value: any) => {
        const newIslands = islands.map(i => 
            i.id === islandId ? { ...i, [field]: value } : i
        );
        setIslands(newIslands);
    };

    const handleChallengeChange = (islandId: number, challengeId: number, field: keyof Challenge, value: any) => {
        const newIslands = JSON.parse(JSON.stringify(islands));
        const island = newIslands.find((i: Island) => i.id === islandId);
        const challenge = island?.challenges.find((c: Challenge) => c.id === challengeId);
        if (challenge) {
            if (field === 'resources') {
                 challenge.resources = value;
            } else {
                 // @ts-ignore
                challenge[field] = value;
            }
            setIslands(newIslands);
        }
    };

    const handleResourceUrlChange = (islandId: number, challengeId: number, resourceIndex: number, value: string) => {
        const newIslands = JSON.parse(JSON.stringify(islands));
        const island = newIslands.find((i: Island) => i.id === islandId);
        const challenge = island?.challenges.find((c: Challenge) => c.id === challengeId);
        if(challenge) {
            challenge.resources[resourceIndex].url = value.trim();
            setIslands(newIslands);
        }
    };
    
    const handleGenerateCode = () => {
        const islandsString = JSON.stringify(islands, null, 2);

        const codeString = `// Copie este trecho e peça ao seu assistente de IA para usá-lo para atualizar o arquivo 'src/constants.ts'

export const MAIN_BACKGROUND_URL = '${mainBgUrl}';
export const WELCOME_BACKGROUND_URL = '${welcomeBgUrl}';
export const CHALLENGE_PATH_BACKGROUND_URL = '${challengePathBgUrl}';
export const STORYTELLING_URL = '${storytellingUrl}';

export const ISLANDS: Island[] = ${islandsString};

export const TOTAL_POINTS_TO_CONQUER = ${contentService.TOTAL_POINTS_TO_CONQUER};
export const MANDALA_PETAL_THRESHOLDS = [${contentService.MANDALA_PETAL_THRESHOLDS.join(', ')}];
`;
        setGeneratedCode(codeString);
        setStatus({type: 'success', text: 'Código gerado! Copie o conteúdo abaixo.'});
    };
    
    const handleCopyCode = () => {
        if (generatedCode) {
            navigator.clipboard.writeText(generatedCode);
            setStatus({type: 'success', text: 'Código copiado para a área de transferência!'});
            setTimeout(() => setStatus(null), 3000);
        }
    }

    if (islands.length === 0) return <p>Carregando conteúdo...</p>;
    
    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <h2 className="text-xl font-cinzel text-yellow-400">Gerador de Código de Conteúdo</h2>
              <button onClick={handleGenerateCode} className="w-full sm:w-auto py-2 px-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition-colors">
                Gerar Código para Atualização
              </button>
            </div>
            {status && <p className={`mb-4 text-center text-sm p-2 rounded-md ${status.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-400'}`}>{status.text}</p>}
            
            {generatedCode && (
                <div className="mb-6">
                    <h3 className="text-lg font-cinzel text-yellow-300 mb-2">Código Gerado (\`constants.ts\`)</h3>
                    <textarea 
                        readOnly 
                        value={generatedCode} 
                        className="w-full h-64 bg-gray-900 text-gray-300 font-mono text-xs p-3 border border-yellow-400 rounded-md"
                    />
                     <button onClick={handleCopyCode} className="mt-2 w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg">
                        Copiar Código
                    </button>
                </div>
            )}

            <div className="space-y-8 max-h-[50vh] overflow-y-auto pr-2">
                 <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600 space-y-4">
                    <h3 className="text-lg font-cinzel text-yellow-300 border-b-2 border-yellow-500/30 pb-1 mb-3">Links e Imagens Globais</h3>
                     <label className="font-semibold text-gray-200 mb-2 block">Link do Storytelling (ex: Google Forms)</label>
                    <input type="url" value={storytellingUrl} onChange={(e) => setStorytellingUrl(e.target.value)} className="w-full text-sm p-2 bg-gray-700 border border-gray-600 rounded text-gray-300" />
                    <label className="font-semibold text-gray-200 mb-2 block">URL da Imagem de Fundo (Login/Jogo)</label>
                    <input type="url" value={mainBgUrl} onChange={(e) => setMainBgUrl(e.target.value)} className="w-full text-sm p-2 bg-gray-700 border border-gray-600 rounded text-gray-300" />
                    <label className="font-semibold text-gray-200 mb-2 block">URL da Imagem de Fundo (Boas-vindas)</label>
                    <input type="url" value={welcomeBgUrl} onChange={(e) => setWelcomeBgUrl(e.target.value)} className="w-full text-sm p-2 bg-gray-700 border border-gray-600 rounded text-gray-300" />
                    <label className="font-semibold text-gray-200 mb-2 block">URL da Imagem de Fundo (Trilha Mágica)</label>
                    <input type="url" value={challengePathBgUrl} onChange={(e) => setChallengePathBgUrl(e.target.value)} className="w-full text-sm p-2 bg-gray-700 border border-gray-600 rounded text-gray-300" />
                </div>

                <h3 className="text-lg font-cinzel text-yellow-300 border-b-2 border-yellow-500/30 pb-1 mb-3">Conteúdo das Ilhas</h3>
                {islands.map(island => (
                    <div key={island.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                        <h3 className="text-lg font-cinzel text-yellow-300">{island.id}. {island.name}</h3>
                        
                        <div className="mt-3">
                            <label className="block text-sm text-gray-400">URL da Imagem da Ilha</label>
                            <input
                                type="url"
                                value={island.imageUrl}
                                onChange={(e) => handleIslandDataChange(island.id, 'imageUrl', e.target.value)}
                                className="w-full text-xs p-1 mt-1 bg-gray-700 border border-gray-600 rounded text-gray-300"
                            />
                        </div>

                        <div className="space-y-4 pl-4 mt-4 border-l-2 border-gray-700">
                            {island.challenges.map(challenge => (
                                <div key={challenge.id} className="bg-black/20 p-3 rounded-lg">
                                    <h4 className="font-semibold text-gray-200">{challenge.title}</h4>
                                    <div className="mt-2 space-y-2">
                                        {challenge.resources.map((resource, index) => (
                                            <div key={index}>
                                                <label className="block text-sm text-gray-400">{resource.label}</label>
                                                <input type="url" value={resource.url} onChange={(e) => handleResourceUrlChange(island.id, challenge.id, index, e.target.value)} className="w-full text-xs p-1 mt-1 bg-gray-700 border border-gray-600 rounded text-gray-300" placeholder="Cole o link aqui"/>
                                            </div>
                                        ))}
                                        {challenge.quizUrl !== undefined && (
                                            <div>
                                                <label className="block text-sm text-gray-400">Link do Quiz Externo (Google Forms)</label>
                                                <input type="url" value={challenge.quizUrl} onChange={(e) => handleChallengeChange(island.id, challenge.id, 'quizUrl', e.target.value)} className="w-full text-xs p-1 mt-1 bg-gray-700 border border-gray-600 rounded text-gray-300" placeholder="Cole o link do formulário aqui"/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}