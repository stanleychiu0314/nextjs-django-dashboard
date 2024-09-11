import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    //the directory and files we want the tailwind to apply to
    './app/**/*.{js,ts,jsx,tsx}',   
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
