import type { MetadataRoute } from "next";
import { church } from "@/config/church";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: church.name,
    short_name: church.shortName,
    start_url: "/",
    display: "standalone",
    background_color: "#05070c",
    theme_color: "#05070c",
    icons: [{ src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
