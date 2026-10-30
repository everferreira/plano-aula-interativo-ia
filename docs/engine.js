/* =========================================================================
 * engine.js — Motor de geração de planos de aula personalizados
 * Funções PURAS (testáveis via Node) + exportação Markdown.
 * Depende de data.js (BNCC, atividades, ecossistema IA, rubrica...).
 * ========================================================================= */

(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(require("./data.js"));
  } else {
    root.PlanoEngine = factory(root.PLANO_DADOS || {});
    root.gerarPlanoAula = root.PlanoEngine.gerarPlanoAula;
    root.gerarMarkdown = root.PlanoEngine.gerarMarkdown;
    root.PlanoQuiz = root.PlanoEngine.PlanoQuiz;
  }
})(typeof self !== "undefined" ? self : this, function (D) {

  const VALIDO = {
    etapa: Object.keys(D.ETAPAS),
    nivel: Object.keys(D.NIVEIS),
    inclusao: Object.keys(D.INCLUSAO),
    foco: Object.keys(D.FOCOS)
  };

  /* ---------- Distribuição de tempo por momento ---------- */
  function temposPorDuracao(duracaoMin) {
    return D.MOMENTOS_BASE.map((m) => ({
      id: m.id,
      nome: m.nome,
      tempoMin: Math.max(5, Math.round((m.percent * duracaoMin) / 5) * 5)
    }));
  }

  /* ---------- Seleção de atividade por foco/nível ---------- */
  function atividadePara(foco, nivel, indice) {
    const lista = D.ATIVIDADES[foco] && D.ATIVIDADES[foco][nivel];
    if (!lista || lista.length === 0) {
      return { nome: "Atividade prática orientada", desc: "Atividade prática com mediação do professor, adaptada ao nível da turma.", ferramenta: "Material variado" };
    }
    return lista[indice % lista.length];
  }

  /* ---------- Objetivos personalizados ---------- */
  function objetivosPara(foco, nivel) {
    const base = D.OBJETIVOS[foco] && D.OBJETIVOS[foco][nivel];
    return base ? base.slice(0, 3) : ["Compreender o conceito central da aula", "Aplicar o conceito em uma atividade prática", "Refletir sobre o processo de construção"];
  }

  /* ---------- Geração do plano de aula ---------- */
  function gerarPlanoAula(input) {
    // Valida e guarda as CHAVES (não apenas os objetos) para lookup consistente
    const etapaKey = VALIDO.etapa.includes(input.etapa) ? input.etapa : "fund1";
    const nivelKey = VALIDO.nivel.includes(input.nivel) ? input.nivel : "iniciante";
    const inclusaoKey = VALIDO.inclusao.includes(input.inclusao) ? input.inclusao : "nenhuma";
    const focoKey = VALIDO.foco.includes(input.foco) ? input.foco : "logica";

    const etapa = D.ETAPAS[etapaKey];
    const nivel = D.NIVEIS[nivelKey];
    const inclusao = D.INCLUSAO[inclusaoKey];
    const foco = D.FOCOS[focoKey];
    const duracao = Math.max(20, Math.min(240, parseInt(input.duracaoMin, 10) || 50));
    const tema = ((input.tema || "").trim() || "Introdução à Programação com IA");

    const bncc = D.BNCC[etapa.bncc] || [];
    const momentos = temposPorDuracao(duracao);
    const objetivos = objetivosPara(focoKey, nivelKey);

    // Personaliza a descrição da atividade principal com a IA do ecossistema
    const principal = atividadePara(focoKey, nivelKey, 0);
    const secundaria = atividadePara(focoKey, nivelKey, 1);

    const withMoments = momentos.map((m, i) => {
      if (m.id === "engajamento") {
        return { ...m, descricao: D.MOMENTOS_BASE[0].descricao, atividade: "Roda de hipóteses: 'como você ensinaria um robô a " + verboDoFoco(focoKey) + "?' + registro das ideias no quadro." };
      }
      if (m.id === "maonamassa") {
        return {
          ...m,
          descricao: D.MOMENTOS_BASE[1].descricao,
          atividade: "Atividade principal: " + principal.nome + ". " + principal.desc +
            (principal.prompt ? " A IA entra como copiloto supervisionado (prompt pronto na seção Ecossistema IA)." : ""),
          ferramenta: principal.ferramenta,
          prompt: principal.prompt || ""
        };
      }
      if (m.id === "sistematizacao") {
        return {
          ...m,
          descricao: D.MOMENTOS_BASE[2].descricao,
          atividade: "Roda de conversa com registro no caderno: o que descobrimos sobre " + focoLabel(focoKey) +
            "? Cada trio compartilha 1 descoberta e 1 dúvida; fechamento do vocabulário (algoritmo, laço, condição, bug, prompt)." +
            (secundaria && secundaria.prompt ? " Apoio opcional da IA para comparar explicações." : ""),
          ferramenta: secundaria && secundaria.ferramenta ? secundaria.ferramenta : "",
          prompt: seguradaPrompt(secundaria)
        };
      }
      // avaliacao
      return {
        ...m,
        descricao: D.MOMENTOS_BASE[3].descricao,
        atividade: "Bilhete de saída: 'O que eu consegui fazer hoje? O que ainda quero aprender?' + autoavaliação com a rubrica (1 critério escolhido pelo próprio aluno).",
        ferramenta: ""
      };
    });

    return {
      meta: {
        tema, duracao,
        etapa: etapa.label,
        faixa: etapa.faixa,
        nivel: nivel.label,
        inclusao: inclusao.label,
        foco: foco.label,
        linguagem: etapa.linguagem,
        geradoEm: new Date().toISOString()
      },
      objetivos,
      bncc,
      momentos: withMoments,
      adaptacoes: D.ADAPTACOES[inclusaoKey] || [],
      rubrica: D.RUBRICA,
      reflexao: D.REFLEXAO_DOCENTE,
      ecossistema: D.FERRAMENTAS
    };
  }

  function verboDoFoco(foco) {
    const v = {
      logica: "pensar passo a passo",
      sequencias: "repetir um movimento",
      condicionais: "decidir com base em uma condição",
      decomposicao: "dividir um problema em partes",
      debug: "encontrar um erro no código",
      ia: "pedir ajuda a uma inteligência artificial"
    };
    return v[foco] || "resolver um problema";
  }

  function focoLabel(foco) {
    return (D.FOCOS[foco] && D.FOCOS[foco].label) || "o tema";
  }

  function seguradaPrompt(sec) {
    if (sec && sec.prompt) return sec.prompt;
    if (sec && sec.ferramenta && sec.ferramenta !== "Nenhuma (desplugada)") {
      return "Compare duas formas de explicar o conceito da aula para o nível " + "desta turma e escolha a mais clara.";
    }
    return "";
  }

  /* =========================================================================
   * Exportação Markdown (README do plano + arquivo .md)
   * ========================================================================= */
  function gerarMarkdown(plano) {
    const m = plano.meta;
    const L = [];
    L.push(`# 📘 Plano de Aula: ${m.tema}`);
    L.push("");
    L.push(`**Gerado pelo [Gerador de Plano de Aula com Ecossistema IA](https://everferreira.github.io/plano-aula-interativo-ia/)** · ${m.foco}`);
    L.push("");
    L.push("## Dados Gerais");
    L.push("");
    L.push(`| Campo | Valor |`);
    L.push(`|---|---|`);
    L.push(`| Etapa | ${m.etapa} (${m.faixa}) |`);
    L.push(`| Duração | ${m.duracao} min |`);
    L.push(`| Perfil da turma | ${m.nivel} |`);
    L.push(`| Inclusão | ${m.inclusao} |`);
    L.push(`| Foco da aula | ${m.foco} |`);
    L.push(`| Linguagem/ferramenta | ${m.linguagem} |`);
    L.push("");
    L.push("## 🎯 Objetivos de Aprendizagem");
    L.push("");
    plano.objetivos.forEach((o) => L.push(`- ${o};`));
    L.push("");
    L.push("## 📚 Habilidades BNCC (Complemento Computação)");
    L.push("");
    plano.bncc.forEach((b) => L.push(`- **${b.codigo}** — ${b.desc}`));
    L.push("");
    L.push("## ⏱️ Momentos da Aula (metodologia ativa)");
    L.push("");
    plano.momentos.forEach((mom) => {
      L.push(`### ${mom.nome} — ${mom.tempoMin} min`);
      L.push("");
      L.push(mom.descricao);
      L.push("");
      L.push(`**Atividade:** ${mom.atividade}`);
      if (mom.ferramenta) L.push("");
      if (mom.ferramenta) L.push(`**Ferramenta:** ${mom.ferramenta}`);
      if (mom.prompt) {
        L.push("");
        L.push(`**Prompt para a IA (copiloto):**`);
        L.push("");
        L.push("```text");
        L.push(mom.prompt);
        L.push("```");
      }
      L.push("");
    });
    L.push("## 🤖 Ecossistema IA da Aula");
    L.push("");
    plano.ecossistema.forEach((f) => L.push(`- **${f.nome}** — ${f.tipo}: ${f.uso}`));
    L.push("");
    L.push("## ♿ Adaptações Inclusivas");
    L.push("");
    (plano.adaptacoes.length ? plano.adaptacoes : ["Sem necessidades específicas selecionadas."]).forEach((a) => L.push(`- ${a}`));
    L.push("");
    L.push("## 📊 Rubrica Avaliativa");
    L.push("");
    L.push("| Critério | Insuficiente | Parcial | Bom | Excelente |");
    L.push("|---|---|---|---|---|");
    plano.rubrica.criterios.forEach((c) => {
      L.push(`| ${c.nome} | ${c.insuficiente} | ${c.parcial} | ${c.bom} | ${c.excelente} |`);
    });
    L.push("");
    L.push("## 🧭 Reflexão Docente — Uso Responsável da IA");
    L.push("");
    plano.reflexao.forEach((r) => L.push(`- ${r}`));
    L.push("");
    L.push("---");
    L.push("");
    L.push(`_Plano gerado com apoio de Ecossistema IA · ${m.geradoEm.split("T")[0]} · Autora: Ever Ferreira_`);
    L.push("");
    return L.join("\n");
  }

  /* =========================================================================
   * Trilha interativa — Quiz adaptativo (lógica e programação)
   * Adaptação: começa na dificuldade 2; 2 acertos seguidos sobem, 1 erro desce.
   * ========================================================================= */
  function PlanoQuiz() {
    return {
      questoes: D.QUIZ.map((q) => ({ ...q })),
      maxDificuldade: Math.max.apply(null, D.QUIZ.map((q) => q.dificuldade)),
      // simula a trilha: retorna sequência de perguntas + perfil final
      simularTrilha(respostas) {
        let nivel = 2;
        let streak = 0;
        let alcancou = 0;
        const vistos = [];
        for (const resp of respostas) {
          const q = D.QUIZ.find((x) => x.id === resp.id);
          if (!q) continue;
          alcancou = Math.max(alcancou, q.dificuldade);
          if (resp.acertou) {
            streak += 1;
            if (streak >= 2 && nivel < this.maxDificuldade) { nivel += 1; streak = 0; }
          } else {
            streak = 0;
            if (nivel > 1) nivel -= 1;
          }
          vistos.push({ id: q.id, dificuldade: q.dificuldade, nivelDurante: nivel });
        }
        return { nivelFinal: nivel, alcancou, vistos, perfil: perfilFinal(this.questoes, respostas) };
      },
      // pós-avaliação do quiz real
      avaliarRespostas(respostas) {
        return this.simularTrilha(respostas);
      }
    };
  }

  function perfilFinal(questoes, respostas) {
    const tot = respostas.length;
    if (!tot) return { nome: "—", desc: "Complete a trilha para descobrir seu perfil." };
    const acertos = respostas.filter((r) => r.acertou).length;
    const pct = acertos / tot;
    const dificuldadeMax = Math.max.apply(null, respostas.map((r) => {
      const q = questoes.find((x) => x.id === r.id);
      return q ? q.dificuldade : 0;
    }));
    if (pct >= 0.75 && dificuldadeMax >= 3) return { nome: "Arquiteto(a) de Código", desc: "Raciocínio lógico afiado! Você resolve desafios complexos e está pronto(a) para projetos avançados.", icone: "🏛️" };
    if (pct >= 0.5) return { nome: "Explorador(a) Digital", desc: "Você entende os fundamentos e já encara desafios com confiança. Continue praticando!", icone: "🧭" };
    return { nome: "Aventureiro(a) em Descoberta", desc: "Todo programador já começou por aqui! Revise os conceitos e tente de novo — você vai evoluir rápido.", icone: "🚀" };
  }

  return { gerarPlanoAula, gerarMarkdown, PlanoQuiz, VALIDO, temposPorDuracao };
});