// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // This tells Tailwind to scan all React files
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
