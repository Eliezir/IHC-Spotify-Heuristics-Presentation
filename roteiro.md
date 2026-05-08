# Roteiro — Inspeção Heurística do Spotify

**Disciplina:** Interação Humano-Computador (IHC)
**Curso:** Sistemas de Informação — IFAL
**Grupo:** Eliezir Moreira, Yury Galvão, Eduardo Calado, Thomas Gabriel
**Duração alvo:** 20 minutos

---

## Estrutura geral

| # | Bloco | Tempo | Slides |
|---|---|---|---|
| 0 | Abertura (capa) | 30s | 1 |
| 1 | Sumário | 30s | 1 |
| 2 | Avaliação Heurística — método | 2,5 min | 3 |
| 3 | As 10 heurísticas de Nielsen | 1,5 min | 1 |
| 4 | Como conduzimos a inspeção | 1,5 min | 2 |
| 5 | F1 — Busca de Música | 3 min | 5 |
| 6 | F2 — Gerenciamento de Playlists | 5 min | 7 |
| 7 | F3 — Mixagem (Edit Transition + Blend) | 3 min | 5 |
| 8 | Análise consolidada | 2 min | 3 |
| 9 | Conclusões e encerramento | 30s | 1 |

> Total: **29 slides** · A divisão de quem fala o quê fica para o grupo.

---

## Bloco 0 — Abertura (30s)

**Slide 1 — capa.** Título "Inspeção Heurística", subtítulo "Spotify — Mobile · ANDROID", grupo, disciplina.

> "Boa tarde. Somos Eliezir, Yury, Eduardo e Thomas, e hoje vamos apresentar a **inspeção heurística** que conduzimos sobre o aplicativo Spotify, dentro da disciplina de IHC. Avaliamos três funcionalidades centrais e identificamos 18 problemas de usabilidade — é deles que a gente vai falar."

---

## Bloco 1 — Sumário (30s)

**Slide 2 — sumário.** Lista visual dos 8 blocos.

---

## Bloco 2 — O que é avaliação heurística (2,5 min)

### Slide 3 — Definição
- Método de inspeção criado por **Jakob Nielsen** (1990).
- Avaliadores especialistas examinam a interface contra um conjunto de **princípios de usabilidade** (heurísticas).
- Não envolve usuários — é uma inspeção **por especialistas**.

> "Diferente de testes com usuários, a avaliação heurística é feita por avaliadores que comparam a interface contra um conjunto de princípios bem estabelecidos. É barato, rápido, e captura a maior parte dos problemas mais óbvios antes de gastar tempo de usuário real."

### Slide 4 — Por que usar
- **Sem usuários**: inspeção feita por especialistas, dispensa recrutamento.
- **Qualquer fase**: aplicável em wireframe, protótipo ou produto em produção.
- Custo baixo, executável rapidamente — recomendação de Nielsen é 3–5 avaliadores, ~1 dia de trabalho cada.
- Resultados acionáveis: cada problema vem com a heurística violada e severidade.

### Slide 5 — Severidade (escala 0–4)
- 0 — Não é problema
- 1 — Cosmético
- 2 — Menor
- 3 — Maior
- 4 — Catastrófico

---

## Bloco 3 — As 10 heurísticas de Nielsen (1,5 min)

### Slide 6 — Cards das 10 heurísticas
Card por heurística (H1 a H10), com nome curto e uma frase de definição. Destacar visualmente as 4 mais violadas no nosso estudo: **H1, H5, H7, H10**.

> "Nielsen consolidou 10 princípios. Em vez de ler todos, vamos focar nos quatro que mais aparecem nos problemas que encontramos — visibilidade do estado, reconhecimento em vez de memorização, projeto estético e ajuda/documentação."

---

## Bloco 4 — Como conduzimos (1,5 min)

### Slide 7 — Setup
- 4 avaliadores: Yury, Eduardo, Eliezir, Thomas.
- 3 funcionalidades: **Busca**, **Playlists**, **Mixagem**.
- Plataforma: Spotify mobile (ANDROID).
- Cada avaliador inspecionou os 3 blocos individualmente; depois, mesclamos duplicatas em reunião de calibração.

### Slide 8 — Métricas
- 33 problemas reportados (somando os 4 avaliadores).
- **18 problemas únicos** após mesclagem.
- 1 problema identificado pelos **4 avaliadores** (1.2).
- Severidade média: **2,9**.

---

## Bloco 5 — Funcionalidade 1: Busca de Música (3 min)

### Slide 9 — Visão geral da F1
4 problemas. Heurísticas dominantes: H1, H4, H6, H7.

### Slide 10 — Problema 1.1: Filtros só após confirmar busca (sev. 3)
- **Heurísticas:** H1, H4, H6
- Durante a digitação, preview em tempo real **sem filtros**. Filtros só aparecem após Enter.
- Três dores combinadas: inconsistência (H4), falta de visibilidade (H1), eficiência prejudicada (H6).
- **Solução:** chips de filtro horizontais já durante a digitação.

### Slide 11 — Problema 1.2: Diferenciação visual fraca (sev. 3 — **4 avaliadores**)
- **Heurísticas:** H4, H7, H8
- Resultados misturam música, artista, álbum, podcast, episódio, playlist com a mesma estrutura visual.
- Variantes da mesma música (áudio + vídeo + single) aparecem repetidas.
- **Solução:** agrupar por categoria, capa circular para artistas, colapsar variantes.

### Slide 12 — Problema 1.3: Limpar recentes ineficiente (sev. 2)
- **Heurísticas:** H3, H7
- Botão "Limpar pesquisas recentes" só no fim da lista — exige fechar teclado e rolar.
- **Solução:** reposicionar no topo da seção.

### Slide 13 — Problema 1.4: Histórico ocupa espaço excessivo (sev. 2)
- **Heurísticas:** H5
- Histórico empurra sugestões novas para baixo.
- **Solução:** ocultar pesquisas antigas ou limitar visualmente.

---

## Bloco 6 — Funcionalidade 2: Playlists (5 min)

### Slide 14 — Visão geral da F2
10 problemas — o bloco mais denso. 2 problemas com severidade **4** (privacidade e desfazer).

### Slide 15 — Problemas 2.1 a 2.4 (descobribilidade & visual)
- 2.1 Pastas sem personalização visual (sev. 2 · H4 H5 H7)
- 2.2 Menu da playlist com excesso de opções não agrupadas (sev. 3 · H4 H6 H7) — **3 avaliadores**
- 2.3 Carrossel horizontal de ações rápidas oculta opções (sev. 3 · H1 H5 H7)
- 2.4 Campo "Find in playlist" só via pull-down, sem indicador (sev. 3-4 · H1 H5 H6 H10)

### Slide 16 — Problema 2.5: Ausência de "Desfazer" ao remover músicas (sev. **4**)
- **Heurísticas:** H3, H4, H8
- Inconsistência interna: ao excluir pelo menu lateral, **sem desfazer**; ao excluir em "Editar Playlist", **com desfazer**.
- **Solução:** padronizar snackbar "Desfazer" em todos os fluxos.

### Slide 17 — Problemas 2.6 e 2.7 (ações finas)
- 2.6 Reordenação acidental durante scroll (sev. 3 · H3) — sem confirmação visual.
- 2.7 Ícones ⊖ e ☰ pouco intuitivos (sev. 2 · H5).

### Slide 18 — Problema 2.8: Ausência de seleção múltipla (sev. 2)
- **Heurística:** H6
- Não dá para remover/mover múltiplas faixas de uma vez.
- **Solução:** modo de seleção múltipla via toque longo.

### Slide 19 — Problema 2.9: Playlist pública por padrão (sev. **4**)
- **Heurísticas:** H1, H8
- Toda playlist criada nasce pública — sem opção de privacidade na criação.
- Severidade **4 por implicar privacidade**.
- **Solução:** seletor pública/privada na tela de criação.

### Slide 20 — Problema 2.10: Descrição/adicionar músicas mal posicionados (sev. 3)
- **Heurísticas:** H1, H4
- Descrição enterrada no menu horizontal.
- "Adicionar músicas" no rodapé, divergindo do padrão da busca global no topo.
- **Solução:** descrição direta na criação + posicionamento padronizado.

---

## Bloco 7 — Funcionalidade 3: Mixagem (3 min)

### Slide 21 — Visão geral da F3
4 problemas. 1 problema com severidade **4** (Premium sem mensagem clara).

### Slide 22 — Problema 3.1: Ausência de onboarding (sev. 3) — **3 avaliadores**
- **Heurísticas:** H1, H2, H5, H6, H10 (a heurística-recordista do estudo)
- **Edit Transition** usa termos técnicos (BPM, notação Camelot 11B/12B, formas de onda, "Smooth crossfade") sem explicação.
- **Blend** não explica como a mixagem é construída antes de criar a playlist.
- **Solução:** onboarding obrigatório no primeiro acesso + tooltips contextuais nos termos técnicos.

### Slide 23 — Problema 3.2: Limite oculto de intervalo na transição (sev. 3)
- **Heurísticas:** H1, H3
- Editor não mostra duração em segundos nem o motivo do limite.
- **Solução:** exibir duração e mensagem explicativa.

### Slide 24 — Problema 3.3: Recurso Premium sem mensagem clara (sev. **4**)
- **Heurísticas:** H1, H10
- Usuário free tenta usar a funcionalidade e recebe falha silenciosa, sem indicação de que é restrito.
- **Solução:** ícone de cadeado + tag "Premium" + mensagem explicativa antes do clique.

### Slide 25 — Problema 3.4: Blend exige muitas etapas (sev. 3)
- **Heurística:** H6
- Convidar pessoa + gerar playlist tem fricção desnecessária.
- **Solução:** reduzir o número de etapas e permitir convite direto via deep link.

---

## Bloco 8 — Análise consolidada (2 min)

### Slide 26 — Heurísticas mais violadas
Gráfico/ranking:
1. **H1 — Visibilidade do estado** — 8 problemas
2. **H5 — Reconhecimento vs memorização** — 7 problemas
3. **H7 — Projeto estético/minimalista** — 5 problemas
4. **H10 — Ajuda e documentação** — 3 problemas
5. H9 — Recuperação de erros — **0 problemas críticos** (heurística melhor atendida)

### Slide 27 — Distribuição por severidade
- Sev. 4 — 3 problemas (privacidade, desfazer, Premium)
- Sev. 3 — 11 problemas
- Sev. 2 — 4 problemas
- Sev. 1 — 0
- 1 caso oscilando entre 3 e 4 (Problema 2.4).

### Slide 28 — Padrões e trade-offs
- Spotify é **maduro visualmente**, mas peca em **descoberta de funcionalidades**.
- **Inconsistências internas** importantes (desfazer existe num fluxo mas não em outro; filtros aparecem num estado mas não em outro).
- Recursos avançados (mixagem, Blend, transições) carecem de **mediação para usuários não-técnicos**.
- Trade-off central: **minimalismo estético × descobribilidade**.

---

## Bloco 9 — Encerramento (30s)

### Slide 29 — Obrigado
"Obrigado. Aberto a perguntas."

---

## Notas de execução

- **Imagens:** quando possível, anexar screenshot ou wireframe do problema. Por enquanto, slides são textuais — espaço reservado em cada problema para inserir imagem depois.
- **Timing:** se ultrapassar, o bloco que mais comprime sem perda é o 5 (descobribilidade da F2 — slides 15 e 17 podem virar listagem rápida).
- **Distribuição sugerida (4 falantes):**
  - Eliezir: blocos 0 + 5 (intro + Busca)
  - Eduardo: bloco 4 + 6 parte 1 (método + 2.1–2.5)
  - Yury: bloco 6 parte 2 + 8 (2.6–2.10 + análise)
  - Thomas: bloco 7 + 9 (Mixagem + encerramento)
