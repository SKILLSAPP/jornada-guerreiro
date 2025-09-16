import { Quiz } from './types';

export const ALL_QUIZZES: Quiz[] = [
  {
    "id": "island-2-challenge-1",
    "name": "Desafio 1 - Inteligência Emocional",
    "islandId": 2,
    "challengeId": 1,
    "questions": [
      {
        "questionText": "Qual dos seguintes conceitos é descrito como a \"capacidade de identificar nossos próprios sentimentos e dos outros, de nos motivarmos e gerirmos os impulsos dentro de nós e em nossos relacionamentos\" no material de estudo?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "Quociente de Inteligência (QI)",
            "isCorrect": false
          },
          {
            "text": "Inteligência Emocional (IE)",
            "isCorrect": true
          },
          {
            "text": "Inteligência Lógica",
            "isCorrect": false
          }
        ],
        "rationale": "A definição apresentada é a de Inteligência Emocional, conforme popularizada por Daniel Goleman no texto."
      },
      {
        "questionText": "Segundo o material, qual psicólogo popularizou o conceito de Inteligência Emocional com seu \"modelo misto\", integrando habilidades emocionais com traços de personalidade?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "Charles Darwin",
            "isCorrect": false
          },
          {
            "text": "Daniel Goleman",
            "isCorrect": true
          },
          {
            "text": "Howard Gardner",
            "isCorrect": false
          }
        ],
        "rationale": "O texto afirma que Daniel Goleman popularizou o conceito com seu \"modelo misto\", integrando habilidades emocionais com traços de personalidade."
      },
      {
        "questionText": "Qual dos pilares da Inteligência Emocional é considerado a base fundamental, descrito como a capacidade de reconhecer e compreender seus próprios sentimentos, valores e reações?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "Empatia",
            "isCorrect": false
          },
          {
            "text": "Autoconsciência",
            "isCorrect": true
          },
          {
            "text": "Autorregulação",
            "isCorrect": false
          }
        ],
        "rationale": "O material define a Autoconsciência como o primeiro e mais fundamental pilar, sendo a capacidade de reconhecer e compreender os próprios sentimentos."
      },
      {
        "questionText": "No contexto corporativo, a Inteligência Emocional é apresentada como um diferencial que molda o futuro das organizações. Qual dos benefícios abaixo é diretamente associado à IE no trabalho, segundo o texto?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "Aumento exclusivo do conhecimento técnico.",
            "isCorrect": false
          },
          {
            "text": "Melhoria da Comunicação Clara e Eficaz.",
            "isCorrect": true
          },
          {
            "text": "Redução da necessidade de interações humanas.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto menciona que um dos benefícios da IE no trabalho é a melhoria da Comunicação Clara e Eficaz, minimizando mal-entendidos."
      },
      {
        "questionText": "O conceito de \"Otimismo Aprendido\" é descrito no material como a capacidade de manter uma atitude positiva e perseverar diante das adversidades. Qual exemplo prático é citado para ilustrar a importância dessa habilidade?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "Aumento do QI em testes de lógica.",
            "isCorrect": false
          },
          {
            "text": "Aumento das vendas e menor rotatividade na MetLife.",
            "isCorrect": true
          },
          {
            "text": "Melhoria na capacidade de memorização de dados.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto usa o exemplo da MetLife, onde vendedores com alta pontuação em otimismo venderam mais e tiveram menor rotatividade, para ilustrar o Otimismo Aprendido."
      },
      {
        "questionText": "Um jovem profissional se depara com uma situação em que um colega de equipe constantemente interrompe suas falas durante reuniões, gerando frustração. Em vez de reagir impulsivamente, ele decide refletir sobre a situação e buscar uma abordagem construtiva. Qual pilar da Inteligência Emocional está sendo mais evidente na atitude desse profissional?",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Automotivação, pois ele está focado em superar o obstáculo para alcançar seus objetivos.",
            "isCorrect": false
          },
          {
            "text": "Autorregulação, pois ele demonstra a habilidade de lidar com suas emoções de forma ponderada.",
            "isCorrect": true
          },
          {
            "text": "Habilidades Sociais, pois ele está buscando gerenciar o relacionamento de forma produtiva.",
            "isCorrect": false
          }
        ],
        "rationale": "A Autorregulação é a habilidade de lidar com as emoções de forma construtiva, acalmando-se antes de responder impulsivamente, o que é demonstrado pela reflexão antes da reação."
      },
      {
        "questionText": "Em uma empresa, há um conflito entre duas equipes sobre a alocação de recursos para um projeto. O gerente, ao invés de impor uma solução, decide reunir as equipes para que expressem seus pontos de vista e necessidades. Ele demonstra uma escuta ativa e busca entender as perspectivas de ambos os lados. Qual benefício da Inteligência Emocional no mundo corporativo essa atitude do gerente exemplifica?",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Aumento da Resiliência e Gestão do Estresse, pois o gerente está sob pressão.",
            "isCorrect": false
          },
          {
            "text": "Melhoria da Tomada de Decisão, pois ele está evitando uma escolha impulsiva.",
            "isCorrect": false
          },
          {
            "text": "Gestão de Conflitos Produtiva, transformando a divergência em oportunidade de aprendizado.",
            "isCorrect": true
          }
        ],
        "rationale": "O texto afirma que a IE facilita a Gestão de Conflitos Produtiva, enxergando o conflito como uma oportunidade de crescimento e aprendizado, o que a atitude do gerente reflete."
      },
      {
        "questionText": "Um novo líder assume uma equipe desmotivada e com baixa produtividade. Em vez de focar apenas em metas e prazos, ele começa a dedicar tempo para conversas individuais, buscando entender as preocupações e aspirações de cada membro. Ele também incentiva a colaboração e a troca de ideias, criando um ambiente onde todos se sentem à vontade para contribuir. Qual pilar da Inteligência Emocional esse líder está priorizando para transformar a cultura da equipe?",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Autoconsciência, pois ele está refletindo sobre seus próprios sentimentos como líder.",
            "isCorrect": false
          },
          {
            "text": "Empatia e Habilidades Sociais, pois ele busca compreender os outros e gerenciar relacionamentos.",
            "isCorrect": true
          },
          {
            "text": "Automotivação, pois ele está demonstrando sua força interna para superar o desafio.",
            "isCorrect": false
          }
        ],
        "rationale": "O líder está se colocando no lugar dos membros da equipe (Empatia) e gerenciando os relacionamentos para criar um ambiente produtivo (Habilidades Sociais), o que o material descreve como essencial para liderança e trabalho em equipe."
      },
      {
        "questionText": "Uma startup está enfrentando um período de incerteza financeira e vários projetos foram adiados. Apesar das dificuldades, o CEO mantém uma postura otimista e transparente com a equipe, comunicando os desafios, mas também as oportunidades de aprendizado e as estratégias para superá-los. Ele inspira a todos a persistir e a buscar soluções inovadoras. Qual conceito, fundamental para o sucesso empreendedor, está sendo demonstrado pelo CEO?",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Apenas a Autoconsciência, ao reconhecer a situação difícil da empresa.",
            "isCorrect": false
          },
          {
            "text": "O Otimismo Aprendido e a Resiliência Emocional, transformando o revés em motivação.",
            "isCorrect": true
          },
          {
            "text": "Somente as Habilidades Sociais, ao comunicar-se de forma transparente com a equipe.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto descreve o Otimismo Aprendido como a capacidade de manter uma atitude positiva e perseverar, e a Resiliência Emocional como a capacidade de transformar o fracasso em aprendizado, ambos exemplificados pela atitude do CEO."
      },
      {
        "questionText": "Em uma grande corporação, o departamento de desenvolvimento de produtos estava enfrentando um problema crônico: os projetos frequentemente excediam o orçamento e o prazo, e a equipe demonstrava baixa moral e alta rotatividade. O diretor do departamento, um profissional com um QI elevado e vasta experiência técnica, tentou implementar novos softwares de gestão e processos rígidos, mas os resultados não melhoraram significativamente. Ao invés de focar na raiz emocional dos problemas, como a falta de comunicação efetiva, o medo de falhar e a ausência de um ambiente de segurança psicológica, ele insistia que a equipe precisava apenas de mais disciplina e ferramentas técnicas. Qual a principal falha na abordagem do diretor, considerando os princípios da Inteligência Emocional no contexto organizacional?",
        "difficulty": "Difícil",
        "points": 45,
        "options": [
          {
            "text": "A falha principal reside na subestimação da importância do conhecimento técnico e da experiência, pois ele deveria ter investido em treinamentos mais avançados em softwares de gestão para a equipe. O foco em aspectos emocionais é secundário quando a base técnica não está solidificada, e a disciplina é crucial para o cumprimento de prazos e orçamentos.",
            "isCorrect": false
          },
          {
            "text": "A falha principal está em não reconhecer a Inteligência Emocional como um alicerce para uma cultura organizacional resiliente e inovadora, priorizando apenas soluções técnicas e disciplinares. Ele negligenciou que a IE capacita líderes mais humanos e equipes coesas, essenciais para a inovação, retenção de talentos e gestão de conflitos que impactam diretamente o desempenho.",
            "isCorrect": true
          },
          {
            "text": "A falha principal foi a ausência de um plano de contingência para os projetos, o que demonstra uma falta de planejamento estratégico e de visão de risco. A implementação de processos rígidos sem flexibilidade para imprevistos técnicos é uma limitação gerencial que não pode ser resolvida apenas com abordagens emocionais ou de comunicação.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto enfatiza que a IE é o \"alicerce de uma cultura organizacional resiliente e inovadora\", capacitando líderes e equipes. A abordagem do diretor, focada apenas em aspectos técnicos e disciplinares, negligenciou o impacto da IE na comunicação, resolução de conflitos, engajamento e segurança psicológica, que são cruciais para o desempenho e a retenção de talentos, conforme o material."
      }
    ]
  },
  {
    "id": "island-2-challenge-2",
    "name": "Desafio 2 - Inteligência Emocional",
    "islandId": 2,
    "challengeId": 2,
    "questions": [
      {
        "questionText": "Qual é o principal desafio que a citação de Aristóteles sobre a raiva, mencionada por Goleman, estabelece para a inteligência emocional?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "A dificuldade de sentir raiva em qualquer situação.",
            "isCorrect": false
          },
          {
            "text": "A complexidade de gerir a raiva de forma apropriada.",
            "isCorrect": true
          },
          {
            "text": "A impossibilidade de controlar qualquer tipo de emoção intensa.",
            "isCorrect": false
          }
        ],
        "rationale": "A citação de Aristóteles destaca que zangar-se da maneira certa não é fácil, estabelecendo a gestão da raiva como um desafio central da inteligência emocional."
      },
      {
        "questionText": "Segundo Goleman, quais são as \"duas mentes\" que operam no cérebro humano, conforme descrito no Capítulo 1?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "A mente consciente e a mente subconsciente.",
            "isCorrect": false
          },
          {
            "text": "A mente racional e a mente emocional.",
            "isCorrect": true
          },
          {
            "text": "A mente lógica e a mente intuitiva.",
            "isCorrect": false
          }
        ],
        "rationale": "Goleman ressalta a existência de \"nossas duas mentes\": a mente racional, que pensa, e a mente emocional, que sente, operando em harmonia na maior parte do tempo."
      },
      {
        "questionText": "O que Goleman descreve como a marca registrada de um \"sequestro emocional\"?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "Uma reação calma e calculada a uma ameaça percebida.",
            "isCorrect": false
          },
          {
            "text": "Uma resposta impulsiva e explosiva seguida de arrependimento.",
            "isCorrect": true
          },
          {
            "text": "A capacidade de controlar as emoções em situações de alto estresse.",
            "isCorrect": false
          }
        ],
        "rationale": "A marca registrada de um sequestro emocional é a reação impulsiva e explosiva seguida por um sentimento posterior de arrependimento ou de não reconhecimento da própria ação."
      },
      {
        "questionText": "Qual é o primeiro e mais fundamental pilar da inteligência emocional, conforme abordado no Capítulo 4?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "A capacidade de motivar os outros.",
            "isCorrect": false
          },
          {
            "text": "O controle dos impulsos e desejos.",
            "isCorrect": false
          },
          {
            "text": "A autoconsciência, que é reconhecer os próprios sentimentos.",
            "isCorrect": true
          }
        ],
        "rationale": "A autoconsciência, definida como a capacidade de reconhecer os próprios sentimentos no momento em que ocorrem, é o primeiro e mais fundamental pilar da inteligência emocional."
      },
      {
        "questionText": "Segundo Goleman, qual a porcentagem aproximada que o QI contribui para o sucesso na vida, deixando o restante por conta de outras variáveis?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "Cerca de 50%.",
            "isCorrect": false
          },
          {
            "text": "Cerca de 20%.",
            "isCorrect": true
          },
          {
            "text": "Cerca de 80%.",
            "isCorrect": false
          }
        ],
        "rationale": "Goleman aponta que \"na melhor das hipóteses, o QI contribui com cerca de 20% para os fatores que determinam o sucesso na vida, o que deixa os 80% restantes por conta de outras variáveis.\""
      },
      {
        "questionText": "Um colega de trabalho, após receber um feedback negativo, começa a reclamar fervorosamente com outros colegas, revivendo cada detalhe da situação e expressando sua indignação. Segundo Goleman, qual o efeito mais provável dessa atitude?",
        "difficulty": "Médio",
        "points": 25,
        "options": [
          {
            "text": "A raiva será dissipada de forma eficaz, permitindo que ele se acalme mais rapidamente.",
            "isCorrect": false
          },
          {
            "text": "A ruminação sobre o que o irritou alimentará ainda mais a raiva, intensificando o sentimento.",
            "isCorrect": true
          },
          {
            "text": "A expressão da raiva fortalecerá seu sistema imunológico, aliviando o estresse.",
            "isCorrect": false
          }
        ],
        "rationale": "Goleman desmascara o mito da catarse, citando pesquisas que mostram que dar vazão à raiva raramente a dissipa; na verdade, a ruminação sobre o que nos irritou alimenta ainda mais as chamas."
      },
      {
        "questionText": "Em uma equipe de projeto, um membro constantemente adia tarefas complexas para se dedicar a atividades mais fáceis e de gratificação imediata, comprometendo os prazos finais. Qual aptidão mestra, ilustrada pelo \"Teste do Marshmallow\", esse comportamento demonstra falta?",
        "difficulty": "Médio",
        "points": 25,
        "options": [
          {
            "text": "A capacidade de realizar múltiplas tarefas simultaneamente para otimizar o tempo.",
            "isCorrect": false
          },
          {
            "text": "A habilidade de adiar a gratificação e controlar a impulsividade em prol de um objetivo maior.",
            "isCorrect": true
          },
          {
            "text": "A competência de delegar responsabilidades para evitar sobrecarga de trabalho.",
            "isCorrect": false
          }
        ],
        "rationale": "A capacidade de adiar a gratificação e controlar a impulsividade é a essência da autorregulação emocional, sendo a \"aptidão mestra\" que possibilita e potencializa todas as outras, conforme o \"Teste do Marshmallow\"."
      },
      {
        "questionText": "Durante uma reunião de equipe, um gerente apresenta uma nova estratégia. Embora todos os membros acenem positivamente, um deles mantém os braços cruzados e uma expressão facial ligeiramente tensa. Um líder com alta empatia faria o quê?",
        "difficulty": "Médio",
        "points": 25,
        "options": [
          {
            "text": "Ignoraria os sinais não-verbais, focando apenas nas palavras de concordância expressas.",
            "isCorrect": false
          },
          {
            "text": "Interpretaria os sinais não-verbais para entender a verdade emocional por trás das palavras.",
            "isCorrect": true
          },
          {
            "text": "Interromperia a reunião para questionar diretamente a postura do membro, buscando esclarecimentos imediatos.",
            "isCorrect": false
          }
        ],
        "rationale": "A empatia é a capacidade de interpretar canais não-verbais, como gestos e expressões faciais, que revelam a verdade emocional por trás das palavras, permitindo ao líder compreender o verdadeiro sentimento do membro."
      },
      {
        "questionText": "Um gerente precisa dar feedback a um engenheiro cujo projeto apresentou falhas. Em vez de dizer \"Você é incompetente e seu projeto é um desastre\", o gerente decide focar nos pontos específicos que precisam de melhoria e discutir as próximas etapas. Qual é a principal diferença entre essas duas abordagens, segundo Goleman?",
        "difficulty": "Médio",
        "points": 25,
        "options": [
          {
            "text": "A primeira foca na personalidade do engenheiro, enquanto a segunda se concentra na ação e no que pode ser feito para melhorar.",
            "isCorrect": true
          },
          {
            "text": "A primeira é mais direta e honesta, enquanto a segunda é evasiva e menos eficaz para a correção.",
            "isCorrect": false
          },
          {
            "text": "A primeira gera uma resposta imediata de defesa, enquanto a segunda não produz impacto algum no desempenho.",
            "isCorrect": false
          }
        ],
        "rationale": "Goleman destaca que \"a crítica feita de forma hábil se concentra no que a pessoa fez e no que pode fazer, em vez de identificar um traço do caráter da pessoa num trabalho malfeito.\" A crítica destrutiva, por sua vez, é um ataque ao caráter."
      },
      {
        "questionText": "A empresa \"InovaTech\" está enfrentando um período de alta pressão para lançar um novo produto. A equipe de desenvolvimento é composta por indivíduos altamente qualificados e com excelente QI técnico, mas o clima interno está tenso: há constantes desentendimentos sobre prioridades, e-mails ríspidos são trocados, e a colaboração parece forçada. O líder da equipe, apesar de ser um especialista na área, tem dificuldade em mediar conflitos e em inspirar um senso de união, resultando em atrasos e desmotivação. Diante do cenário na InovaTech, e considerando os conceitos de Goleman sobre \"QI de Grupo\" e \"contágio social\", qual das seguintes ações do líder seria a mais eficaz para reverter a situação e otimizar o desempenho da equipe a longo prazo?",
        "difficulty": "Difícil",
        "points": 60,
        "options": [
          {
            "text": "O líder deve focar em reorganizar as tarefas e estabelecer métricas de desempenho individuais mais rigorosas, incentivando a competição saudável para que os membros mais produtivos inspirem os demais a superar os desafios técnicos. Isso garantirá que a expertise individual seja plenamente utilizada.",
            "isCorrect": false
          },
          {
            "text": "O líder precisa investir em treinamentos técnicos avançados para aprimorar as habilidades individuais dos membros, pois o problema reside na complexidade do produto e na falta de conhecimento específico para lidar com os desafios, o que naturalmente levará a uma melhor colaboração.",
            "isCorrect": false
          },
          {
            "text": "O líder deve priorizar a construção de uma cultura de harmonia e colaboração, mediando ativamente os conflitos, promovendo a empatia entre os membros e modelando uma comunicação emocionalmente inteligente para que o contágio social positivo eleve o \"QI de Grupo\".",
            "isCorrect": true
          }
        ],
        "rationale": "Goleman afirma que a chave para um alto QI de grupo é a harmonia existente entre os membros, e que o contágio social demonstra o poder das emoções na qualidade dos relacionamentos. A liderança que foca na construção de uma cultura de colaboração e empatia, mediando conflitos e modelando a inteligência emocional, é a mais eficaz para otimizar o desempenho da equipe a longo prazo, superando a mera competência técnica individual."
      }
    ]
  },
  {
    "id": "island-2-challenge-3",
    "name": "Desafio 3 - Inteligência Emocional",
    "islandId": 2,
    "challengeId": 3,
    "questions": [
      {
        "questionText": "Segundo Roberto Shinyashiki, qual é a definição prática de Inteligência Emocional?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "Dominar completamente o que se sente para evitar reações negativas.",
            "isCorrect": false
          },
          {
            "text": "Definir um resultado e elaborar as emoções para atingir esse resultado.",
            "isCorrect": true
          },
          {
            "text": "Controlar impulsos emocionais através de técnicas de respiração e meditação.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto afirma que Shinyashiki define IE como 'você define o resultado E você elabora Suas Emoções para atingir aquele resultado'."
      },
      {
        "questionText": "Quais são as cinco emoções autênticas mencionadas por Roberto Shinyashiki, referenciando o filme 'Divertida Mente'?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "Felicidade, surpresa, nojo, raiva e tristeza.",
            "isCorrect": false
          },
          {
            "text": "Medo, tristeza, raiva, afeto e alegria.",
            "isCorrect": true
          },
          {
            "text": "Amor, esperança, gratidão, frustração e paz.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto lista explicitamente as cinco emoções autênticas como 'medo, tristeza, raiva, afeto e alegria'."
      },
      {
        "questionText": "De acordo com Brené Brown, como ela define a vergonha em sua pesquisa sobre conexão humana?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "A sensação de culpa por cometer um erro grave em público.",
            "isCorrect": false
          },
          {
            "text": "O medo da desconexão, a ideia de não ser digno de conexão.",
            "isCorrect": true
          },
          {
            "text": "A incapacidade de expressar sentimentos verdadeiros em situações sociais.",
            "isCorrect": false
          }
        ],
        "rationale": "Brené Brown define vergonha como 'o medo da desconexão: 'Existe algo em mim que, se outras pessoas souberem ou virem, não serei digno de conexão?''."
      },
      {
        "questionText": "Qual característica principal Brené Brown identificou nas 'pessoas de coração inteiro' (whole-hearted) que as diferenciava?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "A capacidade de controlar suas emoções e evitar a vulnerabilidade.",
            "isCorrect": false
          },
          {
            "text": "A crença de que são dignas de amor e pertencimento.",
            "isCorrect": true
          },
          {
            "text": "A habilidade de esconder suas imperfeições para manter a imagem social.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto afirma que 'As pessoas que têm um forte senso de amor e pertencimento acreditam que são dignas de amor e pertencimento'."
      },
      {
        "questionText": "Caio Carneiro faz uma distinção importante entre 'ajuda' e 'apoio'. Qual é essa distinção?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "Ele oferece ajuda a quem precisa e apoio a quem pede.",
            "isCorrect": false
          },
          {
            "text": "Ele é contra ajudar quem não quer, mas oferece apoio a quem merece e já deu o primeiro passo.",
            "isCorrect": true
          },
          {
            "text": "Ele acredita que ajuda é para problemas financeiros e apoio para questões emocionais.",
            "isCorrect": false
          }
        ],
        "rationale": "Caio Carneiro afirma: 'eu sou um cara contra ajuda eu não ofereço ajuda para quem precisa é oferece apoio para quem merece'."
      },
      {
        "questionText": "Um colega de trabalho demonstra constantemente uma alegria exagerada e forçada em todas as situações, mesmo após receber uma notícia desfavorável. De acordo com o conceito de Roberto Shinyashiki sobre emoções autênticas e falsas, como essa atitude poderia ser interpretada?",
        "difficulty": "Médio",
        "points": 30,
        "options": [
          {
            "text": "Como um sinal de resiliência emocional, indicando que ele superou a adversidade rapidamente.",
            "isCorrect": false
          },
          {
            "text": "Como uma 'falsa alegria', uma emoção inadequada em intensidade e qualidade, treinada para mascarar sentimentos.",
            "isCorrect": true
          },
          {
            "text": "Como uma estratégia eficaz para manter o ambiente de trabalho positivo, apesar dos desafios.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto explica que emoções falsas são 'inadequadas em intensidade, duração ou qualidade', citando a 'alegria forçada' como exemplo de 'falsa alegria'."
      },
      {
        "questionText": "Um gerente de equipe percebe que seus colaboradores, apesar de expressarem o desejo de melhorar o desempenho, não conseguem implementar as mudanças necessárias. Segundo Roberto Shinyashiki, qual seria a principal razão para essa dificuldade em mudar?",
        "difficulty": "Médio",
        "points": 30,
        "options": [
          {
            "text": "A falta de motivação intrínseca, que não pode ser influenciada por fatores externos.",
            "isCorrect": false
          },
          {
            "text": "A ausência de um compromisso genuíno e de um método claro, preferencialmente com um mentor.",
            "isCorrect": true
          },
          {
            "text": "O medo inerente ao novo, que impede qualquer tipo de transformação pessoal e profissional.",
            "isCorrect": false
          }
        ],
        "rationale": "Roberto Shinyashiki afirma que 'a pessoa não muda porque quer ele muda quando ele assume um compromisso e tem um método principalmente se ele tem um mentor'."
      },
      {
        "questionText": "Uma pessoa, ao enfrentar uma situação de grande incerteza e medo em sua vida, decide se isolar e evitar qualquer tipo de sentimento intenso, seja positivo ou negativo. De acordo com a pesquisa de Brené Brown, qual é a consequência dessa tentativa de entorpecer a vulnerabilidade?",
        "difficulty": "Médio",
        "points": 30,
        "options": [
          {
            "text": "Ela consegue controlar seletivamente as emoções negativas, preservando as positivas para momentos oportunos.",
            "isCorrect": false
          },
          {
            "text": "Ao entorpecer sentimentos como medo e tristeza, ela também entorpece a alegria e a gratidão, gerando um ciclo de miséria.",
            "isCorrect": true
          },
          {
            "text": "Essa é uma estratégia eficaz para se proteger de futuras decepções, garantindo um estado de equilíbrio emocional.",
            "isCorrect": false
          }
        ],
        "rationale": "Brené Brown explica que 'Não se pode entorpecer seletivamente as emoções. Ao tentar evitar sentimentos como vulnerabilidade, tristeza, vergonha, medo e decepção, acabamos entorpecendo também a alegria, a gratidão e a felicidade'."
      },
      {
        "questionText": "Após receber uma crítica inesperada no trabalho, um profissional reage imediatamente com raiva e frustração, antes mesmo de analisar o conteúdo da crítica. Considerando a 'janela de 5 segundos' mencionada por Roberto Shinyashiki, qual é a implicação dessa reação impulsiva?",
        "difficulty": "Médio",
        "points": 30,
        "options": [
          {
            "text": "A reação imediata demonstra autenticidade, pois reflete o sentimento real do momento.",
            "isCorrect": false
          },
          {
            "text": "O significado dado ao evento nesses primeiros 5 segundos determinará grande parte da influência do acontecimento sobre ele.",
            "isCorrect": true
          },
          {
            "text": "É uma resposta natural do cérebro ao estresse, que não pode ser controlada sem treinamento intensivo.",
            "isCorrect": false
          }
        ],
        "rationale": "A dica prática de Shinyashiki é que 'a janela mais importante emocionalmente em um acontecimento é cinco segundos depois que ele acontece. O significado que se dá nesses 5 segundos determina a influência do evento'."
      },
      {
        "questionText": "Uma líder de equipe, Maria, sempre se esforçou para apresentar uma imagem de perfeição e controle absoluto, acreditando que isso a tornaria mais respeitada e inspiradora para seus colaboradores. Ela evita compartilhar suas incertezas ou desafios pessoais, temendo que isso a faça parecer fraca. No entanto, sua equipe parece distante e pouco engajada, e ela sente uma pressão constante para manter essa fachada, o que a exausta. Com base nos conceitos de Brené Brown sobre vulnerabilidade e o caminho para uma vida plena, qual seria a abordagem mais alinhada para Maria transformar essa dinâmica?",
        "difficulty": "Difícil",
        "points": 80,
        "options": [
          {
            "text": "Maria deve continuar buscando a perfeição em suas entregas e na gestão da equipe, pois a liderança exige uma postura impecável, e a vulnerabilidade poderia minar sua autoridade e a confiança de seus liderados, levando a um ambiente de trabalho menos produtivo e mais caótico.",
            "isCorrect": false
          },
          {
            "text": "Maria precisa reconhecer que a autenticidade e a crença de 'Eu sou o suficiente' são fundamentais, permitindo-se ser vista de forma mais vulnerável, o que pode fortalecer a conexão com a equipe, inspirar a coragem da imperfeição nos outros e criar um ambiente de maior pertencimento.",
            "isCorrect": true
          },
          {
            "text": "Maria deveria implementar um sistema de feedback 360 graus para identificar as áreas onde sua imagem de perfeição está falhando e, assim, ajustar sua postura para atender às expectativas da equipe, garantindo que sua liderança seja percebida como forte e inabalável.",
            "isCorrect": false
          }
        ],
        "rationale": "Brené Brown enfatiza que o caminho para uma vida plena envolve 'deixar-nos ser vistos, profundamente vistos, vulneravelmente vistos' e a crença de 'Eu sou o suficiente', o que leva a uma maior conexão e gentileza. A tentativa de perfeição e o entorpecimento da vulnerabilidade são descritos como obstáculos."
      }
    ]
  },
  {
    "id": "island-1-challenge-1",
    "name": "Desafio 1 - Comunicação ",
    "islandId": 1,
    "challengeId": 1,
    "questions": [
      {
        "questionText": "Qual das seguintes opções melhor descreve a comunicação interpessoal, conforme o material de estudo?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "A troca de informações e sentimentos apenas por meio da fala e da escrita entre duas ou mais pessoas.",
            "isCorrect": false
          },
          {
            "text": "A troca de informações, ideias e sentimentos entre duas ou mais pessoas, de forma direta e recíproca, incluindo fala, escrita, linguagem corporal e tom de voz.",
            "isCorrect": true
          },
          {
            "text": "A transmissão unilateral de mensagens de uma pessoa para um grupo, focando na persuasão e no impacto.",
            "isCorrect": false
          }
        ],
        "rationale": "A comunicação interpessoal abrange a troca direta e recíproca de informações, ideias e sentimentos, utilizando tanto a fala e a escrita quanto a linguagem corporal e o tom de voz."
      },
      {
        "questionText": "De acordo com as dicas práticas sobre escuta ativa, qual ação é crucial para mostrar que se está ouvindo ativamente?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "Interromper o orador para oferecer soluções imediatas ao problema apresentado.",
            "isCorrect": false
          },
          {
            "text": "Manter a mente aberta e suspender críticas para uma compreensão completa da mensagem.",
            "isCorrect": true
          },
          {
            "text": "Focar apenas nas palavras ditas, ignorando a linguagem corporal do interlocutor.",
            "isCorrect": false
          }
        ],
        "rationale": "Uma dica crucial para a escuta ativa é manter a mente aberta e suspender críticas para uma compreensão completa da mensagem, evitando julgar ou dar soluções imediatas."
      },
      {
        "questionText": "Para garantir clareza e concisão na comunicação, o material sugere uma prática fundamental. Qual é ela?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "Utilizar jargões técnicos para demonstrar profundidade no assunto abordado.",
            "isCorrect": false
          },
          {
            "text": "Definir os objetivos e o público antes de qualquer comunicação para incluir informações necessárias e eliminar irrelevantes.",
            "isCorrect": true
          },
          {
            "text": "Abordar múltiplos tópicos em uma única mensagem para otimizar o tempo da audiência.",
            "isCorrect": false
          }
        ],
        "rationale": "Definir os objetivos e o público antes de qualquer comunicação é fundamental para garantir clareza e concisão, assegurando que todas as informações necessárias sejam incluídas e que detalhes irrelevantes sejam eliminados."
      },
      {
        "questionText": "Qual é a principal característica dos vícios de linguagem, conforme descrito no material?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "Palavras e gestos que enriquecem a comunicação, tornando-a mais expressiva.",
            "isCorrect": false
          },
          {
            "text": "Palavras desnecessárias ou gestos repetitivos que poluem e atrapalham a comunicação.",
            "isCorrect": true
          },
          {
            "text": "Técnicas de oratória para preencher pausas e manter a fluidez do discurso.",
            "isCorrect": false
          }
        ],
        "rationale": "Vícios de linguagem são palavras desnecessárias (como 'hum', 'é', 'né') ou gestos repetitivos que poluem e atrapalham a comunicação, tornando a mensagem menos clara e profissional."
      },
      {
        "questionText": "O que é a glossofobia, mencionada no contexto de falar em público?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "A habilidade de persuadir a audiência com argumentos lógicos e bem fundamentados.",
            "isCorrect": false
          },
          {
            "text": "O medo de falar em público, que é comum e pode ser superado com técnicas e prática.",
            "isCorrect": true
          },
          {
            "text": "A técnica de usar pausas estratégicas para enfatizar pontos importantes no discurso.",
            "isCorrect": false
          }
        ],
        "rationale": "Glossofobia é o termo para o medo de falar em público, uma condição comum que, segundo o material, pode ser superada com técnicas e prática."
      },
      {
        "questionText": "Durante uma conversa com um colega que parece frustrado com um projeto, você percebe que ele está desabafando sobre as dificuldades. De acordo com o conceito de empatia, qual seria a melhor abordagem?",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Interromper o colega para oferecer imediatamente uma solução prática para o problema que ele descreveu.",
            "isCorrect": false
          },
          {
            "text": "Expressar sua percepção do sentimento dele, utilizando uma frase como 'Parece que você está chateado com a situação do projeto', e validar esse sentimento.",
            "isCorrect": true
          },
          {
            "text": "Compartilhar uma experiência pessoal semelhante, mostrando que você já passou por algo pior para que ele se sinta melhor.",
            "isCorrect": false
          }
        ],
        "rationale": "Cultivar a empatia envolve reconhecer e expressar a percepção dos sentimentos do outro, validando-os, em vez de oferecer soluções imediatas ou 'superar a história' da pessoa."
      },
      {
        "questionText": "Em uma apresentação importante, um profissional está explicando um novo plano de ação com palavras entusiasmadas, mas sua postura é curvada e ele evita contato visual com a audiência. Qual o impacto dessa situação, segundo o material?",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "A audiência provavelmente se sentirá mais conectada, pois o conteúdo verbal é o mais importante para a persuasão.",
            "isCorrect": false
          },
          {
            "text": "A inconsistência entre as pistas verbais e não verbais pode gerar confusão e desmotivação na audiência, comprometendo a eficácia da mensagem.",
            "isCorrect": true
          },
          {
            "text": "A linguagem corporal curvada e a falta de contato visual são técnicas para criar um senso de humildade e acessibilidade.",
            "isCorrect": false
          }
        ],
        "rationale": "O material enfatiza que a inconsistência entre as pistas verbais e não verbais pode gerar confusão e desmotivação na audiência, comprometendo a eficácia da mensagem, pois o corpo e o tom de voz comunicam muito."
      },
      {
        "questionText": "Um jovem profissional está se preparando para sua primeira apresentação em um grande evento da empresa. Ele está muito nervoso. Qual estratégia de preparação o material sugere para superar o nervosismo e proferir um discurso impactante?",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Focar exclusivamente na memorização do roteiro para evitar qualquer desvio e garantir a perfeição.",
            "isCorrect": false
          },
          {
            "text": "Praticar o discurso várias vezes, idealmente gravando-se em vídeo ou em frente a um espelho, e buscar feedback.",
            "isCorrect": true
          },
          {
            "text": "Chegar no último minuto para não ter tempo de pensar demais e assim evitar o nervosismo inicial.",
            "isCorrect": false
          }
        ],
        "rationale": "Uma preparação minuciosa é a maneira mais eficaz de superar o nervosismo, e isso inclui praticar o discurso várias vezes, gravando-se e buscando feedback para autoavaliação e melhoria."
      },
      {
        "questionText": "Você precisa iniciar uma apresentação sobre um novo processo de gestão de projetos. Você decide usar a técnica de 'vulnerabilidade controlada'. Como você aplicaria essa técnica de forma eficaz?",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Começar confessando que você não domina completamente o assunto, pedindo desculpas por possíveis falhas.",
            "isCorrect": false
          },
          {
            "text": "Iniciar contando uma dificuldade pessoal que você tinha com a gestão de projetos e como a superou, gerando identificação e engajamento.",
            "isCorrect": true
          },
          {
            "text": "Apresentar uma estatística surpreendente sobre falhas em projetos para chocar a audiência e capturar a atenção.",
            "isCorrect": false
          }
        ],
        "rationale": "A vulnerabilidade controlada consiste em confessar uma dificuldade que foi superada, mostrando a jornada de aprendizado e resolução, o que gera identificação e engajamento da audiência."
      },
      {
        "questionText": "Em uma reunião de equipe, a gerente Ana percebe que um novo membro, Pedro, está tendo dificuldades para se integrar e contribuir ativamente, apesar de ter boas ideias. Ana decide aplicar os princípios de carisma e storytelling para ajudar Pedro a se sentir mais à vontade e engajado, e para que suas ideias sejam melhor recebidas. Qual das seguintes abordagens Ana deveria priorizar para maximizar o impacto positivo de Pedro na equipe, conforme o material?",
        "difficulty": "Difícil",
        "points": 45,
        "options": [
          {
            "text": "Ana deve focar em demonstrar sua própria autoridade e competência, apresentando o projeto com convicção e clareza, para que Pedro se sinta inspirado a seguir seu exemplo e aprimore sua comunicação.",
            "isCorrect": false
          },
          {
            "text": "Ana deve priorizar a construção de rapport, usando o nome de Pedro e validando seus sentimentos ao ouvir suas ideias, evitando 'superar a história' dele, para que ele se sinta valorizado e conectado.",
            "isCorrect": true
          },
          {
            "text": "Ana deve contar uma história pessoal inspiradora sobre como superou desafios de integração no início de sua carreira, para motivar Pedro a ser mais proativo e a compartilhar suas ideias com maior confiança.",
            "isCorrect": false
          }
        ],
        "rationale": "O material destaca que o carisma envolve fazer o outro se sentir a pessoa mais importante, usando o nome, e que o rapport é construído por meio de espelhamento e validação, evitando 'superar a história'. Essas ações diretas promovem a integração e a contribuição de Pedro."
      }
    ]
  },
  {
    "id": "island-1-challenge-2",
    "name": "Desafio 2 - Comunicação",
    "islandId": 1,
    "challengeId": 2,
    "questions": [
      {
        "questionText": "De acordo com o prefácio, qual é a principal razão pela qual a comunicação eficaz de ideias se tornou uma habilidade essencial no século 21?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "A capacidade de memorizar grandes volumes de informações complexas.",
            "isCorrect": false
          },
          {
            "text": "A necessidade de dominar múltiplas línguas para interagir globalmente.",
            "isCorrect": false
          },
          {
            "text": "As ideias são consideradas a \"moeda do século 21\", exigindo comunicação eficaz.",
            "isCorrect": true
          }
        ],
        "rationale": "O prefácio afirma claramente que \"as ideias são a moeda do século 21\", tornando a capacidade de comunicá-las de forma eficaz uma habilidade essencial."
      },
      {
        "questionText": "Conforme o Capítulo 1 (\"Liberte o seu Mestre Interior\"), qual é o alicerce fundamental de qualquer apresentação inspiradora?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "A habilidade de memorizar o roteiro completo sem falhas.",
            "isCorrect": false
          },
          {
            "text": "A paixão genuína e pessoal do orador pelo tema.",
            "isCorrect": true
          },
          {
            "text": "O uso de dados e estatísticas complexas para impressionar o público.",
            "isCorrect": false
          }
        ],
        "rationale": "O Capítulo 1 estabelece a paixão como o alicerce de qualquer apresentação inspiradora, sendo o primeiro e mais fundamental segredo dos grandes oradores."
      },
      {
        "questionText": "Segundo o Capítulo 2 (\"Domine a Arte do Storytelling\"), qual é o principal efeito neurocientífico das histórias no cérebro dos ouvintes?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "Elas ativam exclusivamente a área lógica do cérebro, facilitando a memorização de dados.",
            "isCorrect": false
          },
          {
            "text": "Elas causam um \"acoplamento cérebro a cérebro\", sincronizando o orador e os ouvintes.",
            "isCorrect": true
          },
          {
            "text": "Elas diminuem a atividade cerebral, permitindo que o público relaxe e absorva a informação passivamente.",
            "isCorrect": false
          }
        ],
        "rationale": "O capítulo 2 menciona que estudos mostram que as histórias \"sincronizam\" os cérebros do orador e dos ouvintes, um processo chamado \"acoplamento cérebro a cérebro\"."
      },
      {
        "questionText": "No Capítulo 7 (\"Atenha-se à Regra dos 18 Minutos\"), qual é a principal razão pela qual apresentações longas são desaconselhadas?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "Elas demonstram falta de preparação e planejamento por parte do orador.",
            "isCorrect": false
          },
          {
            "text": "O cérebro humano é um \"devorador de energia\" e apresentações longas criam um \"backlog cognitivo\".",
            "isCorrect": true
          },
          {
            "text": "A duração excessiva impede que o orador explore todos os detalhes do tema.",
            "isCorrect": false
          }
        ],
        "rationale": "O Capítulo 7 explica que o cérebro humano é um \"devorador de energia\" e que apresentações longas criam um \"backlog cognitivo\", sobrecarregando a mente dos ouvintes."
      },
      {
        "questionText": "De acordo com o Capítulo 8 (\"Crie uma Representação Mental com Experiências Multissensoriais\"), o que é o \"Efeito de Superioridade da Imagem\" (ESI)?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "A tendência de as pessoas preferirem apresentações com mais texto do que imagens.",
            "isCorrect": false
          },
          {
            "text": "A demonstração de que a retenção de informação aumenta drasticamente quando imagens são adicionadas às palavras.",
            "isCorrect": true
          },
          {
            "text": "A preferência natural do público por oradores que utilizam apenas slides com gráficos complexos.",
            "isCorrect": false
          }
        ],
        "rationale": "O Capítulo 8 define o ESI como a demonstração de que, ao ouvir informações, lembramos de 10% após três dias; se uma imagem for adicionada, a retenção sobe para 65%."
      },
      {
        "questionText": "Em uma reunião de equipe, um jovem profissional precisa apresentar os resultados de um projeto complexo. Ele decide começar a apresentação compartilhando uma história pessoal sobre os desafios inesperados que ele e sua equipe superaram para atingir as metas, antes de mostrar os dados. Qual princípio dos grandes oradores do TED ele está aplicando?",
        "difficulty": "Médio",
        "points": 25,
        "options": [
          {
            "text": "A Regra dos 18 Minutos, focando na concisão para evitar sobrecarga cognitiva.",
            "isCorrect": false
          },
          {
            "text": "A criação de momentos surpreendentes, utilizando uma estatística chocante para prender a atenção.",
            "isCorrect": false
          },
          {
            "text": "A arte do Storytelling, que cria conexão emocional e torna os dados mais memoráveis.",
            "isCorrect": true
          }
        ],
        "rationale": "O Capítulo 2 (\"Domine a Arte do Storytelling\") enfatiza que as histórias são a ferramenta mais poderosa para tocar o coração e a mente da plateia, criando conexão emocional antes mesmo da apresentação de dados."
      },
      {
        "questionText": "Um gerente está prestes a fazer um pitch importante para investidores. Ele está nervoso, mas antes de entrar na sala, ele vai ao banheiro e fica por dois minutos em uma \"pose de poder\", com as mãos na cintura e o peito estufado. Qual é o objetivo dessa técnica, conforme as \"Dicas do Mentor\" do Capítulo 3?",
        "difficulty": "Médio",
        "points": 25,
        "options": [
          {
            "text": "Aumentar a testosterona e diminuir o cortisol, fazendo-o sentir e parecer mais confiante.",
            "isCorrect": true
          },
          {
            "text": "Aquecer a voz e praticar a velocidade ideal de fala, que é de cerca de 190 palavras por minuto.",
            "isCorrect": false
          },
          {
            "text": "Revisar mentalmente os \"Três Ps\" (Paixão, Prática, Presença) para garantir a autenticidade.",
            "isCorrect": false
          }
        ],
        "rationale": "As \"Dicas do Mentor\" do Capítulo 3 mencionam a \"pose de poder\" de Amy Cuddy, explicando que a ciência mostra que isso aumenta a testosterona e diminui o cortisol, fazendo a pessoa se sentir e parecer mais confiante."
      },
      {
        "questionText": "Durante uma apresentação sobre a importância da inovação, um palestrante começa dizendo: \"Sabiam que nossa empresa gasta o equivalente a 500 horas por ano em tarefas manuais que poderiam ser automatizadas?\". Ele então prossegue para explicar como uma nova ferramenta pode resolver isso. Qual segredo dos oradores do TED ele está utilizando para engajar a plateia?",
        "difficulty": "Médio",
        "points": 25,
        "options": [
          {
            "text": "Fazer uma apresentação leve, utilizando humor e anedotas para descontrair o ambiente.",
            "isCorrect": false
          },
          {
            "text": "Libertar o seu mestre interior, começando com a paixão pessoal pelo tema da inovação.",
            "isCorrect": false
          },
          {
            "text": "Ensinar algo novo, revelando uma informação surpreendente para prender a atenção do cérebro.",
            "isCorrect": true
          }
        ],
        "rationale": "O Capítulo 4 (\"Quero Aprender Algo Novo\") destaca que a novidade é a maneira mais eficaz de prender a atenção do cérebro, revelando informações completamente novas ou uma nova perspectiva sobre um problema antigo, como o exemplo das horas gastas em tarefas manuais."
      },
      {
        "questionText": "Uma jovem profissional está preparando uma apresentação sobre os resultados de vendas do último trimestre. Em vez de usar slides cheios de números e gráficos complexos, ela decide criar um slide com uma única imagem impactante de um cliente satisfeito e uma frase curta que resume o sucesso. Qual princípio do material ela está aplicando para tornar sua apresentação mais eficaz?",
        "difficulty": "Médio",
        "points": 25,
        "options": [
          {
            "text": "A Regra dos 18 Minutos, garantindo que a apresentação seja concisa e direta ao ponto.",
            "isCorrect": false
          },
          {
            "text": "A criação de uma representação mental com experiências multissensoriais, utilizando imagens em vez de texto.",
            "isCorrect": true
          },
          {
            "text": "A autenticidade, mostrando sua vulnerabilidade ao admitir os desafios do trimestre.",
            "isCorrect": false
          }
        ],
        "rationale": "O Capítulo 8 (\"Crie uma Representação Mental com Experiências Multissensoriais\") enfatiza o uso de imagens em vez de texto e o \"Efeito de Superioridade da Imagem\" para tornar a mensagem mais memorável e engajadora, transformando slides em uma trilha sonora visual."
      },
      {
        "questionText": "Em uma startup de tecnologia, a CEO Maria precisa apresentar um novo projeto inovador para uma equipe de engenheiros céticos. O projeto é complexo e envolve uma mudança significativa nos processos atuais. Maria sabe que a equipe valoriza a lógica e os dados, mas também percebe que há uma resistência inicial. Para superar essa barreira, ela decide iniciar sua apresentação com uma história pessoal sobre como uma experiência de frustração com um problema similar no passado a motivou a buscar essa nova solução. Em seguida, ela apresenta uma estatística chocante sobre a ineficiência atual, seguida por uma demonstração ao vivo da nova tecnologia, transformando dados complexos em um infográfico simples e impactante. Por fim, ela encerra compartilhando sua visão apaixonada sobre o futuro que o projeto pode construir para a empresa e para a equipe, admitindo que o caminho será desafiador, mas recompensador. Qual combinação de estratégias dos oradores do TED Maria utilizou para maximizar a persuasão e o engajamento de sua equipe, considerando o contexto de ceticismo e a complexidade do projeto?",
        "difficulty": "Difícil",
        "points": 60,
        "options": [
          {
            "text": "Maria combinou Storytelling para criar conexão emocional, momentos surpreendentes com a estatística e a demonstração ao vivo, e a paixão para inspirar a equipe, reconhecendo que a vulnerabilidade inicial pode derrubar barreiras de resistência.",
            "isCorrect": true
          },
          {
            "text": "Maria priorizou a Regra dos 18 Minutos para evitar a sobrecarga cognitiva, utilizou o humor para aliviar a tensão inicial da equipe cética, e focou em ensinar algo novo com a demonstração da tecnologia, garantindo a leveza da apresentação.",
            "isCorrect": false
          },
          {
            "text": "Maria empregou a estratégia de conversar com a plateia, ensaiando exaustivamente para parecer natural, criou uma representação mental com o infográfico para facilitar a compreensão, e manteve a autenticidade para construir confiança, evitando qualquer tipo de performance.",
            "isCorrect": false
          }
        ],
        "rationale": "Maria utilizou o Storytelling (Capítulo 2) ao começar com uma história pessoal para criar conexão emocional. Ela criou momentos surpreendentes (Capítulo 5) com a estatística chocante e a demonstração ao vivo. E, finalmente, ela usou a paixão (Capítulo 1) ao compartilhar sua visão e a autenticidade/vulnerabilidade (Capítulo 9) ao admitir os desafios, o que gera confiança e inspiração, sendo crucial para uma equipe cética."
      }
    ]
  },
  {
    "id": "island-1-challenge-3",
    "name": "Desafio 3 - Comunicação",
    "islandId": 1,
    "challengeId": 3,
    "questions": [
      {
        "questionText": "Segundo Nicholas Butman, quais são os três passos fundamentais para uma comunicação eficaz?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "Focar na mensagem, usar linguagem corporal e manter contato visual.",
            "isCorrect": false
          },
          {
            "text": "Encontrar a pessoa, gerar afinidade (rapport) e comunicar.",
            "isCorrect": true
          },
          {
            "text": "Apresentar o produto, negociar o preço e fechar a venda.",
            "isCorrect": false
          }
        ],
        "rationale": "O material destaca que a comunicação eficaz, segundo Butman, envolve encontrar a pessoa, gerar afinidade e, por fim, comunicar."
      },
      {
        "questionText": "De acordo com o material, quantos encontros positivos são necessários para reverter uma primeira impressão negativa?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "Três encontros positivos.",
            "isCorrect": false
          },
          {
            "text": "Cinco encontros positivos.",
            "isCorrect": false
          },
          {
            "text": "Oito encontros positivos.",
            "isCorrect": true
          }
        ],
        "rationale": "O briefing afirma que 'São necessários oito encontros positivos para reverter uma primeira impressão negativa.'"
      },
      {
        "questionText": "A '7-38-55 Rule' descreve a proporção da comunicação. Qual é a porcentagem atribuída à linguagem corporal?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "7% da comunicação.",
            "isCorrect": false
          },
          {
            "text": "38% da comunicação.",
            "isCorrect": false
          },
          {
            "text": "55% da comunicação.",
            "isCorrect": true
          }
        ],
        "rationale": "O material explica que '7% da sua comunicação é verbal, 93% é tua postura, tom de voz, a maneira como você esticula' e detalha que '55% expressão corporal e 38% tom de voz'."
      },
      {
        "questionText": "No contexto de gerar rapport, o que significa a técnica de 'espelhamento'?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "Refletir as ideias da pessoa para mostrar concordância.",
            "isCorrect": false
          },
          {
            "text": "Imitar sutilmente a postura, gestos e velocidade da fala do outro.",
            "isCorrect": true
          },
          {
            "text": "Apresentar argumentos que espelhem os valores do interlocutor.",
            "isCorrect": false
          }
        ],
        "rationale": "O material define espelhamento como 'Imitar sutilmente a postura, gestos, velocidade da fala e respiração da outra pessoa para enviar uma mensagem inconsciente de semelhança.'"
      },
      {
        "questionText": "Lena Souza, em sua palestra, defende que a oratória não deve seguir um padrão rígido. Qual é a sua principal mensagem sobre identidade na oratória?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "Que a oratória exige a adaptação a um modelo ideal de performance.",
            "isCorrect": false
          },
          {
            "text": "Que não há um padrão, e o padrão é você mesmo, aceitando sua autenticidade.",
            "isCorrect": true
          },
          {
            "text": "Que a identidade do orador deve ser moldada conforme o público.",
            "isCorrect": false
          }
        ],
        "rationale": "Lena Souza afirma: 'Não tem padrão. Padrão é você,' enfatizando a importância da aceitação e autenticidade."
      },
      {
        "questionText": "Um novo estagiário, João, está prestes a conhecer seu supervisor pela primeira vez. Ele se lembra da 'Fórmula para uma Boa Primeira Impressão' de Nicholas Butman. Qual das seguintes ações João deve priorizar para aplicar essa fórmula de forma eficaz?",
        "difficulty": "Médio",
        "points": 30,
        "options": [
          {
            "text": "Focar em apresentar suas qualificações detalhadamente e demonstrar todo o seu conhecimento técnico.",
            "isCorrect": false
          },
          {
            "text": "Manter uma postura neutra para evitar parecer ansioso e esperar que o supervisor inicie a conversa.",
            "isCorrect": false
          },
          {
            "text": "Olhar nos olhos, sorrir, inclinar-se levemente para frente, estender a mão e cumprimentar a pessoa pelo nome.",
            "isCorrect": true
          }
        ],
        "rationale": "A fórmula de Butman para uma boa primeira impressão inclui olhar no olho, sorrir, inclinar-se levemente para frente, estender a mão e falar 'Oi' e o nome da pessoa."
      },
      {
        "questionText": "Uma vendedora de software, Ana, está conversando com um cliente potencial que expressou frustração com a lentidão de seus processos atuais. Para avançar na negociação usando a etapa de 'Implicação' do modelo SPIN Selling, qual tipo de pergunta Ana deveria fazer?",
        "difficulty": "Médio",
        "points": 30,
        "options": [
          {
            "text": "Quais são os principais desafios que sua equipe enfrenta com o sistema atual?",
            "isCorrect": false
          },
          {
            "text": "Como essa lentidão afeta a produtividade da sua equipe e os prazos de entrega dos projetos?",
            "isCorrect": true
          },
          {
            "text": "Você já considerou outras soluções de software para resolver esse problema?",
            "isCorrect": false
          }
        ],
        "rationale": "A etapa de Implicação no SPIN Selling foca em perguntar sobre as consequências dos problemas, motivando a mudança. A pergunta sobre como a lentidão afeta a produtividade e os prazos explora diretamente as implicações do problema."
      },
      {
        "questionText": "Um gerente precisa motivar sua equipe a adotar uma nova metodologia de trabalho que exigirá um esforço extra inicial. Ele decide aplicar os princípios da retórica de Aristóteles (Ethos, Pathos, Logos). Qual abordagem seria a mais completa e eficaz?",
        "difficulty": "Médio",
        "points": 30,
        "options": [
          {
            "text": "Apresentar apenas dados e gráficos que comprovem a eficiência da nova metodologia, focando na lógica.",
            "isCorrect": false
          },
          {
            "text": "Compartilhar sua própria experiência de sucesso com a metodologia, explicar os benefícios emocionais para a equipe e apresentar um plano lógico de implementação.",
            "isCorrect": true
          },
          {
            "text": "Focar em inspirar a equipe com histórias de superação e conquistas de outras empresas que usaram a metodologia.",
            "isCorrect": false
          }
        ],
        "rationale": "O material afirma que 'O grande segredo do Aristóteles era você usar os três' (Ethos, Pathos, Logos). A opção correta combina a credibilidade do gerente (Ethos), o apelo emocional dos benefícios (Pathos) e a lógica do plano de implementação (Logos)."
      },
      {
        "questionText": "Maria tem um grande medo de falar em público, mas precisa apresentar um projeto importante. Inspirada pela jornada de Lena Souza, que transformou suas fraquezas em força, qual seria a atitude mais alinhada com a filosofia de Lena para Maria enfrentar esse desafio?",
        "difficulty": "Médio",
        "points": 30,
        "options": [
          {
            "text": "Focar exaustivamente em memorizar o roteiro e praticar gestos padronizados para evitar qualquer erro.",
            "isCorrect": false
          },
          {
            "text": "Aceitar que sentirá medo, mas decidir agir com coragem, vendo a apresentação como uma oportunidade de se aceitar e ser autêntica, mesmo com suas limitações.",
            "isCorrect": true
          },
          {
            "text": "Tentar imitar um orador famoso que ela admira, buscando replicar sua confiança e estilo de fala.",
            "isCorrect": false
          }
        ],
        "rationale": "Lena Souza enfatiza a 'coragem em ação', a aceitação das limitações ('aceitar que quando a gente está aqui na frente, uns vão gostar de você e outros não. E está tudo bem. Isso é libertador') e a autenticidade ('Padrão é você'), transformando o medo em oportunidade."
      },
      {
        "questionText": "Camila, uma jovem empreendedora com uma ideia inovadora para um aplicativo de impacto social, precisa apresentar seu projeto a um grupo de investidores céticos. Ela sabe que a primeira impressão é crucial e que precisa construir rapport rapidamente, mas também teme que sua inexperiência a faça parecer menos credível. Em sua pesquisa, ela se deparou com os ensinamentos de Nicholas Butman sobre comunicação em 90 segundos e a experiência de Lena Souza sobre transformar o medo em força. Considerando a necessidade de persuasão rápida e a superação da insegurança, qual seria a abordagem mais estratégica para Camila?",
        "difficulty": "Difícil",
        "points": 80,
        "options": [
          {
            "text": "Camila deve focar em um discurso técnico e detalhado, usando gráficos complexos para provar o valor do aplicativo. Ela deve manter uma postura formal e reservada, minimizando o contato visual e as interações pessoais para evitar demonstrar nervosismo, priorizando a lógica do negócio acima de tudo para transmitir seriedade e profissionalismo aos investidores.",
            "isCorrect": false
          },
          {
            "text": "Camila deve priorizar a conexão genuína, iniciando com contato visual direto, um sorriso autêntico e cumprimentando os investidores pelo nome, inclinando-se levemente. Durante a apresentação, ela deve manter uma linguagem corporal aberta, espelhar sutilmente os gestos e usar um tom de voz envolvente, aceitando sua autenticidade e paixão como força, focando nos impactos emocionais e lógicos do projeto.",
            "isCorrect": true
          },
          {
            "text": "Camila deve preparar um roteiro de vendas rigoroso, memorizando cada frase para evitar erros, e usar perguntas fechadas para controlar a conversa. Ela precisa adotar uma postura de autoridade, com gestos amplos e vestimenta imponente, para compensar a inexperiência e garantir que os investidores percebam seu total domínio sobre o assunto, forçando a aceitação da proposta.",
            "isCorrect": false
          }
        ],
        "rationale": "A abordagem correta integra a 'Fórmula para uma Boa Primeira Impressão' de Butman (contato visual, sorriso, inclinação, nome) e técnicas de rapport como linguagem corporal aberta e espelhamento, com a filosofia de Lena Souza sobre aceitar a autenticidade e usar a paixão como força para superar o medo, focando nos aspectos emocionais e lógicos da mensagem."
      }
    ]
  }
];
