import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			container: {
				padding: {
					DEFAULT: "1rem",
					sm: "2rem",
					md: "2rem",
					lg: "4rem",
					xl: "5rem",
					"2xl": "6rem",
				},
			},
			fontFamily: {
				"geist-sans": ["var(--font-geist-sans)"],
				"geist-mono": ["var(--font-geist-mono)"],
			},
			colors: {
				background: "hsl(var(--white-shade-97))",
				foreground: "hsl(var(--foreground))",
				"white-shade-90": "hsl(var(--white-shade-90))",
				"white-shade-95": "hsl(var(--white-shade-95))",
				"white-shade-97": "hsl(var(--white-shade-97))",
				"white-shade-99": "hsl(var(--white-shade-99))",
				"gray-shade-10": "hsl(var(--gray-shade-10))",
				"gray-shade-15": "hsl(var(--gray-shade-15))",
				"gray-shade-20": "hsl(var(--gray-shade-20))",
				"gray-shade-30": "hsl(var(--gray-shade-30))",
				"gray-shade-35": "hsl(var(--gray-shade-35))",
				"gray-shade-40": "hsl(var(--gray-shade-40))",
				"gray-shade-60": "hsl(var(--gray-shade-60))",
				"gray-shade-70": "hsl(var(--gray-shade-70))",
				"orange-shade-50": "hsl(var(--orange-shade-50))",
				"orange-shade-70": "hsl(var(--orange-shade-70))",
				"orange-shade-75": "hsl(var(--orange-shade-75))",
				"orange-shade-80": "hsl(var(--orange-shade-80))",
				"orange-shade-90": "hsl(var(--orange-shade-90))",
				"orange-shade-97": "hsl(var(--orange-shade-97))",
				"orange-shade-99": "hsl(var(--orange-shade-99))",

				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground":
						"hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground":
						"hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
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
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
