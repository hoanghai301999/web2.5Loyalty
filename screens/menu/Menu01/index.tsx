import * as React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Avatar,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Content from "components/Content";
import { Images } from "assets/images";
import  LinearGradient  from 'react-native-linear-gradient'
import keyExtractor from "utils/keyExtractor";

const Menu01 = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNavigation}
        accessoryRight={<NavigationAction />}
        accessoryLeft={<Avatar source={Images.uiLogo} />}
      />
      <FlatList
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={() => (
          <LinearGradient
            colors={["#F0DF67", "#F0DF6720"]}
            style={styles.layout}
            end={{ x: 1, y: 0.5 }}
            start={{ x: 0.24, y: 0 }}
          >
            <Text category="title2" center>
              130+ Screens
            </Text>
            <Text category="subhead" center>
              Mobile UI Templates
            </Text>
          </LinearGradient>
        )}
        data={DATA}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.button}>
              <Text category="headline">{item.title}</Text>
              <Icon
                pack="assets"
                name="arrowRight16"
                style={styles.tintColor}
              />
            </TouchableOpacity>
          );
        }}
      />
    </Container>
  );
});

export default Menu01;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    paddingLeft: 12,
  },
  layout: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  tintColor: {
    tintColor: "text-white-color",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
});
const DATA = [
  { title: "01.Onboarding" },
  { title: "02.Authencation" },
  { title: "03.Socical Media" },
  { title: "04.Profile" },
  { title: "05.Food Delivery" },
  { title: "06.Finance" },
  { title: "07.E-Commerce" },
  { title: "08.Reading" },
  { title: "09.Education" },
  { title: "10.Fitness" },
];
