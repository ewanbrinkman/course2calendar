import type { Config } from "tailwindcss";

const config: Config = {
  // darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
  // corePlugins: { preflight: false },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm: "400px",
      },
      height: {
        dscreen: "100dvh", // Use 100dvh insteda of 100vh, so that it works on mobile.
      },
    },
  },
  plugins: [],
};
export default config;
