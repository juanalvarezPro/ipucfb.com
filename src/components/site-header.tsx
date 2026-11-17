"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { IpucLogo } from "@/components/brand/logos";
import { buttonClass } from "@/components/ui/button";
import { church } from "@/config/church";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#en-vivo", label: "En vivo" },
  { href: "#horarios", label: "Horarios" },
  { href: "#creemos", label: "Lo que creemos" },
  { href: "#ministerios", label: "Ministerios" },
  { href: "#visitanos", label: "Visítanos" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "bg-navy-900/90 shadow-lg shadow-navy-950/20 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="#inicio" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <IpucLogo tone="white" priority className="h-10 w-auto shrink-0 sm:h-12" />
          <span className="hidden flex-col whitespace-nowrap leading-none text-white sm:flex">
            <span className="font-display text-xl font-bold uppercase tracking-wider">{church.brand}</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] font-semibold xl:px-4 text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a href="#oracion" className={buttonClass({ variant: "gold", className: "ml-3 h-10 whitespace-nowrap" })}>
            Pedir oración
          </a>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full text-white transition hover:bg-white/10 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        id="menu-movil"
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[calc(100dvh-4rem)]" : "max-h-0",
        )}
      >
        <nav aria-label="Móvil" className="flex flex-col gap-1 px-4 pb-6 pt-2">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3.5 text-lg font-semibold text-white/90 hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#oracion"
            onClick={() => setOpen(false)}
            className={buttonClass({ variant: "gold", size: "lg", className: "mt-3" })}
          >
            Pedir oración
          </a>
        </nav>
      </div>
    </header>
  );
}
