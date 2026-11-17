import { Heart, MapPin } from "lucide-react";
import { Instagram, Youtube } from "@/components/brand/social-icons";
import { IpucLogo, SonarPianoLogo } from "@/components/brand/logos";
import { Container } from "@/components/ui/section";
import { church } from "@/config/church";

const LINKS = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#en-vivo", label: "En vivo" },
  { href: "#horarios", label: "Horarios" },
  { href: "#rejuv", label: "Rejuv 2.0" },
  { href: "#creemos", label: "Lo que creemos" },
  { href: "#ministerios", label: "Ministerios" },
  { href: "#oracion", label: "Petición de oración" },
  { href: "#visitanos", label: "Visítanos" },
];

const SOCIAL = [
  { key: "youtube", label: "YouTube" },
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
] as const;

async function Year() {
  "use cache";
  return new Date().getFullYear();
}

export function SiteFooter() {
  const socials = SOCIAL.filter((s) => church.socials[s.key]);
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100">
      <div aria-hidden className="absolute inset-0 bg-dots opacity-30" />
      <div aria-hidden className="absolute -top-32 left-1/2 h-64 w-[48rem] -translate-x-1/2 rounded-full bg-navy-600/30 blur-3xl" />

      <Container className="relative">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <IpucLogo tone="white" className="h-20 w-auto" />
            <p className="mt-5 max-w-xs leading-relaxed text-navy-200/80">
              {church.name}. {church.motto}.
            </p>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-2">
                {socials.map((s) => (
                  <li key={s.key}>
                    <a
                      href={church.socials[s.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Pie de página">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">Explora</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">Contacto</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-sky-400" aria-hidden />
                <span>
                  {church.address.line}, {church.address.area}, {church.address.city}
                </span>
              </li>
              <li>
                <a href={church.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition hover:text-white">
                  <Youtube className="mt-0.5 size-5 shrink-0 text-sky-400" aria-hidden />
                  YouTube
                </a>
              </li>
              <li>
                <a href={church.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition hover:text-white">
                  <Instagram className="mt-0.5 size-5 shrink-0 text-sky-400" aria-hidden />
                  @ipucfb
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Créditos */}
        <div className="flex flex-col items-center gap-8 border-t border-white/10 py-10 text-center lg:flex-row lg:justify-between lg:text-left">
          <p className="max-w-md text-sm leading-relaxed text-navy-200/80">
            Desarrollado por amor
            <Heart className="ml-1 inline size-4 -translate-y-px fill-red-500 text-red-500" aria-hidden />, como siervo por
            amor —{" "}
            <a
              href="https://www.instagram.com/thisalvarez"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-gold-400 decoration-2 underline-offset-4 transition hover:text-gold-300"
            >
              @thisalvarez
            </a>{" "}
            · <span className="whitespace-nowrap italic text-gold-300">Éxodo 21:5</span>
          </p>
          <a
            href="https://sonarpiano.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 transition hover:border-sky-400/40 hover:bg-white/[0.06]"
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-navy-200/60">Financiado por</span>
            <SonarPianoLogo className="w-20 opacity-90 transition group-hover:opacity-100" />
          </a>
        </div>
        <p className="pb-8 text-center text-xs text-navy-300/60">
          © <Year /> {church.domain} · Todos los derechos reservados
        </p>
      </Container>
    </footer>
  );
}
