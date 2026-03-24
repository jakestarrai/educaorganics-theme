import { extendTailwindMerge } from 'tailwind-merge';

export const defaultButtonStyle = `
                                    inline-flex
                                    items-center
                                    justify-center
                                    box-border
                                    font-body
                                    border
                                    cursor-pointer
                                    rounded-button
                                    appearance-none
                                    focus:outline-dashed
                                    focus:outline-offset-2
                                    disabled:cursor-default
                                    disabled:pointer-events-none
                                    disabled:outline-none `;
export const defaultButtonSizeStyles = {
  sm: 'min-w-[65px] min-h-button-sm py-2 px-5 text-button-small',
  md: 'min-w-[65px] min-h-button-md py-3 px-5 text-button-large',
  lg: 'min-w-[65px] min-h-button-lg py-3 px-5 text-button-large',
  'btn-sm': 'min-w-button-sm min-h-button-sm p-1 text-button-small',
  'btn-md': 'min-w-button-md min-h-button-md p-1 text-button-small',
  'btn-lg': 'min-w-button-lg min-h-button-lg p-1 text-button-small',
};

export const defaultButtonColorStyles = {
  primary: `
  text-primary-button-text-color
  bg-primary-button-background-color
  border-primary-button-border-color
  hover:text-primary-button-hover-text-color
  hover:bg-primary-button-hover-background-color
  hover:border-primary-button-hover-border-color
  focus:text-primary-button-focus-text-color
  focus:bg-primary-button-focus-background-color
  focus:border-primary-button-focus-border-color
  focus:outline-primary-button-focus-border-color
  disabled:text-primary-button-text-on-disabled
  disabled:bg-primary-button-border-on-disabled
  disabled:border-primary-button-background-on-disabled
`,
  secondary: `
  text-secondary-button-text-color
  bg-secondary-button-background-color
  border-secondary-button-border-color
  hover:text-secondary-button-hover-text-color
  hover:bg-secondary-button-hover-background-color
  hover:border-secondary-button-hover-border-color
  focus:text-secondary-button-focus-text-color
  focus:bg-secondary-button-focus-background-color
  focus:border-secondary-button-focus-border-color
  focus:outline-secondary-button-focus-border-color
  disabled:text-primary-button-text-on-disabled
  disabled:bg-primary-button-border-on-disabled
  disabled:border-primary-button-background-on-disabled
`,
};

export const twm = extendTailwindMerge({
  classGroups: {
    size: ['text-button-small', 'text-button-large'],
    color: [
      'text-primary-button-text-color',
      'hover:text-primary-button-hover-text-color',
      'focus:text-primary-button-focus-text-color',
      'disabled:text-primary-button-text-on-disabled',
      'text-secondary-button-text-color',
      'hover:text-secondary-button-hover-text-color',
      'focus:text-secondary-button-focus-text-color',
    ],
  },
  conflictingClassGroups: {
    size: ['color'],
  },
});
