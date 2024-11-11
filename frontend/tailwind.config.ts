import type { Config } from "tailwindcss";

const { nextui } = require("@nextui-org/react");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        gradient: {
          to: { "background-position": "200% center" },
          "0%, 100%": {
            transform: "scale(1.02, 1.02)",
          },
          "50%": {
            transform: "scale(1,1)",
          },
        },
        wiggle: {
          "0%, 100%": {
            transform:
              "scale(1.03, 1.03) skew(1deg, 1deg) translateX(-2px) translateY(2px)",
          },
          "50%": {
            transform:
              "scale(1,1) skew(0deg, 0deg) translateX(0px) translateY(0px)",
          },
        },
        loading_button: {
          "0%": {
            "background-size": "200% 200%",
            "background-position": "left center",
            transform: "scale(1, 1)  ",
          },
          "25%": {
            "background-size": "200% 200%",
            "background-position": "right center",
            transform: "scale(1.02, 1.02)  ",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "left center",
            transform: "scale(1, 1) ",
          },
          "75%": {
            "background-size": "200% 200%",
            "background-position": "left center",
            transform: "scale(1.02, 1.02) ",
          },
          "100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
            transform: "scale(1, 1) ",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "loading-button": "loading_button 1s infinite",
        gradient: "gradient 1s linear infinite",
        wiggle: "wiggle 10s ease-in-out infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
} satisfies Config;

export default config;
