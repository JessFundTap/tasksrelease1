/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['DM Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      colors: {
        'fundtap-primary': '#0A2640',
        'fundtap-primary-light': '#1B3A52',
        'fundtap-primary-lighter': '#2D4E66',
        'fundtap-secondary': '#80E8B3',
        'fundtap-secondary-light': '#B8F3D6',
        'fundtap-light': '#E0F8E8',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(10, 38, 64, 0.06)',
        'soft-md': '0 4px 12px rgba(10, 38, 64, 0.08)',
        'soft-lg': '0 8px 24px rgba(10, 38, 64, 0.12)',
        'glow': '0 0 20px rgba(128, 232, 179, 0.3)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0A2640 0%, #1B3A52 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #80E8B3 0%, #B8F3D6 100%)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(10, 38, 64, 0.03) 0%, rgba(128, 232, 179, 0.03) 100%)',
        'gradient-hover': 'linear-gradient(135deg, rgba(10, 38, 64, 0.05) 0%, rgba(128, 232, 179, 0.05) 100%)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
