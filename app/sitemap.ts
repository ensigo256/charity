import type { MetadataRoute } from "next";

const baseUrl = "https://ensigoflove.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/programs",
    "/donate",
    "/get-involved",
    "/gallery",
    "/blog",
    "/contact",
    "/newsletter",
    "/privacy-policy",
    "/terms-of-service",
  ].map((path) => ({
    url: `${baseUrl}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
