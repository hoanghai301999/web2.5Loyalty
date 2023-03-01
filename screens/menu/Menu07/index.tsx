import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Button,
  Icon,
  Input,
} from "@ui-kitten/components";

import useLayout from "hooks/useLayout";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

const Menu07 = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const Drawer = createDrawerNavigator();
  const { dispatch } = useNavigation();

  const drawerContent = (props: DrawerContentComponentProps) => {
    return (
      <DrawerContentScrollView
        {...props}
        horizontal
        scrollEnabled={false}
        style={[styles.content, { marginBottom: bottom + 8 }]}
      >
        <Layout
          level="4"
          style={{
            ...styles.layoutDrawer,
            width: width - 72,
            marginTop: -top - 8,
          }}
        >
          <Input
            style={{ ...styles.input, marginTop: top + 8 }}
            status='primary'
            accessoryLeft={<Icon pack="assets" name="search" />}
            placeholder="Type something"
          />
          <View>
            {DATA.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={styles.button}
                  onPress={() => {}}
                >
                  <Icon pack="assets" name={item.icon} style={[styles.icon]} />
                  <Text category="title4" marginLeft={16}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Button children="Register Now!" status="primary" />
        </Layout>
        <Layout
          style={{ ...styles.backdrop, marginTop: -top - 24 }}
          level="5"
        />
        <NavigationAction
          style={styles.buttonCloseDrawer}
          onPress={() => {
            dispatch(DrawerActions.closeDrawer());
          }}
        />
      </DrawerContentScrollView>
    );
  };
  const Screen = () => {
    return (
      <Container style={styles.containerScreen}>
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
  };
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

export default Menu07;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  containerDrawer: {
    flex: 1,
    borderBottomRightRadius: 24,
  },
  buttonCloseDrawer: {
    alignSelf: "flex-start",
    marginRight: 24,
  },
  layoutDrawer: {
    flex: 1,
    borderBottomRightRadius: 16,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  backdrop: {
    width: 24,
    opacity: 1,
    borderBottomRightRadius: 16,
    marginLeft: -12,
    marginBottom: 16,
    zIndex: -100,
  },
  button: {
    marginBottom: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: "##F7F8F920",
  },
  icon: {
    width: 24,
    height: 24,
  },
  activeIcon: {
    tintColor: "text-white-color",
  },
  containerScreen: {
    flex: 1,
    backgroundColor: "background-basic-color-3",
  },
  openMenu: {
    marginTop: 80,
    marginHorizontal: 60,
  },
});
const DATA = [
  { icon: "onboarding", name: "Onboarding" },
  { icon: "auth", name: "Authentication" },
  { icon: "social", name: "Social" },
  { icon: "profile", name: "Profiles" },
  { icon: "food_delivery", name: "Food Delivery" },
  { icon: "finance", name: "Finance" },
  { icon: "commerce", name: "E-Commerce" },
];
