import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  tone = "paper",
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "paper" | "white" | "navy";
}) {
  const tones = {
    paper: "bg-paper",
    white: "bg-white",
    navy: "bg-hero text-white",
  } as const;
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] sm:text-sm",
        light ? "text-gold-300" : "text-sky-600",
      )}
    >
      <span aria-hidden className={cn("h-px w-6", light ? "bg-gold-300" : "bg-sky-500")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  light,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  light?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-4 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight sm:text-5xl",
          light ? "text-white" : "text-navy-800",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn("mt-5 text-lg leading-relaxed", light ? "text-navy-100/85" : "text-muted")}>{lead}</p>
      )}
    </div>
  );
}
