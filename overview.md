# Consolidação dos Relatórios — Inspeção Heurística do Spotify

## Visão Geral

| Avaliador | Problemas reportados originalmente |
|---|---|
| Yury Galvão | 9 (3 blocos × 3 heurísticas) |
| Eduardo Calado | 9 (múltiplos por bloco) |
| Eliezir | 8 |
| Thomas Gabriel | 7 |

**Total após mesclagem de duplicatas: 18 problemas únicos**

Após a consolidação, os 4 avaliadores atribuíram severidade individual a todos os 18 problemas. As severidades finais apresentadas neste relatório correspondem à média das avaliações, arredondada ao inteiro mais próximo.

---

## FUNCIONALIDADE 1 — BUSCA DE MÚSICA

### Problema 1.1 — Filtros de busca só aparecem após confirmar pesquisa, sem indicação clara do comportamento
- **Identificado por:** Eliezir, Eduardo
- **Heurísticas violadas:** H1, H4, H6
- **Severidade final:** 2
- **Descrição:** A funcionalidade de busca apresenta um comportamento inconsistente em relação aos filtros por categoria (Músicas, Artistas, Álbuns, Playlists, Podcasts). Durante a digitação, o sistema exibe **preview em tempo real** dos resultados, porém **sem nenhum filtro disponível** — o usuário recebe uma lista única e mesclada de todos os tipos de conteúdo. Os filtros só se tornam visíveis após o usuário pressionar Enter (ou tocar em "ver todos os resultados"), confirmando a busca.

  Esse comportamento gera três problemas combinados:
  1. **Inconsistência de estado (H4):** o mesmo campo de busca apresenta dois comportamentos distintos — um durante a digitação (sem filtros) e outro após confirmação (com filtros) — sem indicação visual dessa diferença.
  2. **Falta de visibilidade (H1):** o preview em tempo real sugere que a busca está "completa" e funcional, levando o usuário a acreditar que aquela é a tela final de resultados.
  3. **Eficiência prejudicada (H6):** usuários que sabem exatamente o tipo de conteúdo que querem (ex: apenas álbuns) não têm como filtrar durante a digitação.
- **Solução:** Exibir os filtros de categoria (chips horizontais) já durante a digitação, logo abaixo do campo de busca, mantendo o preview em tempo real adaptado ao filtro selecionado.

### Problema 1.2 — Diferenciação visual fraca entre tipos de resultado
- **Identificado por:** Eliezir, Yury, Eduardo, Thomas (**4 avaliadores**)
- **Heurísticas violadas:** H4, H7, H8
- **Severidade final:** 3
- **Descrição:** Resultados exibidos com mesma estrutura visual (capa quadrada + texto), diferenciados apenas por label textual pequeno. Mistura músicas, artistas, álbuns, podcasts, episódios e playlists em sequência única. Múltiplas entradas da mesma música (áudio, vídeo, single) aparecem sem agrupamento, gerando redundância.
- **Solução:** Agrupar por categoria + diferenciar visualmente (ícones distintivos, capa circular para artistas) + colapsar variantes da mesma música.

### Problema 1.3 — Acesso ineficiente ao botão "Limpar pesquisas recentes"
- **Identificado por:** Eliezir
- **Heurísticas violadas:** H3, H7
- **Severidade final:** 2
- **Descrição:** Botão posicionado no final da lista, exigindo fechar teclado e rolar até o fim.
- **Solução:** Reposicionar no topo da seção.

### Problema 1.4 — Histórico de pesquisas ocupa espaço excessivo
- **Identificado por:** Yury
- **Heurísticas violadas:** H5
- **Severidade final:** 1
- **Descrição:** O histórico de pesquisas recentes ocupa grande espaço visual e dificulta o reconhecimento rápido de novas sugestões.
- **Solução:** Ocultar pesquisas antigas automaticamente ou limitar visualmente.

---

## FUNCIONALIDADE 2 — GERENCIAMENTO DE PLAYLISTS

### Problema 2.1 — Pastas sem personalização visual
- **Identificado por:** Eliezir
- **Heurísticas violadas:** H4, H5, H7
- **Severidade final:** 1
- **Descrição:** Pastas exibidas com ícone genérico, sem possibilidade de cor/ícone/capa personalizada — em contraste com playlists que aceitam capa.
- **Solução:** Permitir cor, ícone temático ou capa personalizada para pastas, seguindo padrão já adotado para playlists.

### Problema 2.2 — Excesso de opções não agrupadas no menu da playlist
- **Identificado por:** Eliezir, Thomas, Yury
- **Heurísticas violadas:** H4, H6, H7
- **Severidade final:** 3
- **Descrição:** Menu de três pontos abre drawer com 12+ opções sem agrupamento, hierarquia ou destaque para ações destrutivas. O próprio menu não indica visualmente que há mais itens além dos visíveis (scroll oculto).
- **Solução:** Agrupar por categoria + indicador de scroll + destaque para ações destrutivas.

### Problema 2.3 — Carrossel horizontal de ações rápidas oculta opções
- **Identificado por:** Eliezir
- **Heurísticas violadas:** H1, H5, H7
- **Severidade final:** 1
- **Descrição:** Barra de "ações rápidas" (Add, Mix, Edit, Sort) apresentada como carrossel horizontal sem affordance clara de scroll.
- **Solução:** Adicionar gradiente ou chevron indicando rolagem, ou reorganizar como grid de 2 linhas.

### Problema 2.4 — Campo de busca interno da playlist oculto
- **Identificado por:** Eliezir
- **Heurísticas violadas:** H1, H5, H6, H10
- **Severidade final:** 2
- **Descrição:** Campo "Find in playlist" só acessível via gesto de pull-down, sem nenhum indicador visual de existência.
- **Solução:** Tornar o campo de busca persistentemente visível no cabeçalho da playlist, ou adicionar ícone de lupa fixo.

### Problema 2.5 — Ausência de confirmação/desfazer ao remover músicas
- **Identificado por:** Yury, Eduardo
- **Heurísticas violadas:** H3, H4, H8
- **Severidade final:** 3
- **Descrição:** Ao excluir pelo menu lateral da música, não há "Desfazer". Ao excluir pela tela "Editar Playlist", há snackbar com "Desfazer". **Inconsistência interna importante** entre os dois fluxos.
- **Solução:** Padronizar snackbar "Desfazer" em todos os fluxos de exclusão.

### Problema 2.6 — Reordenação acidental durante scroll
- **Identificado por:** Yury
- **Heurísticas violadas:** H3
- **Severidade final:** 2
- **Descrição:** Ao reorganizar músicas manualmente, o usuário pode mover faixas acidentalmente durante o scroll rápido.
- **Solução:** Confirmação visual temporária com opção de desfazer.

### Problema 2.7 — Ícones de remoção e reordenação pouco intuitivos
- **Identificado por:** Thomas
- **Heurísticas violadas:** H5
- **Severidade final:** 1
- **Descrição:** Ícone ⊖ (círculo com traço) para remover e ☰ (três linhas) para reordenar não são autoexplicativos.
- **Solução:** Substituir por X/lixeira e setas para cima/baixo.

### Problema 2.8 — Ausência de seleção múltipla
- **Identificado por:** Thomas
- **Heurísticas violadas:** H6
- **Severidade final:** 1
- **Descrição:** Não é possível selecionar múltiplas músicas para remover/mover em lote, dificultando organização de playlists longas.
- **Solução:** Modo de seleção múltipla via toque longo.

### Problema 2.9 — Playlist criada como pública por padrão sem opção na criação
- **Identificado por:** Thomas
- **Heurísticas violadas:** H1, H8
- **Severidade final:** 2
- **Descrição:** Playlist sempre criada como pública, sem que o usuário possa definir privacidade no momento da criação. Embora seja possível alterar a privacidade depois nas configurações, a ausência da opção no fluxo de criação pode levar a exposições não intencionais.
- **Solução:** Incluir opção pública/privada na tela de criação.

### Problema 2.10 — Campos "Adicionar descrição" e "Adicionar músicas" mal posicionados
- **Identificado por:** Eduardo
- **Heurísticas violadas:** H1, H4
- **Severidade final:** 1
- **Descrição:** Opção de adicionar descrição está oculta dentro do menu horizontal. Campo "Adicionar músicas" fica no rodapé, divergindo do padrão da busca global no topo.
- **Solução:** Incluir descrição diretamente na criação/edição principal e padronizar posicionamento dos campos de busca.

---

## FUNCIONALIDADE 3 — MIXAGEM DE PLAYLISTS

### Problema 3.1 — Ausência geral de onboarding em recursos avançados de mixagem
- **Identificado por:** Eliezir, Thomas, Yury
- **Heurísticas violadas:** H1, H2, H5, H6, H10
- **Severidade final:** 3
- **Descrição:** Os recursos avançados de mixagem do Spotify — tanto **Edit Transition** (transições entre faixas) quanto **Blend** (playlist combinada entre amigos) — são apresentados sem onboarding, tooltip ou documentação contextual.

  No **Edit Transition**, a interface é densa e tecnicamente avançada, com termos especializados (BPM, notação Camelot 11B/12B, formas de onda, "Smooth crossfade", "fade in", "fade out", "crossover") que demandam conhecimento prévio de teoria musical e técnicas de DJ.

  No **Blend**, o sistema não explica como a mixagem funciona antes da criação da playlist compartilhada, deixando o usuário sem entender quais critérios serão utilizados, nem as diferenças entre "Blend", playlists colaborativas e compartilhadas.
- **Solução:** Onboarding obrigatório no primeiro acesso a cada recurso + tooltips contextuais nos termos técnicos + explicação resumida antes da criação do Blend mostrando como as músicas serão selecionadas.

### Problema 3.2 — Limite oculto de intervalo editável na transição
- **Identificado por:** Thomas
- **Heurísticas violadas:** H1, H3
- **Severidade final:** 2
- **Descrição:** Editor de transição possui limite oculto de intervalo editável sem exibir duração em segundos nem indicar o motivo do limite.
- **Solução:** Exibir duração em segundos + mensagem explicativa do limite.

### Problema 3.3 — Recurso Premium sem mensagem clara para usuários free
- **Identificado por:** Eduardo
- **Heurísticas violadas:** H1, H10
- **Severidade final:** 1
- **Descrição:** Mixagem é restrita a Premium, mas o sistema não informa claramente essa restrição quando o usuário tenta acessar.
- **Solução:** Ícone de cadeado/tag "Premium" + mensagem explicativa.

### Problema 3.4 — Processo de Blend exige muitas etapas
- **Identificado por:** Yury
- **Heurísticas violadas:** H6
- **Severidade final:** 3
- **Descrição:** Múltiplas etapas para convidar pessoa e gerar Blend, tornando funcionalidade pouco eficiente.
- **Solução:** Reduzir quantidade de etapas para compartilhar e gerar a playlist.

---

## TABELA-RESUMO CONSOLIDADA

| ID | Problema | Heurísticas | Severidade | Identificado por |
|---|---|---|---|---|
| 1.1 | Filtros só aparecem após confirmar busca (inconsistência com preview) | H1, H4, H6 | 2 | Eliezir, Eduardo |
| 1.2 | Diferenciação visual fraca entre resultados | H4, H7, H8 | 3 | **4 avaliadores** |
| 1.3 | Botão limpar recentes ineficiente | H3, H7 | 2 | Eliezir |
| 1.4 | Histórico ocupa espaço excessivo | H5 | 1 | Yury |
| 2.1 | Pastas sem personalização visual | H4, H5, H7 | 1 | Eliezir |
| 2.2 | Menu da playlist com excesso de opções | H4, H6, H7 | 3 | Eliezir, Thomas, Yury |
| 2.3 | Carrossel de ações rápidas oculta opções | H1, H5, H7 | 1 | Eliezir |
| 2.4 | Busca interna da playlist oculta | H1, H5, H6, H10 | 2 | Eliezir |
| 2.5 | Ausência de confirmação/desfazer ao remover | H3, H4, H8 | 3 | Yury, Eduardo |
| 2.6 | Reordenação acidental durante scroll | H3 | 2 | Yury |
| 2.7 | Ícones de remover/reordenar pouco intuitivos | H5 | 1 | Thomas |
| 2.8 | Ausência de seleção múltipla | H6 | 1 | Thomas |
| 2.9 | Playlist pública por padrão sem opção na criação | H1, H8 | 2 | Thomas |
| 2.10 | Descrição/adicionar músicas mal posicionados | H1, H4 | 1 | Eduardo |
| 3.1 | Ausência de onboarding em recursos de mixagem (Edit Transition + Blend) | H1, H2, H5, H6, H10 | 3 | Eliezir, Thomas, Yury |
| 3.2 | Limite oculto de intervalo editável | H1, H3 | 2 | Thomas |
| 3.3 | Restrição Premium sem mensagem clara | H1, H10 | 1 | Eduardo |
| 3.4 | Processo de Blend com muitas etapas | H6 | 3 | Yury |

---

## DISTRIBUIÇÃO POR SEVERIDADE

| Severidade | Qtd. | Problemas |
|---|---|---|
| **3 — Problema maior** | 5 | 1.2, 2.2, 2.5, 3.1, 3.4 |
| **2 — Problema menor** | 6 | 1.1, 1.3, 2.4, 2.6, 2.9, 3.2 |
| **1 — Problema cosmético** | 7 | 1.4, 2.1, 2.3, 2.7, 2.8, 2.10, 3.3 |
| **4 — Catastrófico** | 0 | — |

A inspeção não identificou problemas catastróficos (severidade 4), o que reforça a maturidade geral do produto. No entanto, os 5 problemas com severidade 3 indicam fricções relevantes que afetam diretamente a eficiência de uso e a descoberta de funcionalidades importantes.

---

## AVALIAÇÃO DO SISTEMA COMO UM TODO

**Heurísticas mais violadas (em ordem de frequência, considerando todos os 18 problemas):**
1. **H1 — Visibilidade do estado do sistema** (1.1, 2.3, 2.4, 2.9, 2.10, 3.1, 3.2, 3.3) — 8 ocorrências
2. **H5 — Reconhecimento em vez de memorização** (1.2, 1.4, 2.1, 2.3, 2.4, 2.7, 3.1) — 7 ocorrências
3. **H4 — Consistência e padronização** (1.1, 1.2, 2.1, 2.2, 2.5, 2.10) — 6 ocorrências
4. **H6 — Flexibilidade e eficiência de uso** (1.1, 2.2, 2.4, 2.8, 3.1, 3.4) — 6 ocorrências
5. **H7 — Projeto estético e minimalista** (1.2, 1.3, 2.1, 2.2, 2.3) — 5 ocorrências

**Heurísticas violadas pelos 5 problemas mais graves (severidade 3):**
- **H4** — Consistência e padronização (1.2, 2.2, 2.5)
- **H6** — Flexibilidade e eficiência de uso (2.2, 3.1, 3.4)
- **H7** — Projeto estético e minimalista (1.2, 2.2)
- **H8** — Prevenção de erros (1.2, 2.5)
- **H10** — Ajuda e documentação (3.1)

**Heurística melhor atendida:** H9 — Recuperação de erros (nenhum problema crítico identificado).

**Conclusões:**
- Spotify é um produto maduro visualmente, mas peca em **descoberta de funcionalidades**, especialmente em recursos avançados que dependem de gestos não-anunciados ou interfaces densas sem mediação.
- Há **inconsistências internas** importantes — por exemplo, "Desfazer" existe em um fluxo de exclusão mas não em outro; filtros aparecem em um estado da busca mas não em outro. Essas inconsistências geraram parte significativa dos problemas mais graves.
- Recursos avançados (Edit Transition, Blend) carecem de **mediação para usuários não-técnicos**, com termos especializados e fluxos extensos sem apoio contextual.
- Trade-off central observado: **minimalismo estético × descobribilidade**. A busca por interfaces limpas frequentemente esconde funcionalidades úteis atrás de gestos ou menus secundários.

---

## PRÓXIMOS PASSOS

1. Finalização do relatório consolidado em formato Word/PDF para entrega
2. Preparação da apresentação em slides com os principais achados
3. Distribuição da apresentação entre os 4 integrantes da equipe