/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        night: '#0f0f0f',
        ember: '#dc2626',
        steel: '#1f1f1f',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        ember: '0 0 20px rgba(220,38,38,0.35)',
      },
      backgroundImage: {
        'hex-grid': 'radial-gradient(circle at 1px 1px, rgba(220,38,38,0.12) 1px, rgba(15,15,15,0.8) 1px)',
      },
      animation: {
        glitch: 'glitch 3s infinite linear',
        'grid-move': 'gridMove 20s linear infinite',
        'type-cycle': 'typeCycle 16s steps(4) infinite'
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(1px, -1px)' },
          '40%': { transform: 'translate(-1px, 1px)' },
          '60%': { transform: 'translate(1px, 1px)' },
          '80%': { transform: 'translate(-1px, -1px)' },
          '100%': { transform: 'translate(0, 0)' }
        },
        gridMove: {
          '0%': { backgroundPosition: '0 0, 0 0' },
          '100%': { backgroundPosition: '200px 400px, 400px 200px' }
        }
      }
    }
  },
  plugins: []
};
