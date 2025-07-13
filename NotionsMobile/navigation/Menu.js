import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Linking, StyleSheet } from "react-native";

import { useDrawerStatus } from "@react-navigation/drawer";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import Home from "./../screens/Home";
import Components from "./../screens/Components";
import RavelryScarfPatterns from "./../screens/RavelryScarfPatterns";
import CircularNeedlesInventory from "./../screens/CircularNeedlesInventory";
import Articles from "./../screens/Articles";
import Rentals from "./../screens/Rentals";
import Rental from "./../screens/Rental";
import Profile from "./../screens/Profile";
import Settings from "./../screens/Settings";
import Register from "./../screens/Register";
import Chat from "./../screens/Chat";
import Shopping from "./../screens/Shopping";
import About from "./../screens/About";
import Agreement from "./../screens/Agreement";
import Booking from "./../screens/Booking";
import Notifications from "./../screens/Notifications";
import Privacy from "./../screens/Privacy";
import Extras from "./../screens/Extras";

import Screens from "./Screens";

import Block from "./../components/Block";
import Text from "./../components/Text";
import Switch from "./../components/Switch";
import Button from "./../components/Button";
import Image from "./../components/Image";

import { useData } from "./../hooks/useData";
import { useTheme } from "./../hooks/useTheme";
import { useTranslation } from "./../hooks/useTranslation";

const Drawer = createDrawerNavigator();

/* Drawer menu screens navigation */
const ScreensStack = () => {
  const { colors } = useTheme();
  const isDrawerOpen = useDrawerStatus() === "open";
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{ scale: scale }],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: "hidden",
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}
    >
      <Screens />
    </Animated.View>
  );
};

/* Custom drawer menu */
const DrawerContent = (props) => {
  const { navigation } = props;
  const { isDark, handleIsDark } = useData();
  const { t } = useTranslation();
  const [active, setActive] = useState("Home");
  const { assets, colors, gradients, sizes } = useTheme();

  const labelColor = isDark ? colors.white : colors.text;

  const handleNavigation = useCallback(
    (to) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive]
  );

  const handleWebLink = useCallback((url) => Linking.openURL(url), []);

  // Screen list for Drawer menu
  const screens = [
    { name: t("screens.home"), to: "Home", icon: assets.home },
    {
      name: t("screens.components"),
      to: "Components",
      icon: assets.components,
    },
    {
      name: t("screens.ravelryscarfpatterns"),
      to: "RavelryScarfPatterns",
      icon: assets.ravelryscarfpatterns,
    },
    {
      name: t("screens.circularNeedlesInventory"),
      to: "CircularNeedlesInventory",
      icon: assets.circularNeedlesInventory,
    },
    { name: t("screens.articles"), to: "Articles", icon: assets.document },
    { name: t("screens.rental"), to: "Rentals", icon: assets.rental },
    { name: t("screens.profile"), to: "Profile", icon: assets.profile },
    { name: t("screens.settings"), to: "Settings", icon: assets.settings },
    { name: t("screens.register"), to: "Register", icon: assets.register },
    { name: t("screens.extra"), to: "Extra", icon: assets.extras },
    { name: t("screens.chat"), to: "Chat", icon: assets.chat },
    { name: t("screens.shopping"), to: "Shopping", icon: assets.shopping },
    { name: t("screens.about"), to: "About", icon: assets.about },
    { name: t("screens.agreement"), to: "Agreement", icon: assets.agreement },
    { name: t("screens.booking"), to: "Booking", icon: assets.booking },
    {
      name: t("screens.notifications"),
      to: "Notifications",
      icon: assets.notifications,
    },
    { name: t("screens.privacy"), to: "Privacy", icon: assets.notifications },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{ paddingBottom: sizes.padding }}
    >
      <Block paddingHorizontal={sizes.padding}>
        <Block flex={0} row align="center" marginBottom={sizes.l}>
          <Image
            radius={0}
            width={33}
            height={33}
            color={colors.text}
            source={assets.logo}
            marginRight={sizes.sm}
          />
          <Block>
            <Text size={12} semibold>
              {t("app.name")}
            </Text>
            <Text size={12} semibold>
              {t("app.native")}
            </Text>
          </Block>
        </Block>

        {screens.map((screen, index) => {
          const isActive = active === screen.to;
          return (
            <Button
              row
              justify="flex-start"
              marginBottom={sizes.s}
              key={`menu-screen-${screen.name}-${index}`}
              onPress={() => handleNavigation(screen.to)}
            >
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                width={sizes.md}
                height={sizes.md}
                marginRight={sizes.s}
                gradient={gradients[isActive ? "primary" : "white"]}
              >
                <Image
                  radius={0}
                  width={14}
                  height={14}
                  source={screen.icon}
                  color={colors[isActive ? "white" : "black"]}
                />
              </Block>
              <Text p semibold={isActive} color={labelColor}>
                {screen.name}
              </Text>
            </Button>
          );
        })}

        <Block
          flex={0}
          height={1}
          marginRight={sizes.md}
          marginVertical={sizes.sm}
          gradient={gradients.menu}
        />

        <Text semibold transform="uppercase" opacity={0.5}>
          {t("menu.documentation")}
        </Text>

        <Button
          row
          justify="flex-start"
          marginTop={sizes.sm}
          marginBottom={sizes.s}
          onPress={() =>
            handleWebLink("https://github.com/creativetimofficial")
          }
        >
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}
          >
            <Image
              radius={0}
              width={14}
              height={14}
              color={colors.black}
              source={assets.documentation}
            />
          </Block>
          <Text p color={labelColor}>
            {t("menu.started")}
          </Text>
        </Button>

        <Block row justify="space-between" marginTop={sizes.sm}>
          <Text color={labelColor}>{t("darkMode")}</Text>
          <Switch
            checked={isDark}
            onPress={(checked) => handleIsDark(checked)}
          />
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
};

/* Drawer menu navigation */
export default function Menu() {
  const { isDark } = useData();

  const { gradients } = useTheme();

  return (
    <Block gradient={gradients[isDark ? "dark" : "light"]}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{
          flex: 1,
          width: "60%",
          borderRightWidth: 0,
          backgroundColor: "transparent",
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Components" component={Components} />
        <Drawer.Screen
          name="RavelryScarfPatterns"
          component={RavelryScarfPatterns}
        />
        <Drawer.Screen name="Articles" component={Articles} />
        <Drawer.Screen
          name="CircularNeedlesInventory"
          component={CircularNeedlesInventory}
        />

        <Drawer.Screen name="Rentals" component={Rentals} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="Extra" component={Extras} />
        <Drawer.Screen name="Chat" component={Chat} />
        <Drawer.Screen name="Shopping" component={Shopping} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="Agreement" component={Agreement} />
        <Drawer.Screen name="Booking" component={Booking} />
        <Drawer.Screen name="Notifications" component={Notifications} />
        <Drawer.Screen name="Privacy" component={Privacy} />
      </Drawer.Navigator>
    </Block>
  );
}
