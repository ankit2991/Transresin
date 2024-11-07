/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {},
        colors: {
            ...colors,
            primary: { 300: "#003f6f", 600: "#0364ae" },
            secondary: "#ffed00",
        },
    },
    plugins: [],
};