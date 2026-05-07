# Imagens da Inspeção Heurística do Spotify

Capturas de tela mapeadas para cada problema da apresentação. Para usar na apresentação em `index.html`.

## Estrutura de pastas

```
imagens_apresentacao/
├── README.md                          ← este arquivo
├── *.jpg                              ← versões leves (~400px largura, ~30-50KB cada)
└── hi-res/
    └── *.jpg                          ← versões alta resolução (~600-800px largura, ~50-100KB cada)
```

**Recomendação:** use a pasta `hi-res/` para apresentação em telão. As versões da raiz são mais leves para web/preview.

## Mapeamento Slide → Imagem

A apresentação tem 31 slides. Apenas os slides de problema (12 a 27) recebem imagem.

| Slide | Problema | Arquivo |
|-------|----------|---------|
| 12 | P 1.1 · Filtros após busca | `problema-1.1-filtros.jpg` |
| 13 | P 1.2 · Diferenciação visual | `problema-1.2-resultados.jpg` |
| 14 | P 1.3 · Limpar recentes | `problema-1.3-limpar-recentes.jpg` |
| 15 | P 1.4 · Histórico | `problema-1.4-historico.jpg` |
| 17 | P 2.1–2.4 · Descobribilidade | `problema-2.1-pastas.jpg` (principal) — usar também `problema-2.2-menu-playlist.jpg`, `problema-2.3-carrossel.jpg`, `problema-2.4-find-in-playlist.jpg` |
| 18 | P 2.5 · Desfazer ao remover | `problema-2.5-desfazer.jpg` |
| 19 | P 2.6/2.7 · Ações finas | `problema-2.6-reordenacao.jpg` ou `problema-2.7-2.8-edicao.jpg` |
| 20 | P 2.8 · Seleção múltipla | `problema-2.7-2.8-edicao.jpg` |
| 21 | P 2.9 · Privacidade | `problema-2.9-privacidade.jpg` |
| 22 | P 2.10 · Descrição/posições | `problema-2.10-descricao.jpg` |
| 24 | P 3.1 · Onboarding | `problema-3.1-edit-transition.jpg` |
| 25 | P 3.2 · Limite oculto | `problema-3.2-limite.jpg` |
| 26 | P 3.3 · Premium | `problema-3.3-premium.jpg` |
| 27 | P 3.4 · Etapas do Blend | `problema-3.4-blend.jpg` |

## Legendas sugeridas (para usar na apresentação)

| Arquivo | Legenda |
|---------|---------|
| `problema-1.1-filtros.jpg` | Filtros de categoria só aparecem após confirmar a busca |
| `problema-1.2-resultados.jpg` | Múltiplas entradas de "RUNWAY" sem agrupamento |
| `problema-1.3-limpar-recentes.jpg` | Botão "Clear recent searches" no final da lista |
| `problema-1.4-historico.jpg` | Tela de busca dominada pelas pesquisas recentes |
| `problema-2.1-pastas.jpg` | Pasta "pOp" com ícone genérico e opções limitadas |
| `problema-2.2-menu-playlist.jpg` | Drawer com lista extensa de opções sem agrupamento |
| `problema-2.3-carrossel.jpg` | Carrossel horizontal com último item parcialmente cortado |
| `problema-2.4-find-in-playlist.jpg` | Campo "Find in playlist" revelado apenas após pull-down |
| `problema-2.5-desfazer.jpg` | Notificação de remoção sem opção de desfazer (fluxo lateral) |
| `problema-2.6-reordenacao.jpg` | Tela "Edit playlist" com handles de reordenação ativos |
| `problema-2.7-2.8-edicao.jpg` | Ícones de remoção e reordenação na tela de edição |
| `problema-2.9-privacidade.jpg` | Tela de criação de playlist sem opção de privacidade |
| `problema-2.10-descricao.jpg` | Campo de descrição acessível apenas por menu modal |
| `problema-3.1-edit-transition.jpg` | Tela "Edit transition" com termos técnicos (BPM, 11B, 2 bars) |
| `problema-3.2-limite.jpg` | Editor de transição com limite editável sem duração visível |
| `problema-3.3-premium.jpg` | Tela da playlist sem indicação visual de restrições Premium |
| `problema-3.4-blend.jpg` | Tela "Create a Blend" — primeira de várias etapas |

## Origem das capturas

- Capturas extraídas dos relatórios individuais dos 4 avaliadores (Eduardo, Eliezir, Thomas, Yury).
- Quando havia múltiplas capturas para o mesmo problema, foi escolhida a mais representativa.
- Capturas em PT-BR foram priorizadas quando disponíveis.

## Características técnicas

- Todas em formato JPG, perfil sRGB, sem transparência.
- Versão leve: largura 400px, qualidade 75.
- Versão hi-res: largura ~600-800px, qualidade 85.
- Capturas mobile (Android/iOS) em proporção retrato (~1:2).
