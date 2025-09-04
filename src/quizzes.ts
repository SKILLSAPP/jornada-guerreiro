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
  }
];