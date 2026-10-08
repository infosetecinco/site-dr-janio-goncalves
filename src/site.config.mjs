/**
 * CONFIGURAÇÃO CENTRAL DO SITE — Dr. Janio Gonçalves
 *
 * Tudo o que é dado (contatos, endereço, horários, textos, imagens, pendências)
 * vive aqui. Os templates em src/templates/ apenas renderizam este objeto.
 *
 * Os dados de contato/endereço/horários foram extraídos do HTML fornecido pelo cliente
 * (originais/site_institucional_dr_janio_gon_alves.html). Não foram verificados externamente.
 * Antes de publicar, confira a lista `publicationChecklist` no fim deste arquivo (e PENDENCIAS.md).
 */

// ---------------------------------------------------------------------------
// Site / SEO
// ---------------------------------------------------------------------------
export const site = {
  /** true = prévia/homologação (adiciona noindex). Troque para false apenas na publicação aprovada. */
  isPreview: true,
  /** URL da prévia para metadados absolutos. Substituir pelo domínio definitivo quando aprovado. */
  url: 'https://infosetecinco.github.io/site-dr-janio-goncalves',
  locale: 'pt-BR',
  title: 'Dr. Janio Gonçalves | Dentista em Primavera do Leste — MT',
  description:
    'Conheça os tratamentos e o atendimento do Dr. Janio Gonçalves na Conceito Odontologia Integrada e Estética. Consulte horários pelo WhatsApp.',
  themeColor: '#17191C',
  /** Imagem usada em compartilhamentos (Open Graph). Gerada pelo script de imagens. */
  ogImage: 'og-retrato',
};

// ---------------------------------------------------------------------------
// Marca e profissional
// ---------------------------------------------------------------------------
export const brand = {
  name: 'Dr. Janio Gonçalves',
  role: 'Cirurgião-dentista',
  /**
   * Logo oficial (SVG ou PNG transparente). Enquanto for null, o site usa a
   * assinatura tipográfica provisória. Ex.: { src: 'assets/img/logo.svg', alt: 'Dr. Janio Gonçalves' }
   */
  logo: null,
};

export const professional = {
  name: 'Dr. Janio Gonçalves',
  role: 'Cirurgião-dentista',
  /** Inscrição profissional confirmada (ex.: "CRO-MT 00000"). Enquanto null, a linha não é exibida. */
  registration: null,
};

// ---------------------------------------------------------------------------
// Clínica, contatos, endereço e horários
// ---------------------------------------------------------------------------
export const clinic = {
  name: 'Conceito Odontologia Integrada e Estética',
  shortName: 'Conceito Odontologia',
  city: 'Primavera do Leste',
  state: 'MT',
  cityLabel: 'Primavera do Leste — MT',
};

export const contact = {
  /** Número internacional sem símbolos. DDD 62 conforme o material fornecido — não alterar por suposição. */
  whatsappNumber: '5562996545987',
  phoneDisplay: '(62) 99654-5987',
  phoneE164: '+5562996545987',
  instagramHandle: 'conceitoodontologiapva',
  instagramUrl: 'https://www.instagram.com/conceitoodontologiapva/',
};

export const address = {
  street: 'Rua Paranatinga',
  number: '220',
  district: 'Primavera I',
  city: 'Primavera do Leste',
  state: 'MT',
  zip: '78850-000',
  /** Linhas exibidas no site. */
  lines: ['Rua Paranatinga, 220 — Primavera I', 'Primavera do Leste — MT', 'CEP 78850-000'],
  /** Endereço completo usado na busca do Google Maps. */
  full: 'Rua Paranatinga, 220, Primavera I, Primavera do Leste - MT, 78850-000',
  /**
   * URL de incorporação do Google Maps com o ponto EXATO confirmado pela clínica.
   * Enquanto null, o site mostra apenas o link de busca pelo endereço (sem marcador aproximado).
   */
  mapEmbedUrl: null,
};

export const hours = [
  { days: 'Segunda a sexta', time: 'das 8h às 19h' },
  { days: 'Sábado', time: 'com agendamento prévio' },
];

/** Linha curta para a barra informativa (desktop). */
export const hoursShort = 'Segunda a sexta, das 8h às 19h';

// ---------------------------------------------------------------------------
// Mensagens do WhatsApp (a conversa é iniciada pelo visitante; nada é enviado automaticamente)
// ---------------------------------------------------------------------------
export const messages = {
  general: 'Olá! Conheci o site do Dr. Janio Gonçalves e gostaria de consultar os horários para uma avaliação.',
  treatment:
    'Olá! Conheci o site do Dr. Janio Gonçalves e gostaria de tirar dúvidas sobre [tratamento] e consultar os horários para uma avaliação.',
  faq: 'Olá! Acessei o site do Dr. Janio Gonçalves e gostaria de esclarecer uma dúvida antes de agendar.',
};

// ---------------------------------------------------------------------------
// Navegação
// ---------------------------------------------------------------------------
export const nav = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Tratamentos', href: '#tratamentos' },
  { label: 'A clínica', href: '#clinica' },
  { label: 'Dúvidas', href: '#faq' },
  { label: 'Localização', href: '#localizacao' },
];

// ---------------------------------------------------------------------------
// Rótulos de botões (padronizados)
// ---------------------------------------------------------------------------
export const labels = {
  ctaPrimary: 'Agendar pelo WhatsApp',
  ctaTreatments: 'Conhecer os tratamentos',
  ctaTeam: 'Conversar com a equipe',
  ctaTalkTeam: 'Falar com a equipe',
  ctaDoubts: 'Tirar dúvidas pelo WhatsApp',
  ctaHours: 'Consultar horários',
  ctaFinal: 'Falar pelo WhatsApp',
  ctaFaq: 'Tenho outra dúvida — falar no WhatsApp',
  ctaMaps: 'Abrir no Google Maps',
  ctaLocation: 'Ver localização',
  knowTreatment: 'Conhecer o tratamento',
  skipToContent: 'Pular para o conteúdo',
  openMenu: 'Abrir menu',
  closeMenu: 'Fechar menu',
  close: 'Fechar',
  loadMap: 'Carregar mapa',
};

// ---------------------------------------------------------------------------
// Seções (copy proposta — revisar com o responsável antes da publicação)
// ---------------------------------------------------------------------------
export const hero = {
  eyebrow: 'Odontologia em Primavera do Leste — MT',
  title: 'Seu sorriso merece cuidado em cada detalhe.',
  subtitle:
    'Conheça os tratamentos do Dr. Janio Gonçalves na Conceito Odontologia Integrada e Estética e converse sobre seus objetivos em uma avaliação individual.',
  support: 'Atendimento com hora marcada na Conceito Odontologia.',
  image: {
    name: 'retrato-principal',
    mobileName: 'retrato-principal-m',
    alt: 'Dr. Janio Gonçalves, cirurgião-dentista, de jaleco preto e braços cruzados, sorrindo.',
  },
};

export const about = {
  eyebrow: 'Sobre o profissional',
  title: 'Cuidar do sorriso começa por ouvir você.',
  paragraphs: [
    'O atendimento do Dr. Janio Gonçalves na Conceito reúne o cuidado com a saúde bucal e a atenção aos objetivos de cada paciente.',
    'A proposta é avaliar, explicar as opções e planejar os próximos passos de forma individual, considerando as necessidades e as expectativas apresentadas durante a consulta.',
    'Antes de iniciar um tratamento, você poderá esclarecer dúvidas e entender as etapas e os cuidados envolvidos.',
  ],
  image: {
    name: 'retrato-sobre',
    alt: 'Dr. Janio Gonçalves de touca e jaleco preto, sorrindo e olhando para o lado.',
  },
};

export const treatments = {
  eyebrow: 'Tratamentos',
  title: 'Conheça os tratamentos',
  intro:
    'Da prevenção aos cuidados com a estética do sorriso, o primeiro passo é entender suas necessidades em uma avaliação individual.',
  /** Texto fixo exibido em todos os detalhamentos. */
  note: 'A indicação de qualquer tratamento depende de avaliação individual. Resultados podem variar.',
  topicsTitle: 'O que costuma ser conversado na avaliação',
  items: [
    {
      id: 'lentes-e-facetas',
      name: 'Lentes de contato e facetas',
      summary:
        'Converse sobre suas expectativas para a aparência do sorriso e entenda as possibilidades, as limitações e os cuidados envolvidos nesse tipo de tratamento.',
      detail: {
        intro:
          'Lentes de contato e facetas são tratamentos voltados à aparência dos dentes. Antes de qualquer decisão, a avaliação serve para entender o que você gostaria de mudar e o que é possível no seu caso.',
        topics: [
          'Suas expectativas em relação ao formato, à cor e ao alinhamento dos dentes',
          'Condições atuais da saúde bucal que precisam ser consideradas',
          'Possibilidades, limitações e cuidados envolvidos',
          'Etapas, prazos e investimento',
        ],
      },
    },
    {
      id: 'harmonizacao-orofacial',
      name: 'Harmonização orofacial',
      summary:
        'Uma avaliação para conversar sobre seus objetivos e conhecer os procedimentos disponíveis, respeitando suas características e as indicações de cada caso.',
      detail: {
        intro:
          'A harmonização orofacial reúne procedimentos voltados à estética da face. A avaliação é o momento de conversar sobre seus objetivos e conhecer quais procedimentos estão disponíveis, respeitando suas características.',
        topics: [
          'O que você gostaria de cuidar ou equilibrar',
          'Indicações e contraindicações para o seu caso',
          'Procedimentos disponíveis e seus cuidados',
          'Etapas, prazos e investimento',
        ],
      },
    },
    {
      id: 'implantes-e-reabilitacao',
      name: 'Implantes e reabilitação oral',
      summary:
        'Conheça as possibilidades de planejamento para reposição de dentes e reabilitação oral, a partir de uma avaliação das suas necessidades.',
      detail: {
        intro:
          'Implantes e reabilitação oral tratam da reposição de dentes ausentes e da recuperação das funções da boca. O planejamento depende de uma avaliação das suas necessidades e das condições atuais.',
        topics: [
          'Dentes ausentes ou comprometidos e o histórico de saúde bucal',
          'Possibilidades de planejamento para o seu caso',
          'Etapas, prazos e cuidados antes e depois do procedimento',
          'Investimento e forma de acompanhamento',
        ],
      },
    },
    {
      id: 'clareamento-dental',
      name: 'Clareamento dental',
      summary:
        'Entenda as opções de clareamento e converse sobre indicação, expectativas e cuidados antes de escolher como seguir.',
      detail: {
        intro:
          'O clareamento tem como objetivo alterar o tom dos dentes. Há diferentes opções, e a indicação depende de uma avaliação das condições dos dentes e das suas expectativas.',
        topics: [
          'Suas expectativas e o tom atual dos dentes',
          'Opções de clareamento e indicação para o seu caso',
          'Cuidados durante e após o tratamento',
          'Etapas e investimento',
        ],
      },
    },
    {
      id: 'clinica-geral-e-prevencao',
      name: 'Clínica geral e prevenção',
      summary:
        'Avaliação da saúde bucal e conversa sobre os cuidados preventivos ou restauradores que podem ser necessários para o seu caso.',
      detail: {
        intro:
          'A clínica geral inclui a avaliação da saúde bucal e os cuidados preventivos ou restauradores que podem ser necessários, com acompanhamento periódico e atenção aos problemas identificados na consulta.',
        topics: [
          'Como está a sua saúde bucal hoje',
          'Cuidados preventivos indicados para a sua rotina',
          'Tratamentos restauradores que possam ser necessários',
          'Frequência de acompanhamento',
        ],
      },
    },
    {
      id: 'ortodontia-dtm-bruxismo',
      name: 'Ortodontia, DTM e bruxismo',
      summary:
        'Consulte os atendimentos disponíveis nessas áreas e esclareça quais possibilidades de acompanhamento podem ser consideradas após a avaliação.',
      detail: {
        intro:
          'São três temas diferentes: a ortodontia trata do posicionamento dos dentes; a DTM (disfunção temporomandibular) envolve a articulação e a musculatura da mandíbula; o bruxismo é o hábito de ranger ou apertar os dentes. Cada situação pede uma avaliação própria.',
        topics: [
          'O que você percebe no dia a dia: dor, desconforto, desgaste ou posicionamento dos dentes',
          'Qual avaliação e acompanhamento podem ser considerados',
          'Possibilidades de tratamento para cada situação, separadamente',
          'Etapas e investimento',
        ],
      },
    },
  ],
  closing: {
    title: 'Não sabe qual tratamento procurar?',
    text: 'Conte à equipe o que você deseja cuidar e consulte os horários para uma avaliação.',
  },
};

export const careSteps = {
  eyebrow: 'Como funciona',
  title: 'Do primeiro contato ao seu plano de cuidado',
  steps: [
    { title: 'Converse com a equipe', text: 'Entre em contato pelo WhatsApp e consulte os horários disponíveis.' },
    { title: 'Faça sua avaliação', text: 'Converse sobre suas necessidades, expectativas e dúvidas.' },
    { title: 'Entenda as possibilidades', text: 'Receba esclarecimentos sobre etapas, cuidados e investimento antes de decidir.' },
  ],
};

export const differentials = {
  eyebrow: 'Atendimento',
  title: 'Atenção em cada etapa do atendimento',
  items: [
    { title: 'Avaliação individual', text: 'Um momento para conhecer suas necessidades e conversar sobre o que você espera do atendimento.' },
    { title: 'Planejamento explicado', text: 'Informações sobre as etapas e os cuidados envolvidos no tratamento proposto.' },
    { title: 'Espaço para suas dúvidas', text: 'Você pode conversar sobre suas expectativas e esclarecer pontos importantes antes de decidir.' },
    { title: 'Orientações para o cuidado', text: 'Entenda o que precisa ser considerado antes, durante e depois de cada etapa.' },
  ],
};

export const clinicSection = {
  eyebrow: 'Onde acontece o atendimento',
  title: 'Seu atendimento na Conceito',
  paragraphs: [
    'O Dr. Janio Gonçalves atende na Conceito Odontologia Integrada e Estética, em Primavera do Leste — MT.',
    'Conheça a fachada e consulte as informações de localização para organizar sua visita.',
  ],
  image: {
    name: 'fachada',
    alt: 'Fachada da Conceito Odontologia Integrada e Estética, com letreiro dourado sobre fundo claro, revestimento em madeira e porta de vidro.',
  },
};

/**
 * Avaliações — CONDICIONAL.
 * A seção só é renderizada (e entra no menu) quando `confirmed` for true e houver itens
 * com origem, autorização e data confirmadas. Até lá, nada é publicado nem inserido em
 * elementos ocultos ou dados estruturados. Ver PENDENCIAS.md.
 */
export const reviews = {
  confirmed: false,
  title: 'Experiências compartilhadas por pacientes',
  /** Ex.: { label: 'Google', url: 'https://...', subject: 'clinic' | 'professional' } */
  source: null,
  /** Ex.: { author: 'Nome', text: 'Texto autorizado', date: '2026-01-15', url: 'https://...' } */
  items: [],
};

export const faq = {
  eyebrow: 'Dúvidas frequentes',
  title: 'Dúvidas antes de agendar?',
  items: [
    {
      question: 'Como agendar uma avaliação com o Dr. Janio?',
      answer:
        'Entre em contato pelo WhatsApp ou telefone e consulte os horários disponíveis. A equipe confirmará os detalhes do agendamento durante a conversa.',
    },
    {
      question: 'Preciso escolher um tratamento antes de entrar em contato?',
      answer:
        'Não. Você pode contar o que deseja cuidar e solicitar uma avaliação para esclarecer quais possibilidades podem ser consideradas.',
    },
    {
      question: 'Como funciona a avaliação?',
      answer:
        'É o momento de conversar sobre suas necessidades e expectativas, esclarecer dúvidas e entender os próximos passos do atendimento.',
    },
    {
      question: 'O procedimento de lentes de contato ou facetas dói?',
      answer:
        'A experiência pode variar. Durante a avaliação, converse com o profissional sobre o que esperar e quais cuidados estão previstos para o seu caso. Não é possível prometer ausência de desconforto.',
    },
    {
      question: 'Quantas consultas serão necessárias?',
      answer:
        'O planejamento depende do tratamento e da avaliação individual. As etapas serão discutidas antes do início do atendimento.',
    },
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer:
        'Consulte com a equipe as opções disponíveis para o seu atendimento. Os valores e as condições serão apresentados antes de iniciar o tratamento.',
    },
    {
      question: 'Onde acontece o atendimento?',
      answer:
        'O atendimento acontece na Conceito Odontologia Integrada e Estética, em Primavera do Leste — MT. Consulte o endereço e o acesso na seção de localização.',
    },
  ],
};

export const location = {
  eyebrow: 'Localização',
  title: 'Encontre a Conceito',
  addressLabel: 'Endereço',
  phoneLabel: 'Telefone e WhatsApp',
  hoursLabel: 'Horários',
  instagramLabel: 'Instagram',
  mapPlaceholder: 'O mapa interativo será exibido aqui quando o ponto exato da clínica for confirmado.',
  mapNote: 'Use o endereço informado ou o botão do Google Maps para traçar a rota.',
};

export const finalCta = {
  title: 'O próximo passo pode ser uma conversa.',
  text: 'Tire suas dúvidas e consulte os horários disponíveis para uma avaliação com o Dr. Janio Gonçalves.',
  support: 'O agendamento será confirmado pela equipe.',
  image: {
    name: 'retrato-alternativo',
    alt: '',
  },
};

export const footer = {
  disclaimer: 'A indicação dos tratamentos depende de avaliação individual. Resultados podem variar.',
  /** Link da Política de Privacidade quando o documento estiver preparado e revisado. */
  privacyPolicyUrl: null,
  navTitle: 'Navegação',
  contactTitle: 'Atendimento',
};

// ---------------------------------------------------------------------------
// Pendências para publicação (também em PENDENCIAS.md)
// ---------------------------------------------------------------------------
export const publicationChecklist = [
  'Confirmar inscrição profissional (CRO) e preencher professional.registration.',
  'Confirmar especialidades registradas antes de usar o termo "especialista" em qualquer texto.',
  'Confirmar os seis tratamentos efetivamente oferecidos e o responsável por cada atendimento.',
  'Confirmar telefone/WhatsApp (DDD 62), endereço, CEP e horários com a clínica.',
  'Confirmar autorização de uso público das fotografias e da identidade visual enviadas.',
  'Receber o logo oficial (SVG/PNG transparente) e preencher brand.logo; atualizar o favicon.',
  'Confirmar o ponto exato no Google Maps e preencher address.mapEmbedUrl.',
  'Aprovar todos os textos propostos (copy editorial) com o responsável.',
  'Decidir sobre avaliações: origem, autorização e data confirmadas antes de ativar reviews.confirmed.',
  'Preparar e revisar a Política de Privacidade antes de preencher footer.privacyPolicyUrl.',
  'Definir o domínio definitivo (site.url) e trocar site.isPreview para false na publicação.',
  'Revisar os requisitos aplicáveis à publicidade odontológica com o responsável técnico.',
];
