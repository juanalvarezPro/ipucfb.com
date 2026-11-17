import { ImageResponse } from "next/og";
import { church } from "@/config/church";
import { OG_LOGO } from "./og-logo";

export const alt = church.motto;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori no pinta WebP: el logo va en PNG.
export default async function OpengraphImage() {
  const src = OG_LOGO;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #00338d 0%, #071a45 45%, #05070c 100%)",
          color: "white",
        }}
      >
        <img src={src} width={351} height={247} alt="" />
        <div style={{ marginTop: 36, fontSize: 64, fontWeight: 700, letterSpacing: -1, textTransform: "uppercase" }}>
          {church.motto}
        </div>
        <div style={{ marginTop: 12, fontSize: 28, color: "#74adff", letterSpacing: 6, textTransform: "uppercase" }}>
          {`${church.mottoRef} · ${church.domain}`}
        </div>
      </div>
    ),
    size,
  );
}
