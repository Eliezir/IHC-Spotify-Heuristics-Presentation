# Consolidação dos Relatórios — Inspeção Heurística do Spotify

## Visão Geral

| Avaliador | Problemas reportados |
|---|---|
| Yury Galvão | 9 (3 blocos × 3 heurísticas) |
| Eduardo Calado | 9 (múltiplos por bloco) |
| Eliezir | 8 |
| Thomas Gabriel | 7 |

**Total após mesclagem de duplicatas: 18 problemas únicos**

---

## FUNCIONALIDADE 1 — BUSCA DE MÚSICA

### Problema 1.1 — Filtros de busca só aparecem após confirmar pesquisa, sem indicação clara do comportamento
- **Identificado por:** Eliezir, Eduardo
- **Heurísticas violadas:** H1, H4, H6
- **Severidade proposta:** 3
- **Descrição:** A funcionalidade de busca apresenta um comportamento inconsistente em relação aos filtros por categoria (Músicas, Artistas, Álbuns, Playlists, Podcasts). Durante a digitação, o sistema exibe **preview em tempo real** dos resultados, porém **sem nenhum filtro disponível** — o usuário recebe uma lista única e mesclada de todos os tipos de conteúdo. Os filtros só se tornam visíveis após o usuário pressionar Enter (ou tocar em "ver todos os resultados"), confirmando a busca.

  Esse comportamento gera três problemas combinados:
  1. **Inconsistência de estado (H4):** o mesmo campo de busca apresenta dois comportamentos distintos — um durante a digitação (sem filtros) e outro após confirmação (com filtros) — sem indicação visual dessa diferença.
  2. **Falta de visibilidade (H1):** o preview em tempo real sugere que a busca está "completa" e funcional, levando o usuário a acreditar que aquela é a tela final de resultados.
  3. **Eficiência prejudicada (H6):** usuários que sabem exatamente o tipo de conteúdo que querem (ex: apenas álbuns) não têm como filtrar durante a digitação.
- **Solução:** Exibir os filtros de categoria (chips horizontais) já durante a digitação, logo abaixo do campo de busca, mantendo o preview em tempo real adaptado ao filtro selecionado.

### Problema 1.2 — Diferenciação visual fraca entre tipos de resultado
- **Identificado por:** Eliezir, Yury, Eduardo, Thomas (**4 avaliadores**)
- **Heurísticas violadas:** H4, H7, H8
- **Severidade proposta:** 3
- **Descrição:** Resultados exibidos com mesma estrutura visual (capa quadrada + texto), diferenciados apenas por label textual pequeno. Mistura músicas, artistas, álbuns, podcasts, episódios e playlists em sequência única. Múltiplas entradas da mesma música (áudio, vídeo, single) aparecem sem agrupamento, gerando redundância.
- **Solução:** Agrupar por categoria + diferenciar visualmente (ícones distintivos, capa circular para artistas) + colapsar variantes da mesma música.

### Problema 1.3 — Acesso ineficiente ao botão "Limpar pesquisas recentes"
- **Identificado por:** Eliezir
- **Heurísticas violadas:** H3, H7
- **Severidade proposta:** 2
- **Descrição:** Botão posicionado no final da lista, exigindo fechar teclado e rolar até o fim.
- **Solução:** Reposicionar no topo da seção.

### Problema 1.4 — Histórico de pesquisas ocupa espaço excessivo
- **Identificado por:** Yury
- **Heurísticas violadas:** H5
- **Severidade proposta:** 2
- **Descrição:** O histórico de pesquisas recentes ocupa grande espaço visual e dificulta o reconhecimento rápido de novas sugestões.
- **Solução:** Ocultar pesquisas antigas automaticamente ou limitar visualmente.

---

## FUNCIONALIDADE 2 — GERENCIAMENTO DE PLAYLISTS

### Problema 2.1 — Pastas sem personalização visual
- **Identificado por:** Eliezir
- **Heurísticas violadas:** H4, H5, H7
- **Severidade proposta:** 2
- **Descrição:** Pastas exibidas com ícone genérico, sem possibilidade de cor/ícone/capa personalizada — em contraste com playlists que aceitam capa.

### Problema 2.2 — Excesso de opções não agrupadas no menu da playlist
- **Identificado por:** Eliezir, Thomas, Yury
- **Heurísticas violadas:** H4, H6, H7
- **Severidade proposta:** 3
- **Descrição:** Menu de três pontos abre drawer com 12+ opções sem agrupamento, hierarquia ou destaque para ações destrutivas. O próprio menu não indica visualmente que há mais itens além dos visíveis (scroll oculto).
- **Solução:** Agrupar por categoria + indicador de scroll + destaque para ações destrutivas.

### Problema 2.3 — Carrossel horizontal de ações rápidas oculta opções
- **Identificado por:** Eliezir
- **Heurísticas violadas:** H1, H5, H7
- **Severidade proposta:** 3
- **Descrição:** Barra de "ações rápidas" (Add, Mix, Edit, Sort) apresentada como carrossel horizontal sem affordance clara de scroll.

### Problema 2.4 — Campo de busca interno da playlist oculto
- **Identificado por:** Eliezir
- **Heurísticas violadas:** H1, H5, H6, H10
- **Severidade proposta:** 3-4
- **Descrição:** Campo "Find in playlist" só acessível via gesto de pull-down, sem nenhum indicador visual de existência.

### Problema 2.5 — Ausência de confirmação/desfazer ao remover músicas
- **Identificado por:** Yury, Eduardo
- **Heurísticas violadas:** H3, H4, H8
- **Severidade proposta:** 4
- **Descrição:** Ao excluir pelo menu lateral da música, não há "Desfazer". Ao excluir pela tela "Editar Playlist", há snackbar com "Desfazer". **Inconsistência interna importante** entre os dois fluxos.
- **Solução:** Padronizar snackbar "Desfazer" em todos os fluxos de exclusão.

### Problema 2.6 — Reordenação acidental durante scroll
- **Identificado por:** Yury
- **Heurísticas violadas:** H3
- **Severidade proposta:** 3
- **Descrição:** Ao reorganizar músicas manualmente, o usuário pode mover faixas acidentalmente durante o scroll rápido.
- **Solução:** Confirmação visual temporária com opção de desfazer.

### Problema 2.7 — Ícones de remoção e reordenação pouco intuitivos
- **Identificado por:** Thomas
- **Heurísticas violadas:** H5
- **Severidade proposta:** 2
- **Descrição:** Ícone ⊖ (círculo com traço) para remover e ☰ (três linhas) para reordenar não são autoexplicativos.
- **Solução:** Substituir por X/lixeira e setas para cima/baixo.

### Problema 2.8 — Ausência de seleção múltipla
- **Identificado por:** Thomas
- **Heurísticas violadas:** H6
- **Severidade proposta:** 2
- **Descrição:** Não é possível selecionar múltiplas músicas para remover/mover em lote, dificultando organização de playlists longas.
- **Solução:** Modo de seleção múltipla via toque longo.

### Problema 2.9 — Playlist criada como pública por padrão sem opção na criação
- **Identificado por:** Thomas
- **Heurísticas violadas:** H1, H8
- **Severidade proposta:** 4
- **Descrição:** Playlist sempre criada como pública, sem que o usuário possa definir privacidade no momento da criação. Por envolver privacidade, severidade alta.
- **Solução:** Incluir opção pública/privada na tela de criação.

### Problema 2.10 — Campos "Adicionar descrição" e "Adicionar músicas" mal posicionados
- **Identificado por:** Eduardo
- **Heurísticas violadas:** H1, H4
- **Severidade proposta:** 3
- **Descrição:** Opção de adicionar descrição está oculta dentro do menu horizontal. Campo "Adicionar músicas" fica no rodapé, divergindo do padrão da busca global no topo.
- **Solução:** Incluir descrição diretamente na criação/edição principal e padronizar posicionamento dos campos de busca.

---

## FUNCIONALIDADE 3 — MIXAGEM DE PLAYLISTS

### Problema 3.1 — Ausência geral de onboarding em recursos avançados de mixagem
- **Identificado por:** Eliezir, Thomas, Yury
- **Heurísticas violadas:** H1, H2, H5, H6, H10
- **Severidade proposta:** 3
- **Descrição:** Os recursos avançados de mixagem do Spotify — tanto **Edit Transition** (transições entre faixas) quanto **Blend** (playlist combinada entre amigos) — são apresentados sem onboarding, tooltip ou documentação contextual.

  No **Edit Transition**, a interface é densa e tecnicamente avançada, com termos especializados (BPM, notação Camelot 11B/12B, formas de onda, "Smooth crossfade", "fade in", "fade out", "crossover") que demandam conhecimento prévio de teoria musical e técnicas de DJ.

  No **Blend**, o sistema não explica como a mixagem funciona antes da criação da playlist compartilhada, deixando o usuário sem entender quais critérios serão utilizados, nem as diferenças entre "Blend", playlists colaborativas e compartilhadas.
- **Solução:** Onboarding obrigatório no primeiro acesso a cada recurso + tooltips contextuais nos termos técnicos + explicação resumida antes da criação do Blend mostrando como as músicas serão selecionadas.

### Problema 3.2 — Limite oculto de intervalo editável na transição
- **Identificado por:** Thomas
- **Heurísticas violadas:** H1, H3
- **Severidade proposta:** 3
- **Descrição:** Editor de transição possui limite oculto de intervalo editável sem exibir duração em segundos nem indicar o motivo do limite.
- **Solução:** Exibir duração em segundos + mensagem explicativa do limite.

### Problema 3.3 — Recurso Premium sem mensagem clara para usuários free
- **Identificado por:** Eduardo
- **Heurísticas violadas:** H1, H10
- **Severidade proposta:** 4
- **Descrição:** Mixagem é restrita a Premium, mas o sistema não informa claramente essa restrição quando o usuário tenta acessar.
- **Solução:** Ícone de cadeado/tag "Premium" + mensagem explicativa.

### Problema 3.4 — Processo de Blend exige muitas etapas
- **Identificado por:** Yury
- **Heurísticas violadas:** H6
- **Severidade proposta:** 3
- **Descrição:** Múltiplas etapas para convidar pessoa e gerar Blend, tornando funcionalidade pouco eficiente.
- **Solução:** Reduzir quantidade de etapas para compartilhar e gerar a playlist.

---

## TABELA-RESUMO CONSOLIDADA

| ID | Problema | Heurísticas | Severidade | Identificado por |
|---|---|---|---|---|
| 1.1 | Filtros só aparecem após confirmar busca (inconsistência com preview) | H1, H4, H6 | 3 | Eliezir, Eduardo |
| 1.2 | Diferenciação visual fraca entre resultados | H4, H7, H8 | 3 | **4 avaliadores** |
| 1.3 | Botão limpar recentes ineficiente | H3, H7 | 2 | Eliezir |
| 1.4 | Histórico ocupa espaço excessivo | H5 | 2 | Yury |
| 2.1 | Pastas sem personalização visual | H4, H5, H7 | 2 | Eliezir |
| 2.2 | Menu da playlist com excesso de opções | H4, H6, H7 | 3 | Eliezir, Thomas, Yury |
| 2.3 | Carrossel de ações rápidas oculta opções | H1, H5, H7 | 3 | Eliezir |
| 2.4 | Busca interna da playlist oculta | H1, H5, H6, H10 | 3-4 | Eliezir |
| 2.5 | Ausência de confirmação/desfazer ao remover | H3, H4, H8 | 4 | Yury, Eduardo |
| 2.6 | Reordenação acidental durante scroll | H3 | 3 | Yury |
| 2.7 | Ícones de remover/reordenar pouco intuitivos | H5 | 2 | Thomas |
| 2.8 | Ausência de seleção múltipla | H6 | 2 | Thomas |
| 2.9 | Playlist pública por padrão sem opção na criação | H1, H8 | 4 | Thomas |
| 2.10 | Descrição/adicionar músicas mal posicionados | H1, H4 | 3 | Eduardo |
| 3.1 | Ausência de onboarding em recursos de mixagem (Edit Transition + Blend) | H1, H2, H5, H6, H10 | 3 | Eliezir, Thomas, Yury |
| 3.2 | Limite oculto de intervalo editável | H1, H3 | 3 | Thomas |
| 3.3 | Restrição Premium sem mensagem clara | H1, H10 | 4 | Eduardo |
| 3.4 | Processo de Blend com muitas etapas | H6 | 3 | Yury |

---

## PONTOS DE DECISÃO PARA REUNIÃO

1. **Calibrar severidade do Problema 2.4** — oscila entre 3 e 4
2. **Decidir profundidade final do relatório** — manter todos os 18 ou priorizar top 10-15?

---

## AVALIAÇÃO DO SISTEMA COMO UM TODO

**Heurísticas mais violadas (em ordem de frequência):**
1. **H1 — Visibilidade do estado** (1.1, 2.3, 2.4, 2.9, 2.10, 3.1, 3.2, 3.3)
2. **H5 — Reconhecimento vs. memorização** (1.2, 1.4, 2.1, 2.3, 2.4, 2.7, 3.1)
3. **H10 — Ajuda e documentação** (2.4, 3.1, 3.3)
4. **H7 — Projeto estético/minimalista** (1.2, 1.3, 2.1, 2.2, 2.3)

**Heurística melhor atendida:** H9 — Recuperação de erros (nenhum problema crítico identificado)

**Conclusões:**
- Spotify é um produto maduro visualmente, mas peca em **descoberta de funcionalidades**
- Há **inconsistências internas** importantes (ex: desfazer existe em um fluxo de exclusão mas não em outro; filtros aparecem em um estado mas não em outro)
- Recursos avançados (mixagem, Blend, transições) carecem de **mediação para usuários não-técnicos**
- Trade-off central: **minimalismo estético × descobribilidade**

---

## PRÓXIMOS PASSOS

1. Reunião de calibração para discutir os pontos de decisão
2. Definir severidades finais em consenso
3. Distribuir redação final entre os 4 integrantes
4. Padronizar formatação antes de escrever o documento consolidado