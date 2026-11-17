import type { Metadata } from "next";
import { HandHeart } from "lucide-react";
import { IpucLogo, SonarPianoLogo } from "@/components/brand/logos";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = { title: "Design system", robots: { index: false, follow: false } };

const SCALES = {
  navy: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
  sky: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
  gold: ["50", "100", "200", "300", "400", "500", "600", "700"],
};
const BRAND: Record<string, string> = { navy: "700", sky: "500", gold: "400" };
const NAMES: Record<string, string> = { navy: "Azul institucional", sky: "Celeste", gold: "Dorado" };

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="font-display text-2xl font-semibold uppercase text-navy-800">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="bg-white py-16">
      <Container>
        <div className="flex flex-wrap items-center gap-6">
          <IpucLogo className="h-24 w-auto" priority />
          <div>
            <Eyebrow>ipucfb.com</Eyebrow>
            <h1 className="mt-2 font-display text-5xl font-semibold uppercase text-navy-800">Design system</h1>
            <p className="mt-2 max-w-xl text-muted">
              Identidad tomada de ipuc.org.co. Tokens en <code>src/app/globals.css</code> → clases Tailwind
              (<code>bg-navy-700</code>, <code>text-gold-400</code>, <code>font-display</code>…).
            </p>
          </div>
        </div>

        <Block title="Color">
          <div className="space-y-8">
            {Object.entries(SCALES).map(([name, steps]) => (
              <div key={name}>
                <p className="mb-3 font-semibold text-navy-800">
                  {NAMES[name]} · <code className="text-muted">{name}</code>{" "}
                  <span className="text-sm text-muted">(marca = {BRAND[name]})</span>
                </p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
                  {steps.map((s) => (
                    <div key={s} className="text-xs">
                      <div
                        className={`h-14 rounded-xl border border-black/5 ${s === BRAND[name] ? "ring-2 ring-offset-2 ring-navy-800" : ""}`}
                        style={{ background: `var(--color-${name}-${s})` }}
                      />
                      <p className="mt-1 font-semibold">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-3 text-sm">
              {["ink", "muted", "paper", "line"].map((t) => (
                <span key={t} className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
                  <span className="size-4 rounded-full border border-black/10" style={{ background: `var(--color-${t})` }} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Block>

        <Block title="Tipografía">
          <div className="space-y-5">
            <p className="font-display text-6xl font-semibold uppercase leading-none text-navy-800">Oswald · Display</p>
            <p className="font-display text-3xl uppercase text-navy-700">Un Señor, una fe, un bautismo</p>
            <p className="text-xl">Source Sans 3 · Texto — pariente libre de Myriad Pro, la fuente de IPUC.</p>
            <p className="text-muted">Párrafo secundario en color <code>muted</code> para descripciones.</p>
            <p className="text-gold-gradient font-display text-4xl font-bold uppercase">Degradado dorado</p>
          </div>
        </Block>

        <Block title="Botones">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Dorado (principal)</Button>
            <Button variant="navy">Azul</Button>
            <Button variant="light">Claro</Button>
            <Button variant="ghost">Fantasma</Button>
            <Button size="lg">
              <HandHeart className="size-5" /> Grande con ícono
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 rounded-2xl bg-hero p-6">
            <Button>Sobre azul</Button>
            <Button variant="outline">Contorno</Button>
          </div>
        </Block>

        <Block title="Encabezado de sección">
          <SectionHeading eyebrow="Etiqueta" title={<>Título con <span className="text-sky-500">acento</span></>} lead="Texto introductorio de la sección." />
        </Block>

        <Block title="Logos">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="grid place-items-center rounded-card border border-line p-8">
              <IpucLogo className="h-28 w-auto" />
              <p className="mt-3 text-sm text-muted">IPUC · fondo claro</p>
            </div>
            <div className="grid place-items-center rounded-card bg-hero p-8">
              <IpucLogo tone="white" className="h-28 w-auto" />
              <p className="mt-3 text-sm text-navy-100">IPUC · fondo azul</p>
            </div>
            <div className="grid place-items-center rounded-card bg-navy-950 p-8">
              <SonarPianoLogo className="w-48" />
              <p className="mt-3 text-sm text-navy-100">SonarPiano · solo fondo oscuro</p>
            </div>
          </div>
        </Block>

        <Block title="Superficies">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-card border border-line bg-white p-6 shadow-card">shadow-card</div>
            <div className="rounded-card border border-line bg-white p-6 shadow-lift">shadow-lift</div>
            <div className="rounded-card bg-gold-400 p-6 shadow-glow">shadow-glow</div>
          </div>
        </Block>
      </Container>
    </main>
  );
}
