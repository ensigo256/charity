import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ensigo of Love",
    short_name: "Ensigo of Love",
    description:
      "Support vulnerable children, families, and communities through care, education, and meaningful giving.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f766e",
    icons: [
      {
        src: "/dark-logo.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
