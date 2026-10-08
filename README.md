# Site institucional — Dr. Janio Gonçalves, cirurgião-dentista

Prévia estática do site do Dr. Janio Gonçalves, com atendimento na Conceito Odontologia Integrada
e Estética (Primavera do Leste — MT). Objetivo principal: gerar contatos pelo WhatsApp para
dúvidas iniciais e consulta de horários para avaliação.

> **Status: prévia para homologação.** O site carrega `noindex` e ainda depende das confirmações
> listadas em [PENDENCIAS.md](PENDENCIAS.md). Não é o site oficial publicado.

Prévia existente: https://infosetecinco.github.io/site-dr-janio-goncalves/
Repositório: https://github.com/infosetecinco/site-dr-janio-goncalves

Retomada da revisão em 08/10/2026: veja [REVISAO.md](REVISAO.md) para as correções
locais e verificações atuais. A URL acima só incorpora mudanças após um deploy.

## Como executar e visualizar

Requisitos: Node.js 20 ou superior. Sem dependências npm. Python 3 + Pillow só são necessários
para regenerar imagens e ícones.

```bash
npm run build     # gera dist/ a partir de src/
npm run serve     # serve dist/ em http://localhost:4173
npm run preview   # build + serve
npm run verify    # sintaxe + testes + build
npm run images    # regenera as imagens otimizadas e o favicon (Python + Pillow)
```

A pasta `dist/` é a saída publicável (HTML, CSS, JS e imagens). Ela é gerada; não edite nada lá.

## Estrutura

```
src/
  site.config.mjs      ← ÚNICA fonte de dados e textos (contatos, endereço, horários, copy, imagens, pendências)
  templates/           ← componentes como funções (SiteHeader, Hero, AboutSection, TreatmentsSection,
                          TreatmentDetail, CareSteps, DifferentialsSection, ClinicSection, ReviewsSection,
                          FAQSection, LocationSection, FinalCTA, SiteFooter, WhatsAppCTA, Head, page)
  lib/                 ← html (template seguro com escape), whatsapp (links), images (<picture> responsivo)
  css/                 ← tokens, base, components, header, sections, footer (concatenados no build)
  js/                  ← runtime: menu, acordeão, diálogos, mapa sob demanda, ano
  img/                 ← imagens otimizadas (geradas) + manifest.json
  static/              ← favicon.svg e apple-touch-icon.png (provisórios)
scripts/
  build.mjs            ← renderiza index.html, concatena CSS/JS, copia imagens
  serve.mjs            ← servidor estático local
  optimize-images.py   ← recortes/variantes WebP+JPEG a partir dos originais
  make-icons.py        ← favicon provisório
  check-syntax.mjs     ← verificação de sintaxe de todos os .mjs/.js
tests/                 ← node:test (links do WhatsApp, template HTML, configuração, HTML gerado, build)
capturas/              ← capturas de tela desktop/mobile desta prévia
originais/             ← material bruto do cliente (fotos e HTML originais) — fora do repositório
PENDENCIAS.md          ← o que confirmar antes de publicar
```

## Como editar

**Textos, contatos, endereço, horários:** tudo em `src/site.config.mjs`. Depois rode `npm run build`.

- WhatsApp: `contact.whatsappNumber` (somente dígitos, com DDI), `contact.phoneDisplay`, `contact.phoneE164`.
  Os links são montados por `src/lib/whatsapp.mjs` com `encodeURIComponent` na mensagem completa.
- Mensagens do WhatsApp: `messages.general`, `messages.treatment` (com `[tratamento]`), `messages.faq`.
- Tratamentos: `treatments.items` (nome, resumo do cartão e detalhamento do diálogo).
- FAQ: `faq.items`. Diferenciais: `differentials.items`. Etapas: `careSteps.steps`.
- Inscrição profissional: `professional.registration` (só aparece quando preenchida).
- Logo oficial: `brand.logo = { src, alt }` e substituir `src/static/favicon.svg` / `apple-touch-icon.png`.
- Mapa: `address.mapEmbedUrl` com o ponto exato — o iframe passa a carregar sob demanda.
- Avaliações: `reviews` (só renderiza com `confirmed: true`, origem e itens autorizados; entra no menu automaticamente).
- Política de Privacidade: `footer.privacyPolicyUrl`.
- Publicação: trocar `site.url` (hoje aponta para a prévia) pelo domínio definitivo e,
  somente após aprovação, definir `site.isPreview = false` (remove o `noindex`).

**Fotos:** coloque os originais em `originais/` com os nomes esperados em `scripts/optimize-images.py`
(ou ajuste o mapa `SOURCES` e as caixas de recorte em `VARIANTS`) e rode `npm run images`.
Os recortes atuais preservam o rosto inteiro, o espaço acima da cabeça e o letreiro da fachada.

**Estilos:** tokens de cor/tipografia em `src/css/tokens.css`; o restante por componente/seção.

## Decisões de implementação

- Estático sem framework e sem Tailwind em runtime: HTML renderizado no build a partir da configuração,
  CSS próprio com tokens semânticos, ícones SVG inline (sem FontAwesome).
- CTAs de WhatsApp abrem a conversa diretamente (`https://wa.me/<número>?text=<mensagem>`);
  o modal de agendamento com formulário do protótipo foi removido. Nada é enviado automaticamente,
  nenhum dado do visitante vai para a URL.
- Detalhamento de tratamentos em `<dialog>` nativo: foco no título ao abrir, Escape fecha,
  fundo inerte, foco devolvido ao botão de origem, CTA persistente oculto enquanto aberto.
- Menu mobile com `aria-expanded`/`aria-controls`, fecha ao escolher âncora e por Escape, devolve o foco.
- CTA persistente: barra inferior no mobile (com espaço reservado no documento e `safe-area`) e
  botão discreto no desktop; nunca os dois ao mesmo tempo, e o CTA do cabeçalho some no mobile.
- Mapa: sem coordenadas aproximadas. Até existir ponto exato, só o link de busca pelo endereço.
- Avaliações: seção e item de menu condicionais; nada em elementos ocultos ou dados estruturados.
- Dados estruturados mínimos (Person + local de atendimento como Dentist com endereço/telefone/horário),
  sem avaliações nem especialidades. Open Graph com recorte do retrato principal.
- Imagens com `<picture>`, WebP + JPEG, `srcset`/`sizes`, recorte específico para mobile no hero,
  `loading="eager"`/`fetchpriority="high"` só no retrato do hero, `lazy` nas demais.
- `prefers-reduced-motion` respeitado; âncoras compensam o cabeçalho fixo (`scroll-padding-top`).

## Verificações realizadas nesta prévia

- `node scripts/check-syntax.mjs`: sintaxe OK em `src/`, `scripts/` e `tests/`.
- `node --test`: 31 testes passando (links do WhatsApp e `tel:`, escape do template, integridade
  da configuração, frases vedadas ausentes, âncoras do menu, imagens referenciadas existem,
  avaliações ocultas sem confirmação, placeholders ausentes, `noindex` na prévia, diálogos e acordeão).
- Build (`npm run build`) sem erros; console do navegador sem mensagens.
- Inspeção visual (capturas em `capturas/`): 1440 (desktop), 768 (tablet), 390 e 320 (mobile).
  Sem rolagem horizontal em 320/390/768/1440; H1 36 px em 320 px e 68 px no desktop.
- Interações testadas no navegador: menu mobile (abre, fecha por Escape, devolve o foco, oculta a barra
  inferior), diálogo de tratamento (abre com foco no título, fecha por Escape, devolve o foco ao botão),
  acordeão do FAQ (`aria-expanded` + painel visível).
- Links do WhatsApp: número `5562996545987` em todos os CTAs, mensagens codificadas — link construído
  corretamente; o número **não** foi testado como ativo.

## Pendências

Ver [PENDENCIAS.md](PENDENCIAS.md). Em resumo: inscrição profissional, tratamentos e responsáveis,
confirmação de telefone/endereço/horários, autorização das fotos, logo oficial, ponto exato no mapa,
textos aprovados, avaliações (se houver), política de privacidade, domínio e revisão de publicidade
odontológica.
