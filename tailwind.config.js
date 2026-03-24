module.exports = {
  content: ['./src/**/*.liquid', './src/**/*.js', './src/**/*.jsx', './src/**/*.tsx'],

  safelist: [
    'invisible',
    'not-sr-only',
    'focus:not-sr-only',
    'text-messages-success',
    'text-messages-error',
    {
      pattern: /grid-cols-[1-6]/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  ],

  darkMode: 'class', // or 'media' or 'class'

  theme: {
    extend: {
      minWidth: {
        'button-lg': 'var(--height-button-lg)',
        'button-md': 'var(--height-button-md)',
        'button-sm': 'var(--height-button-sm)',
      },

      maxWidth: {
        '1/2': '50%',
      },

      minHeight: {
        12: '3rem',
        16: '4rem',
        65: '16.25rem', // 260px
        90: '22.5rem', // 360px
        120: '30rem', // 480px
        '100dvh': '100dvh',
        'form-element': 'var(--height-form-element)',
        'button-lg': 'var(--height-button-lg)',
        'button-md': 'var(--height-button-md)',
        'button-sm': 'var(--height-button-sm)',
      },

      fontWeight: {
        'body-weight': 'var(--font-body-weight)',
        'body-bold-weight': 'var(--font-body-bold-weight)',
        'heading-weight': 'var(--font-heading-weight)',
      },

      lineHeight: {
        body: 'var(--base-body-line-height)',
        heading: '1',
      },

      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            fontSize: 'var(--font-size-base)',
            lineHeight: 'var(--base-body-line-height)',
            letterSpacing: 'var(--base-body-letter-spacing)',
            color: 'inherit',
            h1: {
              margin: '0 0 48px',
              color: 'inherit',
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--heading-font-size)', // 48px
              lineHeight: 'var(--heading-line-height)',
              fontWeight: 'var(--font-heading-weight)',
            },
            h2: {
              margin: '0 0 24px',
              color: 'inherit',
              fontFamily: 'var(--font-heading)',
              fontSize: 'calc(var(--heading-font-size) - 12px)', // 36px
              lineHeight: 'var(--heading-line-height)',
              fontWeight: 'var(--font-heading-weight)',
            },
            h3: {
              margin: '0 0 24px',
              color: 'inherit',
              fontFamily: 'var(--font-heading)',
              fontSize: 'calc(var(--heading-font-size) - 20px)', // 28px
              lineHeight: 'var(--heading-line-height)',
              fontWeight: 'var(--font-heading-weight)',
            },
            h4: {
              margin: '0 0 24px',
              color: 'inherit',
              fontFamily: 'var(--font-heading)',
              fontSize: 'calc(var(--heading-font-size) - 28px)', // 20px
              lineHeight: 'var(--heading-line-height)',
              fontWeight: 'var(--font-heading-weight)',
            },
            h5: {
              margin: '0 0 20px',
              color: 'inherit',
              fontFamily: 'var(--font-heading)',
              fontSize: 'calc(var(--heading-font-size) - 24px)', // 24px
              lineHeight: '1',
              fontWeight: 'var(--font-heading-weight)',
            },
            h6: {
              margin: '0 0 20px',
              color: 'inherit',
              fontFamily: 'var(--font-heading)',
              fontSize: 'calc(var(--heading-font-size) - 30px)', // 18px
              lineHeight: '1',
              fontWeight: 'var(--font-heading-weight)',
            },
            table: {
              fontSize: 'var(--font-size-base)',
              lineHeight: 'var(--base-body-line-height)',
              th: {
                fontFamily: 'var(--font-heading)',
              },
            },
            ol: {
              paddingLeft: '20px',
              '&:first-child': {
                marginTop: '0',
              },
              '&:last-child': {
                marginBottom: '0',
              },
            },
            'ol > li': {
              marginTop: '0',
              paddingLeft: '4px',
              '&:last-child': {
                marginBottom: '0',
              },
            },
            'ol > li::marker': {
              fontWeight: 'inherit',
              color: 'inherit',
            },
            p: {
              margin: '0 0 16px',
              '&:last-child': {
                marginBottom: '0',
              },
            },
            a: {
              color: 'inherit',
              fontWeight: 'inherit',
              'text-decoration': 'underline',
              '&:hover': {
                'text-decoration': 'none',
              },
            },
            strong: {
              color: 'inherit',
            },
            blockquote: {
              color: 'inherit',
              borderLeftColor: 'var(--base-border)',
            },
            img: {
              width: 'auto',
            },
          },
        },
        lg: {
          css: {
            fontSize: 'calc(var(--font-size-base) + 2px)',
            lineHeight: 'var(--base-body-line-height)',
            h1: {
              margin: '0 0 64px',
              fontSize: 'calc(var(--heading-font-size) + 22px)', // 70px
              lineHeight: 'var(--heading-line-height)',
            },
            h2: {
              margin: '0 0 36px',
              fontSize: 'calc(var(--heading-font-size) + 8px)', // 56px
              lineHeight: 'var(--heading-line-height)',
            },
            h3: {
              margin: '0 0 24px',
              fontSize: 'calc(var(--heading-font-size) - 12px)', // 36px
              lineHeight: 'var(--heading-line-height)',
            },
            h4: {
              margin: '0 0 24px',
              fontSize: 'calc(var(--heading-font-size) - 20px)', // 28px
              lineHeight: 'var(--heading-line-height)',
            },
            h5: {
              margin: '0 0 20px',
              fontSize: 'calc(var(--heading-font-size) - 24px)', // 24px
              lineHeight: 'var(--heading-line-height)',
              letterSpacing: '1.2px',
            },
            h6: {
              margin: '0 0 20px',
              fontSize: 'calc(var(--heading-font-size) - 30px)', // 18px
              lineHeight: 'var(--heading-line-height)',
              letterSpacing: '0.9px',
            },
            ol: {
              paddingLeft: '24px',
              '&:first-child': {
                marginTop: '0',
              },
              '&:last-child': {
                marginBottom: '0',
              },
            },
            'ol > li': {
              marginTop: '0',
              marginBottom: '22px',
              paddingLeft: '4px',
            },
            p: {
              margin: '0 0 16px',
            },
          },
        },
      },

      aspectRatio: {
        portrait: '1 / 1.3333',
      },
    },

    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        lg: '2.5rem',
      },
    },

    screens: {
      xs: '320px',
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      '2xl': '1440px',
      '3xl': '1600px',
    },

    colors: {
      // Default colors
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      black: '#000',
      white: '#fff',
      'june-dark': 'var(--june-dark)',
      'june-5': 'var(--june-5)',
      'june-off-white': 'var(--jun-off-white)',
      'product-card': '#f9f5f5',
      'june-fitness': 'var(--june-fitness)',

      // Base colors
      'base-body': 'var(--base-body-text)',
      'base-secondary': 'var(--base-secondary-text)',
      'base-accent': 'var(--base-accent)',
      'base-links': 'var(--base-links)',
      'base-sale-price': 'var(--base-sale-price)',
      'base-icons': 'var(--base-icons)',
      'base-icons-on-hover': 'var(--base-icons-on-hover)',
      'base-border': 'var(--base-border)',
      'base-body-background': 'var(--base-body-background)',
      'base-footer-background': 'var(--base-footer-background)',
      'base-background': 'var(--base-background)',
      'base-overlay-dark': 'var(--base-overlay-dark)',
      'base-overlay-white': 'var(--base-overlay-white)',

      // Messages
      'messages-error': 'var(--messages-error)',
      'messages-error-light': 'var(--messages-error-light)',
      'messages-success': 'var(--messages-success)',
      'messages-information': 'var(--messages-information)',

      // Customizable
      'customizable-base': 'var(--customizable-base-text)',

      // Labels
      'labels-sale': 'var(--labels-sale-text)',
      'labels-sale-background': 'var(--labels-sale-background)',
      'labels-soldout': 'var(--labels-soldout-text)',
      'labels-soldout-background': 'var(--labels-soldout-background)',
      'labels-new': 'var(--labels-new-text)',
      'labels-new-background': 'var(--labels-new-background)',

      // Other colors
      'color-border': 'var(--base-border)',

      // Primary button colors
      'primary-button-text-color': 'var(--primary-button-text-color)',
      'primary-button-hover-text-color': 'var(--primary-button-hover-text-color)',
      'primary-button-focus-text-color': 'var(--primary-button-focus-text-color)',
      'primary-button-border-color': 'var(--primary-button-border-color)',
      'primary-button-hover-border-color': 'var(--primary-button-hover-border-color)',
      'primary-button-focus-border-color': 'var(--primary-button-focus-border-color)',
      'primary-button-background-color': 'var(--primary-button-background-color)',
      'primary-button-hover-background-color': 'var(--primary-button-hover-background-color)',
      'primary-button-focus-background-color': 'var(--primary-button-focus-background-color)',
      'primary-button-text-on-disabled': 'var(--primary-button-text-on-disabled)',
      'primary-button-border-on-disabled': 'var(--primary-button-border-on-disabled)',
      'primary-button-background-on-disabled': 'var(--primary-button-background-on-disabled)',

      // Secondary button colors
      'secondary-button-text-color': 'var(--secondary-button-text-color)',
      'secondary-button-hover-text-color': 'var(--secondary-button-hover-text-color)',
      'secondary-button-focus-text-color': 'var(--secondary-button-focus-text-color)',
      'secondary-button-border-color': 'var(--secondary-button-border-color)',
      'secondary-button-hover-border-color': 'var(--secondary-button-hover-border-color)',
      'secondary-button-focus-border-color': 'var(--secondary-button-focus-border-color)',
      'secondary-button-background-color': 'var(--secondary-button-background-color)',
      'secondary-button-hover-background-color': 'var(--secondary-button-hover-background-color)',
      'secondary-button-focus-background-color': 'var(--secondary-button-focus-background-color)',
      'secondary-button-text-on-disabled': 'var(--secondary-button-text-on-disabled)',
      'secondary-button-border-on-disabled': 'var(--secondary-button-border-on-disabled)',
      'secondary-button-background-on-disabled': 'var(--secondary-button-background-on-disabled)',

      // third button colors
      'third-button-text-color': 'var(--third-button-text-color)',
      'third-button-hover-text-color': 'var(--third-button-hover-text-color)',
      'third-button-focus-text-color': 'var(--third-button-focus-text-color)',
      'third-button-border-color': 'var(--third-button-border-color)',
      'third-button-hover-border-color': 'var(--third-button-hover-border-color)',
      'third-button-focus-border-color': 'var(--third-button-focus-border-color)',
      'third-button-background-color': 'var(--third-button-background-color)',
      'third-button-hover-background-color': 'var(--third-button-hover-background-color)',
      'third-button-focus-background-color': 'var(--third-button-focus-background-color)',
      'third-button-text-on-disabled': 'var(--third-button-text-on-disabled)',
      'third-button-border-on-disabled': 'var(--third-button-border-on-disabled)',
      'third-button-background-on-disabled': 'var(--third-button-background-on-disabled)',

      // Dynamic button colors
      'dynamic-button-text-color': 'var(--dynamic-button-text-color)',
      'dynamic-button-hover-text-color': 'var(--dynamic-button-hover-text-color)',
      'dynamic-button-focus-text-color': 'var(--dynamic-button-focus-text-color)',
      'dynamic-button-border-color': 'var(--dynamic-button-border-color)',
      'dynamic-button-hover-border-color': 'var(--dynamic-button-hover-border-color)',
      'dynamic-button-focus-border-color': 'var(--dynamic-button-focus-border-color)',
      'dynamic-button-background-color': 'var(--dynamic-button-background-color)',
      'dynamic-button-hover-background-color': 'var(--dynamic-button-hover-background-color)',
      'dynamic-button-focus-background-color': 'var(--dynamic-button-focus-background-color)',
      'dynamic-button-text-on-disabled': 'var(--dynamic-button-text-on-disabled)',
      'dynamic-button-border-on-disabled': 'var(--dynamic-button-border-on-disabled)',
      'dynamic-button-background-on-disabled': 'var(--dynamic-button-background-on-disabled)',
    },

    columns: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      '3xs': '16rem',
      '2xs': '18rem',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
    },

    spacing: {
      px: '1px',
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      13: '3.25rem',
      14: '3.5rem',
      15: '3.75rem',
      16: '4rem',
      17: '4.25rem',
      18: '4.5rem',
      19: '4.75rem',
      20: '5rem',
      21: '5.25rem',
      22: '5.5rem',
      24: '6rem',
      28: '7rem',
      29: '7.25rem',
      30: '7.5rem',
      32: '8rem',
      35: '8.75rem',
      36: '9rem',
      40: '10rem',
      41: '10.25rem',
      42: '10.5rem',
      44: '11rem',
      45: '11.25rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },

    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      help: 'help',
      'not-allowed': 'not-allowed',
    },

    width: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
      25: '6.25rem',
      26: '6.5rem',
      35: '8.75rem', // 140px
      50: '12.5rem',
      53: '13.25rem',
      55: '13.75rem',
      65: '16.25rem', // 260px
      75: '18.75rem',
      90: '22.5rem', // 360px
      91: '22.75rem',
      92: '23rem',
      95: '23.75rem',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    }),

    height: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
      25: '6.25rem',
      26: '6.5rem',
      50: '12.5rem',
      53: '13.25rem',
      55: '13.75rem',
      65: '16.25rem', // 260px
      75: '18.75rem',
      90: '22.5rem', // 360px
      91: '22.75rem',
      92: '23rem',
      95: '23.75rem',
      120: '30rem', // 480px
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      full: '100%',
      '100dvh': '100dvh',
      screen: '100vh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      'form-element': 'var(--height-form-element)',
    }),

    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      101: '101',
      102: '102',
      103: '103',
      104: '104',
      105: '105',
      999: '999',
      1000: '1000',
      1001: '1001',
    },

    zIndex: {
      auto: 'auto',
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      100: '100',
      999: '999',
      1000: '1000',
      1001: '1001',
      1002: '1002',
      1003: '1003',
      1004: '1004',
      1005: '1005',
    },

    fontFamily: {
      body: 'var(--font-body)',
      heading: 'var(--font-heading)',
      'custom-heading': 'var(--font-custom-heading)',
    },

    fontSize: {
      heading: 'var(--heading-font-size)', // 48px

      // Display headings
      d1: [
        'calc(var(--heading-font-size) + 48px)', // 96px
        {
          lineHeight: '0.8',
          fontWeight: '400',
          letterSpacing: '-1.92px',
        },
      ],
      'd1-desktop': [
        'calc(var(--heading-font-size) + 228px)', // 276px
        {
          letterSpacing: '-5.52px',
        },
      ],
      d2: [
        'calc(var(--heading-font-size) + 20px)', // 68px
        {
          lineHeight: '0.8',
          fontWeight: '400',
          letterSpacing: '-1.28px',
        },
      ],
      'd2-desktop': [
        'calc(var(--heading-font-size) + 89px)', // 137px
        {
          letterSpacing: '-2.74px',
        },
      ],

      // Headings
      h1: [
        'var(--heading-font-size)', // 48px
        {
          lineHeight: 'var(--heading-line-height)',
          fontWeight: 'var(--font-heading-weight)',
        },
      ],
      'h1-desktop': 'calc(var(--heading-font-size) + 22px)', // 70px
      h2: [
        'calc(var(--heading-font-size) - 12px)', // 36px
        {
          lineHeight: 'var(--heading-line-height)',
          fontWeight: 'var(--font-heading-weight)',
        },
      ],
      'h2-desktop': 'calc(var(--heading-font-size) + 8px)', // 56px
      h3: [
        'calc(var(--heading-font-size) - 20px)', // 28px
        {
          lineHeight: 'var(--heading-line-height)',
          fontWeight: 'var(--font-heading-weight)',
        },
      ],
      'h3-desktop': 'calc(var(--heading-font-size) - 12px)', // 36px
      h4: [
        'calc(var(--heading-font-size) - 28px)', // 20px
        {
          lineHeight: 'var(--heading-line-height)',
          fontWeight: 'var(--font-heading-weight)',
        },
      ],
      'h4-desktop': 'calc(var(--heading-font-size) - 20px)', // 28px
      h5: [
        'calc(var(--heading-font-size) - 24px)', // 24px
        {
          lineHeight: '1',
          fontWeight: 'var(--font-heading-weight)',
          letterSpacing: '1.2px',
        },
      ],
      h6: [
        'calc(var(--heading-font-size) - 30px)', // 18px
        {
          lineHeight: '1',
          fontWeight: 'var(--font-heading-weight)',
          letterSpacing: '0.9px',
        },
      ],

      // Body text
      'body-large': [
        'calc(var(--font-size-base) + 10px)', // 28px
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: 'var(--font-body-weight)',
          letterSpacing: '0',
        },
      ],
      'body-medium': [
        'calc(var(--font-size-base) + 6px)', // 24px
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: 'var(--font-body-weight)',
          letterSpacing: '0',
        },
      ],
      'body-small': [
        'var(--font-size-base)', // 18px
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: 'var(--font-body-weight)',
          letterSpacing: '0',
        },
      ],
      'body-xs': [
        'calc(var(--font-size-base) - 2px)', // 16px
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: 'var(--font-body-weight)',
          letterSpacing: '0.16px',
        },
      ],
      'body-xxs': [
        'calc(var(--font-size-base) - 4px)', // 14px
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: 'var(--font-body-weight)',
          letterSpacing: '0.14px',
        },
      ],

      // Captions & Tags
      'caps-s': [
        'calc(var(--font-size-base) - 4px)', // 14px
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: 'var(--font-heading-weight)',
          letterSpacing: '0.7px',
        },
      ],
      'caps-xs': [
        'calc(var(--font-size-base) - 6px)', // 12px
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: 'var(--font-heading-weight)',
          letterSpacing: '0.6px',
        },
      ],

      // Buttons
      'button-large': [
        'calc(var(--font-size-base) + 6px)', // 24px
        {
          lineHeight: '0.85',
          fontWeight: 'var(--font-heading-weight)',
        },
      ],
      'button-small': [
        'calc(var(--font-size-base) + 4px)', // 22px
        {
          lineHeight: '0.85',
          fontWeight: 'var(--font-heading-weight)',
        },
      ],

      // Custom titles
      title: [
        'var(--font-size-base)',
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: '600',
        },
      ],
      'title-desktop': 'calc(var(--font-size-base) + 2px)',

      caption: [
        'calc(var(--font-size-base) - 6px)', // 10px
        {
          letterSpacing: '0.13em',
        },
      ],

      // Product prices
      'product-price-large': [
        'calc(var(--font-size-base) + 2px)',
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: 'var(--font-body-weight)',
        },
      ],
      'product-price-large-desktop': [
        'calc(var(--font-size-base) + 4px)',
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: 'var(--font-body-weight)',
        },
      ],
      'product-price-small': [
        'calc(var(--font-size-base) - 2px)',
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: 'var(--font-body-weight)',
        },
      ],
      'product-price-small-desktop': [
        'var(--font-size-base)',
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: 'var(--font-body-weight)',
        },
      ],

      // Labels
      'base-label': [
        'calc(var(--font-size-base) - 4px)',
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: '600',
        },
      ],
      'base-label-desktop': 'calc(var(--font-size-base) - 2px)',

      // Link elements
      link: [
        'calc(var(--font-size-base) - 2px)',
        {
          lineHeight: 'var(--base-body-line-height)',
          fontWeight: 'var(--font-body-weight)',
        },
      ],
      'link-desktop': 'var(--font-size-base)',
    },

    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      '2xl': '1.5rem',
      '3xl': '3rem',
      full: '100%',
      button: 'var(--button-border-radius)',
      'form-element': 'var(--form-element-border-radius)',
    },

    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      1: '1',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
    },

    boxShadow: {
      none: 'none',
      xs: '0 1px 1px 0 var(--base-body-text)',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.09)',
      md: '0 6px 12px 0 rgba(0, 0, 0, 0.09)',
      lg: '0 8px 16px 0 rgba(0, 0, 0, 0.12)',
      xl: '0 14px 38px rgba(0, 0, 0, 0.06)',
      dropdown: '0 1px 1px 1px #efefef',
      'inset-white': 'inset 0 0 0 1000px rgb(255,255,255)',
    },
  },

  variants: {
    extend: {},
  },

  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/typography'),
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    require('@tailwindcss/forms')({
      strategy: 'class', // only generate classes
    }),
  ],
};
