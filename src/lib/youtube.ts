import { cacheLife } from "next/cache";
import { church } from "@/config/church";

export type LatestStream = { id: string; title: string };

const HEADERS = { "User-Agent": "Mozilla/5.0", "Accept-Language": "es-CO,es;q=0.9" };

/** Primer video de la pestaña «En vivo» del canal (la transmisión más reciente). */
async function fromStreamsTab(): Promise<string | null> {
  const res = await fetch(church.youtube.url, { headers: HEADERS });
  if (!res.ok) return null;
  const html = await res.text();
  return html.match(/"videoId":"([\w-]{11})"/)?.[1] ?? null;
}

/** Respaldo: el video más reciente del feed RSS del canal. */
async function fromRss(): Promise<string | null> {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${church.youtube.channelId}`);
  if (!res.ok) return null;
  return (await res.text()).match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1] ?? null;
}

async function titleOf(id: string): Promise<string> {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
    if (res.ok) {
      const { title } = (await res.json()) as { title?: string };
      if (title) return title.replace(/\*+/g, "").replace(/\s+/g, " ").trim();
    }
  } catch {}
  return "Transmisión en vivo";
}

/**
 * Última transmisión del canal. Se cachea 1 hora (cacheComponents), así la
 * página sigue siendo estática y no le pega a YouTube en cada visita.
 */
export async function getLatestStream(): Promise<LatestStream | null> {
  "use cache";
  cacheLife("hours");
  try {
    const id = (await fromStreamsTab().catch(() => null)) ?? (await fromRss().catch(() => null));
    if (!id) return null;
    return { id, title: await titleOf(id) };
  } catch (error) {
    console.error("[youtube] getLatestStream", error);
    return null;
  }
}
