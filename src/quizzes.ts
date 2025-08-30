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
  }
];