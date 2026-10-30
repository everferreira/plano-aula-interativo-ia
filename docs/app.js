/* =========================================================================
 * app.js — Interface do Gerador de Plano de Aula com Ecossistema IA
 * Depende de data.js (PLANO_DADOS) e engine.js (PlanoEngine).
 * -------------------------------------------------------------------------
 * Regras da casa:
 * - SEMPRE escapar HTML de entradas do usuário (anti-XSS).
 * - Erros SEMPRE visíveis (mostrarErro), nunca silenciosos.
 * - Copiar com fallback (clipboard API + execCommand).
 * ========================================================================= */

(function () {
  "use strict";

  const ENG = (window.PlanoEngine = window.PlanoEngine || {});
  const DADOS = window.PLANO_DADOS || {};

  document.addEventListener("DOMContentLoaded", iniciar);

  function iniciar() {
    try {
      ligarAbas();
      ligarGerador();
      ligarQuiz();
      renderizarEcossistema();
    } catch (err) {
      mostrarErro("Falha ao iniciar o aplicativo: " + err.message);
    }
  }

  function mostrarErro(msg) {
    console.error("[plano-ia]", msg);
    const alvo = document.getElementById("out-plano") || document.body;
    if (alvo) {
      const div = document.createElement("div");
      div.className = "card";
      div.style.cssText = "border-color:#ef4444;color:#b91c1c;";
      div.textContent = "⚠️ " + msg;
      alvo.prepend(div);
    }
  }

  /* ------------------------------ Abas ------------------------------ */
  function ligarAbas() {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
        const painel = document.getElementById("panel-" + tab.dataset.tab);
        if (painel) painel.classList.add("active");
      });
    });
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* --------------------------- Gerador --------------------------- */
  function ligarGerador() {
    const btn = document.getElementById("btn-gerar");
    if (!btn) return;
    btn.addEventListener("click", () => {
      try {
        const entrada = {
          tema: document.getElementById("in-tema").value,
          etapa: document.getElementById("in-etapa").value,
          duracaoMin: document.getElementById("in-duracao").value,
          nivel: document.getElementById("in-nivel").value,
          inclusao: document.getElementById("in-inclusao").value,
          foco: document.getElementById("in-foco").value
        };
        if (typeof ENG.gerarPlanoAula !== "function") throw new Error("motor de geração não carregado");
        const plano = ENG.gerarPlanoAula(entrada);
        renderizarPlano(plano);
        document.getElementById("out-plano").scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (err) {
        mostrarErro("Não foi possível gerar o plano: " + err.message);
      }
    });
  }

  function renderizarPlano(plano) {
    const out = document.getElementById("out-plano");
    const m = plano.meta;
    const html = [];

    html.push('<div class="card">');
    html.push('<h2>📋 ' + escapeHtml(m.tema) + "</h2>");
    html.push('<p class="muted">Plano personalizado · ' + escapeHtml(m.foco) + " · gerado no seu navegador</p>");

    html.push('<div class="meta-grid">');
    const metas = [
      ["Etapa", m.etapa + " (" + m.faixa + ")"],
      ["Duração", m.duracao + " min"],
      ["Perfil", m.nivel],
      ["Inclusão", m.inclusao],
      ["Ferramentas", m.linguagem]
    ];
    metas.forEach(([k, v]) => html.push('<div class="meta-item"><div class="k">' + k + '</div><div class="v">' + escapeHtml(v) + "</div></div>"));
    html.push("</div>");

    html.push('<div class="plano-section"><h3>🎯 Objetivos de Aprendizagem</h3><ul class="lista">');
    plano.objetivos.forEach((o) => html.push("<li>" + escapeHtml(o) + ";</li>"));
    html.push("</ul></div>");

    html.push('<div class="plano-section"><h3>📚 Habilidades BNCC — Complemento Computação</h3><ul class="lista">');
    plano.bncc.forEach((b) => html.push('<li><span class="bncc-chip">' + b.codigo + "</span>" + escapeHtml(b.desc) + "</li>"));
    html.push("</ul></div>");

    html.push('<div class="plano-section"><h3>⏱️ Momentos da Aula · Metodologia Ativa</h3>');
    plano.momentos.forEach((mom) => {
      html.push('<div class="momento">');
      html.push('<div class="mom-head"><span class="mom-nome">' + escapeHtml(mom.nome) + '</span><span class="mom-tempo">⏱ ' + mom.tempoMin + " min</span></div>");
      html.push('<div class="mom-desc">' + escapeHtml(mom.descricao) + "</div>");
      html.push('<div class="mom-ativ">' + formatarAtividade(mom.atividade) + "</div>");
      if (mom.ferramenta) html.push('<div style="font-size:13px;color:var(--tinta-suave);margin-top:6px;">🛠️ Ferramenta: <strong>' + escapeHtml(mom.ferramenta) + "</strong></div>");
      if (mom.prompt) html.push(promptBox(mom.prompt));
      html.push("</div>");
    });
    html.push("</div>");

    if (plano.adaptacoes && plano.adaptacoes.length) {
      html.push('<div class="plano-section"><h3>♿ Adaptações Inclusivas · ' + escapeHtml(m.inclusao) + "</h3><ul class=\"lista\">");
      plano.adaptacoes.forEach((a) => html.push("<li>" + escapeHtml(a) + "</li>"));
      html.push("</ul></div>");
    }

    html.push('<div class="plano-section"><h3>📊 Rubrica Avaliativa</h3>');
    html.push('<table class="rubrica"><thead><tr><th>Critério</th>');
    plano.rubrica.conceitos.forEach((c) => html.push("<th>" + escapeHtml(c.nome) + "</th>"));
    html.push("</tr></thead><tbody>");
    plano.rubrica.criterios.forEach((c) => {
      html.push("<tr><td>" + escapeHtml(c.nome) + "</td><td>" + escapeHtml(c.insuficiente) + "</td><td>" + escapeHtml(c.parcial) + "</td><td>" + escapeHtml(c.bom) + "</td><td>" + escapeHtml(c.excelente) + "</td></tr>");
    });
    html.push("</tbody></table>");
    html.push('<div class="rubrica-legend">' + plano.rubrica.conceitos.map((c) => '<span style="color:' + c.cor + '">' + escapeHtml(c.nome) + "</span>").join("") + "</div></div>");

    html.push('<div class="plano-section"><h3>🧭 Reflexão Docente — Uso Responsável da IA</h3><ul class="lista">');
    plano.reflexao.forEach((r) => html.push("<li>" + escapeHtml(r) + "</li>"));
    html.push("</ul></div>");

    html.push('<div class="btn-acoes">');
    html.push('<button class="btn-secundario" id="btn-baixar-md">⬇️ Baixar plano (.md)</button>');
    html.push('<button class="btn-secundario" id="btn-imprimir">🖨️ Imprimir / PDF</button>');
    html.push("</div>");
    html.push("</div>");

    out.innerHTML = html.join("");
    out.hidden = false;

    document.getElementById("btn-baixar-md").addEventListener("click", () => baixarMarkdown(plano));
    document.getElementById("btn-imprimir").addEventListener("click", () => window.print());

    document.querySelectorAll("#out-plano .btn-copiar").forEach((b) => {
      b.addEventListener("click", () => copiarTexto(b.dataset.alvo || b.parentElement.textContent, b));
    });
  }

  /* Walk-friendly: quebra em passos numerados quando o texto contém "1)" ou "1." */
  function formatarAtividade(texto) {
    if (/^\s*\d+[\).]/.test(texto)) {
      const partes = texto.split(/(?=\d+[\).]\s)/).filter(Boolean);
      return "<ol class=\"lista\">" + partes.map((p) => "<li>" + escapeHtml(p.trim()) + "</li>").join("") + "</ol>";
    }
    return "<strong>Atividade:</strong> " + escapeHtml(texto);
  }

  function promptBox(prompt) {
    return '<div class="prompt-box"><span class="prompt-label">💬 Prompt para a IA (copiloto)</span><button class="btn-copiar" type="button" data-alvo="copy-prompt-' + prompt.length + '">📋 Copiar</button><span id="copy-prompt-' + prompt.length + '">' + escapeHtml(prompt) + "</span></div>";
  }

  function copiarTexto(texto, botao) {
    const limpar = () => {
      botao.textContent = "📋 Copiar";
      botao.classList.remove("ok");
    };
    const sucesso = () => {
      botao.textContent = "✅ Copiado!";
      botao.classList.add("ok");
      setTimeout(limpar, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(sucesso).catch(() => copiarFallback(texto, sucesso));
    } else {
      copiarFallback(texto, sucesso);
    }
  }

  function copiarFallback(texto, cb) {
    try {
      const ta = document.createElement("textarea");
      ta.value = texto;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      cb();
    } catch (e) {
      alert("Não foi possível copiar automaticamente. Selecione o texto e copie manualmente.");
    }
  }

  function baixarMarkdown(plano) {
    try {
      const md = ENG.gerarMarkdown(plano);
      const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const nome = "plano-de-aula-" + plano.meta.tema.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50) + ".md";
      a.href = url;
      a.download = nome;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch (err) {
      mostrarErro("Falha ao baixar o arquivo: " + err.message);
    }
  }

  /* --------------------------- Ecossistema --------------------------- */
  function renderizarEcossistema() {
    const alvo = document.getElementById("ferramentas");
    if (!alvo || !DADOS.FERRAMENTAS) return;
    const html = DADOS.FERRAMENTAS.map((f) => {
      const temPrompt = f.prompt && f.prompt !== "—";
      let extras = '<div class="f-uso">' + escapeHtml(f.uso) + "</div>";
      extras += '<div class="f-quando"><strong>Quando usar:</strong> ' + escapeHtml(f.quando) + "</div>";
      if (temPrompt) {
        extras += '<div class="prompt-box"><span class="prompt-label">💬 Prompt sugerido</span><button class="btn-copiar" type="button">📋 Copiar</button><span class="copiar-fonte">' + escapeHtml(f.prompt) + "</span></div>";
      }
      return '<div class="ferramenta"><span class="tipo">' + escapeHtml(f.tipo) + "</span><h3>" + escapeHtml(f.nome) + "</h3>" + extras + "</div>";
    }).join("");
    alvo.innerHTML = html;
    alvo.querySelectorAll(".btn-copiar").forEach((b) => {
      b.addEventListener("click", () => copiarTexto(b.nextElementSibling.textContent, b));
    });
  }

  /* ------------------------------ Quiz ------------------------------ */
  function ligarQuiz() {
    if (!DADOS.QUIZ || !ENG.PlanoQuiz) return;
    const quiz = ENG.PlanoQuiz();
    const questoes = quiz.questoes;
    const $ = (id) => document.getElementById(id);

    let ordem = null;          // sequência embaralhada de ids
    let atual = 0;
    let acertos = 0;
    let erros = 0;
    let racha = 0;             // acertos consecutivos
    let nivel = 2;             // dificuldade adaptativa inicial
    let respostas = [];

    function embaralhar(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function mostrarId(id) {
      $("quiz-intro").hidden = true;
      $("quiz-fim").hidden = true;
      $("quiz-jogo").hidden = false;
    }

    $("btn-quiz-iniciar").addEventListener("click", () => {
      ordem = embaralhar(questoes.map((q) => q.id));
      atual = 0; acertos = 0; erros = 0; racha = 0; nivel = 2; respostas = [];
      mostrarId();
      renderPergunta();
      $("panel-trilha").scrollIntoView({ behavior: "smooth" });
    });

    $("btn-quiz-reiniciar").addEventListener("click", () => {
      $("quiz-fim").hidden = true;
      $("quiz-jogo").hidden = true;
      $("quiz-intro").hidden = false;
    });

    function renderPergunta() {
      const q = questoes.find((x) => x.id === ordem[atual]);
      if (!q) return fimDoJogo();
      $("quiz-progresso").textContent = "Pergunta " + (atual + 1) + "/" + ordem.length;
      $("quiz-nivel").textContent = "Nível " + "⭐".repeat(nivel) + "☆".repeat(Math.max(0, quiz.maxDificuldade - nivel));
      $("quiz-pontos").textContent = "✅ " + acertos + " · ❌ " + erros;
      $("quiz-pergunta").textContent = q.pergunta;
      $("quiz-feedback").hidden = true;

      const opcoesEl = $("quiz-opcoes");
      opcoesEl.innerHTML = "";
      q.opcoes.forEach((op, i) => {
        const btn = document.createElement("button");
        btn.className = "quiz-opcao";
        btn.textContent = String.fromCharCode(65 + i) + ") " + op;
        btn.addEventListener("click", () => responder(q, i, btn));
        opcoesEl.appendChild(btn);
      });
    }

    function responder(q, escolha, btnEl) {
      const acertou = escolha === q.correta;
      acertos += acertou ? 1 : 0;
      erros += acertou ? 0 : 1;
      respostas.push({ id: q.id, acertou });
      racha = acertou ? racha + 1 : 0;

      // nível adaptativo
      if (acertou && racha >= 2 && nivel < quiz.maxDificuldade) { nivel += 1; racha = 0; }
      if (!acertou && nivel > 1) nivel -= 1;

      const botoes = $("quiz-opcoes").querySelectorAll(".quiz-opcao");
      botoes.forEach((b) => (b.disabled = true));
      botoes[q.correta].classList.add("certo");
      if (!acertou) btnEl.classList.add("errado");

      const fb = $("quiz-feedback");
      fb.classList.remove("certo", "errado");
      fb.classList.add(acertou ? "certo" : "errado");
      let txt = (acertou ? "✅ Boa! " : "❌ Quase! ") + escapeHtml(q.explicacao);
      if (!acertou) txt += '<div class="feedback-dica">💡 Dica: ' + escapeHtml(q.dica) + "</div>";
      $("quiz-feedback-texto").innerHTML = txt;
      fb.hidden = false;

      $("btn-quiz-proxima").textContent = atual + 1 >= ordem.length ? "Ver meu perfil 🏁" : "Próxima pergunta →";
      $("quiz-pontos").textContent = "✅ " + acertos + " · ❌ " + erros;
      $("quiz-nivel").textContent = "Nível " + "⭐".repeat(nivel) + "☆".repeat(Math.max(0, quiz.maxDificuldade - nivel));
    }

    $("btn-quiz-proxima").addEventListener("click", () => {
      atual += 1;
      if (atual >= ordem.length) fimDoJogo();
      else renderPergunta();
    });

    function fimDoJogo() {
      const r = quiz.avaliarRespostas(respostas);
      $("quiz-jogo").hidden = true;
      $("quiz-fim").hidden = false;
      $("quiz-fim-icone").textContent = r.perfil.icone || "🏁";
      $("quiz-fim-titulo").textContent = r.perfil.nome;
      $("quiz-fim-desc").textContent = r.perfil.desc;
      const pct = Math.round((acertos / Math.max(1, respostas.length)) * 100);
      $("quiz-fim-stats").textContent = acertos + " acertos de " + respostas.length + " (" + pct + "%) · maior nível alcançado: " + "⭐".repeat(r.alcancou);
    }
  }
})();