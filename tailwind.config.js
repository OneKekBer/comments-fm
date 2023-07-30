/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                lightgrey: "hsl(228, 33%, 97%)",
            },
        },
    },
    plugins: [],
};
