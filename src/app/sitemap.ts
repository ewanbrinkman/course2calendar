import { MetadataRoute } from "next";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://course2calendar.com"
    : `http://localhost:${process.env.PORT || 3000}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
