/** @type {import('tailwindcss').Config} */
export default {
    tailwindConfig: './styles/tailwind.config.js',
    content: [
        "./index.html",
        "./src/**/*.html",
        "./src/**/*.{vue,js,jsx,ts,tsx}",
        "./src/**/*.{html,js}",
    ],
    mode: "jit",
    daisyui: {
        themes: [{
            quandagoLight: {
                "primary": "#00d7ce",
                "secondary": "#ce0000",
                "accent": "#2852ff",
                "neutral": "#09010d",
                "base-100": "#f6fdff",
                "info": "#0073d9",
                e e "success": "#00be4d",
                "warning": "#977400",
                "error": "#e84e60",
            },
            quandagoDark: {
                "primary": "#0ea5e9",
                "secondary": "#0ea5e9",
                "accent": "#1b00ff",
                "neutral": "#1e1311",
                "base-100": "#1c2324",
                "info": "#4ec2ff",
                "success": "#00ffb6",
                "warning": "#ffbd00",
                "error": "#ff5084",
            }
        }],
    },
    theme: {
        extend: {}
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/forms'),
        require('@headlessui/vue'),
        require('@heroicons/vue/20/solid'),
        require('@heroicons/vue/24/solid'),
        require('@heroicons/vue/24/outline'),
        require('tailwindcss-primeui')
    ],
}
