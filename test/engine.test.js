/* =========================================================================
 * test/engine.test.js — Testes do motor de geração (roda com Node)
 * Uso: node test/engine.test.js
 * ========================================================================= */
const assert = require("assert");
const D = require("../docs/data.js");
const { gerarPlanoAula, gerarMarkdown, PlanoQuiz, VALIDO } = require("../docs/engine.js");

let passou = 0;
function check(nome, cond) {
  if (!cond) {
    console.error("❌ FALHOU:", nome);
    process.exitCode = 1;
  } else {
    passou += 1;
    console.log("✅", nome);
  }
}

/* 1. Dados BNCC: todos os códigos referenciados existem e estão no formato oficial */
const codigosReais = /^(EF\d{2}CO\d{2}|EM\d{2}CO\d{2})$/;
Object.entries(D.BNCC).forEach(([chave, lista]) => {
  lista.forEach((b) => {
    check(`BNCC ${chave}: ${b.codigo} tem formato oficial`, codigosReais.test(b.codigo));
    check(`BNCC ${chave}: ${b.codigo} tem descrição`, b.desc && b.desc.length > 20);
  });
});

/* 2. Referências cruzadas data.js: chaves de etapas/níveis/focos consistentes */
check("ETAPAS cobrem todos os grupos BNCC", Object.keys(D.BNCC).every((k) => Object.values(D.ETAPAS).some((e) => e.bncc === k)));
check("INCLUSAO tem adaptações para cada chave", Object.keys(D.INCLUSAO).every((k) => Array.isArray(D.ADAPTACOES[k])));
check("FOCOS têm objetivos p/ os 3 níveis", Object.keys(D.FOCOS).every((f) => D.OBJETIVOS[f] && ["iniciante", "intermediario", "avancado"].every((n) => D.OBJETIVOS[f][n].length >= 3)));
check("FOCOS têm atividades p/ os 3 níveis", Object.keys(D.FOCOS).every((f) => D.ATIVIDADES[f] && ["iniciante", "intermediario", "avancado"].every((n) => D.ATIVIDADES[f][n].length >= 2)));

/* 3. Geração válida para combinações representativas */
const cenarios = [];
["fund1", "fund2", "medio", "oficina"].forEach((etapa) => {
  ["iniciante", "intermediario", "avancado"].forEach((nivel) => {
    ["logica", "ia"].forEach((foco) => {
      cenarios.push({ etapa, nivel, foco, duracaoMin: 50, inclusao: "nenhuma", tema: "Intro à Programação" });
    });
  });
});
cenarios.forEach((c) => {
  const p = gerarPlanoAula(c);
  check(`Plano ${c.etapa}/${c.nivel}/${c.foco}: meta ok`, p.meta && p.meta.tema === c.tema);
  check(`Plano ${c.etapa}/${c.nivel}/${c.foco}: 3 objetivos`, p.objetivos.length === 3);
  check(`Plano ${c.etapa}/${c.nivel}/${c.foco}: BNCC ${p.bncc.length} habilidades`, p.bncc.length === 3);
  check(`Plano ${c.etapa}/${c.nivel}/${c.foco}: 4 momentos`, p.momentos.length === 4);
  const soma = p.momentos.reduce((s, m) => s + m.tempoMin, 0);
  check(`Plano ${c.etapa}/${c.nivel}/${c.foco}: tempos somam ~50min (soma=${soma})`, soma >= 45 && soma <= 60);
  check(`Plano ${c.etapa}/${c.nivel}/${c.foco}: atividade principal preenchida`, p.momentos[1].atividade.length > 40);
});

/* 4. Personalização de fato acontece (não é template único) */
const pIni = gerarPlanoAula({ etapa: "medio", nivel: "iniciante", foco: "ia", duracaoMin: 50, inclusao: "nenhuma", tema: "IA na programação" });
const pAv = gerarPlanoAula({ etapa: "medio", nivel: "avancado", foco: "ia", duracaoMin: 50, inclusao: "nenhuma", tema: "IA na programação" });
check("Personalização: objetivos diferem entre níveis", JSON.stringify(pIni.objetivos) !== JSON.stringify(pAv.objetivos));
check("Personalização: atividade difere entre níveis", pIni.momentos[1].atividade !== pAv.momentos[1].atividade);

/* 5. Adaptações inclusivas */
const pTEA = gerarPlanoAula({ etapa: "fund1", nivel: "iniciante", foco: "logica", duracaoMin: 50, inclusao: "tea", tema: "x" });
check("Inclusão TEA: 5 adaptações", pTEA.adaptacoes.length === 5);
const pAmbos = gerarPlanoAula({ etapa: "fund1", nivel: "iniciante", foco: "logica", duracaoMin: 50, inclusao: "ambos", tema: "x" });
check("Inclusão TEA+TDAH: adaptações específicas", pAmbos.adaptacoes.length === 5 && pAmbos.adaptacoes[0].includes("TEA"));

/* 6. Duração variada */
const p90 = gerarPlanoAula({ etapa: "medio", nivel: "intermediario", foco: "debug", duracaoMin: 90, inclusao: "nenhuma", tema: "y" });
const soma90 = p90.momentos.reduce((s, m) => s + m.tempoMin, 0);
check("Duração 90min: soma razoável", soma90 >= 85 && soma90 <= 100);

/* 7. Markdown bem formado */
const md = gerarMarkdown(pIni);
check("Markdown: título", md.startsWith("# 📘 Plano de Aula: IA na programação"));
check("Markdown: inclui BNCC", md.includes("EM13CO10") && md.includes("EM13CO01") && md.includes("EM13CO03"));
check("Markdown: tabela de dados gerais", md.includes("| Etapa |"));
check("Markdown: rubrica 4 colunas", md.includes("| Critério | Insuficiente | Parcial | Bom | Excelente |"));
check("Markdown: reflexão docente", md.includes("Reflexão Docente"));

/* 8. Quiz: estrutura e simulação adaptativa */
const quiz = PlanoQuiz();
check("Quiz: 8 questões", quiz.questoes.length === 8);
check("Quiz: dificuldades 1..3 balanceadas", [1, 2, 3].every((d) => quiz.questoes.some((q) => q.dificuldade === d)));
check("Quiz: toda questão tem dica e explicação", quiz.questoes.every((q) => q.dica && q.explicacao && q.opcoes.length === 4 && q.correta >= 0 && q.correta < 4));

const respostasPerfeitas = quiz.questoes.map((q) => ({ id: q.id, acertou: true }));
const r1 = quiz.avaliarRespostas(respostasPerfeitas);
check("Quiz: 100% de acerto → nível final máximo", r1.nivelFinal === quiz.maxDificuldade);
check("Quiz: 100% de acerto → perfil Arquiteto(a)", r1.perfil.nome.includes("Arquiteto"));

const respostasRuins = quiz.questoes.map((q) => ({ id: q.id, acertou: false }));
const r2 = quiz.avaliarRespostas(respostasRuins);
check("Quiz: 0% de acerto → perfil Aventureiro(a)", r2.perfil.nome.includes("Aventureiro"));

/* 9. Entradas inválidas não quebram (fallback seguro) */
const pFallback = gerarPlanoAula({ etapa: "inexistente", nivel: "", foco: "", duracaoMin: "abc", inclusao: null, tema: "   " });
check("Fallback: entrada inválida gera plano com defaults", pFallback.meta.tema === "Introdução à Programação com IA" && pFallback.meta.duracao === 50);

console.log(`\n${passou} verificações passaram.`);
if (process.exitCode) {
  console.error("EXISTEM FALHAS!");
  process.exit(1);
}
console.log("TUDO OK ✅");