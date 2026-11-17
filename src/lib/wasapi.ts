import "server-only";
import { WasapiClient } from "@wasapi/js-sdk";

let client: WasapiClient | null = null;

export const hasWasapi = () => Boolean(process.env.WASAPI_API_KEY && process.env.WASAPI_FROM_ID);

function getClient(): WasapiClient {
  if (!client) {
    const apiKey = process.env.WASAPI_API_KEY;
    const fromId = process.env.WASAPI_FROM_ID;
    if (!apiKey || !fromId) throw new Error("Faltan WASAPI_API_KEY / WASAPI_FROM_ID");
    client = new WasapiClient({ apiKey, from_id: Number(fromId) });
  }
  return client;
}

/** [{{1}}, {{2}}…] en el formato que espera Wasapi. */
const vars = (...values: string[]) => values.map((val, i) => ({ text: `{{${i + 1}}}`, val }));

const labelCache = new Map<string, number>();

/** Id de la etiqueta; la crea si no existe (para filtrar en el panel). */
async function resolveLabel(title: string, color: string): Promise<number | null> {
  if (labelCache.has(title)) return labelCache.get(title)!;
  try {
    const c = getClient();
    const { labels } = await c.labels.getAll();
    const found = labels.find((l) => l.title.trim().toLowerCase() === title.toLowerCase());
    const id = found
      ? found.id
      : (await c.labels.create({ title, description: "Llegó desde ipucfb.com", color })).data.id;
    labelCache.set(title, id);
    return id;
  } catch (error) {
    console.error("[wasapi] etiqueta", error);
    return null;
  }
}

export type LeadKind = "PRAYER" | "VISIT" | "CONTACT";

const KIND_LABEL: Record<LeadKind, { title: string; human: string; color: string }> = {
  PRAYER: { title: "Web · Oración", human: "Petición de oración", color: "#00338d" },
  VISIT: { title: "Web · Visita", human: "Quiere visitarnos", color: "#009fda" },
  CONTACT: { title: "Web · Contacto", human: "Mensaje", color: "#f0ab00" },
};

/**
 * Lleva la solicitud a WhatsApp vía Wasapi. Best-effort: nunca lanza.
 *  1. Crea el contacto con su etiqueta (Oración / Visita / Contacto).
 *  2. Si hay plantilla de bienvenida, se la envía a la persona.
 *  3. Si hay plantilla de equipo, avisa a los números del equipo pastoral.
 * Devuelve true si al menos el contacto quedó creado.
 */
export async function syncLeadToWasapi(lead: {
  kind: LeadKind;
  name: string;
  phone: string;
  message?: string | null;
}): Promise<boolean> {
  if (!hasWasapi()) return false;
  const c = getClient();
  const meta = KIND_LABEL[lead.kind];
  const [firstName, ...rest] = lead.name.trim().split(/\s+/);
  let ok = false;

  try {
    const labelId = await resolveLabel(meta.title, meta.color);
    await c.contacts.create({
      first_name: firstName || "Hermano(a)",
      last_name: rest.join(" ") || undefined,
      phone: lead.phone,
      notes: `${meta.human} desde ipucfb.com${lead.message ? `: ${lead.message.slice(0, 400)}` : ""}`,
      ...(labelId != null ? { labels: [labelId] } : {}),
    });
    ok = true;
  } catch (error) {
    // Si el contacto ya existe, Wasapi responde error: no es grave.
    console.warn("[wasapi] contacto", error);
    ok = true;
  }

  const welcome = process.env.WASAPI_WELCOME_TEMPLATE_ID;
  if (welcome) {
    await c.whatsapp
      .sendTemplate({
        recipients: lead.phone,
        template_id: welcome,
        contact_type: "phone",
        body_vars: vars(firstName || "hermano(a)"),
      })
      .catch((e) => console.error("[wasapi] bienvenida", e));
  }

  const team = process.env.WASAPI_TEAM_TEMPLATE_ID;
  const teamPhones = (process.env.WASAPI_TEAM_PHONES ?? "").split(",").map((p) => p.trim()).filter(Boolean);
  if (team && teamPhones.length) {
    await Promise.allSettled(
      teamPhones.map((recipient) =>
        c.whatsapp.sendTemplate({
          recipients: recipient,
          template_id: team,
          contact_type: "phone",
          body_vars: vars(meta.human, lead.name, `+${lead.phone}`, lead.message?.slice(0, 500) || "—"),
        }),
      ),
    );
  }

  return ok;
}
