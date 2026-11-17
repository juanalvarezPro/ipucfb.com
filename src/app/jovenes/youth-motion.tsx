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

/* ── Calendario 2027 con candados ──────────────────────────── */

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
/** Texto de relleno que se ve borroso: insinúa que hay algo, sin revelarlo. */
const TEASERS = [
  "Noche de lanzamiento",
  "Retiro de jóvenes",
  "Torneo relámpago",
  "Vigilia de fuego",
  "Salida sorpresa",
  "Noche de alabanza",
  "Concierto Rejuv",
  "Noche de talentos",
  "Aniversario",
  "Congreso juvenil",
  "Evangelismo",
  "Cierre de año",
];

function Padlock({ shake }: { shake: boolean }) {
  return (
    <m.svg
      viewBox="0 0 48 56"
      className="h-14 w-12 drop-shadow-[0_6px_18px_rgb(255_120_0/0.6)]"
      animate={shake ? { rotate: [0, -14, 12, -8, 6, 0], y: [0, -3, 0] } : { rotate: 0 }}
      transition={{ duration: 0.6 }}
      aria-hidden
    >
      <defs>
        <linearGradient id="lock-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd23f" />
          <stop offset="100%" stopColor="#ff5e00" />
        </linearGradient>
      </defs>
      <path d="M12 24v-8a12 12 0 0 1 24 0v8" fill="none" stroke="#ffd23f" strokeWidth="5" strokeLinecap="round" />
      <rect x="4" y="22" width="40" height="32" rx="8" fill="url(#lock-body)" />
      <circle cx="24" cy="36" r="4.5" fill="#1a0500" />
      <rect x="22" y="38" width="4" height="9" rx="2" fill="#1a0500" />
    </m.svg>
  );
}

function LockedMonth({ month, teaser, index }: { month: string; teaser: string; index: number }) {
  const [shake, setShake] = useState(false);
  const reduce = useReducedMotion();
  return (
    <m.li
      initial={reduce ? false : { opacity: 0, y: 30, rotate: index % 2 ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 0.8 : -0.8 }}
      whileHover={{ rotate: 0, scale: 1.04 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: (index % 4) * 0.06 }}
      onHoverStart={() => setShake(true)}
      onHoverEnd={() => setShake(false)}
      onTap={() => {
        setShake(false);
        requestAnimationFrame(() => setShake(true));
      }}
      className="group relative flex cursor-not-allowed flex-col items-center overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-4 pb-5 pt-4 text-center"
      aria-label={`${month} 2027: bloqueado, se revela pronto`}
    >
      {/* Tira de calendario */}
      <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#ff3d00] via-[#ff8a00] to-[#ffd23f]" aria-hidden />
      <span className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-white">{month}</span>
      <span className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-white/40">2027</span>
      <div className="my-4">
        <Padlock shake={shake} />
      </div>
      <span aria-hidden className="select-none font-display text-lg uppercase text-white/80 blur-[6px]">
        {teaser}
      </span>
      <span className="mt-3 rounded-full border border-[#ff8a00]/40 bg-[#ff5e00]/10 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#ffb347]">
        Se revela pronto
      </span>
      <span aria-hidden className="pointer-events-none absolute -bottom-12 left-1/2 size-28 -translate-x-1/2 rounded-full bg-[#ff5e00]/0 blur-2xl transition duration-500 group-hover:bg-[#ff5e00]/35" />
    </m.li>
  );
}

export function LockedCalendar() {
  return (
    <LazyMotion features={domAnimation}>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {MONTHS.map((month, i) => (
          <LockedMonth key={month} month={month} teaser={TEASERS[i]} index={i} />
        ))}
      </ul>
    </LazyMotion>
  );
}

/* ── Campamento 2027: el evento que sí se deja ver ─────────── */

function LockedChip({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
      <svg viewBox="0 0 48 56" className="h-7 w-6 shrink-0" aria-hidden>
        <path d="M12 24v-8a12 12 0 0 1 24 0v8" fill="none" stroke="#ffd23f" strokeWidth="5" strokeLinecap="round" />
        <rect x="4" y="22" width="40" height="32" rx="8" fill="#ff8a00" />
        <circle cx="24" cy="37" r="4.5" fill="#1a0500" />
      </svg>
      <span className="text-left">
        <span className="block text-[0.65rem] font-black uppercase tracking-[0.22em] text-[#ffb347]">{label}</span>
        <span aria-hidden className="block select-none font-display text-lg uppercase text-white/80 blur-[5px]">
          Muy pronto
        </span>
        <span className="sr-only">Bloqueado: se revela pronto</span>
      </span>
    </span>
  );
}

export function CampTeaser() {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={reduce ? false : { opacity: 0, y: 40, rotate: -1.5 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        className="relative isolate mb-12 overflow-hidden rounded-[2.2rem] border border-[#ff8a00]/50 bg-[#0b0306] p-6 shadow-[0_30px_90px_-30px_rgb(255_80_0/0.8)] sm:p-10"
      >
        {/* Foto de la finca, desenfocada desde el archivo: incógnita total */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://media.sonarpiano.com/ipucfb/jovenes/campamento-incognita.webp"
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-80"
        />
        {/* Celular: la foto asoma arriba; escritorio: a la derecha */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0b0306]/20 via-[#0b0306]/75 to-[#0b0306] sm:hidden" />
        <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-[#0b0306] via-[#0b0306]/80 to-[#0b0306]/10 sm:block" />
        <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-t from-[#0b0306]/90 via-transparent to-transparent sm:block" />
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-4 select-none font-display text-[8rem] font-bold leading-none text-white/15 sm:right-6 sm:top-1/2 sm:-translate-y-1/2 sm:text-[16rem] sm:text-white/10 lg:right-24 lg:text-[20rem]"
        >
          ?
        </span>

        {/* Fogata */}
        <div aria-hidden className="pointer-events-none absolute -bottom-10 right-4 h-56 w-56 sm:right-16 sm:h-72 sm:w-72">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="flame absolute bottom-0 left-1/2 rounded-full"
              style={{ width: `${9 - i * 2}rem`, height: `${9 - i * 2}rem`, animationDelay: `${i * 0.5}s`, animationDuration: `${2.4 + i * 0.4}s` }}
            />
          ))}
        </div>
        <span aria-hidden className="absolute -right-6 top-6 rotate-12 rounded-md bg-[#ffd23f] px-10 py-1 text-xs font-black uppercase tracking-[0.3em] text-[#1a0500] sm:right-10">
          Muy pronto
        </span>

        <div className="relative max-w-xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#ffb347]">⛺ Se viene…</p>
          <h3 className="mt-2 font-display text-[clamp(3rem,10vw,6.5rem)] font-bold uppercase leading-[0.85]">
            <span className="text-fire">Campa</span>
            <span className="text-fire">mento</span>
            <span className="block text-white">2027</span>
          </h3>
          <p className="mt-4 text-lg text-white/80">
            Una finca, fogata, alabanza, aventura y un encuentro con Dios que no vas a olvidar. ¿Dónde? Eso
            todavía es una incógnita… pero tu cupo empieza con tu inscripción.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <LockedChip label="Fecha" />
            <LockedChip label="Lugar" />
            <LockedChip label="Inversión" />
          </div>
          <a
            href="#inscripcion"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff3d00] to-[#ffb000] px-7 py-4 font-bold text-[#1a0500] shadow-[0_10px_40px_-10px_rgb(255_94_0/0.9)] transition hover:scale-105 active:scale-95"
          >
            <Flame className="size-5 fill-[#ffd23f] text-[#b32000]" aria-hidden />
            Quiero ir al campamento
          </a>
        </div>
      </m.div>
    </LazyMotion>
  );
}
