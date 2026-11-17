import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/church";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/jovenes`, changeFrequency: "weekly", priority: 0.8 },
  ];
}
