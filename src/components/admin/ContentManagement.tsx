import React, { useState, useEffect } from 'react';
import { Island, Challenge } from '../../types';
import { contentService } from '../../services/contentService';


const CodeModal = ({ code, onClose }: { code: string; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl border border-yellow-500/50">
            <h3 className="text-xl font-cinzel text-yellow-400 mb-4">Decreto Mágico de Conteúdo</h3>
            <p className="text-gray-300 mb-2 text-sm">1. Copie o código abaixo.</p>
            <p className="text-gray-300 mb-4 text-sm">2. Envie este código para seu assistente de IA para que ele possa forjar as novas constantes no arquivo <code className="bg-black/50 text-yellow-300 px-1 rounded">src/constants.ts</code>.</p>
            <textarea
                readOnly
                value={code}
                className="w-full h-64 p-3 bg-gray-900 border border-gray-600 rounded-md text-gray-200 font-mono text-xs"
            />
            <div className="mt-4 flex gap-4">
                <button 
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition-colors"
                >
                    Copiar Código
                </button>
                <button 
                    onClick={onClose} 
                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    Fechar
                </button>
            </div>
        </div>
    </div>
);

export default function ContentManagement() {
    const [islands, setIslands] = useState<Island[]>([]);
    const [storytellingUrl, setStorytellingUrl] = useState<string>('');
    const [mainBgUrl, setMainBgUrl] = useState('');
    const [welcomeBgUrl, setWelcomeBgUrl] = useState('');
    
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);

    useEffect(() => {
        // Carrega os dados diretamente do serviço, que agora lê de constants.ts
        setIslands(JSON.parse(JSON.stringify(contentService.getIslands()))); // Deep copy para edição
        setStorytellingUrl(contentService.getStorytellingUrl());
        setMainBgUrl(contentService.getMainBackgroundUrl());
        setWelcomeBgUrl(contentService.getWelcomeBackgroundUrl());
    }, []);

    const handleIslandDataChange = (islandId: number, field: keyof Island, value: any) => {
        const newIslands = islands.map(i => 
            i.id === islandId ? { ...i, [field]: value } : i
        );
        setIslands(newIslands);
    };

    const handleChallengeUrlChange = (islandId: number, challengeId: number, type: 'quiz' | 'resource', resourceIndex: number, value: string) => {
        const newIslands = JSON.parse(JSON.stringify(islands));
        const island = newIslands.find((i: Island) => i.id === islandId);
        const challenge = island?.challenges.find((c: Challenge) => c.id === challengeId);
        if (challenge) {
            const trimmedValue = value.trim();
            if (type === 'quiz') {
                challenge.quizUrl = trimmedValue;
            } else {
                challenge.resources[resourceIndex].url = trimmedValue;
            }
            setIslands(newIslands);
        }
    };
    
    const handleGenerateCode = () => {
        const islandStr = JSON.stringify(islands, null, 2);

        const codeString = `// Copie este trecho e peça ao seu assistente de IA para usá-lo para atualizar o arquivo 'src/constants.ts'\n\n` +
                           `export const MAIN_BACKGROUND_URL = '${mainBgUrl}';\n` +
                           `export const WELCOME_BACKGROUND_URL = '${welcomeBgUrl}';\n` +
                           `export const STORYTELLING_URL = '${storytellingUrl}';\n\n` +
                           `export const ISLANDS: Island[] = ${islandStr};`;
                           
        setGeneratedCode(codeString);
    };

    if (islands.length === 0) return <p>Carregando conteúdo...</p>;
    
    return (
        <>
            {generatedCode && <CodeModal code={generatedCode} onClose={() => setGeneratedCode(null)} />}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-cinzel text-yellow-400">Sala de Decretos (Editor de Conteúdo)</h2>
                  <button onClick={handleGenerateCode} className="py-2 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors">Gerar Código de Atualização</button>
                </div>
                <p className="text-sm text-gray-400 mb-4 italic">Use este painel para simular e preparar as alterações. Quando estiver pronto, gere o código de atualização para tornar as mudanças permanentes.</p>
                
                <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600 space-y-4">
                    <h3 className="text-lg font-cinzel text-yellow-300 border-b-2 border-yellow-500/30 pb-1 mb-3">Links e Imagens Globais</h3>
                    <div>
                        <label className="font-semibold text-gray-200 mb-2 block">Link do Storytelling (Google Forms)</label>
                        <p className="text-sm text-gray-400 mb-2">Este é o link para as regras e a história do jogo na tela de boas-vindas.</p>
                        <input 
                            type="url" 
                            value={storytellingUrl} 
                            onChange={(e) => setStorytellingUrl(e.target.value)} 
                            className="w-full text-sm p-2 bg-gray-700 border border-gray-600 rounded text-gray-300" 
                            placeholder="Cole o link do Google Forms aqui"
                        />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                        <div>
                            <label className="font-semibold text-gray-200 mb-2 block">URL da Imagem de Fundo (Login/Jogo)</label>
                            <input 
                                type="url" 
                                value={mainBgUrl} 
                                onChange={(e) => setMainBgUrl(e.target.value)} 
                                className="w-full text-sm p-2 bg-gray-700 border border-gray-600 rounded text-gray-300" 
                                placeholder="Cole o link da imagem aqui"
                            />
                        </div>
                        <div>
                            <label className="font-semibold text-gray-200 mb-2 block">URL da Imagem de Fundo (Boas-vindas)</label>
                            <input 
                                type="url" 
                                value={welcomeBgUrl} 
                                onChange={(e) => setWelcomeBgUrl(e.target.value)} 
                                className="w-full text-sm p-2 bg-gray-700 border border-gray-600 rounded text-gray-300" 
                                placeholder="Cole o link da imagem aqui"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-8 max-h-[50vh] overflow-y-auto pr-2">
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
                                    placeholder="Cole o link da imagem da ilha aqui"
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
                                                    <input type="url" value={resource.url} onChange={(e) => handleChallengeUrlChange(island.id, challenge.id, 'resource', index, e.target.value)} className="w-full text-xs p-1 mt-1 bg-gray-700 border border-gray-600 rounded text-gray-300" placeholder="Cole o link aqui"/>
                                                </div>
                                            ))}
                                            {challenge.quizUrl !== undefined && (
                                                <div>
                                                    <label className="block text-sm text-gray-400">Link do Quiz (Google Forms)</label>
                                                    <input type="url" value={challenge.quizUrl} onChange={(e) => handleChallengeUrlChange(island.id, challenge.id, 'quiz', 0, e.target.value)} className="w-full text-xs p-1 mt-1 bg-gray-700 border border-gray-600 rounded text-gray-300" placeholder="Cole o link do formulário aqui"/>
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
        </>
    );
}