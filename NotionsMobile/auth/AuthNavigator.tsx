import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../auth/Welcome";
import { useTranslation } from "../hooks/useTranslation";
import {
  Home,
  RavelryScarfPatterns,
  CircularNeedlesInventory,
  Components,
  Profile,
  Articles,
  Rentals,
  Rental,
  Settings,
  Register,
  Extras,
  Chat,
  Shopping,
  About,
  Agreement,
  Booking,
  Notifications,
  Privacy,
  Login,
} from "../screens";

const Stack = createStackNavigator();

export default function AuthNavigator({ onLogin }) {
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" options={{ headerShown: false }}>
        {(navProps) => (
          // Pass onLogin to the Welcome screen
          <Welcome {...navProps} onLogin={onLogin} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: t("navigationlogin") }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: t("navigation.home") }}
      />
      <Stack.Screen
        name="RavelryScarfPatterns"
        component={RavelryScarfPatterns}
        options={{ title: t("navigation.ravelry_scarf_patterns") }}
      />
      <Stack.Screen
        name="CircularNeedlesInventory"
        component={CircularNeedlesInventory}
        options={{ title: t("navigation.circular_needles_inventory") }}
      />
      <Stack.Screen
        name="Components"
        component={Components}
        options={{ title: t("navigation.components") }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: t("navigation.profile") }}
      />
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{ title: t("navigation.articles") }}
      />
      <Stack.Screen
        name="Rentals"
        component={Rentals}
        options={{ title: t("navigation.rentals") }}
      />
      <Stack.Screen
        name="Rental"
        component={Rental}
        options={{ title: t("navigation.rental") }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: t("navigation.settings") }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: t("navigation.register") }}
      />
      <Stack.Screen
        name="Extra"
        component={Extras}
        options={{ title: t("navigation.extra") }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ title: t("navigation.chat") }}
      />
      <Stack.Screen
        name="Shopping"
        component={Shopping}
        options={{ title: t("navigation.shopping") }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ title: t("navigation.about") }}
      />
      <Stack.Screen
        name="Agreement"
        component={Agreement}
        options={{ title: t("navigation.agreement") }}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{ title: t("navigation.booking") }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ title: t("navigation.notifications") }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{ title: t("navigation.privacy") }}
      />
    </Stack.Navigator>
  );
}
