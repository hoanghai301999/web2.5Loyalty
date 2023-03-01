import React, { memo } from "react";
import Home from "screens/menu/Home";
import Menu01 from "screens/menu/Menu01";
import Menu02 from "screens/menu/Menu02";
import Menu03 from "screens/menu/Menu03";
import Menu04 from "screens/menu/Menu04";
import Menu05 from "screens/menu/Menu05";
import Menu06 from "screens/menu/Menu06";
import Menu07 from "screens/menu/Menu07";
import Menu08 from "screens/menu/Menu08";
import Menu09 from "screens/menu/Menu09";
import Menu10 from "screens/menu/Menu10";
import createStackNavigator from "./createStackNavigator";
import { MenuStackParamList } from "./type";

const Stack = createStackNavigator<MenuStackParamList>();

const MenuStackNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Menu01" component={Menu01} />
      <Stack.Screen name="Menu02" component={Menu02} />
      <Stack.Screen name="Menu03" component={Menu03} />
      <Stack.Screen name="Menu04" component={Menu04} />
      <Stack.Screen name="Menu05" component={Menu05} />
      <Stack.Screen name="Menu06" component={Menu06} />
      <Stack.Screen name="Menu07" component={Menu07} />
      <Stack.Screen name="Menu08" component={Menu08} />
      <Stack.Screen name="Menu09" component={Menu09} />
      <Stack.Screen name="Menu10" component={Menu10} />
    </Stack.Navigator>
  );
});
export default MenuStackNavigator;
