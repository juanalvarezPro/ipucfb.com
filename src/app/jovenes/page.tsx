import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Flame, Lock } from "lucide-react";
import { IpucLogo } from "@/components/brand/logos";
import { Container } from "@/components/ui/section";
import { directiva } from "@/config/youth";
import { RegistrationWizard } from "./registration-wizard";
import { CampTeaser, Countdown, DropTitle, LeaderGrid, LockedCalendar, SpinSticker } from "./youth-motion";

export const metadata: Metadata = {
  title: "Jóvenes · Rejuv 2.0",
  description:
    "Ministerio de Jóvenes IPUC Ferrería Bariloche. Inscríbete antes del 1 de enero de 2027 y conoce a la nueva directiva. Viernes 7:00 p. m.",
  alternates: { canonical: "/jovenes" },
  openGraph: { url: "/jovenes", title: "Jóvenes IPUCFB · ¡Inscríbete!" },
};

const TAPE = ["Jóvenes IPUCFB", "Rejuv 2.0", "Joel 2:28", "Viernes 7 p. m.", "Directiva 2027", "Full fuego"];

/** Grano de película (SVG en línea, sin peticiones). */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

const FLAMES = [
  { left: "6%", size: "10rem", delay: "0s", dur: "2.6s" },
  { left: "22%", size: "14rem", delay: "0.5s", dur: "3.2s" },
  { left: "40%", size: "11rem", delay: "1s", dur: "2.4s" },
  { left: "55%", size: "16rem", delay: "0.2s", dur: "3.4s" },
  { left: "72%", size: "12rem", delay: "0.8s", dur: "2.9s" },
  { left: "90%", size: "10rem", delay: "1.3s", dur: "2.5s" },
];

function Tape({ reverse, dark }: { reverse?: boolean; dark?: boolean }) {
  const items = [...TAPE, ...TAPE];
  return (
    <div
      className={
        dark
          ? "border-y-2 border-[#ff8a00] bg-[#0b0306] py-2.5 text-white"
          : "bg-gradient-to-r from-[#ff2e00] via-[#ff8a00] to-[#ff2e00] py-3 text-[#1a0500]"
      }
    >
      <div aria-hidden className={`${reverse ? "marquee-reverse" : "marquee"} flex w-max`}>
        {[0, 1].map((c) => (
          <div key={c} className="flex shrink-0 items-center">
            {items.map((t, i) => (
              <span key={i} className="flex items-center whitespace-nowrap">
                <span className={`px-5 font-display text-2xl font-bold uppercase sm:text-3xl ${dark ? "text-fire" : "italic"}`}>{t}</span>
                <Flame className="size-6 shrink-0 fill-[#ffd23f] text-[#b32000]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function JovenesPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0b0306] text-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-50 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

      {/* Barra */}
      <header className="absolute inset-x-0 top-0 z-40">
        <Container className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-white/80 transition hover:text-white">
            <ArrowLeft className="size-5" aria-hidden />
            <IpucLogo tone="white" className="h-10 w-auto" />
            <span className="hidden font-display text-lg font-bold uppercase tracking-wider sm:inline">IPUCFB</span>
          </Link>
          <a
            href="#inscripcion"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#1a0500] transition hover:scale-105"
          >
            Inscríbete
          </a>
        </Container>
      </header>

      {/* ── Portada ─────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_50%_100%,rgb(255_80_0/0.45),transparent_70%),radial-gradient(40%_40%_at_85%_10%,rgb(255_180_0/0.15),transparent_70%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[60%]">
          {FLAMES.map((f, i) => (
            <span
              key={i}
              className="flame absolute bottom-[-4rem] -translate-x-1/2 rounded-full"
              style={{ left: f.left, width: f.size, height: f.size, animationDelay: f.delay, animationDuration: f.dur }}
            />
          ))}
        </div>

        <Container className="relative text-center">
          <p className="mx-auto inline-flex -rotate-2 items-center gap-2 rounded-full border border-[#ff8a00]/50 bg-[#ff5e00]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-[#ffb347] sm:text-sm">
            <Flame className="size-4 fill-[#ffd23f] text-[#ff5e00]" aria-hidden /> IPUC Ferrería Bariloche
          </p>

          <div className="relative mt-4">
            <DropTitle text="Jóvenes" />
            <SpinSticker
              text="REJUV 2.0 • FULL FUEGO • 2027 • REJUV 2.0 • "
              className="absolute -right-1 -top-20 size-20 sm:-top-6 sm:right-4 sm:size-32 lg:right-16 lg:size-40"
            />
          </div>

          <p
            className="mx-auto mt-3 font-display text-[clamp(1.4rem,4.5vw,3rem)] font-bold uppercase leading-none tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.85)]"
          >
            Una generación encendida
          </p>

          <figure className="mx-auto mt-10 max-w-2xl rotate-1 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur">
            <blockquote className="text-lg leading-snug text-white/85 sm:text-xl">
              «Y después de esto derramaré mi Espíritu sobre toda carne… vuestros ancianos soñarán sueños, y{" "}
              <strong className="text-fire">vuestros jóvenes verán visiones</strong>.»
            </blockquote>
            <figcaption className="mt-2 text-sm font-black uppercase tracking-[0.25em] text-[#ffb347]">Joel 2:28</figcaption>
          </figure>

          <div className="mt-10 flex flex-col items-center gap-5">
            <a
              href="#inscripcion"
              className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#ff3d00] via-[#ff8a00] to-[#ffb000] px-8 py-5 text-center font-display text-xl font-bold uppercase leading-tight text-[#1a0500] shadow-[0_16px_60px_-12px_rgb(255_94_0/0.9)] transition hover:scale-105 active:scale-95 sm:text-2xl"
            >
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#ff5e00]/30" />
              <Flame className="size-7 shrink-0 fill-[#ffd23f] text-[#b32000]" aria-hidden />
              Regístrate antes del 1 de enero de 2027
            </a>
            <p className="text-sm text-white/60">Empieza la vigencia de la nueva directiva de jóvenes. Faltan:</p>
            <Countdown />
          </div>
        </Container>
      </section>

      {/* Cintas */}
      <div className="relative z-10 -my-4 overflow-hidden py-10">
        <div className="-mx-6 -rotate-3">
          <Tape />
        </div>
        <div className="-mx-6 mt-3 rotate-2">
          <Tape reverse dark />
        </div>
      </div>

      {/* ── Directiva ───────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28">
        <Container>
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#ffb347]">Directiva 2027</p>
            <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.9] sm:text-7xl">
              Ellos son <span className="text-fire">tu equipo</span>
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Desde el 1 de enero de 2027 ellos lideran el ministerio de jóvenes. Escríbeles, síguelos, súmate.
            </p>
          </div>
          <LeaderGrid leaders={directiva} />
        </Container>
      </section>

      {/* ── Calendario bloqueado ────────────────────────────── */}
      <section id="calendario" className="relative overflow-hidden py-20 sm:py-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_0%,rgb(255_94_0/0.18),transparent_70%)]" />
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.3em] text-[#ffb347]">
              <Lock className="size-4" aria-hidden /> Calendario 2027
            </p>
            <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.9] sm:text-7xl">
              Estamos preparando <span className="text-fire">todo…</span>
            </h2>
            <p className="mt-4 text-xl font-semibold text-white/85">No te lo puedes perder. 🔥</p>
            <p className="mt-2 text-white/60">
              Cada mes trae algo nuevo. Los candados se abren poco a poco desde el 1 de enero.
            </p>
          </div>
          <CampTeaser />
          <LockedCalendar />
          <div className="mt-12 text-center">
            <a
              href="#inscripcion"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-[#1a0500] transition hover:scale-105 active:scale-95"
            >
              <Flame className="size-5 fill-[#ffd23f] text-[#ff3d00]" aria-hidden />
              Inscríbete y entérate primero
            </a>
          </div>
        </Container>
      </section>

      {/* ── Inscripción ─────────────────────────────────────── */}
      <section id="inscripcion" className="relative scroll-mt-6 pb-24">
        <Container className="max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#ffb347]">Inscripción · 3 minutos</p>
            <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.9] sm:text-7xl">
              Queremos <span className="text-fire">conocerte</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
              No es un examen: es para saber quién eres, qué te gusta y cómo podemos caminar contigo.
            </p>
          </div>
          <div className="relative mt-10 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 shadow-[0_30px_80px_-30px_rgb(255_80_0/0.5)] sm:p-9">
            <RegistrationWizard />
          </div>
        </Container>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/50">
        <Link href="/" className="font-semibold text-white/80 hover:text-white">
          ← ipucfb.com
        </Link>{" "}
        · Jóvenes IPUC Ferrería Bariloche · Viernes 7:00 p. m.
      </footer>
    </div>
  );
}
