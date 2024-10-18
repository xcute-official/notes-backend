import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        'foreground-200': "var(--color-foreground-200)",
        'foreground-100': "var(--color-foreground-100)",
        'background-200': "var(--color-background-200)",
        'background-100': "var(--color-background-100)",
      },
    },
  },
  plugins: [],
};
export default config;
