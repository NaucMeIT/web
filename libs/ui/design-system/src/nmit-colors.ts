export const colors = {
  background: {
    static: {
      primary: 'var(--background-static-primary-default)',
    },
    interactive: {
      secondary: {
        DEFAULT: 'var(--background-interactive-secondary-default)',
        hover: 'var(--background-interactive-secondary-hover)',
      },
      tertiary: {
        DEFAULT: 'var(--background-interactive-tertiary-default)',
        hover: 'var(--background-interactive-tertiary-hover)',
      },
    },
  },
  button: {
    interactive: {
      primary: {
        DEFAULT: 'var(--button-interactive-primary-default)',
        hover: 'var(--button-interactive-primary-hover)',
        disabled: 'var(--button-interactive-primary-disabled)',
      },
      secondary: {
        DEFAULT: 'var(--button-interactive-secondary-default)',
        hover: 'var(--button-interactive-secondary-hover)',
        disabled: 'var(--button-interactive-secondary-disabled)',
      },
      alert: {
        DEFAULT: 'var(--button-interactive-alert-default)',
        hover: 'var(--button-interactive-alert-hover)',
      },
    },
  },
  text: {
    static: {
      primary: {
        DEFAULT: 'var(--text-static-primary-default)',
        alert: 'var(--text-static-primary-alert)',
        success: 'var(--text-static-primary-success)',
      },
      secondary: {
        DEFAULT: 'var(--text-static-secondary-default)',
      },
      tertiary: {
        DEFAULT: 'var(--text-static-tertiary-default)',
      },
      link: 'var(--text-static-link)',
      inlinecode: 'var(--text-static-inlinecode)',
    },
  },
}
