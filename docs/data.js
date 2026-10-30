/* =========================================================================
 * data.js — Banco de dados pedagógico do Gerador de Planos de Aula
 * Habilidades BNCC Computação: texto oficial (Complemento à BNCC, 2022).
 * Fontes consultadas: bncc.dev e semed-manaus/bncc_computacao (código oficial).
 * ========================================================================= */

/* ---------- Habilidades BNCC Computação (texto literal oficial) ---------- */
const BNCC = {
  fund1: [
    { codigo: "EF01CO02", desc: "Identificar e seguir sequências de passos aplicados no dia a dia para resolver problemas." },
    { codigo: "EF03CO02", desc: "Criar e simular algoritmos representados em linguagem oral, escrita ou pictográfica, que incluam sequências e repetições simples com condição (iterações indefinidas), para resolver problemas de forma independente e em colaboração." },
    { codigo: "EF03CO03", desc: "Aplicar a estratégia de decomposição para resolver problemas complexos, dividindo esse problema em partes menores, resolvendo-as e combinando suas soluções." }
  ],
  fund2: [
    { codigo: "EF06CO02", desc: "Elaborar algoritmos que envolvam instruções sequenciais e de repetição e de seleção usando uma linguagem de programação." },
    { codigo: "EF07CO02", desc: "Analisar programas para detectar e remover erros, ampliando a confiança na sua correção." },
    { codigo: "EF07CO05", desc: "Criar algoritmos fazendo uso da decomposição e do reúso no processo de solução de forma colaborativa e cooperativa e automatizá-los usando uma linguagem de programação." }
  ],
  medio: [
    { codigo: "EM13CO01", desc: "Explorar e construir a solução de problemas por meio da reutilização de partes de soluções existentes." },
    { codigo: "EM13CO03", desc: "Identificar o comportamento dos algoritmos no que diz respeito ao consumo de recursos como tempo de execução, espaço de memória e energia, entre outros." },
    { codigo: "EM13CO10", desc: "Conhecer os fundamentos da Inteligência Artificial, comparando-a com a inteligência humana, analisando suas potencialidades, riscos e limites." }
  ],
  oficina: [
    { codigo: "EF02CO02", desc: "Criar e simular algoritmos representados em linguagem oral, escrita ou pictográfica, construídos como sequências com repetições simples (iterações definidas) com base em instruções preestabelecidas ou criadas, analisando como a precisão da instrução impacta na execução do algoritmo." },
    { codigo: "EF05CO04", desc: "Criar e simular algoritmos representados em linguagem oral, escrita ou pictográfica, que incluam sequências, repetições e seleções condicionais para resolver problemas de forma independente e em colaboração." },
    { codigo: "EM13CO10", desc: "Conhecer os fundamentos da Inteligência Artificial, comparando-a com a inteligência humana, analisando suas potencialidades, riscos e limites." }
  ]
};

/* ---------- Etapas de ensino ---------- */
const ETAPAS = {
  fund1:   { label: "Fundamental — Anos Iniciais", faixa: "1º ao 5º ano",           bncc: "fund1",   linguagem: "Blocos (Scratch Jr, Code.org)" },
  fund2:   { label: "Fundamental — Anos Finais",   faixa: "6º ao 9º ano",           bncc: "fund2",   linguagem: "Blocos (Scratch) ou Python" },
  medio:   { label: "Ensino Médio",                faixa: "1ª a 3ª série",          bncc: "medio",   linguagem: "Python" },
  oficina: { label: "Oficina livre / contraturno", faixa: "Público misto (7–17 anos)", bncc: "oficina", linguagem: "Blocos + atividades desplugadas" }
};

/* ---------- Níveis da turma ---------- */
const NIVEIS = {
  iniciante:     { label: "Iniciante",     cor: "#10b981" },
  intermediario: { label: "Intermediário", cor: "#f59e0b" },
  avancado:      { label: "Avançado",      cor: "#ef4444" }
};

/* ---------- Necessidades de inclusão ---------- */
const INCLUSAO = {
  nenhuma: { label: "Sem necessidades específicas" },
  tea:     { label: "TEA (Transtorno do Espectro Autista)" },
  tdah:    { label: "TDAH (Déficit de Atenção/Hiperatividade)" },
  ambos:   { label: "TEA + TDAH" }
};

/* ---------- Focos da aula ---------- */
const FOCOS = {
  logica:        { label: "Lógica e pensamento computacional" },
  sequencias:    { label: "Sequências e repetições (laços)" },
  condicionais:  { label: "Condicionais (SE / ENTÃO / SENÃO)" },
  decomposicao:  { label: "Decomposição de problemas" },
  debug:         { label: "Depuração de erros (debugging)" },
  ia:            { label: "IA generativa como apoio à programação" }
};

/* ---------- Objetivos de aprendizagem por foco (3 níveis) ---------- */
const OBJETIVOS = {
  logica: {
    iniciante:     ["Reconhecer a lógica como uma forma de organizar o raciocínio em passos", "Identificar sequências de passos do dia a dia como algoritmos", "Representar um algoritmo simples em linguagem oral ou pictográfica"],
    intermediario: ["Elaborar algoritmos com sequências e estruturas de decisão simples", "Traduzir um problema cotidiano em passos lógicos ordenados", "Comparar duas soluções para o mesmo problema e justificar a escolha"],
    avancado:      ["Projetar algoritmos combinando sequências, condicionais e repetições", "Analisar a eficiência de diferentes soluções para um mesmo problema", "Argumentar sobre a relação entre lógica e funcionamento de sistemas de IA"]
  },
  sequencias: {
    iniciante:     ["Identificar padrões de repetição em músicas, danças e jogos", "Seguir e criar sequências de comandos com apoio visual", "Reconhecer a repetição como recurso para evitar comandos desnecessários"],
    intermediario: ["Criar laços de repetição em ambiente de programação em blocos", "Prever o resultado da execução de um laço com número definido de voltas", "Usar repetição para automatizar tarefas em um programa"],
    avancado:      ["Implementar laços definidos e indefinidos em linguagem textual", "Analisar quando um laço pode ser substituído por outra estrutura mais eficiente", "Depurar laços que não terminam (loop infinito)"]
  },
  condicionais: {
    iniciante:     ["Vivenciar situações em que uma decisão muda o próximo passo", "Compreender o comando SE/ENTÃO em jogos e brincadeiras", "Criar regras simples do tipo \"se... então...\" para um robô ou personagem"],
    intermediario: ["Implementar condicionais em programação em blocos", "Construir programas com desvios baseados em condições do usuário", "Testar diferentes entradas para verificar o comportamento das condições"],
    avancado:      ["Combinar condicionais aninhadas e operadores lógicos (E, OU, NÃO)", "Analisar fluxos de decisão complexos em programas reais", "Discutir como condicionais estruturam decisões em sistemas de IA"]
  },
  decomposicao: {
    iniciante:     ["Perceber que tarefas grandes podem ser divididas em partes menores", "Dividir uma brincadeira em etapas menores e executá-las em ordem", "Usar listas/imagens para organizar as partes de uma tarefa"],
    intermediario: ["Aplicar a decomposição para planejar a solução de um problema", "Organizar partes de um programa em blocos ou funções simples", "Trabalhar em equipe dividindo responsabilidades por partes do problema"],
    avancado:      ["Decompor problemas complexos e estruturar a solução em módulos/funções", "Reutilizar soluções de partes já resolvidas (funções e bibliotecas)", "Coordenar a integração das partes desenvolvidas pela equipe"]
  },
  debug: {
    iniciante:     ["Perceber que um passo errado pode atrapalhar o resultado final", "Encontrar e corrigir erros em sequências de comandos", "Comparar o resultado esperado com o resultado obtido"],
    intermediario: ["Identificar erros de lógica em programas em blocos", "Usar testes simples (entrada → saída) para encontrar falhas", "Corrigir erros com apoio de colegas e de ferramentas de IA"],
    avancado:      ["Depurar programas textuais usando rastreamento e mensagens de erro", "Aplicar estratégias sistemáticas de teste para localizar bugs", "Explicar como depuradores e ferramentas de IA assistem a correção de erros"]
  },
  ia: {
    iniciante:     ["Reconhecer que assistentes de IA respondem a comandos (prompts)", "Usar uma ferramenta de IA para gerar ideias com mediação do professor", "Identificar que a IA pode errar e que a revisão humana é necessária"],
    intermediario: ["Usar uma ferramenta de IA generativa para apoiar a escrita de algoritmos", "Elaborar prompts claros e específicos para obter respostas úteis", "Comparar o código gerado pela IA com a solução construída pela turma"],
    avancado:      ["Usar IA generativa como copiloto no desenvolvimento de programas", "Avaliar criticamente respostas geradas por IA (alucinações, viés, licença)", "Discutir limites éticos do uso de IA na programação e na educação"]
  }
};

/* ---------- Momentos da aula (metodologia ativa) ---------- */
const MOMENTOS_BASE = [
  {
    id: "engajamento",
    nome: "Engajamento — Desafio-isca",
    verbo: "Despertar curiosidade",
    percent: 0.15,
    descricao: "Abertura investigativa que conecta o tema à vida dos estudantes e levanta hipóteses. Professor atua como mediador, nunca entregando a resposta pronta."
  },
  {
    id: "maonamassa",
    nome: "Mão na massa — Atividade principal",
    verbo: "Experimentar e construir",
    percent: 0.45,
    descricao: "Atividade prática central em duplas ou trios, com material concreto ou digital. A IA entra como apoio (copiloto), com supervisão constante do professor."
  },
  {
    id: "sistematizacao",
    nome: "Sistematização — O que aprendemos",
    verbo: "Registrar e conectar",
    percent: 0.20,
    descricao: "Retomada coletiva com registro no caderno/mural: vocabulário novo, dúvidas e conexões com o cotidiano. O professor sistematiza o conhecimento construído."
  },
  {
    id: "avaliacao",
    nome: "Avaliação e feedback",
    verbo: "Autoavaliar e receber retorno",
    percent: 0.20,
    descricao: "Bilhete de saída, roda de conversa e feedback descritivo. A rubrica orienta a devolutiva sem reduzir o processo a nota."
  }
];

/* ---------- Atividades por foco e nível ---------- */
const ATIVIDADES = {
  logica: {
    iniciante: [
      { nome: "Máquina de sanduíche", desc: "A turma vira 'robô': o professor dá comandos ambíguos (ex.: 'pegue o pão') e mostra como a falta de precisão quebra o algoritmo. Depois, cada dupla escreve os passos precisos para montar um sanduíche com cartões de instrução.", ferramenta: "Nenhuma (desplugada)" },
      { nome: "Mapa do tesouro", desc: "Em uma malha no chão, duplas programam o 'robô' com cartões de seta (frente, vira à direita, vira à esquerda) até chegar ao tesouro, trocando os papéis de programador e robô.", ferramenta: "Nenhuma (desplugada)" },
      { nome: "História em sequência", desc: "A turma organiza em ordem uma tirinha/ história embaralhada e explica os critérios da sequência. Em seguida, transcreve a sequência em cartões de comando.", ferramenta: "Nenhuma (desplugada)" }
    ],
    intermediario: [
      { nome: "Roteiro do robô no Scratch", desc: "Duplas programam um personagem para percorrer um labirinto usando blocos de movimento e espera. Testam no palco e ajustam até completar o percurso.", ferramenta: "Scratch", prompt: "Sou professora de programação. Crie um desafio de labirinto simples para meus alunos do ensino fundamental me ajudarem a ensinar sequência de comandos no Scratch. Inclua: objetivo, blocos permitidos e como o aluno saberá que acertou." },
      { nome: "Receita de algoritmo", desc: "Cada dupla escolhe uma receita real (bolo, suco) e reescreve como algoritmo com comandos de entrada, processo e saída. Troca com outra dupla, que executa a receita ao pé da letra e anota ambiguidades.", ferramenta: "ChatGPT", prompt: "Transforme esta receita em um algoritmo com passos numerados, indicando entrada, processo e saída: [receita]." },
      { nome: "Detetive da sequência", desc: "O professor apresenta algoritmos prontos com um passo fora de ordem; as duplas identificam o erro e justificam, antes de corrigir no computador.", ferramenta: "Nenhuma (desplugada)" }
    ],
    avancado: [
      { nome: "Desafio de eficiência", desc: "A turma resolve um mesmo problema (ex.: ordenar cartas) com estratégias diferentes, cronometra e discute qual algoritmo é mais eficiente e por quê, introduzindo a noção de recursos (tempo, memória).", ferramenta: "Nenhuma (desplugada) + planilha" },
      { nome: "Copiloto de código com revisão", desc: "Em trios, os estudantes pedem a um assistente de IA para gerar uma função Python, analisam o código gerado linha a linha, testam com entradas diferentes e refatoram o que não estiver claro.", ferramenta: "ChatGPT / Copilot", prompt: "Gere uma função em Python que [problema]. Explique cada parte em linguagem simples e inclua 3 casos de teste." },
      { nome: "Projeto: solucionador de problemas", desc: "Trios escolhem um problema real da escola (fila do refeitório, organização de materiais) e projetam um algoritmo completo com entrada, processamento e saída, documentando decisões.", ferramenta: "Copilot / Gemini", prompt: "Atue como mentor de programação. Avalie meu algoritmo abaixo e sugira melhorias de lógica e clareza, sem escrever o código pronto: [algoritmo]" }
    ]
  },
  sequencias: {
    iniciante: [
      { nome: "Dança dos laços", desc: "Coreografia com comandos repetidos: a turma executa '2x: pulo, palma' e percebe que a repetição encurta a explicação. Depois, cada grupo cria uma coreografia usando laços.", ferramenta: "Nenhuma (desplugada)" },
      { nome: "Colar de contas", desc: "Monte um colar seguindo um padrão (conta azul, 2 vermelhas, repetir 3x). A turma prevê como fica o padrão e descreve a regra de repetição.", ferramenta: "Nenhuma (desplugada)" },
      { nome: "Cantiga de repetição", desc: "Cantigas com refrão são 'laços': todos identificam qual parte se repete e quantas vezes, criando a partitura do algoritmo.", ferramenta: "Nenhuma (desplugada)" }
    ],
    intermediario: [
      { nome: "Laços no Scratch", desc: "Duplas programam um desenho geométrico (quadrado, estrela) usando o bloco 'repita', comparando com a versão sem repetição para observar a economia de blocos.", ferramenta: "Scratch", prompt: "Crie uma atividade no Scratch para ensinar laços de repetição desenhando formas geométricas. Sugira 2 formas com o número exato de repetições e ângulos." },
      { nome: "Robô da esteira", desc: "Em um tabuleiro, o robô precisa repetir movimentos para empilhar caixas. Cada dupla escreve o algoritmo com 'repita N vezes' e valida no tabuleiro.", ferramenta: "Nenhuma (desplugada)" },
      { nome: "Loop na música", desc: "Usando uma ferramenta de música/loop (ex.: padrões rítmicos), a turma descreve um ritmo como algoritmo de repetição e depois traduz para blocos.", ferramenta: "Sites de loop musical" }
    ],
    avancado: [
      { nome: "Fatorial e somatórios", desc: "A turma implementa somatório e fatorial com laços em Python e compara com a solução recursiva, discutindo quando cada uma faz sentido.", ferramenta: "Python + IA", prompt: "Explique a diferença entre laço 'for' e recursão para calcular fatorial, com um exemplo em Python comentado em português." },
      { nome: "Caçada ao loop infinito", desc: "O professor distribui programas com laços que nunca terminam; a turma usa rastreamento (tabela de variáveis) para encontrar e corrigir.", ferramenta: "Python + depurador", prompt: "Este código entra em loop infinito. Aponte o problema e sugira correção: [código]" },
      { nome: "Automação de tarefas", desc: "Trios automatizam uma tarefa repetitiva (renomear arquivos, gerar relatório) com laços em Python, documentando o antes e o depois.", ferramenta: "Python + Copilot", prompt: "Escreva um script Python que [tarefa repetitiva], usando um laço, com comentários explicando cada bloco." }
    ]
  },
  condicionais: {
    iniciante: [
      { nome: "Jogo do semáforo", desc: "Cartões 'SE... ENTÃO': se chover → levar guarda-chuva; se apagar a luz → acender lanterna. A turma conecta situações do cotidiano a decisões.", ferramenta: "Nenhuma (desplugada)" },
      { nome: "Robô que decide", desc: "O 'robô' (aluno vendado) anda pelo tabuleiro e decide com base em cartas: SE à frente tiver cadeira ENTÃO vire à esquerda SENÃO siga em frente.", ferramenta: "Nenhuma (desplugada)" },
      { nome: "Bichos condicionais", desc: "Cada aluno recebe um animal e uma regra ('SE for gato ENTÃO mia'), e a turma ajuda a combinar regras para um jogo de adivinhação.", ferramenta: "Nenhuma (desplugada)" }
    ],
    intermediario: [
      { nome: "Quiz interativo com condicionais", desc: "Em duplas, criam no Scratch um quiz com 3 perguntas usando blocos 'se/senão' para validar as respostas e dar feedback.", ferramenta: "Scratch", prompt: "Sugira 3 perguntas de cultura geral para um quiz no Scratch com blocos de condicional, com respostas e feedbacks." },
      { nome: "Robô de decisões", desc: "Programam um personagem que reage a teclas (espaço = pula, seta = anda) e discutem quantos 'caminhos' o programa pode tomar.", ferramenta: "Scratch" },
      { nome: "Calculadora de conceitos", desc: "Criam um programa que recebe a nota do aluno e devolve conceito (A/B/C/D) usando condicionais encadeadas.", ferramenta: "Scratch ou Python", prompt: "Escreva a lógica de condicionais (se/senão) para classificar uma nota de 0 a 10 em conceitos A, B, C ou D, em pseudocódigo." }
    ],
    avancado: [
      { nome: "Simulador de decisões", desc: "Trios constroem um programa que simula uma decisão cotidiana (ex.: o que levar para a praia conforme o clima), combinando condicionais aninhadas e operadores E/OU.", ferramenta: "Python", prompt: "Crie um fluxograma (passos de decisão) para um programa que sugere o que levar para a praia com base em: sol? ~30°? vento? Use condicionais aninhadas." },
      { nome: "IA: linha de montagem de regras", desc: "Usando uma IA generativa, a turma gera regras para classificar mensagens (spam ou não) e percebe como condicionais Viram um modelo simples de IA.", ferramenta: "ChatGPT / Gemini", prompt: "Crie regras simples (se... então...) para classificar uma mensagem como spam ou normal, com 5 exemplos de cada." },
      { nome: "Tabuleiro de fluxogramas", desc: "Os grupos desenham fluxogramas completos (losangos de decisão) para um problema real e implementam em Python, validando com casos de teste.", ferramenta: "Python" }
    ]
  },
  decomposicao: {
    iniciante: [
      { nome: "Quebra-cabeça cooperativo", desc: "Uma imagem grande é dividida em partes; cada grupo monta a sua e, ao juntar, percebem que a tarefa grande ficou fácil de resolver em partes.", ferramenta: "Nenhuma (desplugada)" },
      { nome: "Dia do robô", desc: "Dividem a rotina da manhã (acordar → escola) em etapas e cada um fica responsável por planejar uma etapa; juntos montam o 'programa da manhã'.", ferramenta: "Nenhuma (desplugada)" },
      { nome: "Cidade em blocos", desc: "Com blocos de montar, a turma constrói uma cidade: cada grupo monta uma parte (casa, árvore, carro) e a cidade só fica pronta ao combinar as partes.", ferramenta: "Blocos de montar" }
    ],
    intermediario: [
      { nome: "Funções na prática", desc: "No Scratch, criam blocos personalizados (funções) para cada parte de um programa (ex.: mover, girar, falar), reutilizando-os no palco.", ferramenta: "Scratch", prompt: "Como explicar funções (blocos personalizados) no Scratch para alunos de 11 anos com uma analogia de receita? Dê um exemplo com personagem." },
      { nome: "Fábrica de bolo por partes", desc: "Desafio: 'construir' um bolo virtual por partes — cada grupo implementa uma etapa (ingredientes, mistura, forno) e integra tudo.", ferramenta: "Nenhuma (desplugada)" },
      { nome: "Decompor para programar", desc: "Recebem um problema do cotidiano e o decompõem em 4 subproblemas antes de programar, registrando o mapa de decomposição no caderno.", ferramenta: "Scratch ou Python" }
    ],
    avancado: [
      { nome: "Refatoração em módulos", desc: "Recebem um programa 'monolítico' e o refatoram em funções, justificando cada divisão e testando que o comportamento se mantém.", ferramenta: "Python", prompt: "Aponte como dividir este código em funções com responsabilidades claras: [código]" },
      { nome: "Biblioteca da turma", desc: "A turma constrói coletivamente uma 'biblioteca' de funções úteis (validação, formatação), reutilizando-as em projetos (EM13CO01).", ferramenta: "Python + Copilot", prompt: "Escreva 5 funções Python genéricas e reutilizáveis para validação de dados de formulário, comentadas em português." },
      { nome: "Sprint de projeto", desc: "Em equipes, dividem um projeto maior (jogo, aplicativo de CLI) em módulos com responsáveis, integrando ao final com testes.", ferramenta: "Python + Git" }
    ]
  },
  debug: {
    iniciante: [
      { nome: "Caça ao passo perdido", desc: "O professor dança/executa uma sequência de 5 passos com o 3º errado; a turma grita 'BUG!' quando percebe e ajuda a corrigir.", ferramenta: "Nenhuma (desplugada)" },
      { nome: "Foto do erro", desc: "Recebem algoritmos em cartões com um erro visual (seta invertida, passo repetido) e precisam achar e corrigir com caneta vermelha.", ferramenta: "Nenhuma (desplugada)" },
      { nome: "Programando com erros de propósito", desc: "Em duplas, um escreve um algoritmo com um erro escondido e o outro age como 'depurador', encontrando o erro e propondo correção.", ferramenta: "Nenhuma (desplugada)" }
    ],
    intermediario: [
      { nome: "Detetive de bugs no Scratch", desc: "O professor distribui projetos prontos com erros escondidos; duplas testam, encontram e corrigem, documentando o bug num 'boletim de ocorrência'.", ferramenta: "Scratch" },
      { nome: "Robô da saída", desc: "Programas de labirinto com erros lógicos: a turma prevê o resultado, executa, compara e corrige, anotando o porquê de cada erro.", ferramenta: "Scratch ou Python" },
      { nome: "IA como copiloto de debug", desc: "Com um assistente de IA, descrevem o bug em vez de pedir a resposta pronta: o professor ensina a fazer perguntas boas para a IA.", ferramenta: "ChatGPT", prompt: "Meu código deveria [resultado esperado] mas dá [resultado obtido]. Não corrija ainda: primeiro me faça 3 perguntas para eu investigar sozinho." }
    ],
    avancado: [
      { nome: "Rastreamento de variáveis", desc: "Usam tabela de rastreamento (valores de cada variável a cada iteração) para encontrar bugs em programas textuais.", ferramenta: "Python" },
      { nome: "Sala de fuga de bugs", desc: "Os grupos enfrentam uma sequência de programas com bugs de dificuldade crescente (sintaxe, lógica, off-by-one, loop infinito) até 'escapar'.", ferramenta: "Python + depurador" },
      { nome: "Code review com IA", desc: "A IA revisa um código com bugs e aponta problemas; a turma valida cada apontamento, discutindo quais são reais e quais são falsos positivos.", ferramenta: "Copilot / ChatGPT", prompt: "Revise este código e aponte 3 possíveis bugs com a linha de cada um. Não corrija: apenas aponte e explique o risco." }
    ]
  },
  ia: {
    iniciante: [
      { nome: "Oráculo do robô", desc: "A turma faz perguntas a um assistente de IA na lousa interativa (com mediação do professor) para resolver um desafio de lógica e percebe que a IA 'chuta' às vezes.", ferramenta: "ChatGPT / Gemini", prompt: "Responda como se falasse com crianças de 8 anos: o que é um algoritmo? Dê 1 exemplo do dia a dia." },
      { nome: "Caça ao erro da IA", desc: "O professor mostra respostas de IA para um problema de contagem (inclusive uma errada) e desafia: 'a IA errou em qual passo?' — ensinando que IA não é infalível.", ferramenta: "ChatGPT / Gemini", prompt: "Resolva: um ônibus tem 45 lugares. Se 3 ônibus chegam vazios e 2 saem cheios, quantos lugares ficaram livres? Mostre o cálculo passo a passo." },
      { nome: "Desenhista de comandos", desc: "Usando uma IA de imagem com a mediação do professor, a turma aprende que comandos precisos (prompts) geram desenhos melhores — igual a programar um robô.", ferramenta: "Canva IA / Dream Lab", prompt: "Desenhe um robô fofo segurando uma lupa, estilo cartoon, fundo lilás, para um cartaz de sala de aula." }
    ],
    intermediario: [
      { nome: "Prompt cirúrgico", desc: "A turma melhora prompts progressivamente ('escreva um algoritmo...' → '...para receber 3 notas e calcular a média, em Python, com comentários') e compara as respostas da IA.", ferramenta: "ChatGPT / Gemini", prompt: "Escreva um algoritmo em Python que receba 3 notas, calcule a média e diga se o aluno passou (média >= 6). Inclua comentários em português." },
      { nome: "Copiloto no Scratch", desc: "Duplas pedem à IA para sugerir um roteiro de animação no Scratch, avaliam as ideias e implementam as que fazem sentido junto com as suas.", ferramenta: "ChatGPT", prompt: "Sugira um roteiro de 1 minuto para uma animação no Scratch sobre o ciclo da água, com os blocos principais de cada cena." },
      { nome: "Avaliador de código", desc: "A IA gera dois códigos (um bom, um com problema) e a turma precisa dizer qual é melhor e por quê — aprendendo a revisar, não a copiar.", ferramenta: "ChatGPT / Copilot", prompt: "Compare estes dois trechos de código e liste 3 diferenças importantes para um iniciante: [código A] [código B]" }
    ],
    avancado: [
      { nome: "IA como copiloto de projeto", desc: "Em trios, usam IA generativa para planejar, implementar e testar um projeto (funções, testes, documentação), com revisão humana de cada etapa.", ferramenta: "Copilot + Python", prompt: "Planeje um projeto Python [descrição]. Entregue: estrutura de pastas, funções principais com docstrings e 3 casos de teste." },
      { nome: "Alucinação vs. verdade", desc: "A IA gera explicações sobre um tema técnico (com dados); a turma verifica em fonte confiável e marca o que era alucinação — discutindo limites e riscos.", ferramenta: "Gemini + busca", prompt: "Explique o que é o algoritmo de ordenação 'bubble sort' e cite sua complexidade. Diga a fonte da informação." },
      { nome: "Ética em debate", desc: "Debate estruturado sobre IA na programação: quem é responsável pelo código gerado? Licenças, viés e privacidade. A IA é usada para levantar argumentos dos dois lados.", ferramenta: "ChatGPT", prompt: "Levante 3 argumentos a favor e 3 contra o uso de IA generativa para escrever código em avaliações escolares. Linguagem formal." }
    ]
  }
};

/* ---------- Ecossistema IA (ferramentas) ---------- */
const FERRAMENTAS = [
  { nome: "ChatGPT", tipo: "Assistente conversacional", uso: "Explicar conceitos, gerar roteiros, apoiar escrita de algoritmos e simular diálogos com o aluno.", quando: "Quando a turma precisa de explicação personalizada ou de um 'colega de ideação'.", prompt: "Sou professor(a) do ensino [etapa]. Explique [conceito] com uma analogia do cotidiano, em 3 frases curtas, e proponha 1 desafio para a turma." },
  { nome: "Microsoft Copilot", tipo: "Copiloto de código + IA no Windows", uso: "Assistência de código em tempo real, sugestões de função e explicação de trechos no editor.", quando: "Durante a programação (mão na massa), como copiloto supervisionado, nunca substituindo o raciocínio do aluno.", prompt: "Atue como mentor de programação. Meu objetivo é [objetivo]. Sugira os passos de solução (sem código pronto) e me dê uma pista se eu travar." },
  { nome: "Google Gemini", tipo: "IA multimodal", uso: "Pesquisa assistida, análise de imagens/diagramas e geração de alternativas de explicação.", quando: "Na sistematização, para comparar explicações e verificar informações em fontes confiáveis.", prompt: "Compare 3 formas de explicar [conceito] para alunos do [nível]: uma com desenho, uma com música e uma com história. Liste prós e contras." },
  { nome: "Canva IA", tipo: "Design com IA (Magic Write / Dream Lab)", uso: "Criar cartazes, infográficos e personagens para tornar o algoritmo visual e lúdico.", quando: "Produção de materiais da aula (cartazes de comandos, mapas visuais) com a turma.", prompt: "Crie um pôster educativo sobre [tema], com 4 passos numerados, cores vibrantes e um robô simpático como mascote." },
  { nome: "Scratch", tipo: "Programação em blocos (MIT)", uso: "Ambiente principal de programação visual para os Anos Iniciais e Finais; ensina sequência, laços e condicionais.", quando: "Mão na massa, atividade principal de programação em blocos.", prompt: "— (o Scratch é ambiente de programação; a IA apoia o roteiro das atividades)" },
  { nome: "Code.org", tipo: "Cursos plugados de computação", uso: "Trilhas guiadas de pensamento computacional com progressão automática e feedback imediato.", quando: "Como trilha de reforço ou nivelamento entre alunos.", prompt: "— (plataforma de curso; use as lições de Sequência e Loops)" },
  { nome: "DIO — Formação AI for Teachers", tipo: "Formação e comunidade", uso: "Contexto formativo deste projeto: ecossistema IA aplicado à educação, com materiais e comunidade.", quando: "Formação docente continuada e curadoria de práticas com IA.", prompt: "— (ecossistema de formação; a IA apoiou a construção deste próprio material)" }
];

/* ---------- Rubrica avaliativa ---------- */
const RUBRICA = {
  criterios: [
    { nome: "Compreensão de algoritmos", insuficiente: "Não identifica sequências de passos nem relaciona ao conceito de algoritmo.", parcial: "Identifica sequências simples, mas se perde quando há repetição ou decisão.", bom: "Cria algoritmos com sequências e estruturas simples, explicando o próprio raciocínio.", excelente: "Cria e depura algoritmos com precisão, prevendo resultados e justificando escolhas." },
    { nome: "Resolução de problemas (decomposição)", insuficiente: "Não consegue dividir o problema em partes.", parcial: "Divide o problema com apoio do professor ou do grupo.", bom: "Decompõe problemas de forma autônoma e organiza as partes.", excelente: "Decompõe, reutiliza soluções e coordena a integração das partes." },
    { nome: "Colaboração e comunicação", insuficiente: "Trabalha isolado e não comunica ideias.", parcial: "Participa quando solicitado e comunica ideias com apoio.", bom: "Colabora ativamente, argumenta e respeita contribuições.", excelente: "Lidera momentos de cooperação e comunica o processo com clareza." },
    { nome: "Uso ético e crítico da IA", insuficiente: "Usa a IA para copiar sem revisar.", parcial: "Usa a IA com supervisão, mas sem avaliar a resposta.", bom: "Usa a IA como apoio e revisa criticamente as respostas.", excelente: "Avalia limites da IA, identifica erros/alucinações e declara o uso com transparência." }
  ],
  conceitos: [
    { nome: "Insuficiente", cor: "#ef4444" },
    { nome: "Parcial", cor: "#f59e0b" },
    { nome: "Bom", cor: "#10b981" },
    { nome: "Excelente", cor: "#3b82f6" }
  ]
};

/* ---------- Adaptações inclusivas ---------- */
const ADAPTACOES = {
  nenhuma: [],
  tea: [
    "Roteiro visual da aula (o que vamos fazer, por quanto tempo e em que ordem), apresentado ANTES de começar.",
    "Instruções curtas em passos numerados, com apoio pictográfico sempre que possível.",
    "Ambiente com poucos estímulos concorrentes e aviso prévio para transições de atividade.",
    "Oferecer opções de resposta (escolha entre A/B) em vez de perguntas abertas durante a roda de conversa.",
    "IA como apoio previsível: prompts prontos e sempre os mesmos pontos de partida."
  ],
  tdah: [
    "Tarefas em blocos curtos (5–10 min) com meta visível e timer na lousa.",
    "Permitir movimento: atividades em pé, cartões físicos e revezamento de papéis no grupo.",
    "Reforço positivo frequente e feedback imediato a cada etapa concluída.",
    "Checklist individual com ilustrações para marcar o progresso.",
    "Pausas programadas de 1 minuto entre momentos da aula."
  ],
  ambos: [
    "Combinar as adaptações de TEA e TDAH, priorizando previsibilidade e blocos curtos.",
    "Duplas definidas pelo professor com papéis claros (quem programa, quem testa, quem registra).",
    "Comunicação visual intensa: cartões de comando, cores por momento da aula e roteiro impresso.",
    "Direito a tempo extra e a sair da atividade para autorregulação, sem punição.",
    "Avaliação por observação contínua com registro em fotos/notas do professor."
  ]
};

/* ---------- Reflexão docente (ética e uso responsável da IA) ---------- */
const REFLEXAO_DOCENTE = [
  "Declaração de uso: avisar alunos e responsáveis que a IA apoia a aula, deixando claro o que foi gerado por IA e o que foi construído pela turma.",
  "Revisão humana obrigatória: todo conteúdo gerado por IA passa pela curadoria do professor antes de chegar aos alunos.",
  "Privacidade e LGPD: nunca inserir dados pessoais de alunos em ferramentas de IA; usar dados fictícios em exemplos.",
  "IA como apoio, não substituição: a mediação docente e o raciocínio do estudante permanecem no centro do processo.",
  "Alfabetização crítica: ensinar que a IA pode errar (alucinações), refletir vieses e que a verificação em fontes confiáveis é sempre necessária."
];

/* ---------- Trilha interativa: quiz de lógica e programação ---------- */
const QUIZ = [
  { id: 1, dificuldade: 1, pergunta: "Para escovar os dentes, qual destes é o PRIMEIRO passo de um algoritmo correto?", opcoes: ["Escovar os dentes", "Colocar pasta na escova", "Guardar a escova", "Enxaguar a boca"], correta: 1, dica: "Pense: o que precisa acontecer antes de qualquer outra coisa?", explicacao: "Antes de escovar, a escova precisa estar pronta: com pasta. Guardar e enxaguar só acontecem no final." },
  { id: 2, dificuldade: 1, pergunta: "Um robô segue o padrão: 2, 4, 6... Qual é o próximo número da sequência?", opcoes: ["7", "8", "9", "10"], correta: 1, dica: "Qual número é somado a cada passo?", explicacao: "A sequência soma 2 a cada termo: 2, 4, 6, 8. Encontrar padrões é o coração do pensamento computacional." },
  { id: 3, dificuldade: 2, pergunta: "Em um programa: SE estiver chovendo ENTÃO levar guarda-chuva SENÃO levar óculos de sol. Está chovendo. O que o programa faz?", opcoes: ["Leva o guarda-chuva", "Leva os óculos de sol", "Leva os dois", "Não faz nada"], correta: 0, dica: "Leia a condição: 'SE estiver chovendo' é verdadeiro ou falso?", explicacao: "Como está chovendo, a condição é verdadeira e o programa executa o primeiro caminho: levar guarda-chuva." },
  { id: 4, dificuldade: 2, pergunta: "Um personagem executa: 'repita 3 vezes: pular; depois: andar'. Quantos pulos ele dá no total?", opcoes: ["1", "2", "3", "4"], correta: 2, dica: "Quantas vezes o bloco 'pular' é repetido?", explicacao: "O laço repete o pulo 3 vezes; depois, fora do laço, ele anda uma vez. Total de pulos: 3." },
  { id: 5, dificuldade: 2, pergunta: "Seu programa deveria calcular 5 + 3, mas mostra 9. O que provavelmente aconteceu?", opcoes: ["O programa está com um bug (erro de lógica)", "A calculadora quebrou", "5 + 3 é mesmo 9", "O computador travou"], correta: 0, dica: "Um resultado inesperado em um programa recebe um nome especial...", explicacao: "Quando o resultado não bate com o esperado, existe um bug — um erro no código que precisa ser encontrado e corrigido (debugging)." },
  { id: 6, dificuldade: 3, pergunta: "Para 'fazer um sanduíche', a melhor estratégia de programação é:", opcoes: ["Tentar montar tudo de uma vez e ver se deu certo", "Dividir em partes: 1) escolher pão, 2) adicionar recheio, 3) fechar e servir", "Copiar o sanduíche do colega sem ler", "Pedir para a IA montar sem entender o processo"], correta: 1, dica: "Qual estratégia usa a decomposição de problemas?", explicacao: "Decomposição é dividir um problema grande em partes menores e resolvê-las uma a uma — estratégia fundamental da programação." },
  { id: 7, dificuldade: 3, pergunta: "Qual destas opções é um exemplo de uso de IA generativa?", opcoes: ["Uma calculadora fazendo contas", "Um assistente que cria um poema inédito a partir do seu pedido", "Um alarme tocando às 7h", "Uma planilha somando valores"], correta: 1, dica: "IA generativa CRIA conteúdo novo (texto, imagem, música)...", explicacao: "IA generativa produz conteúdo novo — como um poema — a partir de um comando (prompt). Calculadora e alarme seguem regras fixas." },
  { id: 8, dificuldade: 3, pergunta: "Dois algoritmos resolvem o mesmo problema: o A leva 2 segundos e o B leva 2 minutos. O que isso ensina?", opcoes: ["O computador está com defeito", "Algoritmos podem ser mais ou menos eficientes", "O problema é impossível", "Tempo não importa em computação"], correta: 1, dica: "Quando comparamos soluções, observamos o consumo de recursos (tempo, memória)...", explicacao: "Nem toda solução correta é eficiente. Comparar algoritmos pelo consumo de recursos é uma habilidade avançada (EM13CO03)." }
];

/* ---------- Exportação (browser e Node.js) ---------- */
if (typeof window !== "undefined" && !window.PLANO_DADOS) {
  window.PLANO_DADOS = { BNCC, ETAPAS, NIVEIS, INCLUSAO, FOCOS, OBJETIVOS, MOMENTOS_BASE, ATIVIDADES, FERRAMENTAS, RUBRICA, ADAPTACOES, REFLEXAO_DOCENTE, QUIZ };
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { BNCC, ETAPAS, NIVEIS, INCLUSAO, FOCOS, OBJETIVOS, MOMENTOS_BASE, ATIVIDADES, FERRAMENTAS, RUBRICA, ADAPTACOES, REFLEXAO_DOCENTE, QUIZ };
}