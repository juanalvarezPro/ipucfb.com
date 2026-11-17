import { cacheLife } from "next/cache";
import { defaultServices, type ServiceItem } from "@/config/church";
import { getPrisma, hasDatabase } from "@/lib/prisma";

const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

/** Cultos desde Neon; si no hay base o está vacía, los de config/church.ts. */
export async function getServices(): Promise<ServiceItem[]> {
  "use cache";
  cacheLife("hours");
  if (!hasDatabase()) return defaultServices;
  try {
    const rows = await getPrisma().service.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { dayOfWeek: "asc" }],
    });
    if (!rows.length) return defaultServices;
    return rows.map((r, i) => ({
      day: DAYS[r.dayOfWeek] ?? "",
      title: r.title,
      time: r.time,
      note: r.note ?? undefined,
      highlight: i === 0,
    }));
  } catch (error) {
    console.error("[services]", error);
    return defaultServices;
  }
}
