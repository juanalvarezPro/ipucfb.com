"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { defaultServices, type ServiceItem } from "@/config/church";

const DAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
/** Un culto se muestra «en curso» durante este tiempo después de empezar. */
const LIVE_MINUTES = 120;

/** Día de la semana y minutos actuales en hora de Colombia (UTC−5, sin horario de verano). */
function nowInBogota() {
  const now = new Date(Date.now() - 5 * 60 * 60 * 1000);
  return { dow: now.getUTCDay(), minutes: now.getUTCHours() * 60 + now.getUTCMinutes() };
}

type Next = { service: ServiceItem; label: string; live: boolean };

function computeNext(): Next {
  const { dow, minutes } = nowInBogota();
  const nowWeek = dow * 1440 + minutes;
  let best: { s: ServiceItem; diff: number } | null = null;
  for (const s of defaultServices) {
    if (s.dow == null || s.start == null) continue;
    const at = s.dow * 1440 + s.start;
    // Diferencia hacia adelante en la semana (permitiendo «en curso»).
    let diff = at - nowWeek;
    if (diff < -LIVE_MINUTES) diff += 7 * 1440;
    if (!best || diff < best.diff) best = { s, diff };
  }
  const s = best!.s;
  const live = best!.diff <= 0;
  const daysAhead = Math.floor((minutes + Math.max(best!.diff, 0)) / 1440);
  const label = live ? "En curso" : daysAhead === 0 ? "Hoy" : daysAhead === 1 ? "Mañana" : DAYS[s.dow!];
  return { service: s, label, live };
}

/** «Próximo culto»: se calcula en el navegador con la hora de Colombia. */
export function NextService() {
  const [next, setNext] = useState<Next | null>(null);

  useEffect(() => {
    const update = () => setNext(computeNext());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mx-auto mt-10 inline-flex min-w-[17rem] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-left backdrop-blur lg:mx-0 lg:mt-[3.6vh] lg:py-[1.4vh]">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
        <CalendarClock className="size-6" aria-hidden />
      </span>
      <span aria-live="polite">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
          {next?.live && <span className="size-2 animate-pulse rounded-full bg-red-500" />}
          {next?.live ? "Culto en curso" : "Próximo culto"}
          {next && <span className="text-white/70">· {next.service.title}</span>}
        </span>
        <span className="block font-display text-xl uppercase tracking-wide">
          {next ? `${next.label} · ${next.service.time}` : " "}
        </span>
      </span>
    </div>
  );
}
