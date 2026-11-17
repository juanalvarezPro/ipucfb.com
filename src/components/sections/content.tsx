import {
  Baby,
  BookOpen,
  Clock,
  Crown,
  Droplets,
  Flame,
  HandHeart,
  Heart,
  MapPin,
  Music,
  Navigation,
  Sparkles,
  Sunrise,
  Users,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { RequestForm } from "@/components/sections/request-form";
import { church, type ServiceItem } from "@/config/church";
import { cn } from "@/lib/cn";

/* ── Nosotros ─────────────────────────────────────────────── */

const PILLARS = [
  { icon: Crown, title: "Un Señor", text: "Jesucristo es el único Dios verdadero, manifestado en carne para salvarnos." },
  { icon: Flame, title: "Una fe", text: "La fe que una vez fue dada a los santos, guardada en la Palabra de Dios." },
  { icon: Droplets, title: "Un bautismo", text: "En agua, en el nombre de Jesucristo, para el perdón de los pecados." },
];

export function About() {
  return (
    <Section id="nosotros">
      <SectionHeading
        eyebrow="Quiénes somos"
        title={
          <>
            Una iglesia, <span className="text-sky-500">una familia</span>
          </>
        }
        lead="Somos parte de la Iglesia Pentecostal Unida de Colombia, presente en todo el país y en decenas de naciones. Aquí encontrarás la Palabra predicada con poder, alabanza sincera y hermanos que te recibirán como en casa."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {PILLARS.map(({ icon: Icon, title, text }, i) => (
          <article
            key={title}
            className="group relative overflow-hidden rounded-card border border-line bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="absolute right-5 top-4 font-display text-6xl font-bold text-navy-50 transition group-hover:text-sky-50">
              0{i + 1}
            </span>
            <span className="relative grid size-13 place-items-center rounded-2xl bg-navy-700 text-gold-300 shadow-card">
              <Icon className="size-6" aria-hidden />
            </span>
            <h3 className="relative mt-6 font-display text-2xl font-semibold uppercase text-navy-800">{title}</h3>
            <p className="relative mt-2 leading-relaxed text-muted">{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ── Horarios ─────────────────────────────────────────────── */

export function Schedule({ services }: { services: ServiceItem[] }) {
  return (
    <Section id="horarios" tone="navy" className="overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-dots opacity-40" />
      <div className="relative">
        <SectionHeading
          light
          eyebrow="Nuestros cultos"
          title={
            <>
              Te esperamos <span className="text-gold-gradient">esta semana</span>
            </>
          }
          lead="Llega unos minutos antes: siempre habrá alguien en la puerta para darte la bienvenida."
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <li
              key={`${s.day}-${s.title}`}
              className={cn(
                "relative flex items-center gap-5 rounded-card border p-6 backdrop-blur transition hover:-translate-y-0.5",
                s.highlight
                  ? "border-gold-400/60 bg-gold-400/10 shadow-glow"
                  : "border-white/10 bg-white/[0.06] hover:bg-white/[0.09]",
              )}
            >
              <span
                className={cn(
                  "grid size-16 shrink-0 place-items-center rounded-2xl font-display text-lg font-semibold uppercase",
                  s.highlight ? "bg-gold-400 text-navy-950" : "bg-white/10 text-sky-100",
                )}
              >
                {s.day.slice(0, 3)}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">{s.day}</p>
                <h3 className="font-display text-xl font-semibold uppercase leading-tight tracking-wide">{s.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-navy-100/90">
                  <Clock className="size-4 text-gold-300" aria-hidden />
                  {s.time}
                </p>
                {s.note && <p className="text-sm text-navy-200/70">{s.note}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ── Lo que creemos ───────────────────────────────────────── */

const BELIEFS = [
  { icon: Sparkles, title: "La unicidad de Dios", verse: "Deuteronomio 6:4", text: "Hay un solo Dios, que se reveló plenamente en Jesucristo." },
  { icon: BookOpen, title: "La Biblia", verse: "2 Timoteo 3:16", text: "Inspirada por Dios, es nuestra única regla de fe y conducta." },
  { icon: Droplets, title: "El bautismo", verse: "Hechos 2:38", text: "Por inmersión, en el nombre de Jesucristo, para perdón de pecados." },
  { icon: Flame, title: "El Espíritu Santo", verse: "Hechos 2:4", text: "Una promesa para todos, con la evidencia de hablar en otras lenguas." },
  { icon: Heart, title: "La santidad", verse: "Hebreos 12:14", text: "Una vida apartada para Dios, por dentro y por fuera." },
  { icon: Sunrise, title: "Cristo viene", verse: "1 Tesalonicenses 4:16", text: "Esperamos con gozo la segunda venida de nuestro Señor." },
];

export function Beliefs() {
  return (
    <Section id="creemos" tone="white">
      <SectionHeading
        eyebrow="Lo que creemos"
        title={
          <>
            Firmes en <span className="text-sky-500">la Palabra</span>
          </>
        }
        lead="Nuestra doctrina se funda en la enseñanza de los apóstoles, tal como la registra el Nuevo Testamento."
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {BELIEFS.map(({ icon: Icon, title, verse, text }) => (
          <article key={title} className="group bg-white p-7 transition hover:bg-navy-50/40">
            <Icon className="size-7 text-sky-500 transition group-hover:scale-110" aria-hidden />
            <h3 className="mt-5 font-display text-xl font-semibold uppercase text-navy-800">{title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{text}</p>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-gold-600">{verse}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ── Versículo ────────────────────────────────────────────── */

export function VerseBanner() {
  return (
    <section className="relative overflow-hidden bg-gold-400 py-16 sm:py-20">
      <div aria-hidden className="absolute -left-20 -top-20 size-72 rounded-full bg-gold-300/60 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 right-0 size-80 rounded-full bg-gold-500/40 blur-3xl" />
      <figure className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span aria-hidden className="block font-display text-7xl leading-none text-navy-800/25">“</span>
        <blockquote className="-mt-6 font-display text-2xl font-medium uppercase leading-snug text-navy-900 sm:text-4xl">
          Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo para perdón de los pecados; y
          recibiréis el don del Espíritu Santo.
        </blockquote>
        <figcaption className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-navy-800">Hechos 2:38</figcaption>
      </figure>
    </section>
  );
}

/* ── Ministerios ──────────────────────────────────────────── */

const MINISTRIES = [
  { icon: Baby, title: "Niños", text: "Escuela dominical con amor, juegos y la Palabra a su medida.", color: "from-sky-400 to-sky-600" },
  { icon: Flame, title: "Jóvenes", text: "Una generación encendida que adora, sirve y transforma.", color: "from-gold-300 to-gold-500" },
  { icon: HandHeart, title: "Damas", text: "Mujeres que oran, se edifican y sirven a la iglesia.", color: "from-navy-400 to-navy-600" },
  { icon: Users, title: "Caballeros", text: "Hombres de fe que guían su hogar con el ejemplo.", color: "from-navy-600 to-navy-800" },
  { icon: Music, title: "Alabanza", text: "Músicos y coros que preparan el ambiente para adorar.", color: "from-sky-500 to-navy-600" },
  { icon: BookOpen, title: "Enseñanza", text: "Estudios bíblicos para crecer firmes en la doctrina.", color: "from-gold-400 to-gold-600" },
];

export function Ministries() {
  return (
    <Section id="ministerios">
      <SectionHeading
        eyebrow="Ministerios"
        title={
          <>
            Hay un lugar <span className="text-sky-500">para ti</span>
          </>
        }
        lead="Cada edad y cada don tienen un espacio para crecer y servir al Señor."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MINISTRIES.map(({ icon: Icon, title, text, color }) => (
          <article
            key={title}
            className="group flex gap-5 rounded-card border border-line bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <span
              className={cn(
                "grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-card transition group-hover:rotate-[-6deg]",
                color,
              )}
            >
              <Icon className="size-7" aria-hidden />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold uppercase text-navy-800">{title}</h3>
              <p className="mt-1.5 leading-relaxed text-muted">{text}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ── Oración / contacto ───────────────────────────────────── */

export function PrayerSection() {
  return (
    <Section id="oracion" tone="white">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Estamos para ti"
            title={
              <>
                ¿Podemos <span className="text-sky-500">orar contigo?</span>
              </>
            }
            lead="Déjanos tu petición, cuéntanos que quieres visitarnos o simplemente escríbenos. El equipo pastoral te responderá personalmente por WhatsApp."
          />
          <blockquote className="mt-8 border-l-4 border-gold-400 pl-5 text-lg italic text-navy-700">
            “La oración eficaz del justo puede mucho.”
            <span className="mt-1 block text-sm font-bold not-italic uppercase tracking-[0.14em] text-gold-600">
              Santiago 5:16
            </span>
          </blockquote>
        </div>
        <div className="rounded-[1.75rem] border border-line bg-white p-5 shadow-lift sm:p-8">
          <RequestForm />
        </div>
      </div>
    </Section>
  );
}

/* ── Visítanos ────────────────────────────────────────────── */

export function Visit() {
  return (
    <Section id="visitanos">
      <div className="overflow-hidden rounded-[2rem] bg-hero text-white shadow-lift">
        <div className="grid lg:grid-cols-2">
          <div className="relative p-8 sm:p-12">
            <div aria-hidden className="absolute inset-0 bg-dots opacity-40" />
            <div className="relative">
              <SectionHeading
                light
                align="left"
                eyebrow="Visítanos"
                title={
                  <>
                    Las puertas <span className="text-gold-gradient">están abiertas</span>
                  </>
                }
              />
              <ul className="mt-8 space-y-5">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 size-6 shrink-0 text-gold-300" aria-hidden />
                  <span>
                    <span className="block font-semibold">{church.address.line}</span>
                    <span className="text-navy-100/80">
                      {church.address.area} · {church.address.city}
                    </span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-0.5 size-6 shrink-0 text-gold-300" aria-hidden />
                  <span>
                    <span className="block font-semibold">Miércoles y viernes · 7:00 p. m.</span>
                    <span className="text-navy-100/80">Domingo · 10:00 a. m.</span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <Users className="mt-0.5 size-6 shrink-0 text-gold-300" aria-hidden />
                  <span>
                    <a
                      href={church.pastorInstagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-semibold underline decoration-gold-400/60 underline-offset-4 hover:text-gold-300"
                    >
                      {church.pastors}
                    </a>
                    <span className="text-navy-100/80">Pastor de la congregación</span>
                  </span>
                </li>
              </ul>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <ButtonLink href={church.address.mapsUrl} external size="lg">
                  <Navigation className="size-5" aria-hidden />
                  Google Maps
                </ButtonLink>
                <ButtonLink href={church.address.wazeUrl} external variant="outline" size="lg">
                  Abrir en Waze
                </ButtonLink>
              </div>
            </div>
          </div>
          {/* Mapa ilustrado: sin iframe de Google para no castigar la carga */}
          <a
            href={church.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir la ubicación en Google Maps"
            className="group relative min-h-72 overflow-hidden bg-navy-950"
          >
            <svg aria-hidden viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
              <rect width="600" height="500" fill="#001338" />
              <g stroke="#0d40a0" strokeWidth="14" strokeLinecap="round" opacity="0.7">
                <path d="M-20 120 L 620 180" />
                <path d="M-20 330 C 200 300, 380 380, 620 320" />
                <path d="M140 -20 L 220 520" />
                <path d="M420 -20 C 380 160, 460 320, 400 520" />
              </g>
              <g stroke="#002a73" strokeWidth="6" opacity="0.9">
                <path d="M-20 230 L 620 250" />
                <path d="M300 -20 L 320 520" />
                <path d="M-20 430 L 620 410" />
                <path d="M520 -20 L 560 520" />
                <path d="M40 -20 L 70 520" />
              </g>
              <circle cx="310" cy="245" r="90" fill="#009fda" opacity="0.12" />
              <circle cx="310" cy="245" r="46" fill="#009fda" opacity="0.18" />
            </svg>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full transition duration-300 group-hover:-translate-y-[110%]">
              <span className="grid size-16 place-items-center rounded-full rounded-br-none bg-gold-400 shadow-glow [transform:rotate(45deg)]">
                <MapPin className="size-7 -rotate-45 text-navy-950" />
              </span>
            </span>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition group-hover:bg-white/20">
              Portal de Ditaires · Itagüí →
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
}
