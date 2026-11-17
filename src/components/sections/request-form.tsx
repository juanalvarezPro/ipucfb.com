"use client";

import { startTransition, useActionState, useState, type FormEvent } from "react";
import { CheckCircle2, HandHeart, Loader2, MapPin, MessageCircle, Send } from "lucide-react";
import { submitRequest, type FormState } from "@/app/actions";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

const KINDS = [
  { value: "PRAYER", label: "Oración", icon: HandHeart, placeholder: "¿Por qué podemos orar contigo?" },
  { value: "VISIT", label: "Visitarnos", icon: MapPin, placeholder: "¿Qué día te gustaría venir? ¿Vienes con familia?" },
  { value: "CONTACT", label: "Mensaje", icon: MessageCircle, placeholder: "Escribe tu mensaje" },
] as const;

const initial: FormState = { status: "idle" };

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/15";

export function RequestForm() {
  const [state, action, pending] = useActionState(submitRequest, initial);
  const [kind, setKind] = useState<(typeof KINDS)[number]["value"]>("PRAYER");
  const [values, setValues] = useState({ name: "", phone: "", message: "" });
  const active = KINDS.find((k) => k.value === kind)!;
  const bind = (key: keyof typeof values) => ({
    name: key,
    value: values[key],
    onChange: (e: { target: { value: string } }) => setValues((v) => ({ ...v, [key]: e.target.value })),
  });

  // Campos controlados + onSubmit: si hay un error, lo escrito no se pierde.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };

  if (state.status === "ok") {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-10 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-sky-50 text-sky-600">
          <CheckCircle2 className="size-9" aria-hidden />
        </span>
        <p className="font-display text-2xl font-semibold uppercase text-navy-800">¡Dios te bendiga!</p>
        <p className="max-w-sm text-muted">{state.message ?? "Recibimos tu mensaje."}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-navy-800">¿Cómo te podemos ayudar?</legend>
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-paper p-1.5">
          {KINDS.map(({ value, label, icon: Icon }) => (
            <label
              key={value}
              className={cn(
                "flex cursor-pointer flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-sm font-semibold transition sm:flex-row sm:justify-center sm:gap-2",
                kind === value ? "bg-white text-navy-700 shadow-card" : "text-muted hover:text-navy-700",
              )}
            >
              <input
                type="radio"
                name="kind"
                value={value}
                checked={kind === value}
                onChange={() => setKind(value)}
                className="sr-only"
              />
              <Icon className="size-5 shrink-0" aria-hidden />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy-800">Nombre</span>
          <input {...bind("name")} required autoComplete="name" placeholder="Tu nombre" className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy-800">WhatsApp</span>
          <input
            {...bind("phone")}
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="300 123 4567"
            className={field}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy-800">Mensaje</span>
        <textarea {...bind("message")} rows={4} placeholder={active.placeholder} className={cn(field, "resize-y")} />
      </label>

      {/* Campo trampa anti-bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No llenar
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.message}
        </p>
      )}

      <Button type="submit" variant="navy" size="lg" className="w-full" disabled={pending}>
        {pending ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Send className="size-5" aria-hidden />}
        {pending ? "Enviando…" : "Enviar"}
      </Button>
      <p className="text-center text-xs text-muted">
        Te responderemos por WhatsApp. Tu petición es confidencial y solo la ve el equipo pastoral.
      </p>
    </form>
  );
}
