const base = 'flex items-center justify-center focus:outline-none cursor-auto';

const styleOptions = {
  base: {
    rounded: `${base} rounded-3xl`,
    square: `${base} rounded`,
  },
  border: {
    dark: 'box-border border border-primary-500',
    light: 'box-border border border-primary-400',
    blue: 'box-border border border-adminPrimary-400',
    darkBlue: 'box-border border border-primary-500',
    gray: 'box-border border border-adminGray-500',
  },
  color: {
    grayOutline: 'text-adminGray-500',
    blue: 'bg-adminPrimary-400 text-white',
    blueOutline: 'text-adminPrimary-400',
    darkblue: 'bg-primary-500 text-basic-400',
    darkblueOutline: 'bg-basic-400 text-primary-500',
    lightblue: 'bg-primary-50 text-primary-500',
    lightblueOutline: 'text-primary-400',
    lightgray: 'bg-primary-100 text-basic-400',
    white: 'bg-basic-400 text-primary-500',
    whiteOutline: 'text-primary-500',
    whiteSquare: 'bg-basic-400 text-primary-400',
    disabledSquare: 'bg-basic-500 text-disabled-gray',
    plainSquare: '',
  },
  fontSize: {
    base: 'text-14',
    baseBold: 'text-14 font-semibold',
    small: 'text-10 font-light',
    smallBold: 'text-10 font-semibold',
    smaller: 'text-13',
    normal: 'text-12 font-bold',
  },
  height: {
    'px-26': 'h-px-26',
    'px-28': 'h-px-28',
    'px-30': 'h-px-30',
    'px-36': 'h-px-36',
    'px-44': 'h-px-44',
    'px-48': 'h-px-48',
  },
  padding: {
    narrow: 'px-3',
    narrowBold: 'px-5',
    wideBold: 'px-7',
    wider: 'px-4',
    widest: 'px-px-104',
  },
  withShadow: 'shadow-btn',
  disable: 'opacity-30',
};

export default styleOptions;
