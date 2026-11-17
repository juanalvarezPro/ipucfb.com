import { CalendarClock, ChevronDown, MapPin, PlayCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { church, defaultServices } from "@/config/church";

/** Globo terráqueo en líneas — guiño al logo, puro SVG (sin peso de imagen). */
function GlobeArt() {
  const meridians = [18, 36, 54, 72];
  const parallels = [-60, -30, 0, 30, 60];
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden className="h-full w-full">
      <defs>
        <radialGradient id="g-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#5ec9ef" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#001f56" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="g-line" gradientUnits="userSpaceOnUse" x1="50" y1="50" x2="350" y2="350">
          <stop offset="0%" stopColor="#9fdff7" />
          <stop offset="100%" stopColor="#f8c53d" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#g-glow)" />
      <g stroke="url(#g-line)" strokeOpacity="0.55" strokeWidth="1.2">
        <circle cx="200" cy="200" r="150" />
        {meridians.map((rx) => (
          <ellipse key={rx} cx="200" cy="200" rx={(rx / 90) * 150} ry="150" />
        ))}
        <line x1="200" y1="50" x2="200" y2="350" />
        {parallels.map((lat) => {
          const y = 200 - Math.sin((lat * Math.PI) / 180) * 150;
          const half = Math.cos((lat * Math.PI) / 180) * 150;
          return <line key={lat} x1={200 - half} y1={y} x2={200 + half} y2={y} />;
        })}
      </g>
      {/* Biblia abierta */}
      <g stroke="#f8c53d" strokeWidth="2" strokeLinecap="round" opacity="0.9">
        <path d="M60 330 C 120 300, 170 305, 200 330 C 230 305, 280 300, 340 330" />
        <path d="M70 346 C 125 318, 170 322, 200 346 C 230 322, 275 318, 330 346" opacity="0.6" />
      </g>
    </svg>
  );
}

export function Hero() {
  const main = defaultServices.find((s) => s.highlight) ?? defaultServices[0];
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-hero text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />
      {/* Rayos de luz */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl"
      />

      <Container className="grid min-h-[100svh] items-center gap-10 pb-24 pt-28 sm:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        <div className="animate-rise text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100 backdrop-blur sm:text-sm">
            <span className="size-1.5 rounded-full bg-gold-400" />
            {church.yearTheme} ✨ 2026
          </p>

          <h1 className="mt-6 font-display text-[2.9rem] font-semibold uppercase leading-[0.98] tracking-tight sm:text-7xl lg:text-[5.4rem]">
            Un Señor,
            <br />
            <span className="text-gold-gradient">una fe,</span>
            <br />
            un bautismo
          </h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-sky-200">{church.mottoRef}</p>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-navy-100/90 sm:text-xl lg:mx-0">
            Somos la IPUC Ferrería Bariloche, una familia que adora a Dios en espíritu y en verdad. Hay un
            lugar para ti y para los tuyos: ven tal como eres.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <ButtonLink href="#visitanos" size="lg" className="w-full sm:w-auto">
              <MapPin className="size-5" aria-hidden />
              Planea tu visita
            </ButtonLink>
            <ButtonLink href="#en-vivo" variant="outline" size="lg" className="w-full sm:w-auto">
              <PlayCircle className="size-5" aria-hidden />
              Ver en vivo
            </ButtonLink>
          </div>

          <div className="mx-auto mt-10 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-left backdrop-blur lg:mx-0">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
              <CalendarClock className="size-6" aria-hidden />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
                {main.title}
              </span>
              <span className="block font-display text-xl uppercase tracking-wide">
                {main.day} · {main.time}
              </span>
            </span>
          </div>
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-md sm:block lg:max-w-none">
          <div className="absolute inset-0 animate-float">
            <GlobeArt />
          </div>
          <div
            aria-hidden
            className="absolute inset-[4%] animate-spin-slow rounded-full border border-dashed border-sky-200/25"
          />
        </div>
      </Container>

      <a
        href="#nosotros"
        aria-label="Bajar a la siguiente sección"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/60 transition hover:text-white sm:block"
      >
        <ChevronDown className="size-7 animate-bounce" />
      </a>

      {/* Curva de transición */}
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -bottom-px left-0 h-10 w-full text-paper sm:h-16">
        <path d="M0 80 C 360 0, 1080 0, 1440 80 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
