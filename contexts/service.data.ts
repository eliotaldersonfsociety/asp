export type Service = {
  id: string
  icon: string
  title: string
  titleEs: string
  subtitle: string
  subtitleEs: string
  description: string
  descriptionEs: string
  features: string[]
  featuresEs: string[]
  price: number
  popular: boolean
  requiresDiagnostic: boolean
}

export const services: Service[] = [
  {
    id: "ia-politica",
    icon: "brain",
    title: "Political AI",
    titleEs: "IA Política",
    subtitle: "Strategic Positioning",
    subtitleEs: "Posicionamiento Estratégico",
    description:
      "Master the digital narrative with advanced sentiment analysis, psychographic message optimization, and strategic citizen perception monitoring through AI.",
    descriptionEs:
      "Domina la narrativa digital con análisis de sentimiento avanzado, optimización psicográfica de mensajes y monitoreo estratégico de percepción ciudadana mediante IA.",
    features: [
      "Real-time social sentiment analysis",
      "Key messages and speeches optimization",
      "Public perception and trends monitoring",
      "Advanced strategic PDF reports (3 days)",
      "Competitor and opposition narrative analysis",
      "Fake News detection and early alerts",
      "Audience segmentation by interests",
      "Personalized consulting according to your objectives",
    ],
    featuresEs: [
      "Análisis de sentimiento en redes sociales en tiempo real",
      "Optimización de mensajes clave y discursos",
      "Monitoreo de percepción pública y tendencias",
      "Reportes estratégicos avanzados en PDF (3 días)",
      "Análisis de narrativa de competidores y oposición",
      "Detección de Fake News y alertas tempranas",
      "Segmentación de audiencia por intereses",
      "Consultoría personalizada según tus objetivos",
    ],
    price: 300000,
    popular: false,
    requiresDiagnostic: true,
  },
  {
    id: "smm-crecimiento",
    icon: "users",
    title: "SMM Growth",
    titleEs: "Crecimiento SMM",
    subtitle: "Digital Authority Pack",
    subtitleEs: "Paquete de Autoridad Digital",
    description:
      "Build an imposing and credible presence on all your platforms with a constant flow of real engagement designed to project leadership.",
    descriptionEs:
      "Construye una presencia imponente y creíble en todas tus plataformas con un flujo constante de engagement real diseñado para proyectar liderazgo.",
    features: [
      "5,000 high-quality followers with retention",
      "10,000 likes distributed on your posts",
      "500 personalized strategic comments",
      "100 constant viewers for your streams",
      "Flexible delivery (daily, weekly, or monthly)",
      "Immediate improvement of Social Proof",
      "Support for multiple social networks",
      "Replacement guarantee for drops",
    ],
    featuresEs: [
      "5,000 seguidores de alta calidad con retención",
      "10,000 likes distribuidos en tus publicaciones",
      "500 comentarios estratégicos personalizados",
      "100 viewers constantes para tus transmisiones",
      "Entrega flexible (diaria, semanal o mensual)",
      "Mejora inmediata de Prueba Social",
      "Soporte para múltiples redes sociales",
      "Garantía de reemplazo por caídas",
    ],
    price: 250000,
    popular: true,
    requiresDiagnostic: false,
  },
  {
    id: "combo-total",
    icon: "zap",
    title: "Total Combo",
    titleEs: "Combo Total",
    subtitle: "AI + SMM Growth Synergy",
    subtitleEs: "Sinergia IA + Crecimiento SMM",
    description:
      "The definitive all-in-one solution: combines strategic data intelligence with massive growth to ensure unstoppable digital impact.",
    descriptionEs:
      "La solución definitiva todo en uno: combina inteligencia estratégica de datos con crecimiento masivo para asegurar un impacto digital imparable.",
    features: [
      "All the power of Strategic Political AI",
      "All the reach of SMM Growth Pack",
      "Integrated content and authority strategy",
      "24/7 VIP priority support",
      "Continuous optimization based on results",
      "Unified metrics dashboard",
      "Post-campaign impact analysis",
      "Real-time strategy adjustments",
    ],
    featuresEs: [
      "Todo el poder de IA Política Estratégica",
      "Todo el alcance del Paquete Crecimiento SMM",
      "Estrategia integrada de contenido y autoridad",
      "Soporte VIP prioritario 24/7",
      "Optimización continua basada en resultados",
      "Panel de métricas unificado",
      "Análisis de impacto post-campaña",
      "Ajustes de estrategia en tiempo real",
    ],
    price: 500000,
    popular: false,
    requiresDiagnostic: true,
  },
  {
    id: "victoria-360",
    icon: "trophy",
    title: "Victory 360",
    titleEs: "Victoria 360",
    subtitle: "Total Victory Engineering",
    subtitleEs: "Ingeniería de Victoria Total",
    description:
      "The definitive solution for winning campaigns: Massive traffic with Ads, Psychometric Landing Pages, and AI-powered voting intention analysis.",
    descriptionEs:
      "La solución definitiva para campañas ganadoras: Tráfico Masivo con Ads, Landing Pages Psicometricas y Análisis de Intención de Voto con IA.",
    features: [
      "Massive Traffic Ads (Meta, Google, TikTok)",
      "Landing Page with Psychographic Personality Test",
      "Problem Detection by Micro-segmentation",
      "AI-Based Voting Intention Analysis",
      "Message Engineering: What does the voter want to hear?",
      "Real-time Social Sentiment Dashboard",
      "AI Automated Response Configuration",
      "24/7 Elite Strategic Support",
    ],
    featuresEs: [
      "Tráfico Masivo Ads (Meta, Google, TikTok)",
      "Landing Page con Test de Personalidad Psicográfica",
      "Detección de Problemas por Micro-segmentación",
      "Análisis de Intención de Voto Basado en IA",
      "Ingeniería de Mensajes: ¿Qué quiere escuchar el votante?",
      "Panel de Sentimiento Social en Tiempo Real",
      "Configuración de Respuesta Automatizada con IA",
      "Soporte Estratégico Elite 24/7",
    ],
    price: 15000000,
    popular: false,
    requiresDiagnostic: true,
  },
  {
    id: "gestion-crisis",
    icon: "shield-alert",
    title: "Crisis Management",
    titleEs: "Gestión de Crisis",
    subtitle: "24/7 Reputation Protection",
    subtitleEs: "Protección de Reputación 24/7",
    description:
      "Immediate response to digital attacks. We neutralize negative narratives and protect your public image in real-time.",
    descriptionEs:
      "Respuesta inmediata a ataques digitales. Neutralizamos narrativas negativas y protegemos tu imagen pública en tiempo real.",
    features: [
      "24/7 early alert monitoring",
      "Massive attack neutralization",
      "Crisis communication management",
      "Counter-narrative amplification",
      "Specialized digital legal support",
      "Impact reports every 6 hours",
    ],
    featuresEs: [
      "Monitoreo de alertas tempranas 24/7",
      "Neutralización de ataques masivos",
      "Gestión de comunicación de crisis",
      "Amplificación de contra-narrativa",
      "Soporte legal digital especializado",
      "Reportes de impacto cada 6 horas",
    ],
    price: 1200000,
    popular: false,
    requiresDiagnostic: true,
  },
  {
    id: "marca-elite",
    icon: "star",
    title: "Elite Personal Brand",
    titleEs: "Marca Personal Elite",
    subtitle: "Leadership Building",
    subtitleEs: "Construcción de Liderazgo",
    description:
      "We transform your profile into an opinion leader. Premium content strategy designed to project authority and trust.",
    descriptionEs:
      "Transformamos tu perfil en un líder de opinión. Estrategia de contenido premium diseñada para proyectar autoridad y confianza.",
    features: [
      "Political Storytelling strategy",
      "Monthly 4K content production",
      "Digital public relations management",
      "Organic authority increase",
      "Image and discourse consulting",
      "Account verification managed",
    ],
    featuresEs: [
      "Estrategia de Storytelling Político",
      "Producción de contenido 4K mensual",
      "Gestión de relaciones públicas digitales",
      "Aumento orgánico de autoridad",
      "Consultoría de imagen y discurso",
      "Gestión de verificación de cuenta",
    ],
    price: 850000,
    popular: false,
    requiresDiagnostic: true,
  },
  {
    id: "monitor-oposicion",
    icon: "search",
    title: "Opposition Monitoring",
    titleEs: "Monitoreo de Oposición",
    subtitle: "Competitive Intelligence",
    subtitleEs: "Inteligencia Competitiva",
    description:
      "Anticipate your opponents' moves. In-depth analysis of their strategies, spending, and digital weaknesses.",
    descriptionEs:
      "Anticipa los movimientos de tus oponentes. Análisis profundo de sus estrategias, gastos y debilidades digitales.",
    features: [
      "Opponents' ad spend tracking",
      "Opposing community analysis",
      "Strategic weakness detection",
      "Weekly comparative reports",
      "Real-time movement alerts",
    ],
    featuresEs: [
      "Seguimiento de gasto en ads de oponentes",
      "Análisis de comunidad oponente",
      "Detección de debilidades estratégicas",
      "Reportes comparativos semanales",
      "Alertas de movimiento en tiempo real",
    ],
    price: 1500000,
    popular: false,
    requiresDiagnostic: true,
  },
  {
    id: "ads-expert",
    icon: "megaphone",
    title: "Mass Traffic Ads",
    titleEs: "Tráfico Masivo Ads",
    subtitle: "Exponential Reach",
    subtitleEs: "Alcance Exponencial",
    description:
      "Maximize your visibility on Meta, Google, and TikTok. Ultra-precise segmentation to reach exactly the audience you need to convince.",
    descriptionEs:
      "Maximiza tu visibilidad en Meta, Google y TikTok. Segmentación ultra-precisa para alcanzar exactamente a la audiencia que necesitas convencer.",
    features: [
      "Advanced Pixel/API configuration",
      "Persuasive art and copy design",
      "Daily budget optimization",
      "Interest-based micro-segmentation",
      "Advanced strategic retargeting",
    ],
    featuresEs: [
      "Configuración avanzada de Pixel/API",
      "Diseño de arte y copy persuasivo",
      "Optimización diaria de presupuesto",
      "Micro-segmentación por intereses",
      "Retargeting estratégico avanzado",
    ],
    price: 2500000,
    popular: false,
    requiresDiagnostic: false,
  },
  {
    id: "militancia-digital",
    icon: "user-plus",
    title: "Digital Militia",
    titleEs: "Milicia Digital",
    subtitle: "Coordinated Activism",
    subtitleEs: "Activismo Coordinado",
    description:
      "Organize your supporter base to defend and promote your cause. Massive coordination tools for networks.",
    descriptionEs:
      "Organiza tu base de simpatizantes para defender y promover tu causa. Herramientas de coordinación masiva para redes.",
    features: [
      "Rapid response group creation",
      "Daily base dissemination material",
      "Brand defense training",
      "Shared trend coordination",
    ],
    featuresEs: [
      "Creación de grupos de respuesta rápida",
      "Material diario de difusión para la base",
      "Entrenamiento de defensa de marca",
      "Coordinación de tendencias compartidas",
    ],
    price: 600000,
    popular: false,
    requiresDiagnostic: false,
  },
]
