import React, { createContext, useContext, useState } from "react";
import { Dimensions, Platform } from "react-native";
import { THEME as LIGHT_THEME } from "./../constants/light"; // Import light.js theme

const { width, height } = Dimensions.get("window");

// Theme Weights
export const WEIGHTS = {
  text: "normal",
  h1: Platform.OS === "ios" ? "700" : "normal",
  h2: Platform.OS === "ios" ? "700" : "normal",
  h3: Platform.OS === "ios" ? "700" : "normal",
  h4: Platform.OS === "ios" ? "700" : "normal",
  h5: "600",
  p: "normal",

  thin: Platform.OS === "ios" ? "100" : "normal",
  extralight: Platform.OS === "ios" ? "200" : "normal",
  light: Platform.OS === "ios" ? "300" : "normal",
  normal: Platform.OS === "ios" ? "400" : "normal",
  medium: Platform.OS === "ios" ? "500" : "normal",
  semibold: Platform.OS === "ios" ? "600" : "normal",
  bold: Platform.OS === "ios" ? "700" : "normal",
  extrabold: Platform.OS === "ios" ? "800" : "normal",
  black: Platform.OS === "ios" ? "900" : "normal",
};

// Icons
export const ICONS = {
  ravelry: require("./../assets/icons/ravelry.png"),
  apple: require("./../assets/icons/apple.png"),
  google: require("../assets/icons/google.png"),
  facebook: require("../assets/icons/facebook.png"),
  arrow: require("../assets/icons/arrow.png"),
  notification: require("../assets/icons/notification.png"),
};

// Assets (Images & Fonts)
export const ASSETS = {
  OpenSansLight: require("../assets/fonts/OpenSans-Light.ttf"),
  OpenSansRegular: require("../assets/fonts/OpenSans-Regular.ttf"),
  OpenSansSemiBold: require("../assets/fonts/OpenSans-SemiBold.ttf"),
  OpenSansExtraBold: require("../assets/fonts/OpenSans-ExtraBold.ttf"),
  OpenSansBold: require("../assets/fonts/OpenSans-Bold.ttf"),

  logo: require("../assets/images/logo.png"),
  background: require("../assets/images/background.png"),
};

// Fonts
export const FONTS = {
  text: "OpenSans-Regular",
  h1: "OpenSans-Bold",
  h2: "OpenSans-Bold",
  h3: "OpenSans-Bold",
  h4: "OpenSans-Bold",
  h5: "OpenSans-SemiBold",
  p: "OpenSans-Regular",

  thin: "OpenSans-Light",
  extralight: "OpenSans-Light",
  light: "OpenSans-Light",
  normal: "OpenSans-Regular",
  medium: "OpenSans-SemiBold",
  semibold: "OpenSans-SemiBold",
  bold: "OpenSans-Bold",
  extrabold: "OpenSans-ExtraBold",
  black: "OpenSans-ExtraBold",
};

// Line Heights
export const LINE_HEIGHTS = {
  text: 22,
  h1: 60,
  h2: 55,
  h3: 43,
  h4: 33,
  h5: 24,
  p: 22,
};

// Ensure Gradients are Included
export const THEME = {
  ...LIGHT_THEME, // Spread in the light.js theme
  gradients: LIGHT_THEME.gradients, // Explicitly include gradients
  icons: ICONS,
  assets: { ...ICONS, ...ASSETS },
  fonts: FONTS,
  weights: WEIGHTS,
  lines: LINE_HEIGHTS,
  sizes: { width, height, ...LIGHT_THEME.sizes },
};

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEME);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook to Use Theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context.theme;
};
