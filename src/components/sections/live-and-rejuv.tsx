import { Flame, Radio } from "lucide-react";
import { Instagram, Youtube } from "@/components/brand/social-icons";
import { LiteYouTube } from "@/components/lite-youtube";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { church } from "@/config/church";
import { getLatestStream } from "@/lib/youtube";

/* ── Última transmisión ───────────────────────────────────── */

export async function LiveSection() {
  const stream = await getLatestStream();
  return (
    <Section id="en-vivo" className="!pt-8 sm:!pt-12">
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <SectionHeading
            align="left"
            eyebrow="En vivo"
            title={
              <>
                ¿No pudiste venir? <span className="text-sky-500">Míralo aquí</span>
              </>
            }
            lead="Transmitimos nuestros cultos por YouTube. Esta es la transmisión más reciente."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={church.youtube.url} external variant="navy">
              <Youtube className="size-5" aria-hidden />
              Ver todas las transmisiones
            </ButtonLink>
          </div>
        </div>
        <div className="order-first lg:order-last">
        {stream ? (
          <LiteYouTube id={stream.id} title={stream.title} />
        ) : (
          <a
            href={church.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="grid aspect-video place-items-center rounded-[1.5rem] bg-hero text-white shadow-lift"
          >
            <span className="flex items-center gap-3 font-display text-2xl uppercase">
              <Radio className="size-7 text-gold-300" aria-hidden /> Ver en YouTube
            </span>
          </a>
        )}
        </div>
      </div>
    </Section>
  );
}

/* ── Banner REJUV 2.0 (franja de fuego que se desplaza) ───── */

const BANNER_LINES = ["Rejuv 2.0", "No naciste para ser tibio", "Rejuv 2.0", "¡Enciéndete!"];

export function RejuvBanner() {
  // Se repite el contenido para que el desplazamiento sea infinito sin saltos.
  const items = [...BANNER_LINES, ...BANNER_LINES];
  return (
    <a
      href="#rejuv"
      aria-label="Rejuv 2.0: no naciste para ser tibio. Ver más"
      className="group relative block overflow-hidden bg-gradient-to-r from-[#ff3d00] via-[#ff8a00] to-[#ff3d00] py-4 text-[#1a0500] shadow-[0_10px_40px_-12px_rgb(255_90_0/0.7)] sm:py-5"
    >
      <span aria-hidden className="absolute inset-0 bg-[radial-gradient(40%_120%_at_50%_100%,rgb(255_220_80/0.55),transparent_70%)]" />
      <span aria-hidden className="marquee relative flex w-max items-center">
        {[0, 1].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center">
            {items.map((text, i) => (
              <span key={i} className="flex items-center whitespace-nowrap">
                <span
                  className={
                    text === "Rejuv 2.0"
                      ? "px-6 font-display text-3xl font-bold uppercase tracking-tight text-white drop-shadow-[0_2px_0_rgb(120_20_0/0.6)] sm:text-4xl"
                      : "px-6 font-display text-2xl font-semibold uppercase italic sm:text-3xl"
                  }
                >
                  {text}
                </span>
                <Flame className="size-7 shrink-0 fill-[#ffd23f] text-[#b32000] sm:size-8" />
              </span>
            ))}
          </span>
        ))}
      </span>
    </a>
  );
}

/* ── Portal REJUV 2.0 ─────────────────────────────────────── */

const FLAMES = [
  { left: "8%", size: "9rem", delay: "0s", dur: "2.6s" },
  { left: "20%", size: "13rem", delay: "0.6s", dur: "3.1s" },
  { left: "34%", size: "10rem", delay: "1.1s", dur: "2.4s" },
  { left: "47%", size: "15rem", delay: "0.2s", dur: "3.4s" },
  { left: "60%", size: "11rem", delay: "0.9s", dur: "2.8s" },
  { left: "73%", size: "14rem", delay: "0.4s", dur: "3.2s" },
  { left: "86%", size: "9rem", delay: "1.3s", dur: "2.5s" },
];

const EMBERS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  delay: `${(i * 0.43) % 4}s`,
  dur: `${3 + (i % 4) * 0.7}s`,
}));

export function RejuvSection() {
  return (
    <section id="rejuv" className="relative isolate overflow-hidden bg-[#0b0306] py-24 text-white sm:py-32">
      {/* Fuego que sube desde abajo */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%]">
        {FLAMES.map((f, i) => (
          <span
            key={i}
            className="flame absolute bottom-[-4rem] -translate-x-1/2 rounded-full"
            style={{ left: f.left, width: f.size, height: f.size, animationDelay: f.delay, animationDuration: f.dur }}
          />
        ))}
        {EMBERS.map((e, i) => (
          <span
            key={`e${i}`}
            className="ember absolute bottom-0 size-1.5 rounded-full bg-gold-300"
            style={{ left: e.left, animationDelay: e.delay, animationDuration: e.dur }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#ff4d00]/50 to-transparent" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_100%,rgb(255_90_0/0.35),transparent_70%)]" />

      <Container className="relative text-center">
        {/* El portal */}
        <div className="relative mx-auto grid size-64 place-items-center sm:size-80">
          <span aria-hidden className="portal-ring absolute inset-0 rounded-full" />
          <span aria-hidden className="absolute inset-4 rounded-full bg-[#0b0306] shadow-[inset_0_0_60px_rgb(255_110_0/0.55)]" />
          <span aria-hidden className="absolute inset-10 animate-pulse rounded-full bg-[radial-gradient(circle,rgb(255_170_0/0.35),transparent_70%)]" />
          <div className="relative">
            <Flame className="mx-auto size-10 text-[#ff8a00] drop-shadow-[0_0_12px_rgb(255_120_0/0.9)]" aria-hidden />
            <p className="text-fire mt-1 font-display text-6xl font-bold uppercase leading-none tracking-tight sm:text-7xl">
              Rejuv
            </p>
            <p className="font-display text-4xl font-bold leading-none text-white sm:text-5xl">2.0</p>
          </div>
        </div>

        <p className="mt-10 text-sm font-bold uppercase tracking-[0.35em] text-[#ffb347]">Joven</p>
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-semibold uppercase leading-[1.02] sm:text-6xl">
          ¡Prepárate para la <span className="text-fire">Rejuv 2.0</span>!
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
          No naciste para ser tibio. Se viene un fuego nuevo para esta generación. Vive los cultos de jóvenes cada viernes y entérate de todo
          por Instagram.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink
            href={church.socials.instagram}
            external
            size="lg"
            className="bg-gradient-to-r from-[#ff5e00] to-[#ffb000] text-white shadow-[0_10px_40px_-10px_rgb(255_94_0/0.8)] hover:from-[#ff6f1a] hover:to-[#ffbf2e]"
          >
            <Instagram className="size-5" aria-hidden />
            Síguenos en Instagram
          </ButtonLink>
          <ButtonLink href="#horarios" variant="outline" size="lg">
            Viernes · 7:00 p. m.
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
