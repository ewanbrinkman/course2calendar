import { MetadataRoute } from "next";
import metadataConfig from "@config/metadata.json";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: metadataConfig.title.base,
    short_name: metadataConfig.title.short,
    description: metadataConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48 32x32 16x16",
        type: "image/x-icon",
      },
    ],
  };
}
