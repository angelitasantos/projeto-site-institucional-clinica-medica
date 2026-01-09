# Clinic Medical – Template Reutilizável para Clínicas

Este projeto é um **template institucional reutilizável** desenvolvido com **HTML, CSS e JavaScript puro**, pensado para clínicas médicas (e empresas similares) que precisam de um site:

* profissional
* fácil de manter
* rápido
* sem dependência de frameworks

Todo o conteúdo textual, imagens e cores podem ser alterados **sem modificar o HTML**, utilizando apenas um arquivo JSON.

---

## 🧰 Tecnologias Utilizadas

* **HTML5**
  Estrutura semântica, limpa e organizada

* **CSS3**

  * Flexbox para layout
  * Variáveis CSS (`:root`) para controle de cores
  * Media Queries para responsividade
  * Sem Bootstrap ou frameworks externos

* **JavaScript**

  * Fetch API para carregar conteúdo dinâmico
  * Manipulação de DOM
  * Arquitetura simples e defensiva

* **JSON**

  * Centraliza textos, imagens, menus e configurações de tema

---

## 📁 Estrutura de Pastas

```
project-root/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   └── main.js
│
├── data/
│   └── content.json
│
└── img/
    ├── logo.png
    ├── banner.jpg
    └── images...
```

---

## 🎯 Conceito do Projeto

O projeto foi pensado para ser:

* **reutilizável** (troca de cliente sem refazer layout)
* **customizável** (cores, textos e imagens via JSON)
* **estável** (sem dependência de bibliotecas externas)
* **didático** (fácil de entender por outros devs)

A ideia central é:

> *“O HTML define a estrutura, o CSS define o visual e o JSON define o conteúdo.”*

---

## 🎨 Sistema de Cores (Tema)

As cores são controladas por **variáveis CSS**, permitindo adaptação rápida para outras empresas.

No `styles.css`:

```css
:root {
    --primary: #00688B;
    --primary2: #009ACD;
    --primary3: #00BFFF;
    --secondary: #01014d;
    --info: #727272;
}
```

Para mudar a identidade visual de uma empresa, basta alterar esses valores.

---

## 📝 Conteúdo Dinâmico com JSON

Todo o conteúdo está centralizado em:

```
data/content.json
```

Exemplos do que pode ser alterado sem mexer no HTML:

* Nome da clínica
* Logo
* Menu de navegação
* Textos do banner
* Cards do banner
* Notícias
* Sidebar (departamentos, contatos)
* Texto do rodapé

Isso facilita:

* reutilização do template
* manutenção
* trabalho em equipe

---

## ⚙️ Funcionamento do JavaScript

O arquivo `main.js` é responsável por:

* carregar o JSON (`fetch`)
* aplicar tema
* injetar textos e imagens
* montar seções dinâmicas (banner, news, sidebar)

Exemplo simplificado:

```js
fetch('./data/content.json')
    .then(res => res.json())
    .then(data => {
        applyTheme(data.theme);
        loadSite(data);
        loadNews(data.news);
        loadSidebar(data.sidebar);
    });
```

O JS foi escrito de forma **defensiva**, evitando dependência rígida do HTML.

---

## 📱 Responsividade

O layout foi pensado **mobile-first**, com ajustes específicos para telas menores:

* Header reorganizado no mobile
* Menu abaixo da logo
* Banner adaptável
* News e sidebar em coluna

Tudo feito apenas com **CSS puro**.

---

## 🔁 Como Reutilizar para Outra Empresa

1. **Copie o projeto**
2. Substitua imagens na pasta `/img`
3. Edite o arquivo `data/content.json`

   * nome da empresa
   * textos
   * imagens
   * horários
4. Ajuste as cores no `data/content.json`
5. Pronto 🎉

Nenhuma alteração estrutural no HTML é necessária.

---

## 👥 Para Outros Desenvolvedores

Este projeto é ideal para:

* estudo de arquitetura front-end
* base para sites institucionais
* templates white-label
* projetos sem dependência de frameworks

O código prioriza:

* clareza
* organização
* manutenção
* previsibilidade

---

## 🚀 Possíveis Evoluções

* Menu mobile com botão (hamburger)
* Acessibilidade (ARIA)
* SEO avançado
* Dark mode
* CMS simples baseado em JSON

---

## 📄 Licença

Projeto livre para uso, estudo e adaptação.

---

💡 *Este template foi pensado para crescer junto com o desenvolvedor — simples no início, sólido na base.*
