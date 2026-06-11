/**
 * Bilingual content for the portfolio.
 *
 * ⚠️ PLACEHOLDERS — replace the values marked with TODO with Javier's real
 * details (phone, city, email, social links, photo) before going live.
 */

export type Locale = "es" | "en";

export const CONTACT = {
  email: "javierrodriguezrulas01@gmail.com",
  city: "Santiago, Chile",
  instagram: "https://www.instagram.com/javirodriguez2001/?hl=es",
  linkedin: "https://www.linkedin.com/",
} as const;

type Drink = {
  name: string;
  desc: string;
  tag: string;
};

type Section = {
  nav: {
    about: string;
    skills: string;
    experience: string;
    contact: string;
    downloadCv: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    tagline: string;
    ctaContact: string;
    ctaDrinks: string;
    scroll: string;
  };
  about: {
    title: string;
    kicker: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
  };
  skills: {
    title: string;
    kicker: string;
    intro: string;
    signatureTitle: string;
    mocktailTitle: string;
    mocktailDesc: string;
    drinks: Drink[];
    coreTitle: string;
    core: string[];
  };
  experience: {
    title: string;
    kicker: string;
    items: {
      role: string;
      place: string;
      period: string;
      desc: string;
    }[];
    educationTitle: string;
    education: {
      degree: string;
      place: string;
      period: string;
      desc: string;
    };
  };
  contact: {
    title: string;
    kicker: string;
    intro: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    orReach: string;
    required: string;
    invalidEmail: string;
  };
  footer: {
    rights: string;
    builtWith: string;
  };
};

export const content: Record<Locale, Section> = {
  es: {
    nav: {
      about: "Perfil",
      skills: "Cócteles",
      experience: "Experiencia",
      contact: "Contacto",
      downloadCv: "Descargar CV",
    },
    hero: {
      eyebrow: "Bartender Internacional · Mixología",
      name: "Javier Rodríguez Rulas",
      role: "Bartender con mención en Mixología",
      tagline:
        "Creo experiencias detrás de la barra: cócteles clásicos ejecutados con precisión, tragos de autor y mocktails de fruta fresca. Pasión por el detalle, la presentación y el buen servicio.",
      ctaContact: "Contáctame",
      ctaDrinks: "Ver mis tragos",
      scroll: "Desliza",
    },
    about: {
      title: "Sobre mí",
      kicker: "Perfil profesional",
      paragraphs: [
        "Soy Javier, bartender internacional titulado con mención en mixología en Bar Academy (Chile). Disfruto cada momento detrás de la barra: desde preparar un clásico bien balanceado hasta diseñar un trago de autor pensado para sorprender.",
        "Me caracterizo por mi dedicación, mi atención al detalle y mi compromiso con un servicio cálido y profesional. Trabajo con orden, cuido la presentación de cada trago y disfruto crear momentos memorables para cada cliente.",
        "Busco sumarme a un equipo donde pueda seguir creciendo, aportar energía y entregar una experiencia de barra a la altura.",
      ],
      facts: [
        { label: "Edad", value: "25 años" },
        { label: "Título", value: "Bartender Internacional" },
        { label: "Mención", value: "Mixología" },
        { label: "Institución", value: "Bar Academy" },
      ],
    },
    skills: {
      title: "Mi carta",
      kicker: "Cócteles & Mixología",
      intro:
        "Una selección de los tragos que preparo con mayor dominio. Cada uno cuidado en su equilibrio, técnica y presentación.",
      signatureTitle: "Tragos destacados",
      mocktailTitle: "Mocktails de fruta",
      mocktailDesc:
        "Cócteles sin alcohol elaborados con fruta fresca: opciones vibrantes, coloridas y refrescantes para todo tipo de público.",
      drinks: [
        {
          name: "Mojito",
          desc: "Ron, menta fresca, lima y soda.",
          tag: "Refrescante",
        },
        {
          name: "Tom Collins",
          desc: "Gin, limón, azúcar y soda.",
          tag: "Clásico",
        },
        {
          name: "Aperol Spritz",
          desc: "Aperol, espumante y un toque de soda.",
          tag: "Aperitivo",
        },
        {
          name: "Electric Lemonade",
          desc: "Vodka, blue curaçao y limonada.",
          tag: "De autor",
        },
        {
          name: "Blue Curaçao",
          desc: "Cóctel azul, dulce y cítrico.",
          tag: "Vibrante",
        },
        {
          name: "Margarita",
          desc: "Tequila, triple sec y jugo de lima.",
          tag: "Clásico",
        },
        {
          name: "Martini",
          desc: "Gin o vodka con vermut, elegante y seco.",
          tag: "Elegante",
        },
        {
          name: "Mocktails de fruta",
          desc: "Sin alcohol, con fruta fresca de temporada.",
          tag: "Sin alcohol",
        },
      ],
      coreTitle: "Competencias",
      core: [
        "Coctelería clásica y de autor",
        "Técnicas de mixología",
        "Mocktails y opciones sin alcohol",
        "Presentación y decoración de tragos",
        "Atención y servicio al cliente",
        "Manejo y orden de la barra",
        "Trabajo en equipo bajo presión",
        "Conocimiento de destilados",
      ],
    },
    experience: {
      title: "Trayectoria",
      kicker: "Experiencia & Formación",
      items: [
        {
          role: "Práctica profesional · Bartender",
          place: "Alto Japón Restobar",
          period: "Práctica profesional",
          desc: "Preparación de cócteles y atención en barra en un entorno real de restobar, aplicando técnicas de mixología, manejo de tiempos y servicio al cliente.",
        },
      ],
      educationTitle: "Formación",
      education: {
        degree: "Bartender Internacional con mención en Mixología",
        place: "Bar Academy · Chile",
        period: "Certificado",
        desc: "Formación profesional en coctelería nacional e internacional, técnicas de mixología, destilados, presentación y servicio. Titulado con certificado.",
      },
    },
    contact: {
      title: "Hablemos",
      kicker: "Contacto",
      intro:
        "¿Buscas un bartender para tu equipo, evento o local? Escríbeme y te responderé a la brevedad.",
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@correo.com",
      messageLabel: "Mensaje",
      messagePlaceholder: "Cuéntame sobre la oportunidad o evento...",
      submit: "Enviar mensaje",
      sending: "Enviando...",
      success: "¡Mensaje enviado! Gracias, te responderé pronto.",
      error:
        "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme directamente.",
      orReach: "O contáctame por",
      required: "Este campo es obligatorio.",
      invalidEmail: "Ingresa un correo válido.",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      builtWith: "Portafolio profesional de bartender.",
    },
  },

  en: {
    nav: {
      about: "About",
      skills: "Cocktails",
      experience: "Experience",
      contact: "Contact",
      downloadCv: "Download CV",
    },
    hero: {
      eyebrow: "International Bartender · Mixology",
      name: "Javier Rodríguez Rulas",
      role: "Bartender with a Mention in Mixology",
      tagline:
        "I craft experiences behind the bar: precisely executed classics, signature drinks, and fresh-fruit mocktails. Passionate about detail, presentation, and great service.",
      ctaContact: "Get in touch",
      ctaDrinks: "See my drinks",
      scroll: "Scroll",
    },
    about: {
      title: "About me",
      kicker: "Professional profile",
      paragraphs: [
        "I'm Javier, a certified international bartender with a mention in mixology from Bar Academy (Chile). I enjoy every moment behind the bar — from building a well-balanced classic to designing a signature drink made to surprise.",
        "I'm known for my dedication, attention to detail, and commitment to warm, professional service. I work in an organized way, take care with the presentation of every drink, and love creating memorable moments for each guest.",
        "I'm looking to join a team where I can keep growing, bring energy, and deliver a bar experience that lives up to expectations.",
      ],
      facts: [
        { label: "Age", value: "25 years" },
        { label: "Title", value: "International Bartender" },
        { label: "Mention", value: "Mixology" },
        { label: "Institution", value: "Bar Academy" },
      ],
    },
    skills: {
      title: "My menu",
      kicker: "Cocktails & Mixology",
      intro:
        "A selection of the drinks I make with the most confidence. Each one cared for in balance, technique, and presentation.",
      signatureTitle: "Featured drinks",
      mocktailTitle: "Fruit mocktails",
      mocktailDesc:
        "Alcohol-free cocktails made with fresh fruit: vibrant, colorful, and refreshing options for every guest.",
      drinks: [
        {
          name: "Mojito",
          desc: "Rum, fresh mint, lime, and soda.",
          tag: "Refreshing",
        },
        {
          name: "Tom Collins",
          desc: "Gin, lemon, sugar, and soda.",
          tag: "Classic",
        },
        {
          name: "Aperol Spritz",
          desc: "Aperol, sparkling wine, a splash of soda.",
          tag: "Aperitif",
        },
        {
          name: "Electric Lemonade",
          desc: "Vodka, blue curaçao, and lemonade.",
          tag: "Signature",
        },
        {
          name: "Blue Curaçao",
          desc: "A sweet, citrusy blue cocktail.",
          tag: "Vibrant",
        },
        {
          name: "Margarita",
          desc: "Tequila, triple sec, and lime juice.",
          tag: "Classic",
        },
        {
          name: "Martini",
          desc: "Gin or vodka with vermouth — sleek and dry.",
          tag: "Elegant",
        },
        {
          name: "Fruit mocktails",
          desc: "Alcohol-free, made with fresh seasonal fruit.",
          tag: "Alcohol-free",
        },
      ],
      coreTitle: "Core skills",
      core: [
        "Classic & signature cocktails",
        "Mixology techniques",
        "Mocktails & alcohol-free options",
        "Drink presentation & garnishing",
        "Customer service & hospitality",
        "Bar setup & organization",
        "Teamwork under pressure",
        "Knowledge of spirits",
      ],
    },
    experience: {
      title: "Journey",
      kicker: "Experience & Education",
      items: [
        {
          role: "Professional internship · Bartender",
          place: "Alto Japón Restobar",
          period: "Professional internship",
          desc: "Cocktail preparation and bar service in a real restobar environment, applying mixology techniques, time management, and customer service.",
        },
      ],
      educationTitle: "Education",
      education: {
        degree: "International Bartender with a Mention in Mixology",
        place: "Bar Academy · Chile",
        period: "Certified",
        desc: "Professional training in national and international cocktail-making, mixology techniques, spirits, presentation, and service. Graduated with certificate.",
      },
    },
    contact: {
      title: "Let's talk",
      kicker: "Contact",
      intro:
        "Looking for a bartender for your team, event, or venue? Send me a message and I'll get back to you shortly.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about the opportunity or event...",
      submit: "Send message",
      sending: "Sending...",
      success: "Message sent! Thank you — I'll get back to you soon.",
      error:
        "The message could not be sent. Please try again or email me directly.",
      orReach: "Or reach me on",
      required: "This field is required.",
      invalidEmail: "Enter a valid email.",
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Professional bartender portfolio.",
    },
  },
};
