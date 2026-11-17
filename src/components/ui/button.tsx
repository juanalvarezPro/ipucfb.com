import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "gold" | "light" | "outline" | "navy" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 cursor-pointer";

const variants: Record<Variant, string> = {
  gold: "bg-gold-400 text-navy-950 shadow-glow hover:bg-gold-300 hover:-translate-y-0.5",
  light: "bg-white text-navy-800 shadow-card hover:bg-navy-50 hover:-translate-y-0.5",
  outline: "border border-white/35 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/60",
  navy: "bg-navy-700 text-white shadow-card hover:bg-navy-600 hover:-translate-y-0.5",
  ghost: "text-navy-700 hover:bg-navy-50",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base sm:text-lg",
};

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function buttonClass({ variant = "gold", size = "md", className }: Omit<Common, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({ variant, size, className, ...props }: Common & ComponentProps<"button">) {
  return <button className={buttonClass({ variant, size, className })} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  href,
  external,
  ...props
}: Common & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href">) {
  const cls = buttonClass({ variant, size, className });
  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props} />;
  }
  return <Link href={href} className={cls} {...props} />;
}
