import * as React from "react";
import { Image, FlatList, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Icon,
} from "@ui-kitten/components";

import useLayout from "hooks/useLayout";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import keyExtractor from "utils/keyExtractor";

const Menu06 = React.memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNavigation}
        //@ts-ignore
        accessoryLeft={<Image source={Images.logo4} style={styles.logo} />}
        accessoryRight={
          <NavigationAction
            icon="rightArrow"
            backgroundColor={"#0084F4"}
            size="large"
          />
        }
      />
      <FlatList
        keyExtractor={keyExtractor}
        data={DATA}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: item.color,
                  width: (width - 99) / 2,
                  height: 152,
                },
              ]}
            >
              <Icon pack="assets" name={item.icon} style={styles.icon} />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </Container>
  );
});

export default Menu06;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    marginHorizontal: 24,
  },
  logo: {
    width: 48,
    height: 48,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 24,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: "text-white-color",
  },
  contentContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});

const DATA = [
  { icon: "onboarding", name: "Onboarding", color: "#0084F4" },
  { icon: "auth", name: "Authentication", color: "#00C48C" },
  { icon: "social", name: "Social", color: "#FFA26B" },
  { icon: "profile", name: "Profiles", color: "#FF647C" },
  { icon: "food_delivery", name: "Food Delivery", color: "#FFCF5C" },
  { icon: "finance", name: "Finance", color: "#4B66EA" },
  { icon: "commerce", name: "E-Commerce", color: "#20487D" },
  { icon: "book", name: "Booking", color: "#FFA26B" },
];
