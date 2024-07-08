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
        "bg-main": "rgb(var(--color-bg-main) / <alpha-value>)",
        "gray-1": "rgb(var(--color-gray-1) / <alpha-value>)",
        "gray-2": "rgb(var(--color-gray-2) / <alpha-value>)",
        "gray-3": "rgb(var(--color-gray-3) / <alpha-value>)",
        "gray-4": "rgb(var(--color-gray-4) / <alpha-value>)",
        "gray-9": "rgb(var(--color-gray-9) / <alpha-value>)",
        purple: "rgb(var(--color-purple) / <alpha-value>)",
        "purple-3": "rgb(var(--color-purple-3) / <alpha-value>)",
        "green-1": "rgb(var(--color-green-1) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
