import React from "react";
import Home from "./../screens/Home";
import Inspirations from "./../screens/Inspirations";  // import the new screen
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "./../hooks/useTranslation";

import Components from "./../screens/Components";
import Profile from "./../screens/Profile";
import Articles from "./../screens/Articles";
import Rentals from "./../screens/Rentals";
import Rental from "./../screens/Rental";
import Settings from "./../screens/Settings";
import Register from "./../screens/Register";
import Extras from "./../screens/Extras";
import Chat from "./../screens/Chat";
import Shopping from "./../screens/Shopping";
import About from "./../screens/About";
import Agreement from "./../screens/Agreement";
import Booking from "./../screens/Booking";
import Notifications from "./../screens/Notifications";
import Privacy from "./../screens/Privacy";
import RavelryScarfPatterns from "./../screens/RavelryScarfPatterns";
import CircularNeedlesInventory from "./../screens/CircularNeedlesInventory"; // import the new screen


const Stack = createStackNavigator();

export default function Screens() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: t("navigation.home") }}
      />
      <Stack.Screen
        name="Inspirations"
        component={Inspirations}
        options={{ title: t("navigation.inspirations") }} // add the translations key
      />
       <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: t("navigation.profile") }} // add the translations key
      />
    </Stack.Navigator>
  );
}
