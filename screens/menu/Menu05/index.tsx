import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  Layout,
  StyleService,
  useStyleSheet,
  TopNavigation,
  Divider,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Content from "components/Content";
import { Images } from "assets/images";

const Menu05 = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <Content contentContainerStyle={styles.content}>
        {/* @ts-ignore */}
        <Image source={Images.logo4} style={styles.logo} />
        <Layout level="4" style={styles.layout}>
          {DATA.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <TouchableOpacity
                key={i}
                style={styles.button}
                onPress={() => {
                  setActiveIndex(i);
                }}
                activeOpacity={0.7}
              >
                {isActive && <Divider style={styles.divider} />}
                <Text
                  center
                  marginHorizontal={32}
                  status={isActive ? "basic" : "placeholder"}
                >
                  {item.title}
                </Text>
                {isActive && <Divider style={styles.divider} />}
              </TouchableOpacity>
            );
          })}
        </Layout>
        <NavigationAction
          icon="upArrow"
          backgroundColor={"#F0DF67"}
          status="blue"
          style={styles.navigate}
        />
      </Content>
    </Container>
  );
});

export default Menu05;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    marginHorizontal: 40,
  },
  layout: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 40,
    marginBottom: -24,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: "color-basic-100",
    borderRadius: 99,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  logo: {
    marginBottom: -24,
    zIndex: 100,
    width: 48,
    height: 48,
    alignSelf: "center",
  },
  navigate: {
    alignSelf: "center",
  },
});
const DATA = [
  { title: "Onboarding" },
  { title: "Authencation" },
  { title: "Socical Media" },
  { title: "Profile" },
  { title: "Food Delivery" },
  { title: "Finance" },
  { title: "E-Commerce" },
  { title: "Reading" },
  { title: "Education" },
  { title: "Fitness" },
];
