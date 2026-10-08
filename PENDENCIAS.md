# Pendências para publicação — site do Dr. Janio Gonçalves

Esta prévia foi construída apenas com os dados do HTML e das fotografias enviadas pelo cliente.
Nada abaixo foi verificado externamente. O site **não deve ser declarado pronto para publicação**
enquanto os itens marcados como obrigatórios não forem confirmados pelo responsável.

Onde alterar cada item: `src/site.config.mjs` (depois, `npm run build`).

## Obrigatório antes de publicar

| # | Item | Situação na prévia | Onde ajustar |
|---|------|--------------------|--------------|
| 1 | Inscrição profissional (CRO) do Dr. Janio | Não exibida (linha oculta até confirmação) | `professional.registration` |
| 2 | Especialidades registradas | Nenhum texto usa "especialista" ou "especialidade" | Só incluir após confirmação do registro |
| 3 | Tratamentos efetivamente oferecidos e responsável por cada atendimento | Seis grupos do HTML mantidos como "informado no material" | `treatments.items` |
| 4 | Telefone/WhatsApp **(62) 99654-5987** — DDD 62 preservado conforme o material | Usado em todos os CTAs; link construído, número **não** testado como ativo | `contact` |
| 5 | Endereço e CEP (Rua Paranatinga, 220 — Primavera I, CEP 78850-000) | Exibido conforme o HTML | `address` |
| 6 | Horários (seg–sex 8h–19h; sábado com agendamento) | Exibidos conforme o HTML | `hours`, `hoursShort` |
| 7 | Autorização de uso público das fotografias e da referência de marca | Fotos incorporadas na prévia | — |
| 8 | Aprovação dos textos (copy editorial proposta, inclusive os detalhamentos de tratamento) | Textos propostos neste projeto | `src/site.config.mjs` |
| 9 | Requisitos de publicidade odontológica aplicáveis | Revisão do responsável técnico pendente | — |
| 10 | Domínio definitivo e remoção do `noindex` | `site.isPreview = true` (prévia com noindex) | `site.url`, `site.isPreview` |

## Recomendado

| # | Item | Situação na prévia | Onde ajustar |
|---|------|--------------------|--------------|
| 11 | Logo oficial (SVG/PNG transparente) | Assinatura tipográfica provisória no cabeçalho; favicon provisório "JG" | `brand.logo`; substituir `src/static/favicon.svg` e `apple-touch-icon.png` |
| 12 | Ponto exato no Google Maps | Sem mapa incorporado; apenas link de busca pelo endereço completo | `address.mapEmbedUrl` (o mapa passa a carregar sob demanda) |
| 13 | Avaliações de pacientes | Seção oculta e fora do menu | `reviews` (exige origem, autorização e data) |
| 14 | Política de Privacidade | Link oculto no rodapé | `footer.privacyPolicyUrl` |
| 15 | Imagem Open Graph 1200×630 com o logo oficial | Usa recorte 4:5 do retrato principal | `site.ogImage` + `scripts/optimize-images.py` |
| 16 | Hospedagem das fontes (Google Fonts) | Carregadas do Google Fonts | Opcional: auto-hospedar para CSP mais restrita |

## O que foi deliberadamente deixado de fora (vindo do protótipo)

- Nota "4,9" e "Avaliações verificadas no Google" — sem comprovação de origem/atualidade.
- Três depoimentos atribuídos a pessoas nomeadas — sem comprovação de autorização.
  Os textos originais permanecem apenas no arquivo do cliente em `originais/` (fora do repositório).
- "CRO-MT • Especialista em Reabilitação & Estética Orofacial" — sem número e sem registro de especialidade.
- "100% planejamento digital", "técnicas indolores", "protocolos indolores", "diagnósticos assertivos",
  "sem filas", "eliminar qualquer ansiedade", "recuperação definitiva" — promessas vedadas pelo briefing.
- Condições comerciais do FAQ (parcelamento, PIX com condições especiais) — não confirmadas.
- Modal de agendamento com formulário obrigatório — removido; os CTAs abrem o WhatsApp diretamente.
- Mapa com coordenadas aproximadas no iframe — removido até confirmação do ponto exato.
- Afirmações de que o Dr. Janio é dono/fundador/responsável técnico da clínica ("À frente do Conceito") — removidas.
- Imagens de banco (Unsplash) — substituídas pelas fotografias reais enviadas.
- Tailwind via CDN e FontAwesome — substituídos por CSS próprio e ícones SVG inline.
