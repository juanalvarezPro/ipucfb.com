"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, HandHeart, MapPin, MessageCircle, Send } from "lucide-react";
import { pastorWhatsappLink } from "@/config/church";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

const KINDS = [
  { value: "PRAYER", label: "Oración", icon: HandHeart, intro: "🙏 Petición de oración", placeholder: "¿Por qué podemos orar contigo?" },
  { value: "VISIT", label: "Visitarnos", icon: MapPin, intro: "📍 Quiero visitar la iglesia", placeholder: "¿Qué día te gustaría venir? ¿Vienes con familia?" },
  { value: "CONTACT", label: "Mensaje", icon: MessageCircle, intro: "💬 Mensaje desde ipucfb.com", placeholder: "Escribe tu mensaje" },
] as const;

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/15";

/**
 * Formulario de oración / visita / mensaje. No pasa por ningún servidor:
 * arma el texto y abre el chat de WhatsApp del pastor (wa.me) para que la
 * persona lo envíe desde su propio WhatsApp.
 */
export function RequestForm() {
  const [kind, setKind] = useState<(typeof KINDS)[number]["value"]>("PRAYER");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const active = KINDS.find((k) => k.value === kind)!;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError("Escribe tu nombre");
    if (kind !== "VISIT" && message.trim().length < 3) return setError("Escribe tu mensaje");
    setError(null);
    const text = [
      active.intro,
      `Hola pastor, soy *${name.trim()}*.`,
      message.trim() ? `\n${message.trim()}` : "",
      "\n— Enviado desde ipucfb.com",
    ]
      .filter(Boolean)
      .join("\n");
    // Abrir en el mismo gesto del usuario para que el navegador no lo bloquee.
    window.open(pastorWhatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-10 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-sky-50 text-sky-600">
          <CheckCircle2 className="size-9" aria-hidden />
        </span>
        <p className="font-display text-2xl font-semibold uppercase text-navy-800">¡Dios te bendiga!</p>
        <p className="max-w-sm text-muted">
          Abrimos el WhatsApp del pastor con tu mensaje listo. Solo dale <strong>enviar</strong> allá.
        </p>
        <button type="button" onClick={() => setSent(false)} className="text-sm font-semibold text-sky-600 underline">
          Escribir otro mensaje
        </button>
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

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy-800">Nombre</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          placeholder="Tu nombre"
          className={field}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy-800">Mensaje</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder={active.placeholder}
          className={cn(field, "resize-y")}
        />
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <Button type="submit" variant="navy" size="lg" className="w-full">
        <Send className="size-5" aria-hidden />
        Enviar por WhatsApp al pastor
      </Button>
      <p className="text-center text-xs text-muted">
        Se abre WhatsApp con tu mensaje listo para el pastor. Nadie más lo ve.
      </p>
    </form>
  );
}
