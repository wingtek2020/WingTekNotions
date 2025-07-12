import { THEME as commonTheme } from './theme';

export const COLORS = {
  text: '#252F40',
  primary: '#CB0C9F',
  secondary: '#627594',
  tertiary: '#E8AE4C',

  black: '#252F40',
  white: '#FFFFFF',

  dark: '#252F40',
  light: '#E9ECEF',

  gray: '#A7A8AE',

  danger: '#EA0606',
  warning: '#FFC107',
  success: '#82D616',
  info: '#17C1E8',

  card: '#FFFFFF',
  background: '#E9ECEF',

  shadow: '#000000',
  overlay: 'rgba(0,0,0,0.3)',

  focus: '#E293D3',
  input: '#252F40',

  switchOn: '#3A416F',
  switchOff: '#E9ECEF',

  checkbox: ['#3A416F', '#141727'],
  checkboxIcon: '#FFFFFF',

  facebook: '#3B5998',
  twitter: '#55ACEE',
  dribbble: '#EA4C89',

  icon: '#8392AB',

  blurTint: 'light',

  link: '#CB0C9F',
};

export const GRADIENTS = {
  primary: ['#FF0080', '#7928CA'],
  secondary: ['#A8B8D8', '#627594'],
  info: ['#21D4FD', '#2152FF'],
  success: ['#98EC2D', '#17AD37'],
  warning: ['#FBCF33', '#F53939'],
  danger: ['#FF667C', '#EA0606'],

  light: ['#EBEFF4', '#CED4DA'],
  dark: ['#3A416F', '#141727'],

  white: [COLORS.white, '#EBEFF4'],
  black: [COLORS.black, '#141727'],

  divider: ['rgba(255,255,255,0.3)', 'rgba(102, 116, 142, 0.6)'],
  menu: [
    'rgba(255, 255, 255, 0.2)',
    'rgba(112, 125, 149, 0.5)',
    'rgba(255, 255, 255, 0.2)',
  ],
};

export const SIZES = {
  base: 8,
  text: 14,
  radius: 4,
  padding: 20,

  h1: 44,
  h2: 40,
  h3: 32,
  h4: 24,
  h5: 18,
  p: 16,

  buttonBorder: 1,
  buttonRadius: 8,
  socialSize: 64,
  socialRadius: 16,
  socialIconSize: 26,

  shadowOffsetWidth: 0,
  shadowOffsetHeight: 7,
  shadowOpacity: 0.07,
  shadowRadius: 4,
  elevation: 2,

  inputHeight: 46,
  inputBorder: 1,
  inputRadius: 8,
  inputPadding: 12,

  cardRadius: 16,
  cardPadding: 10,

  imageRadius: 14,
  avatarSize: 32,
  avatarRadius: 8,

  switchWidth: 50,
  switchHeight: 24,
  switchThumb: 20,

  checkboxWidth: 18,
  checkboxHeight: 18,
  checkboxRadius: 5,
  checkboxIconWidth: 10,
  checkboxIconHeight: 8,

  linkSize: 12,
  multiplier: 2,
};

export const SPACING = {
  xs: SIZES.base * 0.5,
  s: SIZES.base * 1,
  sm: SIZES.base * 2,
  m: SIZES.base * 3,
  md: SIZES.base * 4,
  l: SIZES.base * 5,
  xl: SIZES.base * 6,
  xxl: SIZES.base * 7,
};

export const THEME = {
  ...commonTheme,
  colors: COLORS,
  gradients: GRADIENTS,
  sizes: { ...SIZES, ...commonTheme.sizes, ...SPACING },
};
