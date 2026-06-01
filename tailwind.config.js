/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sakura: {
          50:  '#fff0f3',   // softest petal blush — page backgrounds
          100: '#ffe4ea',   // light blush — section fills, card bases
          200: '#ffc2cf',   // petal pink — subtle borders, dividers
          300: '#fda4af',   // mid sakura — icons, accents, tags
          400: '#fb7185',   // vivid rose — primary CTA hover
          500: '#f43f5e',   // deep sakura / sunrise crimson — primary CTA
          600: '#e11d48',   // rich crimson — active / pressed states
          700: '#be123c',   // dark rose — heading accents
          800: '#9f1239',   // deep wine — footer bg option
          900: '#881337',   // darkest bloom — text on light backgrounds
          DEFAULT: '#f43f5e',
        },
        petal: {
          // Complementary warm neutrals that sit harmoniously with sakura
          50:  '#fdf6f7',   // near-white with warmth — hero/page bg
          100: '#f9ecee',   // warm off-white — card fills
          200: '#f0d4d9',   // dusty rose neutral — glass overlays
          300: '#dba8b2',   // muted rose — decorative elements
        },
        zen: {
          50:  '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          500: '#71717a',   // body text secondary
          700: '#3f3f46',   // body text primary
          900: '#18181b',   // headings
        },
      },

      fontFamily: {
        // Display: elegant, Japanese-inspired geometric serif feel
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        // Body: clean and readable
        sans: ['"DM Sans"', 'Poppins', 'sans-serif'],
        // Japanese character accents (fallback chain)
        jp: ['"Noto Serif JP"', '"Hiragino Mincho ProN"', 'serif'],
      },

      backgroundImage: {
        // Signature sakura gradient — use as hero overlays, card accents
        'sakura-gradient':
          'linear-gradient(135deg, #fff0f3 0%, #ffc2cf 40%, #fb7185 100%)',
        // Soft radial bloom — use as section backgrounds
        'petal-radial':
          'radial-gradient(ellipse at 60% 40%, #ffe4ea 0%, #fff0f3 60%, transparent 100%)',
        // Button gradient
        'cta-gradient':
          'linear-gradient(135deg, #fb7185 0%, #f43f5e 60%, #e11d48 100%)',
        // Subtle blossom glow for cards
        'bloom-glow':
          'radial-gradient(ellipse at top left, #ffc2cf33 0%, transparent 60%)',
      },

      boxShadow: {
        'sakura-sm':  '0 2px 8px 0 rgba(244, 63, 94, 0.12)',
        'sakura-md':  '0 4px 20px 0 rgba(244, 63, 94, 0.20)',
        'sakura-lg':  '0 8px 40px 0 rgba(244, 63, 94, 0.28)',
        'sakura-xl':  '0 16px 60px 0 rgba(244, 63, 94, 0.35)',
        'petal-card': '0 2px 24px 0 rgba(253, 164, 175, 0.18), 0 1px 4px 0 rgba(244,63,94,0.08)',
      },

      borderColor: {
        sakura: '#fda4af',   // default sakura border shorthand
      },

      backdropBlur: {
        xs: '2px',
        sm: '6px',
        DEFAULT: '12px',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },

      keyframes: {
        // Gentle petal float — apply to decorative SVG petals
        petalFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.7' },
          '33%':       { transform: 'translateY(-18px) rotate(8deg)', opacity: '1' },
          '66%':       { transform: 'translateY(-8px) rotate(-5deg)', opacity: '0.85' },
        },
        // Soft pulse glow on CTAs
        sakuraPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(244,63,94,0.35)' },
          '50%':       { boxShadow: '0 0 0 12px rgba(244,63,94,0)' },
        },
        // Shimmer scan — loading / highlight effect
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        // Slow bloom scale on hero bg image
        bloomScale: {
          '0%':   { transform: 'scale(1.00)' },
          '100%': { transform: 'scale(1.06)' },
        },
      },

      animation: {
        'petal-float':    'petalFloat 6s ease-in-out infinite',
        'petal-float-slow': 'petalFloat 9s ease-in-out infinite',
        'sakura-pulse':   'sakuraPulse 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer':        'shimmer 2.2s linear infinite',
        'bloom-scale':    'bloomScale 14s ease-in-out infinite alternate',
      },

      transitionTimingFunction: {
        // Snappy spring-like easing for card hovers and reveals
        'sakura-spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
    },
  },
  plugins: [],
}