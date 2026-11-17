import { CalendarClock, ChevronDown, MapPin, PlayCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { HeroVideoStage } from "@/components/welcome-video";
import { church, defaultServices } from "@/config/church";

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

      <Container className="flex min-h-[100svh] flex-col justify-center pb-24 pt-28 sm:pt-32 lg:h-[100svh] lg:max-h-[1100px] lg:min-h-[600px] lg:pb-[9vh] lg:pt-[13vh]">
        <HeroVideoStage>
        <div className="animate-rise text-center lg:max-w-[46%] lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100 backdrop-blur sm:text-sm">
            <span className="size-1.5 rounded-full bg-gold-400" />
            {church.yearTheme} ✨ {church.yearThemeYear}
          </p>

          <h1 className="mt-6 font-display text-[2.9rem] font-semibold uppercase leading-[0.98] tracking-tight sm:text-7xl lg:mt-[2.6vh] lg:text-[clamp(3rem,9vh,5.4rem)]">
            <span className="font-light">Un Señor,</span>
            <br />
            <span className="text-gold-gradient font-bold">una fe,</span>
            <br />
            <span className="font-bold">un bautismo</span>
          </h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-sky-200 lg:mt-[1.2vh]">{church.mottoRef}</p>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-navy-100/90 sm:text-xl lg:mx-0 lg:mt-[2.6vh] lg:text-[clamp(1rem,2.2vh,1.25rem)]">
            Somos la IPUC Ferrería Bariloche, una familia que adora a Dios en espíritu y en verdad. Hay un
            lugar para ti y para los tuyos: ven tal como eres.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:mt-[3.6vh] lg:justify-start">
            <ButtonLink href="#visitanos" size="lg" className="w-full sm:w-auto">
              <MapPin className="size-5" aria-hidden />
              Planea tu visita
            </ButtonLink>
            <ButtonLink href="#en-vivo" variant="outline" size="lg" className="w-full sm:w-auto">
              <PlayCircle className="size-5" aria-hidden />
              Ver en vivo
            </ButtonLink>
          </div>

          <div className="mx-auto mt-10 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-left backdrop-blur lg:mx-0 lg:mt-[3.6vh] lg:py-[1.4vh]">
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

        </HeroVideoStage>
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
