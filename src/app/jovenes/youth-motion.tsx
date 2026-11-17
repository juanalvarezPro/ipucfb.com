"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { Flame } from "lucide-react";
import { Instagram } from "@/components/brand/social-icons";
import { TERM_START, type Leader } from "@/config/youth";

/* ── Título que cae letra por letra ────────────────────────── */

export function DropTitle({ text }: { text: string }) {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <h1 aria-label={text} className="flex justify-center font-display font-bold uppercase leading-[0.8] tracking-tighter">
        {text.split("").map((ch, i) => (
          <m.span
            key={i}
            aria-hidden
            initial={reduce ? false : { y: "-120%", rotate: i % 2 ? 12 : -12, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 + i * 0.07 }}
            className="text-fire inline-block pt-[0.18em] text-[clamp(4.2rem,19vw,15rem)]"
          >
            {ch}
          </m.span>
        ))}
      </h1>
    </LazyMotion>
  );
}

/* ── Sticker circular que gira ─────────────────────────────── */

export function SpinSticker({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 200 200" className="h-full w-full animate-[spin_14s_linear_infinite]">
        <defs>
          <path id="sticker-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="98" fill="#ffd23f" />
        <text fontSize="19" fontWeight="800" letterSpacing="3" fill="#1a0500" fontFamily="var(--font-oswald)">
          <textPath href="#sticker-circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <Flame className="size-12 fill-[#ff3d00] text-[#b32000]" />
      </span>
    </div>
  );
}

/* ── Cuenta regresiva a la nueva directiva ─────────────────── */

function diffParts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { días: Math.floor(s / 86400), horas: Math.floor((s % 86400) / 3600), min: Math.floor((s % 3600) / 60), seg: s % 60 };
}

export function Countdown() {
  const target = new Date(TERM_START).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0); // tras hidratar: evita desajuste servidor/cliente
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  if (now != null && now >= target) {
    return <p className="font-display text-2xl uppercase text-[#ffd23f]">¡La nueva directiva ya arrancó! 🔥</p>;
  }
  const parts = diffParts(now == null ? 0 : target - now);
  return (
    <div className="flex justify-center gap-2 sm:gap-3" aria-label="Tiempo para el 1 de enero de 2027">
      {Object.entries(parts).map(([label, value]) => (
        <div key={label} className="min-w-[4.2rem] rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2 text-center backdrop-blur sm:min-w-[5rem]">
          <span className="block font-display text-3xl font-bold tabular-nums text-white sm:text-4xl">
            {now == null ? "--" : String(value).padStart(2, "0")}
          </span>
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#ffb347]">{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Tarjetas de la directiva ──────────────────────────────── */

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export function LeaderGrid({ leaders }: { leaders: Leader[] }) {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {leaders.map((l, i) => (
          <m.li
            key={`${l.role}-${l.name}`}
            initial={reduce ? false : { opacity: 0, y: 40, rotate: i % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.2 : -1.2 }}
            whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 180, damping: 18, delay: (i % 3) * 0.08 }}
            className={
              i === 0
                ? "group relative overflow-hidden rounded-[2rem] border border-[#ff8a00]/50 bg-gradient-to-br from-[#2a0a02] to-[#0b0306] p-6 shadow-[0_20px_60px_-20px_rgb(255_80_0/0.6)] sm:col-span-2 lg:col-span-1"
                : "group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
            }
          >
            <span aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-[#ff5e00]/20 blur-3xl transition group-hover:bg-[#ff5e00]/40" />
            <div className="relative flex items-center gap-4">
              {l.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={l.photo}
                  alt={l.name}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="size-24 shrink-0 rounded-[1.4rem] bg-white object-cover ring-2 ring-[#ff8a00] ring-offset-4 ring-offset-[#0b0306]"
                />
              ) : (
                <span className="grid size-24 shrink-0 place-items-center rounded-[1.4rem] bg-gradient-to-br from-[#ff3d00] to-[#ffb000] font-display text-4xl font-bold text-[#1a0500] ring-2 ring-[#ff8a00] ring-offset-4 ring-offset-[#0b0306]">
                  {initials(l.name)}
                </span>
              )}
              <div className="min-w-0">
                <span className="inline-block -rotate-2 rounded-md bg-[#ffd23f] px-2 py-0.5 text-[0.7rem] font-black uppercase tracking-[0.18em] text-[#1a0500]">
                  {l.role}
                </span>
                <h3 className="mt-2 font-display text-3xl font-bold uppercase leading-none text-white">{l.name}</h3>
                {l.instagram && (
                  <a
                    href={`https://www.instagram.com/${l.instagram}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffb347] hover:text-white"
                  >
                    <Instagram className="size-4" /> @{l.instagram}
                  </a>
                )}
              </div>
            </div>
            <p className="relative mt-5 leading-relaxed text-white/75">{l.bio}</p>
          </m.li>
        ))}
      </ul>
    </LazyMotion>
  );
}
