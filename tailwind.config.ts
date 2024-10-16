/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx,js,jsx}",
        "./components/**/*.{ts,tsx,js,jsx}",
        "./app/**/*.{ts,tsx,js,jsx}",
        "./src/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "0.5rem",

                // md: '1rem',
                lg: "2rem",
            },
            screens: {
                sm: "100%",
                lg: "1128px",
            },
        },
        extend: {
            fontFamily: {
                nunito: ["nunito", "sans-serif"],
                jetbrains: ["JetBrains Mono", "sans-serif"],
            },
            colors: {
                // shared colors
                "primary-color": "#FFB800",
                "white-color": "#F6F6F6",
                "black-color": "#151515",

                // light colors
                "bg-color-light": "#FFFFFF",
                "secondary-color-light": "#ECECEC",
                "accent-color-light": "#D6D6D6",

                // dark colors
                "bg-color-dark": "#000000",
                "secondary-color-dark": "black",
                "accent-color-dark": "black",
                keyframes: {
                    "accordion-down": {
                        from: { height: 0 },
                        to: { height: "var(--radix-accordion-content-height)" },
                    },
                    "accordion-up": {
                        from: {
                            height: "var(--radix-accordion-content-height)",
                        },
                        to: { height: 0 },
                    },
                },
                animation: {
                    "accordion-down": "accordion-down 0.2s ease-out",
                    "accordion-up": "accordion-up 0.2s ease-out",
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
