# Retomada da prévia — 8 de outubro de 2026

Base recuperada do GitHub: `0680466`. A busca no ai-memory não encontrou a conversa;
o contexto foi recuperado da memória local e do histórico do Claude, conversa
“Site institucional Dr. Janio Gonçalves”, sessão `8fa03ac2-c2d2-4f8f-9e2e-70f7beaf4c27`.
O Claude havia interrompido a revisão por limite de uso. Os resultados parciais
da revisão anterior não foram tratados como aprovação nem como bugs confirmados.

## Correções locais

- Navegação por teclado no mobile: o navegador agora reserva espaço de rolagem
  para a barra fixa do WhatsApp. Antes, o foco de links e perguntas do FAQ ficava
  encoberto; após a correção, o percurso de Tab em 390 × 844 não apresentou
  controles cobertos pela barra.
- Servidor de desenvolvimento: URLs com percent-encoding inválido recebem HTTP
  400. O processo continua atendendo outras requisições. Antes, `/%` encerrava o
  servidor. Esta correção é do servidor local, não do GitHub Pages.
- Compartilhamento: `site.url` aponta para a URL real da prévia, produzindo uma
  imagem Open Graph absoluta. `isPreview` continua verdadeiro e `noindex` permanece.
  O domínio definitivo continua pendente. Não foi testado o cache de compartilhamento
  dentro do aplicativo WhatsApp.
- README recupera os links do repositório e da prévia que não estavam no commit remoto.

## Verificações desta retomada

- `npm run verify`: sintaxe, 33 testes e build aprovados.
- Os dois novos testes de regressão falharam antes das correções e passaram depois.
- Edge/Chromium headless: 320, 390, 768, 1024 e 1440 px, altura de 900 px.
  Sem overflow horizontal, sem imagens visíveis quebradas e sem erros JavaScript.
- Menu mobile: abre, fecha por Escape e devolve foco ao botão.
- Primeiro diálogo: abre com foco no título, fecha por Escape e devolve foco à origem.
- Primeira pergunta do FAQ: expande com estado acessível atualizado.
- Navegação por Tab com movimento reduzido em 390 × 844: sem controle coberto pela barra.
- Capturas em `capturas/retomada/`; resultados em `capturas/retomada/browser-results.json`.
- Revisão visual das capturas mobile e 1024 px; não equivale a ensaio em aparelho físico,
  Safari/VoiceOver ou auditoria completa de acessibilidade.

## Estado e limites

As correções estão na branch local `fix/revisao-previa`. Nenhum push, merge ou deploy
foi feito nesta retomada. A prévia pública existente não contém estas correções.

Os arquivos otimizados foram recuperados do repositório. A pasta temporária original
do Claude não foi encontrada e os arquivos brutos de `originais/` não vieram no clone
(são ignorados por Git); não foi executada uma nova otimização das fotos.

Permanecem as confirmações de [PENDENCIAS.md](PENDENCIAS.md), incluindo CRO, contatos,
tratamentos, fotos e textos. Os links de contato foram validados como URLs; não houve
envio de mensagens nem confirmação de que o número esteja ativo. O site continua sendo
uma prévia para homologação.
