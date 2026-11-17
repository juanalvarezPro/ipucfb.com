"use server";

import { z } from "zod";
import { getPrisma, hasDatabase } from "@/lib/prisma";
import { syncLeadToWasapi, type LeadKind } from "@/lib/wasapi";

export type FormState = {
  status: "idle" | "ok" | "error";
  message?: string;
};

/** Celular colombiano (3xx…) → 57…; otro país se acepta con indicativo. */
function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (/^3\d{9}$/.test(digits)) return `57${digits}`;
  if (/^\d{11,15}$/.test(digits)) return digits;
  return null;
}

const schema = z.object({
  kind: z.enum(["PRAYER", "VISIT", "CONTACT"]),
  name: z.string().trim().min(2, "Escribe tu nombre").max(80),
  phone: z.string().trim().min(7, "Escribe tu WhatsApp"),
  message: z.string().trim().max(1500).optional(),
  // Campo trampa: los bots lo llenan, las personas no lo ven.
  website: z.string().max(0).optional(),
});

export async function submitRequest(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = schema.safeParse({
    kind: formData.get("kind"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    message: formData.get("message") || undefined,
    website: formData.get("website") || undefined,
  });

  if (!parsed.success) {
    // El bot que llena el campo trampa recibe un «ok» falso y no se guarda nada.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return { status: "ok" };
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Revisa los datos" };
  }

  const phone = normalizePhone(parsed.data.phone);
  if (!phone) return { status: "error", message: "Ese número no parece válido. Ej: 300 123 4567" };

  const lead = {
    kind: parsed.data.kind as LeadKind,
    name: parsed.data.name,
    phone,
    message: parsed.data.message ?? null,
  };

  try {
    const wasapiOk = await syncLeadToWasapi(lead);
    if (hasDatabase()) {
      await getPrisma().contactRequest.create({ data: { ...lead, wasapiOk } });
    } else if (!wasapiOk) {
      console.warn("[form] sin DATABASE_URL ni Wasapi: la solicitud no se guardó", lead.kind);
    }
  } catch (error) {
    console.error("[form] submitRequest", error);
    return { status: "error", message: "No pudimos enviar tu mensaje. Escríbenos por WhatsApp 🙏" };
  }

  const thanks: Record<LeadKind, string> = {
    PRAYER: "Recibimos tu petición. Estaremos orando por ti. 🙏",
    VISIT: "¡Te esperamos con los brazos abiertos! Pronto te escribimos por WhatsApp.",
    CONTACT: "¡Gracias por escribirnos! Te responderemos por WhatsApp.",
  };
  return { status: "ok", message: thanks[lead.kind] };
}
