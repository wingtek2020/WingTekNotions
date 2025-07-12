import React, { useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer, DefaultTheme, Theme as NavigationTheme } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Menu from "../navigation/Menu";
import AuthNavigator from "../auth/AuthNavigator";
import { useData } from "../hooks/useData";
import { ThemeProvider } from "../hooks/useTheme";
import { TranslationProvider } from "../hooks/useTranslation";

// Keep splash screen visible while loading resources
SplashScreen.preventAutoHideAsync();

const AppNavigation: React.FC = () => {
  const { isDark, theme, setTheme } = useData();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Status bar effect
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setTranslucent(true);
    }
    StatusBar.setBarStyle(isDark ? "light-content" : "dark-content");

    return () => {
      StatusBar.setBarStyle("default");
    };
  }, [isDark]);

  // Check AsyncStorage for login state on mount
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const stored = await AsyncStorage.getItem("isLoggedIn");
        setIsLoggedIn(stored === "true");
      } catch (e) {
        console.error("Login check failed", e);
        setIsLoggedIn(false); // fallback to false
      }
    };
    checkLogin();
  }, []);

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "OpenSans-Light": theme.assets.OpenSansLight,
    "OpenSans-Regular": theme.assets.OpenSansRegular,
    "OpenSans-SemiBold": theme.assets.OpenSansSemiBold,
    "OpenSans-ExtraBold": theme.assets.OpenSansExtraBold,
    "OpenSans-Bold": theme.assets.OpenSansBold,
  });

  // Hide splash screen once fonts loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || isLoggedIn === null) {
    // Show nothing or a loader while fonts or login status is loading
    return null;
  }

  // Navigation theme based on app theme
  const navigationTheme: NavigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      border: "transparent",
      text: String(theme.colors.text),
      card: String(theme.colors.card),
      primary: String(theme.colors.primary),
      notification: String(theme.colors.primary),
      background: String(theme.colors.background),
    },
  };

  // Login handler
  const handleLogin = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem("isLoggedIn", "true");
  };

  // Logout handler
  const handleLogout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.setItem("isLoggedIn", "false");
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <TranslationProvider>
          {isLoggedIn ? <Menu onLogout={handleLogout} /> : <AuthNavigator onLogin={handleLogin} />}
        </TranslationProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default AppNavigation;
