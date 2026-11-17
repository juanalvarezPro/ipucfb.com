"use client";

import { useEffect, useRef, useState } from "react";

const MEDIA = "https://media.sonarpiano.com/ipucfb";

/**
 * Guion (ficticio) que se lee como subtítulos sobre el video, que va mudo.
 * Cada línea dura hasta el `until` (segundos) siguiente. El video dura ~31 s.
 */
const SCRIPT = [
  { until: 5.5, text: "¡Hola! Soy el pastor Anderson Pabón 👋" },
  { until: 11.5, text: "Y te doy la bienvenida a la IPUC Ferrería Bariloche" },
  { until: 17.5, text: "Aquí hay un lugar para ti y para toda tu familia" },
  { until: 24, text: "Dios tiene algo grande preparado para tu vida ✨" },
  { until: 99, text: "¡Te esperamos este domingo a las 10:00 a. m.! 🙌" },
];

/**
 * Video de bienvenida del pastor (mudo, en bucle). Para no frenar la carga,
 * el archivo se pide recién cuando la página terminó de cargar y la tarjeta
 * está en pantalla; mientras tanto se ve el póster (20 KB).
 */
export function WelcomeVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [line, setLine] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = false;
    let loaded = document.readyState === "complete";
    // Con «ahorro de datos» no se descarga: queda el póster.
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let started = false;
    const tryStart = () => {
      if (started || saveData || !visible || !loaded) return;
      started = true;
      // Esperar a que el navegador quede libre para no competir con la carga.
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
      idle(() => setLoad(true), { timeout: 4000 });
    };
    const onLoad = () => {
      loaded = true;
      tryStart();
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      tryStart();
    });
    io.observe(el);
    if (!loaded) window.addEventListener("load", onLoad, { once: true });
    tryStart();
    return () => {
      io.disconnect();
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (load) ref.current?.play().catch(() => {});
  }, [load]);

  const onTime = () => {
    const t = ref.current?.currentTime ?? 0;
    const i = SCRIPT.findIndex((s) => t < s.until);
    setLine((prev) => (i === -1 || i === prev ? prev : i));
  };

  return (
    <figure className="relative mx-auto w-full max-w-[18rem] sm:max-w-[20rem] lg:max-w-[21rem]">
      {/* Halo y órbita detrás (guiño al globo del logo) */}
      <div aria-hidden className="absolute -inset-10 rounded-full bg-gold-400/25 blur-3xl" />
      <div aria-hidden className="absolute -inset-6 animate-spin-slow rounded-full border border-dashed border-sky-200/30" />

      <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-white/15 bg-navy-950 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)] ring-1 ring-gold-300/20">
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          poster={`${MEDIA}/bienvenida-pastor-bn-poster.webp`}
          onTimeUpdate={onTime}
          aria-label="Video de bienvenida del pastor Anderson Pabón"
          className="absolute inset-0 h-full w-full object-cover"
        >
          {/* Blanco y negro ya horneado en el archivo (sin filtros CSS) y solo
              H.264: se decodifica por hardware en cualquier celular. */}
          {load && <source src={`${MEDIA}/bienvenida-pastor-bn.mp4`} type="video/mp4" />}
        </video>

        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />

        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-navy-950/60 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-gold-400" />
          Bienvenida
        </span>

        {/* Subtítulos del guion */}
        <figcaption aria-live="polite" className="absolute inset-x-3 bottom-4">
          <p
            key={line}
            className="animate-rise rounded-2xl bg-navy-950/70 px-4 py-3 text-center text-[0.95rem] font-semibold leading-snug text-white shadow-lg backdrop-blur-sm"
          >
            {SCRIPT[line].text}
          </p>
        </figcaption>
      </div>
    </figure>
  );
}
