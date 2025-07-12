import { THEME as commonTheme } from './theme';

export const COLORS = {
  // default text color
  text: '#FFFFFF',

  // base colors
  primary: '#CB0C9F',
  secondary: '#627594',
  tertiary: '#E8AE4C',

  // non-colors
  black: '#252F40',
  white: '#FFFFFF',

  dark: '#252F40',
  light: '#E9ECEF',

  // gray variations
  gray: '#A7A8AE',

  // colors variations
  danger: '#EA0606',
  warning: '#FFC107',
  success: '#82D616',
  info: '#17C1E8',

  // UI colors for navigation & card
  card: '#292C3A',
  background: '#1B1D22',

  // UI color for shadow
  shadow: '#627594',
  overlay: 'rgba(0,0,0,0.3)',

  // UI color for input borderColor on focus
  focus: '#E293D3',
  input: '#FFFFFF',

  // UI color for switch checked/active
  switchOn: '#CB0C9F',
  switchOff: '#181A1F',

  // UI color for checkbox icon checked/active
  checkbox: ['#3A416F', '#141727'],
  checkboxIcon: '#FFFFFF',

  // social colors
  facebook: '#3B5998',
  twitter: '#55ACEE',
  dribbble: '#EA4C89',

  // icon tint color
  icon: '#FFFFFF',

  // blur tint color
  blurTint: 'dark',

  // product link color
  link: '#FFFFFF',
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

  divider: ['rgba(255,255,255,0)', 'rgba(102, 116, 142, 0.6)'],
  menu: [
    'rgba(255, 255, 255, 0.0)',
    'rgba(255, 255, 255, 0.5)',
    'rgba(255, 255, 255, 0.0)',
  ],
};

export const SIZES = {
  // global sizes
  base: 8,
  text: 14,
  radius: 4,
  padding: 20,

  // font sizes
  h1: 44,
  h2: 40,
  h3: 32,
  h4: 24,
  h5: 18,
  p: 16,

  // button sizes
  buttonBorder: 1,
  buttonRadius: 8,
  socialSize: 64,
  socialRadius: 16,
  socialIconSize: 26,

  // button shadow
  shadowOffsetWidth: 0,
  shadowOffsetHeight: 7,
  shadowOpacity: 0.07,
  shadowRadius: 4,
  elevation: 2,

  // input sizes
  inputHeight: 46,
  inputBorder: 1,
  inputRadius: 8,
  inputPadding: 12,

  // card sizes
  cardRadius: 16,
  cardPadding: 10,

  // image sizes
  imageRadius: 14,
  avatarSize: 32,
  avatarRadius: 8,

  // switch sizes
  switchWidth: 50,
  switchHeight: 24,
  switchThumb: 20,

  // checkbox sizes
  checkboxWidth: 18,
  checkboxHeight: 18,
  checkboxRadius: 5,
  checkboxIconWidth: 10,
  checkboxIconHeight: 8,

  // product link size
  linkSize: 12,

  // font size multiplier
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
