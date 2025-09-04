import React, { useState, useEffect, useMemo } from 'react';
import { Island, Quiz, QuizQuestion } from '../../types';
import { contentService } from '../../services/contentService';
import { geminiService } from '../../services/geminiService';

const LibraryCodeModal = ({ code, onClose }: { code: string; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl border border-teal-500/50">
            <h3 className="text-xl font-cinzel text-teal-400 mb-4">Código da Biblioteca de Quizzes</h3>
            <p className="text-gray-300 mb-4 text-sm">Copie este código e peça ao seu Engenheiro de IA para usá-lo para substituir o conteúdo do arquivo <code className="bg-black/50 px-1 rounded">src/quizzes.ts</code>.</p>
            <textarea
                readOnly
                value={code}
                className="w-full h-48 p-3 bg-gray-900 border border-gray-600 rounded-md text-gray-200 font-mono text-xs"
            />
            <div className="mt-4 flex gap-4">
                <button 
                    onClick={() => {
                        navigator.clipboard.writeText(code);
                        alert('Código copiado para a área de transferência!');
                    }}
                    className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors"
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

const QuizCreator = ({ title, availableChallenges, generationFn, onQuizCreated, isRedemption = false }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
    const [quizName, setQuizName] = useState('');
    const [selectedChallengeKey, setSelectedChallengeKey] = useState('');
    const [context, setContext] = useState('');
    const [generatedQuestions, setGeneratedQuestions] = useState<QuizQuestion[] | null>(null);

    const resetForm = () => {
        setQuizName('');
        setSelectedChallengeKey('');
        setContext('');
        setGeneratedQuestions(null);
        setStatus(null);
    };

    const handleGenerateQuiz = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!context || !selectedChallengeKey || !quizName) {
            setStatus({ type: 'error', text: 'Por favor, preencha o nome, selecione um desafio e forneça o texto base.' });
            return;
        }

        setIsLoading(true);
        setStatus({ type: 'info', text: 'Os espíritos ancestrais estão forjando o quiz... Isso pode levar um momento.' });
        setGeneratedQuestions(null);

        const challengeData = availableChallenges.find((c: any) => c.key === selectedChallengeKey);
        if (!challengeData) {
            setStatus({ type: 'error', text: 'Desafio selecionado não encontrado.' });
            setIsLoading(false);
            return;
        }

        const result = await generationFn(context, challengeData.label, challengeData.points);

        if (typeof result === 'string') {
            setStatus({ type: 'error', text: result });
        } else {
            setGeneratedQuestions(result);
            setStatus({ type: 'success', text: 'Quiz gerado! Revise as perguntas abaixo antes de salvar.' });
        }
        setIsLoading(false);
    };

    const handleSaveQuiz = () => {
        if (!generatedQuestions || !selectedChallengeKey || !quizName) return;
        
        const [islandId, challengeId] = selectedChallengeKey.split('-').map(Number);
        
        let quizId = `island-${islandId}-challenge-${challengeId}`;
        if (isRedemption) {
            quizId += `-redemption`;
        }

        const newQuiz: Quiz = { id: quizId, name: quizName, islandId, challengeId, questions: generatedQuestions };

        onQuizCreated(newQuiz);
        setStatus({ type: 'success', text: `Quiz "${quizName}" adicionado à biblioteca local! Gere o código final para salvar permanentemente.` });
        resetForm();
    };

    return (
      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-cinzel text-yellow-400 mb-4">{generatedQuestions ? `Revisar ${title}` : `Criar ${title}`}</h2>
        {status && <p className={`mb-4 text-center text-sm p-3 rounded-md ${status.type === 'success' ? 'bg-green-900/50 text-green-300' : status.type === 'error' ? 'bg-red-900/50 text-red-400' : 'bg-blue-900/50 text-blue-300'}`}>{status.text}</p>}

        {!generatedQuestions ? (
          <form onSubmit={handleGenerateQuiz} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label htmlFor={`quiz-name-${isRedemption}`} className="block text-sm font-medium text-gray-300 mb-1">Nome do Quiz</label>
                      <input type="text" id={`quiz-name-${isRedemption}`} value={quizName} onChange={e => setQuizName(e.target.value)} required className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-gray-200" />
                  </div>
                  <div>
                      <label htmlFor={`challenge-select-${isRedemption}`} className="block text-sm font-medium text-gray-300 mb-1">Vincular ao Desafio</label>
                      <select id={`challenge-select-${isRedemption}`} value={selectedChallengeKey} onChange={e => setSelectedChallengeKey(e.target.value)} required className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-gray-200">
                          <option value="" disabled>Selecione um desafio...</option>
                          {availableChallenges.map((c: any) => <option key={c.key} value={c.key} disabled={c.isLinked}>{c.label} {c.isLinked ? '(Já possui quiz)' : ''}</option>)}
                      </select>
                  </div>
              </div>
              <div>
                  <label htmlFor={`context-text-${isRedemption}`} className="block text-sm font-medium text-gray-300 mb-1">Texto Base para o Quiz</label>
                  <textarea id={`context-text-${isRedemption}`} value={context} onChange={e => setContext(e.target.value)} required rows={8} className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md text-gray-200 font-mono text-sm" placeholder="Cole aqui o material de estudo..."></textarea>
              </div>
              <button type="submit" disabled={isLoading} className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-wait">
                  {isLoading ? 'Gerando...' : 'Gerar Quiz com IA'}
              </button>
          </form>
        ) : (
          <div className="space-y-6">
              <div className="space-y-4 max-h-[50vh] overflow-y-auto p-4 bg-black/20 rounded-lg">
                  {generatedQuestions.map((q, qIndex) => (
                      <div key={qIndex} className="p-3 border-b border-gray-700">
                          <div className="flex justify-between items-start mb-2"><p className="font-semibold text-gray-200 flex-1">{qIndex + 1}. {q.questionText}</p><div className="text-right ml-4"><p className="text-xs text-blue-300">{q.difficulty}</p><p className="text-sm font-bold text-yellow-300">{q.points} pts</p></div></div>
                          <p className="text-xs text-gray-400 mt-1 italic">Justificativa: {q.rationale}</p>
                          <ul className="mt-2 space-y-1 pl-4">{q.options.map((opt, oIndex) => <li key={oIndex} className={`text-sm ${opt.isCorrect ? 'font-bold text-green-400' : 'text-gray-300'}`}>{opt.isCorrect ? '✔' : '•'} {opt.text}</li>)}</ul>
                      </div>
                  ))}
              </div>
              <div className="flex gap-4">
                   <button onClick={() => { setGeneratedQuestions(null); setStatus(null); }} className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg">Descartar</button>
                  <button onClick={handleSaveQuiz} className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg">Aprovar e Adicionar à Biblioteca</button>
              </div>
          </div>
        )}
      </div>
    );
};

export default function QuizManager() {
    const [islands, setIslands] = useState<Island[]>([]);
    const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
    const [libraryCode, setLibraryCode] = useState<string | null>(null);

    useEffect(() => {
        setIslands(contentService.getIslands());
        setAllQuizzes(contentService.getQuizzes());
    }, []);
    
    const handleQuizCreated = (newQuiz: Quiz) => {
        setAllQuizzes(prevQuizzes => {
            const existingIndex = prevQuizzes.findIndex(q => q.id === newQuiz.id);
            if (existingIndex > -1) {
                const updated = [...prevQuizzes];
                updated[existingIndex] = newQuiz;
                return updated;
            } else {
                return [...prevQuizzes, newQuiz];
            }
        });
    };

    const { regularChallenges, redemptionChallenges, challengeMap } = useMemo(() => {
        const existingQuizIds = new Set(allQuizzes.map(q => q.id));
        const challengeMap = new Map();
        
        const regular = islands.flatMap(island => 
            island.challenges
                .filter(challenge => challenge.id < 4) // Show all challenges 1, 2, 3
                .map(challenge => {
                    const potentialQuizId = `island-${island.id}-challenge-${challenge.id}`;
                    const item = { 
                        key: `${island.id}-${challenge.id}`, 
                        label: `${island.name} > ${challenge.title}`, 
                        points: challenge.points, 
                        isLinked: existingQuizIds.has(potentialQuizId) 
                    };
                    challengeMap.set(potentialQuizId, item);
                    return item;
                })
        );
        const redemption = islands.flatMap(island => 
            island.challenges
                .filter(challenge => challenge.id === 4)
                .map(challenge => {
                    const quizId = `island-${island.id}-challenge-4-redemption`;
                    const item = { key: `${island.id}-${challenge.id}`, label: `${island.name} > Quiz de Redenção`, points: challenge.points, isLinked: existingQuizIds.has(quizId) };
                    challengeMap.set(quizId, item);
                    return item;
                })
        );
        return { regularChallenges: regular, redemptionChallenges: redemption, challengeMap };
    }, [islands, allQuizzes]);
    
    const handleDeleteQuiz = (quizId: string) => {
        if (window.confirm("Tem certeza que deseja remover este quiz da biblioteca local?")) {
            setAllQuizzes(prev => prev.filter(q => q.id !== quizId));
        }
    }

    const handleGenerateLibraryCode = () => {
        const codeString = `import { Quiz } from './types';

export const ALL_QUIZZES: Quiz[] = ${JSON.stringify(allQuizzes, null, 2)};
`;
        setLibraryCode(codeString);
    };

    return (
        <div className="space-y-8">
            {libraryCode && <LibraryCodeModal code={libraryCode} onClose={() => setLibraryCode(null)} />}
            <QuizCreator
                title="Novo Quiz Padrão"
                availableChallenges={regularChallenges}
                generationFn={geminiService.generateQuiz}
                onQuizCreated={handleQuizCreated}
            />
            <QuizCreator
                title="Novo Quiz de Redenção"
                availableChallenges={redemptionChallenges}
                generationFn={geminiService.generateRedemptionQuiz}
                onQuizCreated={handleQuizCreated}
                isRedemption={true}
            />
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                    <h2 className="text-xl font-cinzel text-yellow-400">Biblioteca de Quizzes (Local)</h2>
                    <button onClick={handleGenerateLibraryCode} className="w-full sm:w-auto py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg">Gerar Código da Biblioteca</button>
                </div>
                <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
                    {allQuizzes.length > 0 ? allQuizzes.map(quiz => {
                       const challengeInfo = challengeMap.get(quiz.id);
                       return (
                        <div key={quiz.id} className="flex justify-between items-center bg-gray-900/50 p-3 rounded-md">
                            <div>
                                <p className="font-semibold text-gray-200">{quiz.name}</p>
                                <p className="text-sm text-gray-400">{challengeInfo?.label || 'Desafio não encontrado'}</p>
                            </div>
                            <button onClick={() => handleDeleteQuiz(quiz.id)} className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white text-xs font-semibold rounded-md">Excluir</button>
                        </div>
                       )
                    }) : <p className="text-gray-500 italic text-center">Nenhum quiz na biblioteca local.</p>}
                </div>
            </div>
        </div>
    );
}