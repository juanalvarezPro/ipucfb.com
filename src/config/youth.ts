/**
 * Ministerio de Jóvenes — directiva 2027 y opciones de la encuesta.
 * Las presentaciones cortas son un borrador: cada integrante puede ajustar la suya.
 */

const R2 = "https://media.sonarpiano.com/ipucfb/jovenes";

/** La nueva directiva empieza su vigencia aquí (hora de Colombia). */
export const TERM_START = "2027-01-01T00:00:00-05:00";

export type Leader = {
  role: string;
  name: string;
  photo?: string;
  instagram?: string;
  bio: string;
};

export const directiva: Leader[] = [
  {
    role: "Líder",
    name: "Juan Álvarez",
    photo: `${R2}/juan.webp`,
    instagram: "thisalvarez",
    bio: "Creativo de corazón: ama cada proceso, desde la primera idea hasta verla viva. Ingeniero de software y creador de SonarPiano. Su meta: una juventud que no se apague.",
  },
  {
    role: "Sublíder",
    name: "Jhon Jaramillo",
    photo: `${R2}/jhon-v2.webp`,
    instagram: "jhonjaramillostorycraft",
    bio: "Realizador audiovisual y director creativo. «Orando por ideas con propósito»: convierte historias en imágenes que apuntan a Cristo.",
  },
  {
    role: "Secretaria",
    name: "Marly Cañas",
    photo: `${R2}/marly.webp`,
    instagram: "marlycanasguzman",
    bio: "Creadora de la marca @mc.leathers. Ama cantar y conversar: si te inscribes, seguro ella será la primera en escribirte para conocerte.",
  },
  {
    role: "Tesorero",
    name: "Elías Londoño",
    photo: `${R2}/elias.webp`,
    instagram: "eliasjlo",
    bio: "Contador de profesión y alegría en persona. Cuida con fidelidad cada recurso del grupo, siempre con una sonrisa.",
  },
  {
    role: "Vocal · Asesor",
    name: "Cristian García",
    bio: "Músico e ingeniero. Ama predicarle a las almas y contar historias de su trabajo: siempre tiene un testimonio que te deja pensando.",
  },
  {
    role: "Auxiliar en formación",
    name: "Samuel Bohórquez",
    bio: "Aprendiendo a servir desde ya: la próxima generación de líderes se forma aquí.",
  },
];

export type Option = { value: string; label: string };
const o = (...labels: string[]): Option[] =>
  labels.map((label) => ({
    value: label
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    label,
  }));

export const OPTIONS = {
  gender: o("Hombre", "Mujer"),
  occupation: o("Colegio", "Universidad", "Técnico / tecnólogo", "Trabajo", "Estudio y trabajo", "Ninguna por ahora"),
  timeInChurch: o("Soy nuevo", "Menos de 1 año", "De 1 a 3 años", "Más de 3 años", "Toda la vida"),
  howArrived: o("Mi familia", "Un amigo", "Redes sociales", "Un evento", "Otro"),
  baptized: o("Sí", "Todavía no", "Quiero bautizarme"),
  holySpirit: o("Sí", "Todavía no", "Lo estoy buscando"),
  familyAttends: o("Sí, todos", "Algunos", "No"),
  musicGenres: o("Worship / alabanza", "Urbano cristiano", "Pop", "Rock", "Balada", "Vallenato", "Salsa", "Electrónica", "Instrumental"),
  hobbies: o("Deportes", "Videojuegos", "Leer", "Cine y series", "Dibujar", "Foto y video", "Cocinar", "Tecnología", "Tocar música", "Salir con amigos", "Naturaleza"),
  favoriteSocial: o("Instagram", "TikTok", "YouTube", "WhatsApp", "Facebook", "Ninguna"),
  talents: o("Cantar", "Tocar un instrumento", "Diseño", "Editar video", "Fotografía", "Redes sociales", "Sonido y luces", "Teatro", "Enseñar a niños", "Organizar eventos", "Orar e interceder", "Hablar en público"),
  wantsToServe: o("Alabanza", "Multimedia", "Redes sociales", "Logística", "Bienvenida", "Niños", "Evangelismo", "Intercesión", "Todavía no sé"),
  activities: o("Campamentos", "Torneos deportivos", "Vigilias", "Salidas y paseos", "Grupos pequeños", "Talleres", "Conciertos", "Evangelismo en la calle", "Retiros", "Noches de juegos"),
  topics: o("Noviazgo y pureza", "Propósito y vocación", "Ansiedad y emociones", "Familia", "Redes sociales", "Estudio y futuro", "Finanzas", "Identidad", "Fe y ciencia", "Cómo orar y leer la Biblia"),
  fridayAvailable: o("Sí, siempre", "A veces", "No puedo"),
} as const;
