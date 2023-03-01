import React, { memo } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile05 from "screens/profile/Profile05";
import ECommerceHome from "screens/eCommerce/ECommerceHome";
import Category from "screens/eCommerce/Category";
import New from "screens/crypto/News";
import NewDetails from "screens/crypto/NewDetails";
import ScanScreen from "screens/crypto/QRCode";
import { View, Image, TouchableOpacity } from "react-native";
import {
    useTheme,
    StyleService,
    useStyleSheet,
    Icon,
    Layout,
  } from "@ui-kitten/components";
  import useLayout from "hooks/useLayout";
  
  import { Images } from "assets/images";


const Tab = createBottomTabNavigator()
const TabNavigator = memo(() => {
    const styles = useStyleSheet(themedStyles);
    const theme = useTheme();
    const [activeTab, setActiveTab] = React.useState(0);
    return (
        <Tab.Navigator
        screenOptions={{ headerShown: false ,tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: theme["background-basic-color-2"],
        height: 52,borderTopColor: 'transparent'},
        tabBarInactiveTintColor: theme["text-primary-color"],
        tabBarActiveTintColor: theme["text-snow-color"] }}>
            {DATA.map((item, i) => {
                return (
                    <Tab.Screen name={item.name} component={item.component} options={{
                        tabBarLabel: 'Home',
                        tabBarInactiveTintColor: theme["text-primary-color"],
                        tabBarActiveTintColor: theme["text-snow-color"],
                        tabBarIcon: ({ color, size }) => (
                            <TouchableOpacity
                            activeOpacity={0.7}
                            key={i}
                            onPress={() => setActiveTab(i)}
                          >
                            <Icon
                            pack="assets"
                            name={item.icon}
                            style={[
                                {
                                  tintColor:
                                    activeTab === i
                                      ? theme["text-primary-color"]
                                      : theme["text-snow-color"],
                                },
                                styles.icon,
                              ]}
                        />
                         </TouchableOpacity>
                  ),
                }}/>
                )
            })}

        </Tab.Navigator>
    )})
export default TabNavigator;

const themedStyles = StyleService.create({
    container: {
      paddingHorizontal: 32,
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 52,
    },
    icon: {
      width: 20,
      height: 20,
    },
    logo: {
      width: 24,
      height: 24,
    },
  });

  const DATA = [
    { id: 0, icon: "commerce" ,  component : ECommerceHome , name :"Home"},
    { id: 1, icon: "search" ,component : Category ,name :"Category"},
    { id: 2, icon: "camera" ,component : ScanScreen ,name :"QRcode"},
    { id: 3, icon: "fire" ,component : New ,name :"New"},
    { id: 4, icon: "user" ,component : Profile05 ,name :"Profile"},
    
  ];