import { Island } from './types';

export const MAIN_BACKGROUND_URL = 'https://i.imgur.com/0XH0wzI_d.png?maxwidth=520&shape=thumb&fidelity=high';
export const WELCOME_BACKGROUND_URL = 'https://i.imgur.com/rGAEiCz_d.jpeg?maxwidth=520&shape=thumb&fidelity=high';
export const CHALLENGE_PATH_BACKGROUND_URL = 'https://i.imgur.com/goUCezZ.jpeg';
export const STORYTELLING_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdwY8SXcMGaSTvQ50zh2_gudQEnDmCWGBwKnL3-ZhHTrzNFDQ/viewform';
export const MENTOR_EMAIL = 'seu-email-aqui@exemplo.com'; // IMPORTANTE: Substituir pelo e-mail real do mentor

export const ISLANDS: Island[] = [
  {
    "id": 1,
    "pinyinName": "TIAN’YAN",
    "name": "Ilha das Mil Vozes Sagradas",
    "softSkill": "Comunicação & Oratória",
    "story": "Um coro de vozes ancestrais ecoa por cânions enevoados. Para dominar esta ilha, você deve aprender a comandar sua própria voz com clareza e poder, fazendo-a ressoar com a sabedoria dos antigos.",
    "guardian": "Xiao, o Guardião Ecoante",
    "imageUrl": "https://i.imgur.com/u1BIVkf_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
    "challenges": [
      {
        "id": 1,
        "title": "Desafio 1: O Pergaminho do Sábio",
        "description": "Estude os materiais fornecidos (artigo, áudio e podcast) e depois responda ao quiz para testar seu conhecimento sobre a arte da comunicação.",
        "points": 150,
        "resources": [
          {
            "type": "article",
            "label": "Artigo Técnico (Leitura)",
            "url": "https://drive.google.com/file/d/1qFtfUwxCz2m6rrOSnDiBHh99YahquB6t/view?usp=sharing"
          },
          {
            "type": "audio",
            "label": "Artigo Técnico (Áudio)",
            "url": "https://drive.google.com/file/d/1xo8zgjM_gSAB8OlTt9GLGrZT92lf0vi6/view?usp=sharing"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "https://drive.google.com/file/d/1bTNHkEHaXmXEo_DNYuXhctUcNY31wR4_/view?usp=sharing"
          }
        ],
        "quizId": "island-1-challenge-1"
      },
      {
        "id": 2,
        "title": "Desafio 2: O Tomo do Orador",
        "description": "Estude os materiais sobre oratória (resumo do livro, áudio e análise) e prove seu conhecimento no quiz.",
        "points": 200,
        "resources": [
          {
            "type": "book",
            "label": "Resumo de Livro (Leitura)",
            "url": "https://drive.google.com/file/d/1Zb3H9wRGALly5DfuSUT-v4Cahwry165G/view?usp=sharing"
          },
          {
            "type": "audio",
            "label": "Resumo de Livro (Áudio)",
            "url": "https://drive.google.com/file/d/1Fwq4tweCmPdRfkEtA5Pjz-aqwMrWonlU/view?usp=sharing"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "https://drive.google.com/file/d/1Ag6h9Zowz7_0B23abHOuey14kG7rMEsa/view?usp=sharing"
          }
        ],
        "quizId": "island-1-challenge-2"
      },
      {
        "id": 3,
        "title": "Desafio 3: A Tríade das Vozes",
        "description": "Absorva a sabedoria de um TEDx, um podcast e um estudo de caso corporativo, depois faça um quiz completo.",
        "points": 250,
        "resources": [
          {
            "type": "video",
            "label": "Palestra TEDx",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast",
            "url": "#"
          },
          {
            "type": "case_study",
            "label": "Estudo de Caso",
            "url": "#"
          }
        ]
      },
      {
        "id": 4,
        "title": "Desafio 4: O Grande Desafio do Guardião",
        "description": "Enfrente Xiao analisando um caso corporativo real sobre uma falha de comunicação. Apresente suas descobertas e plano de ação.",
        "points": 400,
        "resources": [
          {
            "type": "case_study",
            "label": "Estudo de Caso do Grande Desafio",
            "url": "#"
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "pinyinName": "XIN’LING",
    "name": "Ilha do Coração de Cristal",
    "softSkill": "Inteligência Emocional",
    "story": "Esta ilha pulsa com uma luz suave, refletindo as emoções de todos os seres vivos. Para passar, você deve navegar pelas correntes dos sentimentos — tanto os seus quanto os dos outros — com empatia e compreensão.",
    "guardian": "Lian, a Guardiã Empática",
    "imageUrl": "https://i.imgur.com/YvH7GiE_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
    "challenges": [
      {
        "id": 1,
        "title": "Desafio 1: O Lago do Espelho",
        "description": "Estude os materiais sobre os fundamentos da inteligência emocional e teste seus conhecimentos no quiz.",
        "points": 150,
        "resources": [
          {
            "type": "article",
            "label": "Artigo (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Artigo (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 2,
        "title": "Desafio 2: O Livro dos Sentimentos",
        "description": "Aprenda a gerenciar emoções com os materiais de estudo e responda ao quiz.",
        "points": 200,
        "resources": [
          {
            "type": "book",
            "label": "Resumo de Livro (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Resumo de Livro (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 3,
        "title": "Desafio 3: A Matriz da Empatia",
        "description": "Engaje-se com um vídeo, podcast e estudo de caso sobre empatia no trabalho.",
        "points": 250,
        "resources": [
          {
            "type": "video",
            "label": "Vídeo",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast",
            "url": "#"
          },
          {
            "type": "case_study",
            "label": "Estudo de Caso",
            "url": "#"
          }
        ]
      },
      {
        "id": 4,
        "title": "Desafio 4: O Grande Desafio da Guardiã",
        "description": "Analise um caso de conflito no trabalho e proponha uma solução que demonstre alta inteligência emocional.",
        "points": 400,
        "resources": [
          {
            "type": "case_study",
            "label": "Estudo de Caso de Conflito",
            "url": "#"
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "pinyinName": "JIAN’DING",
    "name": "Ilha da Fortaleza Inabalável",
    "softSkill": "Resiliência",
    "story": "Penhascos íngremes e ventos uivantes testam a determinação de todos que ousam pisar aqui. A verdadeira força não está em nunca cair, mas em sempre se levantar.",
    "guardian": "Tie, o Guardião de Ferro",
    "imageUrl": "https://i.imgur.com/UV5bwb1_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
    "challenges": [
      {
        "id": 1,
        "title": "Desafio 1: O Pilar de Pedra",
        "description": "Estude os materiais sobre a psicologia da resiliência e faça o quiz.",
        "points": 150,
        "resources": [
          {
            "type": "article",
            "label": "Artigo (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Artigo (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 2,
        "title": "Desafio 2: O Manual do Sobrevivente",
        "description": "Aprenda como superar adversidades com os materiais de estudo e responda ao quiz.",
        "points": 200,
        "resources": [
          {
            "type": "book",
            "label": "Resumo de Livro (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Resumo de Livro (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 3,
        "title": "Desafio 3: Crônicas da Superação",
        "description": "Aprenda com exemplos reais de resiliência em face ao fracasso.",
        "points": 250,
        "resources": [
          {
            "type": "video",
            "label": "TEDx",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast",
            "url": "#"
          },
          {
            "type": "case_study",
            "label": "Estudo de Caso",
            "url": "#"
          }
        ]
      },
      {
        "id": 4,
        "title": "Desafio 4: O Grande Desafio do Guardião",
        "description": "Desenvolva um plano de recuperação para um cenário de crise, demonstrando resiliência.",
        "points": 400,
        "resources": [
          {
            "type": "case_study",
            "label": "Estudo de Caso de Crise",
            "url": "#"
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "pinyinName": "BIAN’HUA",
    "name": "Ilha das Infinitas Metamorfoses",
    "softSkill": "Adaptabilidade & Flexibilidade",
    "story": "Aqui, a paisagem muda como as nuvens no céu. Para atravessá-la, seu espírito deve ser como a água, capaz de se moldar a qualquer caminho e contornar qualquer obstáculo.",
    "guardian": "Liu, a Guardiã das Correntes",
    "imageUrl": "https://i.imgur.com/WthP07d_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
    "challenges": [
      {
        "id": 1,
        "title": "Desafio 1: O Rio Inconstante",
        "description": "Aprenda sobre a importância da adaptabilidade com os materiais de estudo e faça o quiz.",
        "points": 150,
        "resources": [
          {
            "type": "article",
            "label": "Artigo (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Artigo (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 2,
        "title": "Desafio 2: O Códice da Mudança",
        "description": "Estude como abraçar e liderar a mudança com os materiais fornecidos e responda ao quiz.",
        "points": 200,
        "resources": [
          {
            "type": "book",
            "label": "Resumo de Livro (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Resumo de Livro (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 3,
        "title": "Desafio 3: Ventos da Transformação",
        "description": "Analise como a flexibilidade foi chave em diferentes cenários corporativos.",
        "points": 250,
        "resources": [
          {
            "type": "video",
            "label": "TEDx",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast",
            "url": "#"
          },
          {
            "type": "case_study",
            "label": "Estudo de Caso",
            "url": "#"
          }
        ]
      },
      {
        "id": 4,
        "title": "Desafio 4: O Grande Desafio da Guardiã",
        "description": "Diante de uma mudança de mercado inesperada, crie um plano de pivô estratégico para uma empresa.",
        "points": 400,
        "resources": [
          {
            "type": "case_study",
            "label": "Estudo de Caso de Mercado",
            "url": "#"
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "pinyinName": "CHUANG’XIN",
    "name": "Ilha dos Sonhos Cristalizados",
    "softSkill": "Criatividade & Inovação",
    "story": "Nesta ilha, a imaginação ganha forma, e ideias brilhantes flutuam no ar como lanternas. Para conquistá-la, você must libertar sua mente e ousar construir o que nunca existiu.",
    "guardian": "Meng, o Guardião dos Sonhos",
    "imageUrl": "https://i.imgur.com/bcFpUs2_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
    "challenges": [
      {
        "id": 1,
        "title": "Desafio 1: A Fonte da Inspiração",
        "description": "Aprenda técnicas para destravar o pensamento criativo com os materiais de estudo e faça o quiz.",
        "points": 150,
        "resources": [
          {
            "type": "article",
            "label": "Artigo (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Artigo (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 2,
        "title": "Desafio 2: O Arquiteto de Ideias",
        "description": "Estude processos de inovação com os materiais fornecidos e responda ao quiz.",
        "points": 200,
        "resources": [
          {
            "type": "book",
            "label": "Resumo de Livro (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Resumo de Livro (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 3,
        "title": "Desafio 3: O Prisma da Invenção",
        "description": "Veja como a criatividade resolveu problemas complexos no mundo real.",
        "points": 250,
        "resources": [
          {
            "type": "video",
            "label": "TEDx",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast",
            "url": "#"
          },
          {
            "type": "case_study",
            "label": "Estudo de Caso",
            "url": "#"
          }
        ]
      },
      {
        "id": 4,
        "title": "Desafio 4: O Grande Desafio do Guardião",
        "description": "Crie uma solução inovadora para um problema social ou de negócios apresentado no estudo de caso.",
        "points": 400,
        "resources": [
          {
            "type": "case_study",
            "label": "Estudo de Caso de Inovação",
            "url": "#"
          }
        ]
      }
    ]
  },
  {
    "id": 6,
    "pinyinName": "SHI’GUANG",
    "name": "Ilha das Ampulhetas Eternas",
    "softSkill": "Gestão do Tempo & Agilidade",
    "story": "Gigantescas ampulhetas marcam o fluxo do tempo, que aqui parece correr de forma diferente. Aprenda a dominar seus dias e a se mover com propósito e velocidade para vencer os desafios.",
    "guardian": "Kai, o Guardião do Tempo",
    "imageUrl": "https://i.imgur.com/Sbv1qPU_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
    "challenges": [
      {
        "id": 1,
        "title": "Desafio 1: O Relógio de Sol",
        "description": "Estude os princípios da gestão eficaz do tempo com os materiais fornecidos e faça o quiz.",
        "points": 150,
        "resources": [
          {
            "type": "article",
            "label": "Artigo (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Artigo (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 2,
        "title": "Desafio 2: O Diário da Produtividade",
        "description": "Aprenda sobre métodos ágeis e produtividade pessoal com os materiais de estudo e responda ao quiz.",
        "points": 200,
        "resources": [
          {
            "type": "book",
            "label": "Resumo de Livro (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Resumo de Livro (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 3,
        "title": "Desafio 3: A Corrida Contra o Tempo",
        "description": "Aprenda com especialistas como otimizar o fluxo de trabalho e priorizar tarefas.",
        "points": 250,
        "resources": [
          {
            "type": "video",
            "label": "TEDx",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast",
            "url": "#"
          },
          {
            "type": "case_study",
            "label": "Estudo de Caso",
            "url": "#"
          }
        ]
      },
      {
        "id": 4,
        "title": "Desafio 4: O Grande Desafio do Guardião",
        "description": "Desenvolva um plano de projeto ágil para entregar um resultado complexo sob um prazo apertado.",
        "points": 400,
        "resources": [
          {
            "type": "case_study",
            "label": "Estudo de Caso de Projeto",
            "url": "#"
          }
        ]
      }
    ]
  },
  {
    "id": 7,
    "pinyinName": "ZHI’HUI",
    "name": "Ilha dos Espelhos da Razão",
    "softSkill": "Pensamento Crítico & Analítico",
    "story": "Superfícies espelhadas cobrem esta ilha, mas não refletem imagens, e sim a verdade por trás das aparências. Para avançar, você deve aprender a questionar tudo e a enxergar a lógica oculta.",
    "guardian": "Jing, a Guardiã da Clareza",
    "imageUrl": "https://i.imgur.com/10R8R0f_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
    "challenges": [
      {
        "id": 1,
        "title": "Desafio 1: O Reflexo da Verdade",
        "description": "Estude sobre as bases do pensamento crítico com os materiais fornecidos e faça o quiz.",
        "points": 150,
        "resources": [
          {
            "type": "article",
            "label": "Artigo (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Artigo (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 2,
        "title": "Desafio 2: O Livro das Falácias",
        "description": "Aprenda a identificar argumentos falaciosos com os materiais de estudo e responda ao quiz.",
        "points": 200,
        "resources": [
          {
            "type": "book",
            "label": "Resumo de Livro (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Resumo de Livro (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 3,
        "title": "Desafio 3: A Análise Profunda",
        "description": "Examine casos onde a análise crítica levou a descobertas surpreendentes.",
        "points": 250,
        "resources": [
          {
            "type": "video",
            "label": "TEDx",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast",
            "url": "#"
          },
          {
            "type": "case_study",
            "label": "Estudo de Caso",
            "url": "#"
          }
        ]
      },
      {
        "id": 4,
        "title": "Desafio 4: O Grande Desafio da Guardiã",
        "description": "Faça uma análise crítica de um plano de negócios, identificando premissas fracas e riscos ocultos.",
        "points": 400,
        "resources": [
          {
            "type": "case_study",
            "label": "Estudo de Caso de Análise",
            "url": "#"
          }
        ]
      }
    ]
  },
  {
    "id": 8,
    "pinyinName": "JIE’JUE",
    "name": "Ilha do Labirinto das Soluções",
    "softSkill": "Resolução de Problemas",
    "story": "Um vasto e intrincado labirinto de jade compõe esta ilha. Cada beco sem saída é um problema, cada caminho correto, uma solução. Encontre a saída usando sua engenhosidade.",
    "guardian": "Shi, o Guardião dos Caminhos",
    "imageUrl": "https://i.imgur.com/IYtcZpG_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
    "challenges": [
      {
        "id": 1,
        "title": "Desafio 1: O Mapa Incompleto",
        "description": "Aprenda frameworks para resolução de problemas com os materiais de estudo e faça o quiz.",
        "points": 150,
        "resources": [
          {
            "type": "article",
            "label": "Artigo (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Artigo (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 2,
        "title": "Desafio 2: A Bússola da Causa Raiz",
        "description": "Estude como encontrar a causa raiz dos problemas com os materiais fornecidos e responda ao quiz.",
        "points": 200,
        "resources": [
          {
            "type": "book",
            "label": "Resumo de Livro (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Resumo de Livro (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 3,
        "title": "Desafio 3: Desvendando Enigmas",
        "description": "Aprenda com exemplos de soluções elegantes para problemas aparentemente impossíveis.",
        "points": 250,
        "resources": [
          {
            "type": "video",
            "label": "TEDx",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast",
            "url": "#"
          },
          {
            "type": "case_study",
            "label": "Estudo de Caso",
            "url": "#"
          }
        ]
      },
      {
        "id": 4,
        "title": "Desafio 4: O Grande Desafio do Guardião",
        "description": "Diagnostique um problema operacional complexo em uma empresa e proponha um plano de solução detalhado.",
        "points": 400,
        "resources": [
          {
            "type": "case_study",
            "label": "Estudo de Caso Operacional",
            "url": "#"
          }
        ]
      }
    ]
  },
  {
    "id": 9,
    "pinyinName": "LING’DAO",
    "name": "Ilha da Harmonia Vital",
    "softSkill": "Liderança & Trabalho em Equipe",
    "story": "Nesta ilha, a flora e a fauna prosperam em perfeita sincronia. O sucesso aqui não vem da força individual, mas da capacidade de inspirar e unir os outros em torno de um objetivo comum.",
    "guardian": "Jun, o Guardião da União",
    "imageUrl": "https://i.imgur.com/c5wWI3a_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
    "challenges": [
      {
        "id": 1,
        "title": "Desafio 1: A Centelha do Líder",
        "description": "Aprenda sobre estilos de liderança com os materiais de estudo e faça o quiz.",
        "points": 150,
        "resources": [
          {
            "type": "article",
            "label": "Artigo (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Artigo (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 2,
        "title": "Desafio 2: O Elo da Confiança",
        "description": "Estude como construir equipes de alta performance com os materiais fornecidos e responda ao quiz.",
        "points": 200,
        "resources": [
          {
            "type": "book",
            "label": "Resumo de Livro (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Resumo de Livro (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 3,
        "title": "Desafio 3: A Sinfonia da Colaboração",
        "description": "Inspire-se em histórias de liderança e trabalho em equipe que mudaram o jogo.",
        "points": 250,
        "resources": [
          {
            "type": "video",
            "label": "TEDx",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast",
            "url": "#"
          },
          {
            "type": "case_study",
            "label": "Estudo de Caso",
            "url": "#"
          }
        ]
      },
      {
        "id": 4,
        "title": "Desafio 4: O Grande Desafio do Guardião",
        "description": "Desenvolva um plano para resolver um conflito de equipe e realinhar os membros em torno de uma visão compartilhada.",
        "points": 400,
        "resources": [
          {
            "type": "case_study",
            "label": "Estudo de Caso de Equipe",
            "url": "#"
          }
        ]
      }
    ]
  },
  {
    "id": 10,
    "pinyinName": "TAN’PAN",
    "name": "Ilha da Balança dos Acordos",
    "softSkill": "Negociação",
    "story": "Plataformas flutuantes e balanças colossais dominam a paisagem, movendo-se para manter o equilíbrio. A jornada aqui ensina a arte de ceder e conquistar para alcançar um acordo justo.",
    "guardian": "Heng, o Guardião do Equilíbrio",
    "imageUrl": "https://i.imgur.com/eua7EM0_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
    "challenges": [
      {
        "id": 1,
        "title": "Desafio 1: A Arte da Persuasão",
        "description": "Estude os princípios da negociação ganha-ganha com os materiais de estudo e faça o quiz.",
        "points": 150,
        "resources": [
          {
            "type": "article",
            "label": "Artigo (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Artigo (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 2,
        "title": "Desafio 2: O Tratado da Influência",
        "description": "Aprenda táticas de negociação e influência com os materiais fornecidos e responda ao quiz.",
        "points": 200,
        "resources": [
          {
            "type": "book",
            "label": "Resumo de Livro (Leitura)",
            "url": "#"
          },
          {
            "type": "audio",
            "label": "Resumo de Livro (Áudio)",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast de Análise",
            "url": "#"
          }
        ]
      },
      {
        "id": 3,
        "title": "Desafio 3: Acordos Históricos",
        "description": "Analise negociações complexas do mundo corporativo e diplomático.",
        "points": 250,
        "resources": [
          {
            "type": "video",
            "label": "TEDx",
            "url": "#"
          },
          {
            "type": "podcast",
            "label": "Podcast",
            "url": "#"
          },
          {
            "type": "case_study",
            "label": "Estudo de Caso",
            "url": "#"
          }
        ]
      },
      {
        "id": 4,
        "title": "Desafio 4: O Grande Desafio do Guardião",
        "description": "Prepare e descreva uma estratégia de negociação para uma situação de alto risco com múltiplos stakeholders.",
        "points": 400,
        "resources": [
          {
            "type": "case_study",
            "label": "Estudo de Caso de Negociação",
            "url": "#"
          }
        ]
      }
    ]
  }
];

export const TOTAL_POINTS_TO_CONQUER = 1000;
export const MANDALA_PETAL_THRESHOLDS = [1600, 3200, 4800, 6400, 8000];

export const EXTRAORDINARY_CHALLENGE_POINTS = 50;
export const EXTRAORDINARY_CHALLENGE_SUMMARY_MIN_WORDS = 80;
export const EXTRAORDINARY_CHALLENGE_CHANCE = 0.5; // 50% de chance