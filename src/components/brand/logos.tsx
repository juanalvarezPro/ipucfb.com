import Image from "next/image";
import { cn } from "@/lib/cn";

/** Logo oficial IPUC (globo + biblia). `tone="white"` para fondos azules. */
export function IpucLogo({
  tone = "blue",
  className,
  priority,
}: {
  tone?: "blue" | "white";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "white" ? "/brand/ipuc-logo-white.webp" : "/brand/ipuc-logo.webp"}
      alt="Iglesia Pentecostal Unida de Colombia"
      width={351}
      height={247}
      priority={priority}
      className={cn("select-none", className)}
    />
  );
}

/** Logo SonarPiano — solo sobre fondo oscuro (el «Sonar» es blanco). */
export function SonarPianoLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/sonarpiano-logo.webp"
      alt="SonarPiano"
      width={520}
      height={128}
      className={cn("h-auto select-none", className)}
    />
  );
}
