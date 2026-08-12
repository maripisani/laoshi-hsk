# 老师 · Laoshi — Guia de Instalação e Deploy

## O que você vai precisar instalar (uma única vez)

1. **Node.js** → https://nodejs.org → clique em "LTS" e instale
2. **GitHub Desktop** → https://desktop.github.com → instale e faça login com sua conta GitHub

---

## Passo a Passo

### ETAPA 1 — Criar o repositório no GitHub

1. Abra o **GitHub Desktop**
2. Clique em **File → New Repository**
3. Preencha:
   - **Name:** `laoshi-hsk` *(ou o nome que preferir — anote!)*
   - **Local path:** escolha uma pasta no seu computador
   - Deixe o restante como está
4. Clique em **Create Repository**

---

### ETAPA 2 — Configurar o nome do repositório no projeto

⚠️ Abra o arquivo `vite.config.js` num editor de texto (ex: Bloco de Notas, VS Code).

Encontre esta linha:
```
base: '/laoshi-hsk/',
```

Substitua `laoshi-hsk` pelo nome exato do repositório que você criou.

Exemplo: se chamou de `meu-mandarim`, fica:
```
base: '/meu-mandarim/',
```

Salve o arquivo.

---

### ETAPA 3 — Copiar os arquivos para a pasta do repositório

No GitHub Desktop, clique em **Show in Explorer** (Windows) ou **Show in Finder** (Mac).

Copie **todos** os arquivos e pastas deste projeto para dentro da pasta que abriu:
```
laoshi-app/
├── .github/
├── src/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

### ETAPA 4 — Publicar no GitHub

1. De volta no **GitHub Desktop**, você verá todos os arquivos listados em "Changes"
2. Na caixa **Summary** (embaixo à esquerda), escreva: `Versão inicial`
3. Clique em **Commit to main**
4. Clique em **Publish repository** (ou **Push origin**)
5. Na janela que aparecer, **desmarque** "Keep this code private" se quiser que o site seja público
6. Clique em **Publish Repository**

---

### ETAPA 5 — Habilitar GitHub Pages

1. Vá para https://github.com/SEU_USUARIO/laoshi-hsk
2. Clique na aba **Settings** (engrenagem)
3. No menu lateral, clique em **Pages**
4. Em **Branch**, selecione `gh-pages` e clique em **Save**

Aguarde **2 a 5 minutos**. O GitHub vai:
- Rodar o build automaticamente (pode acompanhar em **Actions**)
- Publicar o site

---

### ETAPA 6 — Acessar o site

Seu site estará em:
```
https://SEU_USUARIO.github.io/laoshi-hsk/
```

---

## Como atualizar o site no futuro

1. Edite qualquer arquivo na pasta do projeto
2. Abra o **GitHub Desktop**
3. Escreva um resumo da mudança e clique em **Commit to main**
4. Clique em **Push origin**

O GitHub reconstrói e publica automaticamente em alguns minutos. ✅

---

## Estrutura do projeto

```
src/
├── App.jsx                  ← roteamento principal
├── main.jsx                 ← entrada React
├── components/
│   ├── Layout.jsx           ← botão "← Início"
│   ├── LaoshiVocab.jsx      ← vocabulário completo HSK 1-9
│   ├── HSK2Completo.jsx     ← programa HSK 2 (12 semanas)
│   ├── HSK3Completo.jsx     ← programa HSK 3 (12 semanas)
│   ├── HSK4Completo.jsx     ← programa HSK 4 (12 semanas)
│   ├── HSK5Completo.jsx     ← programa HSK 5 (12 semanas)
│   └── HSK6Completo.jsx     ← programa HSK 6 (12 semanas)
└── pages/
    └── Dashboard.jsx        ← tela inicial com os cards
```
