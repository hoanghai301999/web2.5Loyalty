import * as React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Button,
  Icon,
  Divider,
} from "@ui-kitten/components";

import useLayout from "hooks/useLayout";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import DrawerTab from "./DrawTab";
import { Images } from "assets/images";

const Menu08 = React.memo(() => {
  const theme = useTheme();
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const Drawer = createDrawerNavigator();
  const { dispatch } = useNavigation();
  const [activeButton, setActiveButton] = React.useState(1);
  const renderContent = () => {
    switch (activeButton) {
      case 0:
        return <DrawerTab data={DATA_OPTION_2} />;
      case 1:
        return <DrawerTab data={DATA_OPTION_1} />;
      case 2:
        return <DrawerTab data={DATA_OPTION_2} />;
      case 3:
        return <DrawerTab data={DATA_OPTION_1} />;
      case 4:
        return <DrawerTab data={DATA_OPTION_2} />;
      case 5:
        return <DrawerTab data={DATA_OPTION_2} />;
      default:
        return <></>;
    }
  };
  const drawerContent = (props: DrawerContentComponentProps) => {
    return (
      <DrawerContentScrollView
        {...props}
        horizontal
        scrollEnabled={false}
        style={styles.content}
      >
        <Layout
          level="4"
          style={{
            ...styles.layoutDrawer,
            width: width - 64,
          }}
        >
          <View>
            <View>
              {DATA.map((item, i) => {
                const isActive = activeButton === i;
                return (
                  <TouchableOpacity
                    key={i}
                    style={styles.button}
                    onPress={() => {
                      setActiveButton(i);
                    }}
                  >
                    <View style={styles.layoutIcon}>
                      <Layout
                        style={{
                          backgroundColor: "#00C48C",
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          borderRadius: 16,
                          opacity: isActive ? 1 : 0,
                        }}
                      />
                      <Icon
                        pack="assets"
                        name={item.icon}
                        style={[styles.icon, isActive && styles.activeIcon]}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Divider style={styles.divider} />
            <View>
              <Icon pack="assets" name="fb" style={styles.socialIcon} />
              <Icon pack="assets" name="gg" style={styles.socialIcon} />
              <Icon
                pack="assets"
                name="twitter_large"
                style={styles.socialIcon}
              />
              <Icon
                pack="assets"
                name="instagram_large"
                style={styles.socialIcon}
              />
            </View>
          </View>
          <View style={{ width: 247 * (width / 375), height: "100%", flex: 1 }}>
            {renderContent()}
            <Image source={Images.hand} style={styles.hand} />
          </View>
        </Layout>
        <Button
          accessoryLeft={() => (
            <Icon
              pack="assets"
              name="rightArrow"
              style={[styles.activeIcon, styles.icon]}
            />
          )}
          status="primary"
          style={styles.buttonCloseDrawer}
          onPress={() => {
            dispatch(DrawerActions.closeDrawer());
          }}
        />
      </DrawerContentScrollView>
    );
  };
  const Screen = () => (
    <Container style={styles.container}>
      <TopNavigation
        appearance="control"
        accessoryLeft={
          <NavigationAction
            backgroundColor={theme["background-basic-color-1"]}
            style={{ borderRadius: 99 }}
          />
        }
      />
      <Button
        style={styles.openMenu}
        children={"Open Menu"}
        onPress={() => {
          dispatch(DrawerActions.openDrawer());
        }}
      />
    </Container>
  );
  return (
    <Drawer.Navigator
      drawerContent={drawerContent}
      screenOptions={{
        overlayColor: "transparent",
        headerShown: false,
        drawerType: "front",
        drawerStyle: {
          width: width,
          backgroundColor: "transparent",
        },
      }}
    >
      <Drawer.Screen name="Screen" component={Screen} />
    </Drawer.Navigator>
  );
});

export default Menu08;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  openMenu: {
    marginTop: 80,
    marginHorizontal: 60,
  },
  layoutDrawer: {
    flex: 1,
    paddingBottom: 32,
    paddingTop: 24,
    flexDirection: "row",
  },
  content: {
    flexGrow: 1,
    backgroundColor: "background-basic-color-3",
  },
  containerDrawer: {
    flex: 1,
  },
  buttonCloseDrawer: {
    alignSelf: "flex-start",
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  layoutIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  activeIcon: {
    // tintColor: "text-white-color",
  },
  containerScreen: {
    flex: 1,
    backgroundColor: "background-button-color-6",
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 24,
    marginVertical: 12,
    tintColor: "text-white-color",
  },
  button: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  divider: {
    marginVertical: 28,
    marginHorizontal: 12,
    backgroundColor: "text-white-color",
    opacity: 0.2,
  },
  hand: {
    alignSelf: "center",
  },
});
const DATA = [
  { icon: "onboarding", name: "Onboarding" },
  { icon: "auth", name: "Authentication" },
  { icon: "social", name: "Social" },
  { icon: "profile", name: "Profiles" },
  { icon: "food_delivery", name: "Food Delivery" },
  { icon: "finance", name: "Finance" },
];
const DATA_OPTION_1 = [
  { title: "Walkthroughs" },
  { title: "Sign In & Sign Up" },
  { title: "Navigation" },
  { title: "Profile" },
  { title: "Socials" },
  { title: "Multimedia" },
  { title: "Ecommerce" },
  { title: "Statics" },
];
const DATA_OPTION_2 = [
  { title: "Splash" },
  { title: "Intro" },
  { title: "Message" },
  { title: "Home Page" },
  { title: "Settings" },
];
