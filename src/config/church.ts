/**
 * Datos de la congregación — TODO lo que es propio de la iglesia vive aquí.
 * ⚠️ Los valores marcados con «POR CONFIRMAR» son de ejemplo: cámbialos por
 * los reales (nombre, dirección, horarios, pastores, redes).
 */
export const church = {
  /** Nombre corto que se ve en el header */
  shortName: "IPUC FB", // POR CONFIRMAR
  /** Nombre completo de la congregación */
  name: "Iglesia Pentecostal Unida de Colombia", // POR CONFIRMAR: añadir sede/congregación
  domain: "ipucfb.com",
  motto: "Un Señor, una fe, un bautismo",
  mottoRef: "Efesios 4:5",
  pastors: "Pastor y familia pastoral", // POR CONFIRMAR
  address: {
    line: "Dirección del templo", // POR CONFIRMAR
    city: "Colombia", // POR CONFIRMAR
    mapsUrl: "https://maps.google.com/?q=Iglesia+Pentecostal+Unida+de+Colombia", // POR CONFIRMAR
  },
  /** WhatsApp de la iglesia (la línea conectada a Wasapi), solo dígitos */
  whatsapp: "573000000000", // POR CONFIRMAR
  email: "contacto@ipucfb.com", // POR CONFIRMAR
  socials: {
    youtube: "", // POR CONFIRMAR
    facebook: "",
    instagram: "",
  },
} as const;

export type ServiceItem = {
  day: string;
  title: string;
  time: string;
  note?: string;
  highlight?: boolean;
};

/** Horarios de la semana (se usan si la base de datos aún no tiene cultos). */
export const defaultServices: ServiceItem[] = [
  { day: "Domingo", title: "Escuela Dominical", time: "9:00 a. m.", note: "Clases por edades" },
  { day: "Domingo", title: "Culto de Adoración", time: "10:30 a. m.", note: "Servicio principal", highlight: true },
  { day: "Martes", title: "Culto de Oración", time: "7:00 p. m." },
  { day: "Jueves", title: "Culto de Enseñanza", time: "7:00 p. m.", note: "Estudio bíblico" },
  { day: "Sábado", title: "Culto de Jóvenes", time: "6:00 p. m." },
];

export const whatsappLink = (text = "¡Hola! Quisiera más información sobre la iglesia 🙏") =>
  `https://wa.me/${church.whatsapp}?text=${encodeURIComponent(text)}`;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${church.domain}`;
