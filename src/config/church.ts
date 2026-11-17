/**
 * Datos de la congregación — TODO lo que es propio de la iglesia vive aquí.
 * ⚠️ Los valores marcados con «POR CONFIRMAR» son de ejemplo: cámbialos por
 * los reales (nombre, dirección, horarios, pastores, redes).
 */
export const church = {
  /** Nombre corto que se ve en el header */
  shortName: "IPUC Ferrería Bariloche",
  /** Nombre completo de la congregación */
  name: "Iglesia Pentecostal Unida de Colombia · Ferrería Bariloche",
  domain: "ipucfb.com",
  motto: "Un Señor, una fe, un bautismo",
  mottoRef: "Efesios 4:5",
  /** Lema del año (bio de Instagram) */
  yearTheme: "Levántate y resplandece",
  yearThemeRef: "Isaías 60:1",
  pastors: "Pastor Anderson Pabón",
  pastorInstagram: "https://www.instagram.com/andersonpabon/",
  address: {
    line: "Calle 74 Sur #57-44",
    area: "Portal de Ditaires",
    city: "Itagüí, Antioquia",
    /** Ficha de la iglesia en Google Maps (link de la bio de Instagram) */
    mapsUrl:
      "https://maps.google.com/?q=Iglesia+Pentecostal+Unida+de+Colombia+-+Ferrer%C3%ADa+Bariloche,+Cl.+74+Sur+%2357-44,+Portal+de+Ditaires,+Itag%C3%BCi,+Antioquia&ftid=0x8e46810031d60401:0xce7d8822f3a755b0",
    wazeUrl: "https://waze.com/ul?q=Calle%2074%20Sur%2057-44%20Itag%C3%BCi%20Antioquia&navigate=yes",
  },
  /** WhatsApp de la iglesia (la línea conectada a Wasapi), solo dígitos */
  whatsapp: "", // POR CONFIRMAR
  email: "", // POR CONFIRMAR
  youtube: {
    handle: "@Ipucferreriabariloche",
    channelId: "UCMDnkdQZff6ASdPc5sKagkg",
    url: "https://www.youtube.com/@Ipucferreriabariloche/streams",
  },
  socials: {
    youtube: "https://www.youtube.com/@Ipucferreriabariloche",
    instagram: "https://www.instagram.com/ipucfb/",
    facebook: "",
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
  { day: "Miércoles", title: "Culto de Enseñanza", time: "7:00 p. m.", note: "Estudio de la Palabra" },
  { day: "Viernes", title: "Culto de Jóvenes", time: "7:00 p. m.", note: "Juventud encendida" },
  { day: "Domingo", title: "Escuela Dominical", time: "10:00 a. m.", note: "Para toda la familia", highlight: true },
];

export const whatsappLink = (text = "¡Hola! Quisiera más información sobre la iglesia 🙏") =>
  `https://wa.me/${church.whatsapp}?text=${encodeURIComponent(text)}`;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${church.domain}`;
