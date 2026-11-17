"use client";

import { useMemo, useState, useTransition, type ReactNode } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { ArrowLeft, ArrowRight, Flame, Loader2, PartyPopper } from "lucide-react";
import { OPTIONS, type Option } from "@/config/youth";
import { cn } from "@/lib/cn";
import { registerYouth, type RegisterInput } from "./actions";

type Form = Omit<RegisterInput, "dataConsent" | "imageConsent"> & {
  dataConsent: boolean;
  imageConsent: boolean;
};

const EMPTY: Form = {
  firstName: "",
  lastName: "",
  birthDate: "",
  whatsapp: "",
  musicGenres: [],
  hobbies: [],
  talents: [],
  wantsToServe: [],
  activities: [],
  topics: [],
  dataConsent: false,
  imageConsent: false,
};

const STEPS = [
  { title: "¿Quién eres?", hint: "Lo básico para saludarte por tu nombre." },
  { title: "Tu vida y tu fe", hint: "Dónde estás y cómo va tu caminar con Dios." },
  { title: "Lo que te gusta", hint: "Para planear cosas que de verdad te emocionen." },
  { title: "Tus dones y sueños", hint: "Dios te dio algo único. ¿Qué es?" },
  { title: "Solo para la directiva", hint: "Confidencial. Nadie más lo ve." },
];

function ageFrom(birth?: string) {
  if (!birth) return null;
  const b = new Date(`${birth}T12:00:00`);
  if (Number.isNaN(b.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - b.getFullYear();
  const mo = now.getMonth() - b.getMonth();
  if (mo < 0 || (mo === 0 && now.getDate() < b.getDate())) age--;
  return age;
}

/* ── Controles ─────────────────────────────────────────────── */

const input =
  "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-base text-white placeholder:text-white/35 transition focus:border-[#ff8a00] focus:bg-white/[0.09] focus:outline-none focus:ring-4 focus:ring-[#ff5e00]/20";

function Field({ label, hint, children, wide }: { label: string; hint?: string; children: ReactNode; wide?: boolean }) {
  return (
    <label className={cn("block", wide && "sm:col-span-2")}>
      <span className="mb-1.5 block text-sm font-bold text-white/90">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-white/45">{hint}</span>}
    </label>
  );
}

function Chips({
  options,
  value,
  onChange,
  multi,
}: {
  options: readonly Option[];
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
  multi?: boolean;
}) {
  const selected = (v: string) => (multi ? (value as string[] | undefined)?.includes(v) : value === v);
  const toggle = (v: string) => {
    if (multi) {
      const arr = (value as string[] | undefined) ?? [];
      onChange(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    } else onChange(value === v ? "" : v);
  };
  return (
    <div className="flex flex-wrap gap-2" role={multi ? "group" : "radiogroup"}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role={multi ? "checkbox" : "radio"}
          aria-checked={selected(opt.value)}
          onClick={() => toggle(opt.value)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-95",
            selected(opt.value)
              ? "border-transparent bg-gradient-to-r from-[#ff5e00] to-[#ffb000] text-[#1a0500] shadow-[0_6px_24px_-8px_rgb(255_94_0/0.8)]"
              : "border-white/15 bg-white/[0.04] text-white/80 hover:border-[#ff8a00]/60 hover:text-white",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Group({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-2 text-sm font-bold text-white/90">
        {label} {hint && <span className="font-normal text-white/45">· {hint}</span>}
      </legend>
      {children}
    </fieldset>
  );
}

/* ── Asistente ─────────────────────────────────────────────── */

export function RegistrationWizard() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [f, setF] = useState<Form>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((prev) => ({ ...prev, [k]: v }));
  const age = useMemo(() => ageFrom(f.birthDate), [f.birthDate]);
  const minor = age != null && age < 18;

  const validate = (s: number): string | null => {
    if (s === 0) {
      if ((f.firstName ?? "").trim().length < 2) return "Escribe tu nombre";
      if ((f.lastName ?? "").trim().length < 2) return "Escribe tu apellido";
      if (!f.birthDate) return "Escribe tu fecha de nacimiento";
      if (age == null || age < 10 || age > 40) return "Revisa tu fecha de nacimiento";
      if ((f.whatsapp ?? "").replace(/\D/g, "").length < 10) return "Escribe tu WhatsApp (10 dígitos)";
      if (minor && (!(f.guardianName ?? "").trim() || (f.guardianPhone ?? "").replace(/\D/g, "").length < 10))
        return "Como eres menor de edad, necesitamos el nombre y WhatsApp de tu acudiente";
    }
    if (s === 4 && !f.dataConsent) return "Necesitamos tu autorización para guardar tus datos";
    return null;
  };

  const go = (to: number) => {
    if (to > step) {
      const e = validate(step);
      if (e) return setError(e);
    }
    setError(null);
    setDir(to > step ? 1 : -1);
    setStep(to);
    document.getElementById("inscripcion")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submit = () => {
    const e = validate(4) ?? validate(0);
    if (e) return setError(e);
    setError(null);
    startTransition(async () => {
      const res = await registerYouth({ ...f, dataConsent: true } as RegisterInput);
      if (res.status === "ok") setDone(res.firstName ?? f.firstName ?? "");
      else setError(res.message ?? "Algo salió mal");
    });
  };

  if (done !== null) {
    return (
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-5 py-14 text-center"
          role="status"
        >
          <m.span
            animate={{ rotate: [0, -12, 12, -6, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2 }}
            className="grid size-20 place-items-center rounded-full bg-gradient-to-br from-[#ff5e00] to-[#ffb000] text-[#1a0500]"
          >
            <PartyPopper className="size-10" aria-hidden />
          </m.span>
          <p className="font-display text-4xl font-bold uppercase sm:text-5xl">
            ¡Bienvenid@, <span className="text-fire">{done}</span>!
          </p>
          <p className="max-w-md text-lg text-white/75">
            Ya eres parte de la juventud IPUCFB. Te escribiremos por WhatsApp. Nos vemos el viernes a las 7:00 p. m. 🔥
          </p>
        </m.div>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      {/* Progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-white/50">
          <span>
            Paso {step + 1} de {STEPS.length}
          </span>
          <span className="text-[#ffb347]">{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <m.div
            className="h-full rounded-full bg-gradient-to-r from-[#ff3d00] via-[#ff8a00] to-[#ffd23f]"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={dir}>
        <m.div
          key={step}
          custom={dir}
          initial={{ opacity: 0, x: dir * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -60 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <h3 className="font-display text-3xl font-bold uppercase sm:text-4xl">{STEPS[step].title}</h3>
          <p className="mt-1 text-white/60">{STEPS[step].hint}</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {step === 0 && (
              <>
                <Field label="Nombre *">
                  <input className={input} value={f.firstName} onChange={(e) => set("firstName", e.target.value)} autoComplete="given-name" />
                </Field>
                <Field label="Apellido *">
                  <input className={input} value={f.lastName} onChange={(e) => set("lastName", e.target.value)} autoComplete="family-name" />
                </Field>
                <Field label="¿Cómo te gusta que te digan?">
                  <input className={input} value={f.nickname ?? ""} onChange={(e) => set("nickname", e.target.value)} placeholder="Tu apodo" />
                </Field>
                <Field label="Fecha de nacimiento *" hint={age != null ? `Tienes ${age} años` : undefined}>
                  <input type="date" className={cn(input, "[color-scheme:dark]")} value={f.birthDate} onChange={(e) => set("birthDate", e.target.value)} />
                </Field>
                <Field label="WhatsApp *">
                  <input type="tel" inputMode="tel" className={input} value={f.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="300 123 4567" autoComplete="tel" />
                </Field>
                <Field label="Instagram">
                  <input className={input} value={f.instagram ?? ""} onChange={(e) => set("instagram", e.target.value)} placeholder="@tuusuario" />
                </Field>
                <Field label="Barrio o municipio">
                  <input className={input} value={f.neighborhood ?? ""} onChange={(e) => set("neighborhood", e.target.value)} placeholder="Ej: Ferrería, La Estrella" />
                </Field>
                <Group label="Eres">
                  <Chips options={OPTIONS.gender} value={f.gender} onChange={(v) => set("gender", v as string)} />
                </Group>

                {minor && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="grid gap-5 rounded-2xl border border-[#ff8a00]/40 bg-[#ff5e00]/10 p-5 sm:col-span-2 sm:grid-cols-2"
                  >
                    <p className="text-sm font-semibold text-[#ffb347] sm:col-span-2">
                      Como eres menor de edad, cuéntanos quién es tu acudiente 👇
                    </p>
                    <Field label="Nombre del acudiente *">
                      <input className={input} value={f.guardianName ?? ""} onChange={(e) => set("guardianName", e.target.value)} />
                    </Field>
                    <Field label="WhatsApp del acudiente *">
                      <input type="tel" inputMode="tel" className={input} value={f.guardianPhone ?? ""} onChange={(e) => set("guardianPhone", e.target.value)} placeholder="300 123 4567" />
                    </Field>
                    <Field label="Parentesco" wide>
                      <input className={input} value={f.guardianRelation ?? ""} onChange={(e) => set("guardianRelation", e.target.value)} placeholder="Mamá, papá, abuela…" />
                    </Field>
                  </m.div>
                )}
              </>
            )}

            {step === 1 && (
              <>
                <Group label="¿Qué haces actualmente?">
                  <Chips options={OPTIONS.occupation} value={f.occupation} onChange={(v) => set("occupation", v as string)} />
                </Group>
                <Field label="Colegio, universidad o empresa">
                  <input className={input} value={f.institution ?? ""} onChange={(e) => set("institution", e.target.value)} />
                </Field>
                <Field label="Grado o semestre">
                  <input className={input} value={f.grade ?? ""} onChange={(e) => set("grade", e.target.value)} placeholder="Ej: 10°, 3er semestre" />
                </Field>
                <Group label="¿Hace cuánto vienes a la IPUC Ferrería Bariloche?">
                  <Chips options={OPTIONS.timeInChurch} value={f.timeInChurch} onChange={(v) => set("timeInChurch", v as string)} />
                </Group>
                <Group label="¿Cómo llegaste?">
                  <Chips options={OPTIONS.howArrived} value={f.howArrived} onChange={(v) => set("howArrived", v as string)} />
                </Group>
                <Group label="¿Ya te bautizaste en el nombre de Jesús?">
                  <Chips options={OPTIONS.baptized} value={f.baptized} onChange={(v) => set("baptized", v as string)} />
                </Group>
                <Group label="¿Has recibido el Espíritu Santo?">
                  <Chips options={OPTIONS.holySpirit} value={f.holySpirit} onChange={(v) => set("holySpirit", v as string)} />
                </Group>
                <Group label="¿Tu familia asiste a la iglesia?">
                  <Chips options={OPTIONS.familyAttends} value={f.familyAttends} onChange={(v) => set("familyAttends", v as string)} />
                </Group>
              </>
            )}

            {step === 2 && (
              <>
                <Group label="Música que más escuchas" hint="elige varias">
                  <Chips multi options={OPTIONS.musicGenres} value={f.musicGenres} onChange={(v) => set("musicGenres", v as string[])} />
                </Group>
                <Field label="Artistas o bandas favoritas" wide>
                  <input className={input} value={f.favoriteArtists ?? ""} onChange={(e) => set("favoriteArtists", e.target.value)} placeholder="Ej: Marcos Witt, Barak, Hillsong…" />
                </Field>
                <Group label="En tu tiempo libre te gusta" hint="elige varias">
                  <Chips multi options={OPTIONS.hobbies} value={f.hobbies} onChange={(v) => set("hobbies", v as string[])} />
                </Group>
                <Field label="Deporte favorito">
                  <input className={input} value={f.favoriteSport ?? ""} onChange={(e) => set("favoriteSport", e.target.value)} />
                </Field>
                <Field label="Comida favorita">
                  <input className={input} value={f.favoriteFood ?? ""} onChange={(e) => set("favoriteFood", e.target.value)} placeholder="Para el compartir 😋" />
                </Field>
                <Group label="La red social que más usas">
                  <Chips options={OPTIONS.favoriteSocial} value={f.favoriteSocial} onChange={(v) => set("favoriteSocial", v as string)} />
                </Group>
              </>
            )}

            {step === 3 && (
              <>
                <Group label="¿Qué sabes hacer?" hint="elige varias">
                  <Chips multi options={OPTIONS.talents} value={f.talents} onChange={(v) => set("talents", v as string[])} />
                </Group>
                <Field label="Si tocas un instrumento, ¿cuál?" wide>
                  <input className={input} value={f.instrument ?? ""} onChange={(e) => set("instrument", e.target.value)} placeholder="Piano, guitarra, batería…" />
                </Field>
                <Group label="¿Dónde te gustaría servir?" hint="elige varias">
                  <Chips multi options={OPTIONS.wantsToServe} value={f.wantsToServe} onChange={(v) => set("wantsToServe", v as string[])} />
                </Group>
                <Group label="Actividades que quieres vivir" hint="elige varias">
                  <Chips multi options={OPTIONS.activities} value={f.activities} onChange={(v) => set("activities", v as string[])} />
                </Group>
                <Group label="Temas de los que quieres que hablemos" hint="elige varias">
                  <Chips multi options={OPTIONS.topics} value={f.topics} onChange={(v) => set("topics", v as string[])} />
                </Group>
                <Group label="¿Puedes venir los viernes a las 7:00 p. m.?">
                  <Chips options={OPTIONS.fridayAvailable} value={f.fridayAvailable} onChange={(v) => set("fridayAvailable", v as string)} />
                </Group>
                <Field label="¿Qué sueñas para tu vida?" wide>
                  <textarea rows={3} className={cn(input, "resize-y")} value={f.dreams ?? ""} onChange={(e) => set("dreams", e.target.value)} placeholder="Tu carrera, tu ministerio, tu familia…" />
                </Field>
              </>
            )}

            {step === 4 && (
              <>
                <Field label="¿Hay algo por lo que podamos orar por ti?" wide>
                  <textarea rows={3} className={cn(input, "resize-y")} value={f.prayerRequest ?? ""} onChange={(e) => set("prayerRequest", e.target.value)} />
                </Field>
                <Field label="¿Algo que quieras que tus líderes sepan?" wide hint="Una lucha, una idea, una queja… lo que sea. Te escuchamos.">
                  <textarea rows={3} className={cn(input, "resize-y")} value={f.forLeaders ?? ""} onChange={(e) => set("forLeaders", e.target.value)} />
                </Field>
                <label className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/80 sm:col-span-2">
                  <input type="checkbox" className="mt-0.5 size-5 shrink-0 accent-[#ff5e00]" checked={f.dataConsent} onChange={(e) => set("dataConsent", e.target.checked)} />
                  <span>
                    <strong className="text-white">Autorizo *</strong> a la IPUC Ferrería Bariloche a guardar mis datos para
                    contactarme y acompañarme en el ministerio de jóvenes (Ley 1581 de 2012). No se comparten con nadie.
                    {minor && " Mi acudiente está enterado de esta inscripción."}
                  </span>
                </label>
                <label className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/80 sm:col-span-2">
                  <input type="checkbox" className="mt-0.5 size-5 shrink-0 accent-[#ff5e00]" checked={f.imageConsent} onChange={(e) => set("imageConsent", e.target.checked)} />
                  <span>Pueden publicar fotos y videos donde salgo en las redes de la iglesia.</span>
                </label>
              </>
            )}
          </div>
        </m.div>
      </AnimatePresence>

      {/* Campo trampa anti-bots */}
      <input
        aria-hidden
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0"
        value={f.website ?? ""}
        onChange={(e) => set("website", e.target.value)}
      />

      {error && (
        <m.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200"
        >
          {error}
        </m.p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(step - 1)}
          disabled={step === 0 || pending}
          className="inline-flex h-12 items-center gap-2 rounded-full px-5 font-semibold text-white/70 transition hover:text-white disabled:invisible"
        >
          <ArrowLeft className="size-5" aria-hidden /> Atrás
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => go(step + 1)}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 font-bold text-[#1a0500] transition hover:scale-105 active:scale-95"
          >
            Siguiente <ArrowRight className="size-5" aria-hidden />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={pending}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#ff3d00] to-[#ffb000] px-7 font-bold text-[#1a0500] shadow-[0_10px_40px_-10px_rgb(255_94_0/0.9)] transition hover:scale-105 active:scale-95 disabled:opacity-70"
          >
            {pending ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Flame className="size-5" aria-hidden />}
            {pending ? "Guardando…" : "¡Me inscribo!"}
          </button>
        )}
      </div>
    </LazyMotion>
  );
}
