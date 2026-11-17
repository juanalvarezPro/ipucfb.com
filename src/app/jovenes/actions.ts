"use server";

import { z } from "zod";
import { OPTIONS } from "@/config/youth";
import { getPrisma } from "@/lib/prisma";

export type RegisterState = { status: "idle" | "ok" | "error"; message?: string; firstName?: string };

/** Celular colombiano (3xx…) → 57…; otro país se acepta con indicativo. */
function normalizePhone(raw?: string | null): string | null {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (/^3\d{9}$/.test(digits)) return `57${digits}`;
  if (/^\d{11,15}$/.test(digits)) return digits;
  return null;
}

function ageOn(birth: Date, at = new Date()) {
  let age = at.getFullYear() - birth.getFullYear();
  const m = at.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && at.getDate() < birth.getDate())) age--;
  return age;
}

const pick = (key: keyof typeof OPTIONS) => {
  const allowed = OPTIONS[key].map((x) => x.value) as [string, ...string[]];
  return z.enum(allowed);
};
const one = (key: keyof typeof OPTIONS) => pick(key).optional().or(z.literal("").transform(() => undefined));
const many = (key: keyof typeof OPTIONS) => z.array(pick(key)).max(20).default([]);
const text = (max = 200) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

const schema = z.object({
  firstName: z.string().trim().min(2, "Escribe tu nombre").max(60),
  lastName: z.string().trim().min(2, "Escribe tu apellido").max(60),
  nickname: text(40),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Escribe tu fecha de nacimiento"),
  gender: one("gender"),
  whatsapp: z.string().trim().min(7, "Escribe tu WhatsApp"),
  instagram: text(40),
  neighborhood: text(80),
  occupation: one("occupation"),
  institution: text(100),
  grade: text(40),
  guardianName: text(80),
  guardianPhone: text(20),
  guardianRelation: text(40),
  timeInChurch: one("timeInChurch"),
  howArrived: one("howArrived"),
  baptized: one("baptized"),
  holySpirit: one("holySpirit"),
  familyAttends: one("familyAttends"),
  musicGenres: many("musicGenres"),
  favoriteArtists: text(200),
  hobbies: many("hobbies"),
  favoriteSport: text(60),
  favoriteFood: text(60),
  favoriteSocial: one("favoriteSocial"),
  talents: many("talents"),
  instrument: text(60),
  wantsToServe: many("wantsToServe"),
  activities: many("activities"),
  topics: many("topics"),
  fridayAvailable: one("fridayAvailable"),
  dreams: text(600),
  prayerRequest: text(1000),
  forLeaders: text(1000),
  dataConsent: z.literal(true, { message: "Necesitamos tu autorización para guardar tus datos" }),
  imageConsent: z.boolean().default(false),
  website: z.string().max(0).optional(), // campo trampa anti-bots
});

export type RegisterInput = z.input<typeof schema>;

export async function registerYouth(input: RegisterInput): Promise<RegisterState> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return { status: "ok" };
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Revisa tus datos" };
  }
  const d = parsed.data;

  const birth = new Date(`${d.birthDate}T12:00:00Z`);
  const age = ageOn(birth);
  if (Number.isNaN(birth.getTime()) || age < 10 || age > 40) {
    return { status: "error", message: "Revisa tu fecha de nacimiento" };
  }

  const whatsapp = normalizePhone(d.whatsapp);
  if (!whatsapp) return { status: "error", message: "Ese WhatsApp no parece válido. Ej: 300 123 4567" };

  // Menores de edad: el acudiente es obligatorio.
  let guardianPhone: string | null = null;
  if (age < 18) {
    guardianPhone = normalizePhone(d.guardianPhone);
    if (!d.guardianName || !guardianPhone) {
      return { status: "error", message: "Como eres menor de edad, necesitamos el nombre y WhatsApp de tu acudiente" };
    }
  }

  try {
    await getPrisma().youthRegistration.create({
      data: {
        firstName: d.firstName,
        lastName: d.lastName,
        nickname: d.nickname,
        birthDate: birth,
        gender: d.gender,
        whatsapp,
        instagram: d.instagram?.replace(/^@/, ""),
        neighborhood: d.neighborhood,
        occupation: d.occupation,
        institution: d.institution,
        grade: d.grade,
        guardianName: age < 18 ? d.guardianName : null,
        guardianPhone,
        guardianRelation: age < 18 ? d.guardianRelation : null,
        timeInChurch: d.timeInChurch,
        howArrived: d.howArrived,
        baptized: d.baptized,
        holySpirit: d.holySpirit,
        familyAttends: d.familyAttends,
        musicGenres: d.musicGenres,
        favoriteArtists: d.favoriteArtists,
        hobbies: d.hobbies,
        favoriteSport: d.favoriteSport,
        favoriteFood: d.favoriteFood,
        favoriteSocial: d.favoriteSocial,
        talents: d.talents,
        instrument: d.instrument,
        wantsToServe: d.wantsToServe,
        activities: d.activities,
        topics: d.topics,
        fridayAvailable: d.fridayAvailable,
        dreams: d.dreams,
        prayerRequest: d.prayerRequest,
        forLeaders: d.forLeaders,
        dataConsent: d.dataConsent,
        imageConsent: d.imageConsent,
      },
    });
  } catch (error) {
    console.error("[jovenes] registerYouth", error);
    return { status: "error", message: "No pudimos guardar tu inscripción. Intenta de nuevo en un momento 🙏" };
  }

  return { status: "ok", firstName: d.nickname || d.firstName };
}
