import * as React from "react";
import { TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Icon,
  Avatar,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Content from "components/Content";
import { Images } from "assets/images";

const Menu04 = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="navigate" />}
        accessoryRight={<Avatar source={Images.avatar} size="40" />}
      />
      <Content contentContainerStyle={styles.content}>
        {DATA.map((item, i) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              key={i}
              style={[styles.button, { backgroundColor: item.color }]}
            >
              <Icon pack="assets" name={item.icon} />
              <Text marginLeft={12}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </Content>
    </Container>
  );
});

export default Menu04;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  button: {
    flexDirection: "row",
    paddingTop: 40,
    paddingBottom: 88,
    marginBottom: -48,
    borderRadius: 16,
    justifyContent: "center",
  },
  content: {
    paddingTop: 16,
  },
});

const DATA = [
  { icon: "onboarding", name: "Onboarding", color: "#205090" },
  { icon: "auth", name: "Authentication", color: "#00C48C" },
  { icon: "social", name: "Social", color: "#0084F4" },
  { icon: "profile", name: "Profiles", color: "#FFCF5C" },
  { icon: "food_delivery", name: "Food Delivery", color: "#FF647C" },
  { icon: "finance", name: "Finance", color: "#FFA26B" },
  { icon: "commerce", name: "E-Commerce", color: "#1F2933" },
];
