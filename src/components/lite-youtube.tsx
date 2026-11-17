"use client";

import Image from "next/image";
import { useState } from "react";
import { preconnect } from "react-dom";

/**
 * Embed liviano de YouTube (al estilo de lite-youtube / vue-lite-youtube-embed):
 * pinta solo la miniatura y un botón de play. El iframe (≈ 1 MB de JS de
 * YouTube) se carga únicamente cuando la persona toca reproducir; al pasar
 * el cursor se precalientan las conexiones para que arranque rápido.
 */
export function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [active, setActive] = useState(false);
  const [warm, setWarm] = useState(false);

  const warmup = () => {
    if (warm) return;
    setWarm(true);
    preconnect("https://www.youtube-nocookie.com");
    preconnect("https://www.google.com");
    preconnect("https://i.ytimg.com");
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] bg-navy-950 shadow-lift">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          onPointerOver={warmup}
          onFocus={warmup}
          aria-label={`Reproducir: ${title}`}
          className="group absolute inset-0 cursor-pointer"
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-navy-950/30" />
          <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold-400 text-navy-950 shadow-glow transition duration-300 group-hover:scale-110 sm:size-24">
            <svg viewBox="0 0 24 24" className="ml-1 size-9 sm:size-10" fill="currentColor" aria-hidden>
              <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
            </svg>
          </span>
          <span className="absolute inset-x-0 bottom-0 line-clamp-2 p-5 text-left font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white sm:p-7 sm:text-2xl">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
