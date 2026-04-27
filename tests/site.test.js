/**
 * Testes Unitarios - Projeto aprendendo-html-css
 * Disciplina: DevOps
 * Aluno: Guilherme Arruda Pereira
 *
 * Estes testes verificam a estrutura e o conteudo
 * das paginas HTML do site.
 */

const fs = require("fs");
const path = require("path");

// Helper: carrega o HTML de um arquivo e retorna o document
function carregarHTML(nomeArquivo) {
  const caminho = path.join(__dirname, "..", nomeArquivo);
  const html = fs.readFileSync(caminho, "utf8");
  document.open();
  document.write(html);
  document.close();
  return document;
}

// ─────────────────────────────────────────────
// TESTE 1 — index.html: titulo correto
// ─────────────────────────────────────────────
test("index.html deve ter o titulo 'Meu Site'", () => {
  carregarHTML("index.html");
  const titulo = document.querySelector("title");
  expect(titulo).not.toBeNull();
  expect(titulo.textContent).toBe("Meu Site");
});

// ─────────────────────────────────────────────
// TESTE 2 — index.html: cabecalho h1 presente
// ─────────────────────────────────────────────
test("index.html deve conter o cabecalho principal h1", () => {
  carregarHTML("index.html");
  const h1 = document.querySelector("h1");
  expect(h1).not.toBeNull();
  expect(h1.textContent).toContain("Meu Primeiro Site");
});

// ─────────────────────────────────────────────
// TESTE 3 — index.html: navegacao com 3 links
// ─────────────────────────────────────────────
test("index.html deve ter 3 links de navegacao (Home, Sobre, Contato)", () => {
  carregarHTML("index.html");
  const links = document.querySelectorAll("nav a");
  expect(links.length).toBe(3);

  const hrefs = Array.from(links).map((a) => a.getAttribute("href"));
  expect(hrefs).toContain("index.html");
  expect(hrefs).toContain("sobre.html");
  expect(hrefs).toContain("contato.html");
});

// ─────────────────────────────────────────────
// TESTE 4 — sobre.html: titulo e conteudo
// ─────────────────────────────────────────────
test("sobre.html deve ter o titulo 'Sobre' e mencionar DevOps", () => {
  carregarHTML("sobre.html");
  const titulo = document.querySelector("title");
  expect(titulo).not.toBeNull();
  expect(titulo.textContent).toBe("Sobre");

  const corpo = document.body.textContent;
  expect(corpo).toContain("DevOps");
});

// ─────────────────────────────────────────────
// TESTE 5 — contato.html: informacoes de contato
// ─────────────────────────────────────────────
test("contato.html deve exibir email e perfil do GitHub", () => {
  carregarHTML("contato.html");
  const corpo = document.body.textContent;
  expect(corpo).toContain("guilherme@email.com");
  expect(corpo).toContain("guilhermeArruda2005");
});

// ─────────────────────────────────────────────
// TESTE 6 — contato.html: titulo da pagina
// ─────────────────────────────────────────────
test("contato.html deve ter o titulo 'Contato'", () => {
  carregarHTML("contato.html");
  const titulo = document.querySelector("title");
  expect(titulo).not.toBeNull();
  expect(titulo.textContent).toBe("Contato");
});

// ─────────────────────────────────────────────
// TESTE 7 — rodape.html: copyright e autor
// ─────────────────────────────────────────────
test("rodape.html deve conter o copyright e o nome do autor", () => {
  carregarHTML("rodape.html");
  const corpo = document.body.textContent;
  expect(corpo).toContain("guilhermeArruda2005");
  expect(corpo).toContain("Todos os direitos reservados");
});

// ─────────────────────────────────────────────
// TESTE 8 — todas as paginas: link para style.css
// ─────────────────────────────────────────────
test.each(["index.html", "sobre.html", "contato.html", "rodape.html"])(
  "%s deve referenciar o arquivo style.css",
  (arquivo) => {
    carregarHTML(arquivo);
    const link = document.querySelector('link[rel="stylesheet"]');
    expect(link).not.toBeNull();
    expect(link.getAttribute("href")).toBe("style.css");
  }
);
