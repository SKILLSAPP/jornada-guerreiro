import { Quiz } from './types';

export const ALL_QUIZZES: Quiz[] = [
  {
    "id": "island-1-challenge-1",
    "name": "COMUNICAÇÃO E ORATÓRIA - Artigo Técnico",
    "islandId": 1,
    "challengeId": 1,
    "questions": [
      {
        "questionText": "Qual é a principal característica da escuta ativa, conforme descrito no material?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "Focar em preparar uma resposta convincente enquanto o outro fala.",
            "isCorrect": false
          },
          {
            "text": "Processar integralmente a mensagem, incluindo linguagem corporal e tom de voz.",
            "isCorrect": true
          },
          {
            "text": "Interromper o orador para oferecer soluções imediatas ao problema.",
            "isCorrect": false
          }
        ],
        "rationale": "A escuta ativa vai além de apenas ouvir palavras, tratando-se de processar integralmente a mensagem do interlocutor, incluindo sua linguagem corporal, tom de voz e expressões faciais, para compreender o significado e as emoções subjacentes."
      },
      {
        "questionText": "Para garantir clareza e concisão na comunicação, o que é crucial fazer antes de qualquer interação, segundo o guia?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "Utilizar jargões técnicos para demonstrar conhecimento aprofundado.",
            "isCorrect": false
          },
          {
            "text": "Definir os objetivos e o público-alvo da mensagem a ser transmitida.",
            "isCorrect": true
          },
          {
            "text": "Incluir o máximo de detalhes possível para evitar qualquer tipo de dúvida.",
            "isCorrect": false
          }
        ],
        "rationale": "O material indica que definir os objetivos e o público antes de qualquer comunicação ajuda a garantir que todas as informações necessárias sejam incluídas e que detalhes irrelevantes sejam eliminados."
      },
      {
        "questionText": "Segundo os pilares da retórica clássica (Ethos, Páthos, Logos), qual elemento se refere à credibilidade do orador?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "Páthos, que busca a conexão emocional com a audiência.",
            "isCorrect": false
          },
          {
            "text": "Logos, que se baseia na lógica e razão por trás dos argumentos.",
            "isCorrect": false
          },
          {
            "text": "Ethos, que constrói a percepção de autoridade e confiabilidade do orador.",
            "isCorrect": true
          }
        ],
        "rationale": "O material define Ethos como a construção da percepção de autoridade, veracidade e confiabilidade do orador, sendo um dos pilares da persuasão."
      },
      {
        "questionText": "De acordo com o estudo de Harvard mencionado no material, qual percentual da comunicação é atribuído à expressão corporal?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "7%, correspondente ao conteúdo verbal da mensagem.",
            "isCorrect": false
          },
          {
            "text": "38%, relacionado ao tom de voz utilizado pelo comunicador.",
            "isCorrect": false
          },
          {
            "text": "55%, referente à expressão corporal e gestos do indivíduo.",
            "isCorrect": true
          }
        ],
        "rationale": "O estudo de Harvard citado no material mostra que 55% da comunicação é expressão corporal, 38% é tom de voz e apenas 7% é o conteúdo verbal, demonstrando a força da comunicação não verbal."
      },
      {
        "questionText": "Qual dos seguintes elementos é considerado central para o desenvolvimento do carisma, conforme o material de estudo?",
        "difficulty": "Fácil",
        "points": 5,
        "options": [
          {
            "text": "A capacidade de fingir interesse em todas as interações sociais para agradar.",
            "isCorrect": false
          },
          {
            "text": "A demonstração de arrogância para impor respeito e autoridade.",
            "isCorrect": false
          },
          {
            "text": "A presença, fazendo com que os outros se sintam a pessoa mais importante na sala.",
            "isCorrect": true
          }
        ],
        "rationale": "O material lista Presença como um dos elementos centrais do carisma, significando estar totalmente presente nas conversas e fazer com que os outros se sintam a pessoa mais importante na sala."
      },
      {
        "questionText": "Um colega de trabalho está visivelmente frustrado com um projeto e desabafa sobre as dificuldades. Você quer demonstrar empatia genuína e construir uma conexão mais profunda.",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Oferecer imediatamente uma solução técnica para o problema do projeto, mostrando sua competência e agilidade.",
            "isCorrect": false
          },
          {
            "text": "Dizer 'Imagino que isso deva ser frustrante' e validar o sentimento dele, antes de qualquer outra coisa.",
            "isCorrect": true
          },
          {
            "text": "Mudar de assunto rapidamente para algo mais positivo, a fim de animá-lo e desviar o foco do problema.",
            "isCorrect": false
          }
        ],
        "rationale": "Os passos-chave para a empatia eficaz incluem expressar a percepção do sentimento do outro ('Imagino que isso deva ser...') e validar esse sentimento, respeitando o esforço da pessoa para lidar com a situação, sem oferecer soluções imediatas."
      },
      {
        "questionText": "Você está prestes a iniciar uma apresentação importante para um público que não conhece bem e sente um leve nervosismo. Seu objetivo é transmitir confiança desde o início.",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Começar a apresentação pedindo desculpas pelo nervosismo, para ser transparente e humano com a audiência.",
            "isCorrect": false
          },
          {
            "text": "Respirar fundo, usar uma âncora mental para se centrar e simplesmente iniciar a apresentação sem mencionar o nervosismo.",
            "isCorrect": true
          },
          {
            "text": "Fazer uma piada sobre seu próprio nervosismo para quebrar o gelo e mostrar que você é descontraído.",
            "isCorrect": false
          }
        ],
        "rationale": "O material aconselha a não pedir desculpas pelo nervosismo, pois a audiência muitas vezes não percebe e isso pode te deixar ainda mais ansioso. A técnica da âncora é recomendada para mudar o estado mental e iniciar com confiança."
      },
      {
        "questionText": "Você precisa iniciar uma apresentação de vendas para um novo cliente e quer capturar a atenção deles imediatamente, gerando identificação com a necessidade que sua solução atende.",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Começar com uma citação famosa, mesmo que seja um pouco clichê, para inspirar a audiência com uma ideia universal.",
            "isCorrect": false
          },
          {
            "text": "Iniciar com uma pergunta retórica que faça o público refletir sobre um problema comum que sua solução resolve.",
            "isCorrect": true
          },
          {
            "text": "Compartilhar uma vulnerabilidade pessoal excessiva para mostrar autenticidade e criar empatia imediata.",
            "isCorrect": false
          }
        ],
        "rationale": "Fazer uma pergunta retórica é uma das 7 maneiras estratégicas de iniciar uma apresentação, pois faz o público se identificar e refletir sobre um problema ou situação, despertando o interesse e conectando-o diretamente ao tema."
      },
      {
        "questionText": "Você está em uma reunião de networking e deseja estabelecer uma conexão rápida e genuína com uma pessoa que acabou de conhecer, indo além das formalidades.",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Espelhar os gestos e a velocidade da fala da pessoa de forma exagerada para que ela perceba a semelhança e se sinta à vontade.",
            "isCorrect": false
          },
          {
            "text": "Encontrar algo na pessoa que te faça gostar dela genuinamente, como uma semelhança com alguém que você já admira.",
            "isCorrect": true
          },
          {
            "text": "Contar uma história pessoal impressionante para mostrar suas qualidades e cativar a atenção da outra pessoa.",
            "isCorrect": false
          }
        ],
        "rationale": "O 'Rapport Invertido' é uma técnica avançada que consiste em encontrar na outra pessoa algo que te faça gostar dela genuinamente, talvez uma semelhança com alguém que você já admira, criando um interesse real e positivo que facilita a conexão."
      },
      {
        "questionText": "Uma gerente de projetos, Ana, precisa apresentar um novo plano estratégico para a diretoria, que está cética quanto à viabilidade de grandes mudanças. Ela tem 20 minutos e precisa não só informar, mas também persuadir a diretoria a apoiar a iniciativa, que envolve uma reestruturação significativa e investimentos consideráveis. Ana sabe que a audiência valoriza dados, mas também precisa de uma visão inspiradora para abraçar a mudança.",
        "difficulty": "Difícil",
        "points": 45,
        "options": [
          {
            "text": "Iniciar com o Ato 1 (Setup) apresentando dados surpreendentes sobre o problema atual (Logos), seguir com o Ato 2 (Confronto) detalhando a reestruturação e os investimentos (Logos), e finalizar no Ato 3 (Resolução) com um apelo emocional à visão futura da empresa (Páthos), enquanto mantém uma postura de especialista (Ethos).",
            "isCorrect": false
          },
          {
            "text": "Começar com o Ato 1 (Setup) usando uma história pessoal de superação para criar conexão (Páthos), desenvolver o Ato 2 (Confronto) explicando as etapas do plano de forma lógica (Logos), e concluir no Ato 3 (Resolução) reforçando sua credibilidade como líder de projeto (Ethos), sem focar excessivamente em dados iniciais para não sobrecarregar.",
            "isCorrect": false
          },
          {
            "text": "Abrir com o Ato 1 (Setup) estabelecendo sua credibilidade e experiência (Ethos), prosseguir no Ato 2 (Confronto) apresentando os dados e análises que justificam a mudança (Logos), e encerrar no Ato 3 (Resolução) com um apelo à ação que ressoe com os valores e aspirações da diretoria (Páthos), garantindo que a lógica dos dados seja o pilar central.",
            "isCorrect": true
          }
        ],
        "rationale": "Para persuadir uma diretoria cética, a abordagem mais eficaz é iniciar estabelecendo credibilidade (Ethos), fundamental para ganhar a confiança. Em seguida, apresentar os dados e análises lógicas (Logos) que justificam a mudança. Por fim, finalizar com um apelo emocional (Páthos) que ressoe com os valores e aspirações da diretoria, motivando o apoio à iniciativa. Esta sequência otimiza a persuasão para o cenário apresentado."
      }
    ]
  },
  {
    "id": "island-1-challenge-2",
    "name": "COMUNICAÇÃO E ORATÓRIA - Livro",
    "islandId": 1,
    "challengeId": 2,
    "questions": [
      {
        "questionText": "De acordo com Carmine Gallo em \"TED: Falar, Convencer, Emocionar\", qual é o alicerce fundamental para qualquer apresentação inspiradora?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "A capacidade de memorizar o roteiro integralmente.",
            "isCorrect": false
          },
          {
            "text": "A paixão genuína pelo tema abordado.",
            "isCorrect": true
          },
          {
            "text": "O uso exclusivo de dados e estatísticas concretas.",
            "isCorrect": false
          }
        ],
        "rationale": "O Capítulo 1 estabelece que a paixão é o alicerce de qualquer apresentação inspiradora e o mais fundamental segredo dos grandes oradores, pois inspira o próprio apresentador e contagia a plateia."
      },
      {
        "questionText": "Qual é a principal função do Storytelling em uma apresentação, conforme descrito no livro?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "Aumentar a quantidade de dados técnicos apresentados.",
            "isCorrect": false
          },
          {
            "text": "Criar uma conexão emocional e persuadir a plateia.",
            "isCorrect": true
          },
          {
            "text": "Reduzir o tempo total da apresentação para ser mais conciso.",
            "isCorrect": false
          }
        ],
        "rationale": "O Capítulo 2 destaca o Storytelling como a ferramenta mais poderosa para tocar o coração e a mente da plateia, criando uma conexão emocional essencial para a persuasão."
      },
      {
        "questionText": "Qual é a principal razão pela qual a \"Regra dos 18 Minutos\" é considerada ideal para uma apresentação eficaz?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "É o tempo mínimo necessário para cobrir qualquer assunto complexo.",
            "isCorrect": false
          },
          {
            "text": "Evita a sobrecarga cognitiva da plateia e mantém a atenção.",
            "isCorrect": true
          },
          {
            "text": "Permite ao orador apresentar o máximo de informações detalhadas.",
            "isCorrect": false
          }
        ],
        "rationale": "O Capítulo 7 explica que apresentações longas criam um \"backlog cognitivo\", sobrecarregando a mente dos ouvintes, e que 18 minutos são suficientes para ser sério e breve para manter a atenção."
      },
      {
        "questionText": "Segundo o livro, o que o cérebro humano é programado para notar e que, portanto, cativa irresistivelmente a atenção em uma apresentação?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "Informações que confirmam crenças pré-existentes.",
            "isCorrect": false
          },
          {
            "text": "Conteúdo que é previsível e familiar.",
            "isCorrect": false
          },
          {
            "text": "O que é novo, diferente e surpreendente.",
            "isCorrect": true
          }
        ],
        "rationale": "O Capítulo 4 afirma que o cérebro humano é programado para notar o que é novo e diferente, liberando dopamina e tornando a apresentação irresistivelmente cativante."
      },
      {
        "questionText": "O que o \"Efeito de Superioridade da Imagem\" (ESI) demonstra sobre a retenção de informações em apresentações?",
        "difficulty": "Fácil",
        "points": 8,
        "options": [
          {
            "text": "A retenção é maior quando apenas palavras são usadas.",
            "isCorrect": false
          },
          {
            "text": "A retenção de informações é significativamente maior quando imagens são adicionadas às palavras.",
            "isCorrect": true
          },
          {
            "text": "Imagens e palavras competem pela atenção, diminuindo a retenção geral.",
            "isCorrect": false
          }
        ],
        "rationale": "O Capítulo 8 explica que o ESI demonstra que, ao ouvir informações, a retenção é de 10% após três dias, mas sobe para 65% se uma imagem for adicionada."
      },
      {
        "questionText": "Mariana precisa apresentar um relatório técnico complexo para a diretoria, um tema que ela considera árido. Seguindo os princípios de Carmine Gallo, como ela deveria abordar a preparação para tornar sua apresentação mais inspiradora e envolvente?",
        "difficulty": "Médio",
        "points": 25,
        "options": [
          {
            "text": "Focar exclusivamente na precisão dos dados e na metodologia, para demonstrar rigor técnico.",
            "isCorrect": false
          },
          {
            "text": "Identificar o \"porquê\" por trás do projeto, conectando-o a uma paixão pessoal ou a um benefício maior que a entusiasme.",
            "isCorrect": true
          },
          {
            "text": "Memorizar o relatório na íntegra para evitar qualquer hesitação e transmitir total domínio do assunto.",
            "isCorrect": false
          }
        ],
        "rationale": "O Capítulo 1 enfatiza que a paixão é o alicerce e que o orador deve se perguntar \"O que faz o seu coração bater mais forte?\" sobre o tema, construindo a apresentação em torno desse \"porquê\" para gerar energia contagiante."
      },
      {
        "questionText": "João está nervoso com sua próxima apresentação importante e tende a falar de forma muito formal e robótica. Para se assemelhar mais a uma \"conversa\" e transmitir autenticidade, qual estratégia ele deveria priorizar, de acordo com o livro?",
        "difficulty": "Médio",
        "points": 25,
        "options": [
          {
            "text": "Improvisar no momento, acreditando que a espontaneidade natural é a chave para a autenticidade.",
            "isCorrect": false
          },
          {
            "text": "Focar em gestos amplos e dramáticos para compensar a falta de naturalidade na fala.",
            "isCorrect": false
          },
          {
            "text": "Praticar o conteúdo exaustivamente até interiorizá-lo, permitindo uma entrega descontraída e natural.",
            "isCorrect": true
          }
        ],
        "rationale": "O Capítulo 3 destaca que a autenticidade não ocorre naturalmente no palco, mas é fruto de prática exaustiva, ensaiando incansavelmente para interiorizar o conteúdo e fazer a apresentação da maneira mais descontraída possível."
      },
      {
        "questionText": "Durante uma apresentação sobre o impacto da reciclagem, um palestrante quer criar um \"momento caramba\" para chocar e engajar a plateia. Qual das seguintes abordagens seria mais alinhada com as táticas de Carmine Gallo para criar um momento surpreendente?",
        "difficulty": "Médio",
        "points": 25,
        "options": [
          {
            "text": "Apresentar uma série de gráficos complexos sobre a taxa de reciclagem em diferentes países.",
            "isCorrect": false
          },
          {
            "text": "Usar um adereço, como uma montanha de lixo real no palco, ou uma estatística inesperada sobre o tempo de decomposição do plástico.",
            "isCorrect": true
          },
          {
            "text": "Ler longos trechos de artigos científicos que detalham os benefícios ambientais da reciclagem.",
            "isCorrect": false
          }
        ],
        "rationale": "O Capítulo 5 lista cinco táticas para criar \"momentos caramba\", incluindo \"adereços e demonstrações\" e \"estatísticas inesperadas e chocantes\", que criam um \"evento emocionalmente carregado\" para o cérebro."
      },
      {
        "questionText": "Um gerente precisa apresentar uma nova política de compliance, um tema geralmente percebido como árido e burocrático. Para tornar a apresentação mais leve e receptiva, sem perder a seriedade do assunto, qual estratégia ele poderia adotar com base nos princípios de Gallo?",
        "difficulty": "Médio",
        "points": 25,
        "options": [
          {
            "text": "Contar uma série de piadas prontas no início para quebrar o gelo e garantir risadas.",
            "isCorrect": false
          },
          {
            "text": "Utilizar analogias engraçadas para explicar conceitos complexos ou compartilhar uma anedota pessoal sobre um erro que cometeu.",
            "isCorrect": true
          },
          {
            "text": "Evitar qualquer tipo de humor, pois a seriedade do tema exige uma abordagem estritamente formal.",
            "isCorrect": false
          }
        ],
        "rationale": "O Capítulo 6 sugere que o humor não é sobre contar piadas, mas sobre não se levar a sério demais. Ele lista alternativas como anedotas, observações, histórias pessoais e analogias/metáforas para criar um humor mais natural e autêntico, que derruba defesas."
      },
      {
        "questionText": "Uma startup de tecnologia está se preparando para um pitch crucial para investidores, buscando financiamento para uma inovadora plataforma de inteligência artificial. O CEO, um engenheiro brilhante, tende a focar excessivamente nos detalhes técnicos e dados complexos. Considerando os princípios de \"TED: Falar, Convencer, Emocionar\", qual das seguintes abordagens seria a mais eficaz para o CEO garantir que seu pitch seja não apenas informativo, mas também inspirador e memorável para os investidores, que geralmente têm pouco tempo e buscam uma conexão mais profunda?",
        "difficulty": "Difícil",
        "points": 60,
        "options": [
          {
            "text": "O CEO deve priorizar uma explanação exaustiva dos dados técnicos, das métricas de desempenho e da arquitetura complexa da plataforma, utilizando gráficos detalhados e um vocabulário especializado para demonstrar o rigor científico e a superioridade tecnológica do produto.",
            "isCorrect": false
          },
          {
            "text": "O CEO deve estruturar o pitch para 18 minutos, contando uma história pessoal sobre a origem da ideia, incorporando visuais impactantes e uma demonstração interativa para criar um \"momento caramba\", e mantendo uma linguagem corporal autêntica para gerar conexão emocional.",
            "isCorrect": true
          },
          {
            "text": "O CEO deve iniciar com um panorama completo das estatísticas de mercado e projeções financeiras, seguido por um detalhamento das qualificações da equipe e de todas as funcionalidades da plataforma, assegurando que todas as dúvidas técnicas e de negócio sejam respondidas com dados.",
            "isCorrect": false
          }
        ],
        "rationale": "A abordagem correta integra múltiplos princípios: a Regra dos 18 Minutos (Cap. 7) para concisão, Storytelling pessoal (Cap. 2 e 9) para conexão emocional e autenticidade, uso de visuais e linguagem corporal (Cap. 8 e 3) para multissensorialidade e presença, e a criação de um \"momento caramba\" (Cap. 5) com a demonstração interativa para surpreender e memorizar. As outras opções focam em aspectos isolados (dados/técnica ou estatísticas/funcionalidades) sem a integração de elementos emocionais e de engajamento que Gallo defende como cruciais para inspirar e persuadir."
      }
    ]
  },
  {
    "id": "island-1-challenge-3",
    "name": "Desafio 3 - TEDx + PODCAST: Comunicação e Oratória",
    "islandId": 1,
    "challengeId": 3,
    "questions": [
      {
        "questionText": "Segundo Lena Souza, o que ela transformou em força em sua jornada pessoal, conforme narrado em sua palestra?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "Apenas suas habilidades técnicas de oratória, desenvolvidas em cursos especializados.",
            "isCorrect": false
          },
          {
            "text": "Suas maiores fraquezas, dores e traumas de infância e problemas de autoestima.",
            "isCorrect": true
          },
          {
            "text": "As expectativas de sua família e amigos sobre sua carreira profissional e acadêmica.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto afirma: 'A palestrante revela que suas 'maiores fraquezas, a minha maior dor, meus maiores traumas de infância, o que eu não gostava em mim, eu transformei força.'"
      },
      {
        "questionText": "Qual foi um dos principais obstáculos de autoestima que Lena Souza enfrentou, que a levou a ter vergonha de sorrir, conforme mencionado em sua palestra?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "A dificuldade em memorizar textos complexos para apresentações em público.",
            "isCorrect": false
          },
          {
            "text": "A vergonha de sorrir devido a falhas nos dentes e a comentários negativos de terceiros.",
            "isCorrect": true
          },
          {
            "text": "A incapacidade de improvisar em situações inesperadas durante suas palestras.",
            "isCorrect": false
          }
        ],
        "rationale": "O material detalha: 'A vergonha de sorrir devido a falhas nos dentes foi um obstáculo significativo.'"
      },
      {
        "questionText": "Qual organização Lena Souza se juntou, que a levou a descobrir e participar de um concurso de oratória, marcando um ponto de virada em sua vida?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "Uma associação de dança contemporânea, onde encontrou sua expressividade corporal.",
            "isCorrect": false
          },
          {
            "text": "A JCI (Jovens Líderes Empreendedores), buscando mudanças positivas e novas oportunidades.",
            "isCorrect": true
          },
          {
            "text": "Um grupo de teatro amador local, onde desenvolveu suas habilidades de atuação e improviso.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto menciona: 'Juntou-se à JCI (Jovens Líderes Empreendedores)... Foi através da JCI que descobriu o concurso de oratória.'"
      },
      {
        "questionText": "De acordo com Nicholas Butman, em sua obra 'Como Convencer Alguém em 90 Segundos', qual dos três passos fundamentais da comunicação a maioria das pessoas foca, negligenciando os outros?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "Encontrar a Pessoa, focando intensamente na apresentação inicial e no primeiro contato.",
            "isCorrect": false
          },
          {
            "text": "Gerar Afinidade (Rapport), priorizando a criação de uma conexão e um senso de conforto.",
            "isCorrect": false
          },
          {
            "text": "Comunicar, deixando de lado a etapa de encontrar a pessoa e a de gerar afinidade.",
            "isCorrect": true
          }
        ],
        "rationale": "O briefing afirma: \"'A maioria das pessoas foca só no se comunicar, esquece os dois primeiros passos.'\""
      },
      {
        "questionText": "Segundo a regra 7-38-55 mencionada no briefing sobre a comunicação, qual porcentagem da mensagem é composta por elementos não verbais, como linguagem corporal e tom de voz?",
        "difficulty": "Fácil",
        "points": 10,
        "options": [
          {
            "text": "Apenas 7% da comunicação total, sendo a parte verbal a mais relevante.",
            "isCorrect": false
          },
          {
            "text": "38% da comunicação total, referente exclusivamente ao tom de voz.",
            "isCorrect": false
          },
          {
            "text": "93% da comunicação total, englobando postura, tom de voz e gestos.",
            "isCorrect": true
          }
        ],
        "rationale": "O material especifica: 'Apenas '7% da sua comunicação é verbal, 93% é tua postura, tom de voz, a maneira como você esticula.''"
      },
      {
        "questionText": "Uma jovem palestrante, Maria, está frustrada com a rigidez dos cursos de oratória tradicionais, que a fazem sentir-se artificial e insegura, inibindo sua identidade. Baseando-se na visão de Lena Souza sobre a oratória, qual seria a melhor abordagem para Maria superar essa dificuldade?",
        "difficulty": "Médio",
        "points": 30,
        "options": [
          {
            "text": "Ignorar completamente as técnicas de oratória e focar apenas na espontaneidade, sem qualquer preparo, para ser mais autêntica.",
            "isCorrect": false
          },
          {
            "text": "Buscar uma abordagem que integre ferramentas da psicologia e neurociência, focando na aceitação e autenticidade pessoal, em vez de regras estritas e padrões rígidos.",
            "isCorrect": true
          },
          {
            "text": "Persistir nos métodos tradicionais, pois a rigidez e a padronização são fundamentais para o domínio da oratória e para evitar erros em público.",
            "isCorrect": false
          }
        ],
        "rationale": "Lena Souza 'ficou 'incomodada' com a rigidez dos cursos de oratória... Buscou ferramentas da psicologia, neurociência... A principal lição que ela aprendeu e ensina é a aceitação. 'Não tem padrão. Padrão é você.''"
      },
      {
        "questionText": "João tem uma entrevista de emprego crucial para a vaga dos seus sonhos. Ele sabe que a primeira impressão é vital para o sucesso. Qual das seguintes atitudes, baseada na 'Fórmula para uma Boa Primeira Impressão' de Nicholas Butman, ele deveria priorizar nos primeiros segundos da interação?",
        "difficulty": "Médio",
        "points": 30,
        "options": [
          {
            "text": "Começar a falar imediatamente sobre suas qualificações e experiências mais relevantes para impressionar o entrevistador com seu currículo.",
            "isCorrect": false
          },
          {
            "text": "Manter uma postura neutra e aguardar que o entrevistador inicie a conversa e o contato visual, para não parecer excessivamente ansioso.",
            "isCorrect": false
          },
          {
            "text": "Olhar nos olhos do entrevistador, sorrir, inclinar-se levemente para frente, estender a mão e cumprimentar pelo nome, demonstrando interesse.",
            "isCorrect": true
          }
        ],
        "rationale": "A 'Fórmula' de Butman inclui: 'Olhar no olho. Sorrir. Inclinar-se levemente para frente... Estender a mão. Falar 'Oi' e o nome da pessoa.'"
      },
      {
        "questionText": "Uma empresa está lançando um novo produto inovador, mas um de seus vendedores, Carlos, demonstra pouco entusiasmo e suas vendas estão abaixo da média, apesar de o produto ser tecnicamente bom. Ele argumenta que o produto é bom, mas não consegue convencer os clientes. De acordo com o briefing, qual é a provável causa do baixo desempenho de Carlos?",
        "difficulty": "Médio",
        "points": 30,
        "options": [
          {
            "text": "A falta de um script de vendas detalhado e rígido que o guie em cada interação com o cliente, tornando-o menos preparado para objeções.",
            "isCorrect": false
          },
          {
            "text": "A sua falta de crença genuína no produto, que se manifesta em microexpressões e sinais não verbais, comunicando desconfiança aos clientes.",
            "isCorrect": true
          },
          {
            "text": "A pressão excessiva da gerência por resultados, que o impede de se conectar de forma autêntica com os clientes e suas necessidades.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto afirma: 'Um Bom Vendedor Vende Qualquer Coisa? Sim, 'contanto que ele acredite que funcione.' A falta de crença no produto se manifesta em 'microexpressões e dar pequenos sinais dentro da tua comunicação não verbal que mostra que você não confia tanto nisso.'"
      },
      {
        "questionText": "Em uma reunião com um cliente potencial, Ana percebe que ele está hesitante em compartilhar detalhes sobre os desafios de sua empresa. Para construir rapport e encorajá-lo a se abrir, qual estratégia Ana deveria adotar, baseada nas técnicas de rapport e escuta ativa?",
        "difficulty": "Médio",
        "points": 30,
        "options": [
          {
            "text": "Dominar a conversa, apresentando todas as soluções possíveis para os problemas que ela imagina que o cliente possa ter, mostrando seu conhecimento.",
            "isCorrect": false
          },
          {
            "text": "Utilizar a escuta ativa, parando tudo para focar 100% no que ele diz, parafraseando suas falas para demonstrar compreensão e fazendo perguntas abertas.",
            "isCorrect": true
          },
          {
            "text": "Interromper o cliente para corrigir qualquer informação que pareça imprecisa, mostrando seu conhecimento técnico e sua atenção aos detalhes.",
            "isCorrect": false
          }
        ],
        "rationale": "O briefing destaca a 'Escuta Ativa: Parar tudo, focar 100% no que o outro diz e parafrasear para demonstrar interesse e compreensão' e 'Perguntas Abertas: Criam conexões mais profundas'."
      },
      {
        "questionText": "Sofia, uma nova líder de projeto, teve um início desastroso em sua equipe. No primeiro dia, devido a um mal-entendido e sua postura inicialmente reservada, foi percebida como arrogante e desinteressada. Agora, a equipe demonstra resistência às suas ideias e a comunicação está comprometida. Sofia precisa reverter essa primeira impressão negativa e construir confiança. Considerando as informações do briefing sobre a primeira impressão e as técnicas de persuasão, qual a estratégia mais completa e eficaz que Sofia deveria implementar para superar esse desafio complexo?",
        "difficulty": "Difícil",
        "points": 80,
        "options": [
          {
            "text": "Sofia deve focar em apresentar resultados excepcionais de forma isolada, demonstrando sua competência técnica e esperando que os números falem por si, sem se preocupar excessivamente com a interação pessoal. Essa abordagem, embora demorada, eventualmente provará seu valor e mudará a percepção da equipe sobre sua capacidade.",
            "isCorrect": false
          },
          {
            "text": "Sofia deve realizar uma reunião formal para pedir desculpas pelo mal-entendido inicial e, em seguida, adotar uma postura de liderança mais assertiva, impondo suas decisões para mostrar que está no comando e que a equipe deve seguir suas diretrizes, visando reverter a percepção de desinteresse e falta de controle.",
            "isCorrect": false
          },
          {
            "text": "Sofia precisa iniciar um processo contínuo de 'oito encontros positivos', aplicando a 'fórmula da boa primeira impressão' em cada interação: contato visual genuíno, sorriso, postura aberta e uso do nome de cada membro. Além disso, deve praticar a escuta ativa e o espelhamento sutil para gerar rapport, buscando intencionalmente demonstrar empatia e uma 'atitude útil' em todas as oportunidades.",
            "isCorrect": true
          }
        ],
        "rationale": "O briefing afirma que 'são necessários oito encontros positivos para reverter uma primeira impressão negativa' e detalha a 'Fórmula para uma Boa Primeira Impressão' (olhar no olho, sorrir, inclinar-se, estender a mão, falar o nome). Adicionalmente, enfatiza a importância da linguagem corporal aberta, 'atitude útil', escuta ativa e espelhamento para construir rapport, todos elementos cruciais para uma estratégia completa de reversão de imagem e construção de confiança. As outras opções são incompletas ou contraproducentes."
      }
    ]
  },
  {
    "id": "island-1-challenge-4-redemption",
    "name": "COMUNICAÇÃO & ORATÓRIA - QUIZ DE RECUPERAÇÃO",
    "islandId": 1,
    "challengeId": 4,
    "questions": [
      {
        "questionText": "De acordo com Nicholas Butman, qual é a etapa da comunicação onde a maioria das pessoas foca, mas que é ineficaz sem os dois primeiros passos?",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Encontrar a Pessoa.",
            "isCorrect": false
          },
          {
            "text": "Gerar Afinidade (Rapport).",
            "isCorrect": false
          },
          {
            "text": "Comunicar.",
            "isCorrect": true
          }
        ],
        "rationale": "O texto afirma que 'A maioria das pessoas foca só no se comunicar, esquece os dois primeiros passos', tornando essa etapa ineficaz sem as anteriores."
      },
      {
        "questionText": "Qual é a porcentagem da comunicação que, segundo a '7-38-55 Rule', é composta pela linguagem corporal?",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "7%.",
            "isCorrect": false
          },
          {
            "text": "38%.",
            "isCorrect": false
          },
          {
            "text": "55%.",
            "isCorrect": true
          }
        ],
        "rationale": "O texto especifica que '55% expressão corporal e 38% tom de voz', e '7% da sua comunicação é verbal', de acordo com a regra."
      },
      {
        "questionText": "Segundo o texto, qual é a principal característica do 'Sistema 1' do nosso cérebro ao formar primeiras impressões?",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "É um sistema lento e analítico, focado na lógica.",
            "isCorrect": false
          },
          {
            "text": "É um sistema rápido e intuitivo, que forma preconceitos em segundos.",
            "isCorrect": true
          },
          {
            "text": "É um sistema que avalia conscientemente as ameaças e oportunidades.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto descreve o 'Sistema 1 (Rápido e Intuitivo)' como aquele que 'toma decisões em segundos, formando preconceitos baseados em experiências passadas'."
      },
      {
        "questionText": "Qual das seguintes atitudes é considerada 'útil' para a comunicação, de acordo com o briefing?",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Sarcasmo.",
            "isCorrect": false
          },
          {
            "text": "Curiosidade.",
            "isCorrect": true
          },
          {
            "text": "Impaciência.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto menciona que uma 'atitude útil' inclui 'curiosidade, entusiasmo, encorajadora, afetuosa', em contraste com 'inútil' como 'impaciência, sarcasmo, ceticismo, raiva'."
      },
      {
        "questionText": "Para reverter uma primeira impressão negativa, o texto sugere que são necessários quantos encontros positivos?",
        "difficulty": "Médio",
        "points": 20,
        "options": [
          {
            "text": "Cinco encontros positivos.",
            "isCorrect": false
          },
          {
            "text": "Oito encontros positivos.",
            "isCorrect": true
          },
          {
            "text": "Três encontros positivos.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto afirma explicitamente: 'São necessários oito encontros positivos para reverter uma primeira impressão negativa'."
      },
      {
        "questionText": "No contexto da comunicação não verbal, qual é a microexpressão ou ação específica que o texto sugere para tornar o contato visual mais 'qualificado' e aumentar o rapport?",
        "difficulty": "Difícil",
        "points": 45,
        "options": [
          {
            "text": "Manter o olhar fixo por um período prolongado para demonstrar seriedade.",
            "isCorrect": false
          },
          {
            "text": "Reparar na cor dos olhos da pessoa para forçar um contato visual mais intenso.",
            "isCorrect": true
          },
          {
            "text": "Desviar o olhar ocasionalmente para não parecer invasivo ou intimidador.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto especifica que 'Reparar na cor dos olhos da pessoa força um contato visual mais intenso e qualificado, aumentando o rapport'."
      },
      {
        "questionText": "De acordo com o modelo SPIN Selling, qual tipo de pergunta tem o objetivo de motivar a mudança ao explorar as consequências dos problemas?",
        "difficulty": "Difícil",
        "points": 45,
        "options": [
          {
            "text": "Perguntas de Situação, que abordam o contexto atual.",
            "isCorrect": false
          },
          {
            "text": "Perguntas de Implicação, que focam nas consequências dos desafios.",
            "isCorrect": true
          },
          {
            "text": "Perguntas de Necessidade de Solução, que levam à imaginação do futuro desejado.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto descreve as 'Perguntas de Implicação' como aquelas sobre 'as consequências dos problemas (motivam a mudança)'."
      },
      {
        "questionText": "Qual dos seguintes elementos é crucial para o 'Ethos' na retórica de Aristóteles, conforme descrito no briefing?",
        "difficulty": "Difícil",
        "points": 45,
        "options": [
          {
            "text": "A capacidade de emocionar a pessoa.",
            "isCorrect": false
          },
          {
            "text": "A coerência lógica da linha de raciocínio.",
            "isCorrect": false
          },
          {
            "text": "A transmissão de confiança, credibilidade e autoridade.",
            "isCorrect": true
          }
        ],
        "rationale": "O texto define 'Ethos' como 'Transmitir confiança, credibilidade e autoridade (ex: vestimenta, experiência)'."
      },
      {
        "questionText": "O briefing menciona que um script de vendas deve ser uma 'estrutura base' que o vendedor ensaia tanto até se tornar 'inútil'. Qual é o objetivo final dessa prática?",
        "difficulty": "Difícil",
        "points": 45,
        "options": [
          {
            "text": "Garantir que o vendedor siga o script rigidamente em todas as interações.",
            "isCorrect": false
          },
          {
            "text": "Permitir uma adaptação fluida e não robótica da comunicação.",
            "isCorrect": true
          },
          {
            "text": "Reduzir a necessidade de personalização, padronizando a abordagem.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto explica que o script deve ser ensaiado até se tornar 'inútil' para 'permitir uma adaptação fluida e não robótica' da comunicação."
      },
      {
        "questionText": "Qual é a principal desvantagem de vendas baseadas apenas em pressão excessiva, como exemplificado pelo mercado de time share, de acordo com o texto?",
        "difficulty": "Difícil",
        "points": 45,
        "options": [
          {
            "text": "A dificuldade em mensurar a eficácia da abordagem a longo prazo.",
            "isCorrect": false
          },
          {
            "text": "A quebra de expectativa imediata após a compra e baixa satisfação do cliente.",
            "isCorrect": true
          },
          {
            "text": "A impossibilidade de aplicar técnicas de espelhamento e escuta ativa.",
            "isCorrect": false
          }
        ],
        "rationale": "O texto afirma que vendas baseadas em pressão podem levar a uma 'quebra de expectativa imediata após a compra' e 'baixa satisfação do cliente, prejudicando o valor de longo prazo (LTV)'."
      }
    ]
  }
];