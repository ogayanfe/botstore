/** @type {import('tailwindcss').Config} */
module.exports = {
    dark: "dark",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            screens: {
                xm: "500px",
                xxm: "400px",
            },
        },
    },
    plugins: [],
};
