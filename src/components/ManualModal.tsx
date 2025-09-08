import React, { useEffect } from 'react';

interface ManualModalProps {
    onClose: () => void;
}

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} className="block text-gray-300 hover:text-yellow-300 hover:bg-gray-700/50 p-2 rounded-md transition-colors text-sm font-semibold">
        {children}
    </a>
);

const SubNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} className="block text-gray-400 hover:text-yellow-300 p-2 rounded-md transition-colors text-sm">
        {children}
    </a>
);

const ManualModal = ({ onClose }: ManualModalProps) => {
    useEffect(() => {
        // Impede a rolagem do corpo da página enquanto o modal estiver aberto
        document.body.style.overflow = 'hidden';
        // Restaura a rolagem quando o modal for fechado
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []); // O array vazio garante que o efeito só rode na montagem e desmontagem

    return (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex items-start justify-center z-50 p-4 sm:py-12 overflow-y-auto animate-fade-in">
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-6xl max-h-[90vh] flex flex-col border-2 border-yellow-500/50">
                <header className="flex justify-between items-center pb-4 mb-4 border-b border-gray-700/50 flex-shrink-0">
                    <h1 className="text-3xl font-cinzel text-yellow-400">Manual do Guerreiro</h1>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-4xl leading-none">&times;</button>
                </header>
                
                <div className="flex flex-col md:flex-row gap-6 flex-grow min-h-0">
                    {/* Navegação Lateral */}
                    <nav className="md:w-1/4 h-1/3 md:h-auto flex-shrink-0 overflow-y-auto pr-4 border-b md:border-b-0 md:border-r border-gray-700/50 pb-4 md:pb-0">
                        <ul className="space-y-1">
                            <li><NavLink href="#introducao">Introdução</NavLink></li>
                            <li>
                                <NavLink href="#capitulo1">1. Acesso ao Reino</NavLink>
                                <ul className="pl-4 mt-1 space-y-1 border-l border-gray-600">
                                     <li><SubNavLink href="#nuvem-sagrada">1.1 A Nuvem Sagrada</SubNavLink></li>
                                     <li><SubNavLink href="#invocacao">1.2 Ritual de Invocação</SubNavLink></li>
                                     <li><SubNavLink href="#login-diario">1.3 Login Diário</SubNavLink></li>
                                     <li><SubNavLink href="#multiplos-dispositivos">1.4 Múltiplos Dispositivos</SubNavLink></li>
                                </ul>
                            </li>
                             <li>
                                <NavLink href="#capitulo2">2. Navegando no Reino</NavLink>
                                <ul className="pl-4 mt-1 space-y-1 border-l border-gray-600">
                                     <li><SubNavLink href="#mapa-mundi">2.1 Mapa-Múndi</SubNavLink></li>
                                     <li><SubNavLink href="#painel-ilha">2.2 Painel da Ilha</SubNavLink></li>
                                     <li><SubNavLink href="#trilha-magica">2.3 Trilha Mágica</SubNavLink></li>
                                     <li><SubNavLink href="#meu-progresso">2.4 Meu Progresso</SubNavLink></li>
                                </ul>
                            </li>
                             <li>
                                <NavLink href="#capitulo3">3. Regras e Conquistas</NavLink>
                                 <ul className="pl-4 mt-1 space-y-1 border-l border-gray-600">
                                     <li><SubNavLink href="#conquista-ilha">3.1 Conquistando uma Ilha</SubNavLink></li>
                                     <li><SubNavLink href="#mandala-magica">3.2 A Mandala Mágica</SubNavLink></li>
                                     <li><SubNavLink href="#desafio-extraordinario">3.3 Desafio Extraordinário</SubNavLink></li>
                                     <li><SubNavLink href="#recompensa-treino">3.4 Recompensa de Treino</SubNavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                    {/* Conteúdo Principal */}
                    <main className="flex-grow overflow-y-auto pr-2 space-y-8 min-h-0">
                        <div className="prose prose-invert prose-p:text-gray-300 prose-headings:font-cinzel prose-strong:text-yellow-200 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-400 text-gray-300">
                            
                            <section id="introducao">
                                <h2 className="text-2xl text-yellow-400">Introdução: O Despertar do Guerreiro</h2>
                                <p>Seja bem-vindo! <strong>"As Dez Ilhas Sagradas"</strong> é mais do que um jogo; é um campo de treinamento para suas <strong>Soft Skills</strong>. Você assume o papel de Chen, um guerreiro destinado a restaurar a luz e a sabedoria ao antigo Império, guiado por um Mestre (seu instrutor) que avaliará seus passos.</p>
                            </section>

                            <section id="capitulo1">
                                <h2 className="text-2xl text-yellow-400">1. Acesso ao Reino</h2>
                                <h3 id="nuvem-sagrada" className="text-xl text-yellow-300 font-bold">1.1 A Nuvem Sagrada: Onde Sua Jornada é Guardada</h3>
                                <p>Todo o seu progresso — cada moeda, desafio e ilha conquistada — é armazenado de forma segura na <strong>Nuvem Sagrada</strong>. Isso permite que você jogue em um notebook e continue em um celular, com seu progresso sempre sincronizado.</p>
                                
                                <h3 id="invocacao" className="text-xl text-yellow-300 font-bold">1.2 O Ritual de Invocação (Seu Primeiro Passo)</h3>
                                <p>O <strong>Código de Invocação</strong> é um ritual de primeiro acesso, usado <strong>UMA ÚNICA VEZ</strong> para conectar um novo dispositivo à sua jornada. Ao usá-lo, o dispositivo cria um elo com sua jornada na Nuvem Sagrada.</p>
                                <ol>
                                    <li>Na tela inicial, clique em "Insira seu Código de Invocação".</li>
                                    <li>Cole o código fornecido pelo Mestre.</li>
                                    <li>Clique em "Invocar Guerreiro".</li>
                                </ol>

                                <h3 id="login-diario" className="text-xl text-yellow-300 font-bold">1.3 O Login Diário (Sua Chave para a Nuvem)</h3>
                                <p>Após um dispositivo ser "invocado", seu acesso diário será sempre através do login com <strong>Nome de Guerreiro</strong> e <strong>Palavra Sagrada</strong>. Este é o método principal e mais seguro, pois sempre busca seu progresso mais recente da nuvem.</p>

                                <h3 id="multiplos-dispositivos" className="text-xl text-yellow-300 font-bold">1.4 Acessando de Múltiplos Dispositivos</h3>
                                <p>Para usar um novo dispositivo (ex: um celular depois de já ter jogado no notebook), <strong>NÃO</strong> use a Invocação. Simplesmente abra o jogo e entre com seu <strong>Login e Senha</strong>. Seu progresso será carregado automaticamente.</p>
                                <p><strong>AVISO:</strong> Usar um Código de Invocação antigo pode sobrescrever seu progresso mais recente e fazer você perder conquistas!</p>
                            </section>
                            
                            <section id="capitulo2">
                                <h2 className="text-2xl text-yellow-400">2. Navegando pelo Reino</h2>
                                <h3 id="mapa-mundi" className="text-xl text-yellow-300 font-bold">2.1 O Mapa-Múndi</h3>
                                <p>Sua tela principal, mostrando as dez ilhas com bordas coloridas que indicam seu status:</p>
                                <ul>
                                    <li><strong>Dourada:</strong> Ilha Conquistada.</li>
                                    <li><strong>Azul-Verde:</strong> Ilha Atual (seu foco).</li>
                                    <li><strong>Cinza:</strong> Ilha Bloqueada.</li>
                                </ul>

                                <h3 id="painel-ilha" className="text-xl text-yellow-300 font-bold">2.2 O Painel da Ilha</h3>
                                <p>Seu campo de batalha. Aqui você estuda e enfrenta os desafios. A barra de progresso mostra o quanto falta para conquistar a ilha (atingir 600 moedas). Os "cartões" de desafio evoluem de <strong>Bloqueado</strong> para <strong>Disponível</strong>, <strong>Pendente</strong> (aguardando avaliação do Mestre) e <strong>Concluído</strong>.</p>
                                
                                <h3 id="trilha-magica" className="text-xl text-yellow-300 font-bold">2.3 A Trilha Mágica</h3>
                                <p>Uma visão artística e inspiradora do seu progresso na ilha atual. Mostra um resumo dos desafios, suas conquistas gerais e mensagens de sabedoria do seu Mestre.</p>
                                
                                <h3 id="meu-progresso" className="text-xl text-yellow-300 font-bold">2.4 Meu Progresso (Pergaminho da Jornada)</h3>
                                <p>Seu painel de dados detalhado, onde você encontra:</p>
                                <ul>
                                    <li><strong>Progresso nas Ilhas:</strong> Sua pontuação exata em cada ilha.</li>
                                    <li><strong>Mandala Mágica:</strong> O símbolo da sua maestria final.</li>
                                    <li><strong>Feedback dos Desafios:</strong> A biblioteca com todas as correções e comentários do Mestre.</li>
                                    <li><strong>Treinamento e Recompensas:</strong> O portal para o app de treino e a área para resgatar suas moedas de ouro extras.</li>
                                </ul>
                            </section>
                            
                            <section id="capitulo3">
                                <h2 className="text-2xl text-yellow-400">3. Regras e Conquistas</h2>
                                <h3 id="conquista-ilha" className="text-xl text-yellow-300 font-bold">3.1 Conquistando uma Ilha</h3>
                                <p>Para conquistar uma ilha e receber o <strong>Pergaminho das Virtudes</strong> (certificado da soft skill), você precisa acumular no mínimo <strong>600 Moedas de Ouro</strong> nela. Cada ilha oferece um total de 1.000 moedas, então lute por cada uma!</p>

                                <h3 id="mandala-magica" className="text-xl text-yellow-300 font-bold">3.2 A Mandala Mágica</h3>
                                <p>Este é o seu objetivo final. Para completar a Mandala e receber o <strong>Certificado de Conclusão da Mentoria</strong>, você precisa acumular um total de pelo menos <strong>8.000 moedas de ouro</strong> ao final da jornada. A cada 1.600 moedas totais, uma nova pétala se acende.</p>
                                
                                <h3 id="desafio-extraordinario" className="text-xl text-yellow-300 font-bold">3.3 O Desafio Extraordinário</h3>
                                <p>Uma chance de ganhar <strong>50 moedas extras</strong> em sua ilha atual. Você deve escrever um resumo de qualidade sobre o que aprendeu. Se o Mestre aprovar, os deuses farão um sorteio. Se eles lhe enviarem uma profecia e você a decifrar corretamente, a recompensa é sua.</p>

                                <h3 id="recompensa-treino" className="text-xl text-yellow-300 font-bold">3.4 A Recompensa de Treino</h3>
                                <p>Ao jogar no app "Tabuleiro de Treino" por 15 minutos ou mais, você receberá um <strong>"código de mérito"</strong>. Cole este código na área "Resgatar Recompensa" (em Meu Progresso) para ganhar <strong>5 moedas de ouro</strong>. Esta recompensa só pode ser resgatada uma vez por dia.</p>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ManualModal;