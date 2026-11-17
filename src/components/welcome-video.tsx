"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const MEDIA = "https://media.sonarpiano.com/ipucfb";

/**
 * Guion (ficticio) que se lee como subtítulos sobre el video, que va mudo.
 * Cada línea dura hasta su `until` (segundos). El video recortado dura ~17.8 s
 * (sin la intro, el cintillo ni la fecha que traía el original).
 */
const SCRIPT = [
  { until: 3.6, text: "¡Hola! Soy el pastor Anderson Pabón 👋" },
  { until: 7.2, text: "Y te doy la bienvenida a la IPUC Ferrería Bariloche" },
  { until: 10.8, text: "Aquí hay un lugar para ti y para toda tu familia" },
  { until: 14.3, text: "Dios tiene algo grande preparado para tu vida ✨" },
  { until: 99, text: "¡Te esperamos este domingo a las 10:00 a. m.! 🙌" },
];

/**
 * Escenario de la portada: el video del pastor no va en una tarjeta, se funde
 * con el fondo azul→negro. El duotono azul ya viene horneado en el archivo
 * (un mix-blend en CSS dejaba una línea en el borde y cuesta GPU).
 *
 * El archivo se pide solo cuando la página terminó de cargar, la portada está
 * en pantalla y el navegador está libre; mientras, se ve el póster (19 KB).
 */
export function HeroVideoStage({ children }: { children: ReactNode }) {
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
    <>
      {children}

      {/* Video sin marco, fundido con el fondo. Celular: franja propia bajo el
          texto (el texto nunca queda encima). Escritorio: mitad derecha. */}
      <div className="relative -mx-4 mt-10 h-[72svh] sm:-mx-6 lg:static lg:mx-0 lg:mt-0 lg:h-auto">
        {/* Las máscaras van en capas (no en el <video>) y una por capa: con
            mask-composite o sobre el video, Chrome dibuja una línea en el borde. */}
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_62%,transparent_100%)] lg:left-auto lg:-z-10 lg:w-[56%] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_45%)]">
        <div className="h-full w-full lg:[mask-image:linear-gradient(to_top,transparent_0%,black_35%)]">
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          poster={`${MEDIA}/bienvenida-pastor-v2-poster.webp`}
          onTimeUpdate={onTime}
          aria-label="Video de bienvenida del pastor Anderson Pabón"
          className="h-full w-full object-cover object-[50%_25%]"
        >
          {/* Duotono azul horneado (sin filtros CSS) y solo H.264: se
              decodifica por hardware en cualquier celular. */}
          {load && <source src={`${MEDIA}/bienvenida-pastor-v2.mp4`} type="video/mp4" />}
        </video>
        </div>
        </div>

        {/* Subtítulos del guion, sobre la parte que ya se fundió al fondo */}
        <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 lg:bottom-20 lg:left-auto lg:right-[max(2rem,calc((100vw-72rem)/2+2rem))] lg:w-[22rem]">
          <p
            key={line}
            aria-live="polite"
            className="animate-rise border-l-2 border-gold-400 pl-4 text-left [text-shadow:0_2px_14px_rgb(0_0_0/0.9)]"
          >
            <span className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-sky-200">
              <span className="size-1.5 animate-pulse rounded-full bg-gold-400" />
              Pastor Anderson Pabón
            </span>
            <span className="mt-1 block font-display text-2xl uppercase leading-tight tracking-wide text-white">
              {SCRIPT[line].text}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
