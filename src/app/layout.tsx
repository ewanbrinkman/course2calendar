import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { createTheme, MantineProvider, ColorSchemeScript } from "@mantine/core";
import "./globals.css";
import "@mantine/core/styles.css";
import Header from "@components/Header";
import metadataConfig from "@config/metadata.json";

const theme = createTheme({});

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://course2calendar.com"
    : `http://localhost:${process.env.PORT || 3000}`;

export const metadata: Metadata = {
  title: metadataConfig.title.base,
  description: metadataConfig.description,
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: metadataConfig.title.base,
    description: metadataConfig.description,
    url: baseUrl,
    siteName: metadataConfig.title.base,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className="antialiased flex flex-col h-dscreen">
        <MantineProvider theme={theme} forceColorScheme="dark">
          <Header />
          {children}
        </MantineProvider>
        <Analytics />
      </body>
    </html>
  );
}
