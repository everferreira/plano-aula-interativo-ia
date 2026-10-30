/* =========================================================================
 * scripts/gerar_planos_exemplo.js — Gera os planos de aula de exemplo
 * usando O MESMO motor do produto web (docs/engine.js). Roda via Node:
 *   node scripts/gerar_planos_exemplo.js
 * ========================================================================= */
const fs = require("fs");
const path = require("path");
const { gerarPlanoAula, gerarMarkdown } = require("../docs/engine.js");

const SAIDA = path.join(__dirname, "..", "plano-de-aula");

const cenarios = [
  {
    arquivo: "plano-de-aula-programacao-com-ia.md",
    entrada: {
      tema: "Introdução à Programação com IA",
      etapa: "medio",
      duracaoMin: 50,
      nivel: "intermediario",
      inclusao: "nenhuma",
      foco: "ia"
    }
  },
  {
    arquivo: "plano-de-aula-logica-fundamental-adaptado.md",
    entrada: {
      tema: "Lógica e Algoritmos no Dia a Dia",
      etapa: "fund1",
      duracaoMin: 45,
      nivel: "iniciante",
      inclusao: "tea",
      foco: "logica"
    }
  }
];

fs.mkdirSync(SAIDA, { recursive: true });
for (const c of cenarios) {
  const plano = gerarPlanoAula(c.entrada);
  const md = gerarMarkdown(plano);
  const arquivo = path.join(SAIDA, c.arquivo);
  fs.writeFileSync(arquivo, md, "utf8");
  console.log(`✔ ${c.arquivo} (${md.length} chars) — ${plano.meta.foco} · ${plano.meta.nivel} · ${plano.meta.etapa}`);
}
console.log("Planos de exemplo gerados com o motor real.");