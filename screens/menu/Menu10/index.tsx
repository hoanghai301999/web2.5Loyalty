import * as React from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Button,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import { Images } from "assets/images";
import keyExtractor from "utils/keyExtractor";

const Menu10 = React.memo(() => {
  const { goBack } = useNavigation();
  const styles = useStyleSheet(themedStyles);

  const [activeButton, setActiveButton] = React.useState(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={() => {
          return (
            <Button
              accessoryLeft={() => <Icon pack="assets" name="rightArrow" />}
              status="primary"
              style={styles.buttonNav}
              onPress={goBack}
            />
          );
        }}
        // @ts-ignore
        accessoryLeft={<Image source={Images.logo4} style={styles.logo} />}
      />
      <FlatList
        data={DATA}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.content}
        renderItem={({ item, index }) => {
          const isActive = index === activeButton;
          return (
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => {
                setActiveButton(index);
              }}
            >
              <View style={styles.titleView}>
                <Text
                  uppercase
                  status={!isActive ? "basic" : "primary"}
                  style={styles.title}
                >
                  {item.name}
                </Text>
                {item.notification > 0 && (
                  <View style={styles.layoutNoti}>
                    <Text category="headline">
                      {item.notification > 10
                        ? item.notification
                        : `0${item.notification}`}
                    </Text>
                  </View>
                )}
              </View>
              {isActive && <View style={styles.divider} />}
            </TouchableOpacity>
          );
        }}
      />
      <Text style={styles.title} opacity={0.2} marginLeft={40}>
        Logout
      </Text>
      {/* @ts-ignore */}
      <Image source={Images.readingHome} style={styles.book} />
    </Container>
  );
});

export default Menu10;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  logo: {
    width: 48,
    height: 48,
    marginLeft: 24,
  },
  buttonNav: {
    alignSelf: "flex-start",
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    marginVertical: 16,
    justifyContent: "space-between",
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  layoutNoti: {
    backgroundColor: "background-basic-color-4",
    minWidth: 32,
    height: 24,
    borderRadius: 99,
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  divider: {
    width: 40,
    height: 4,
    backgroundColor: "#F0DF67",
  },
  book: {
    position: "absolute",
    right: 0,
    bottom: 32,
    zIndex: -10,
  },
});
const DATA = [
  {
    name: "Onboarding",
    notification: 0,
  },
  {
    name: "Authentication",
    notification: 0,
  },
  {
    name: "Social",
    notification: 9,
  },
  {
    name: "Profiles",
    notification: 0,
  },
  {
    name: "Food Delivery",
    notification: 0,
  },
  {
    name: "Finance",
    notification: 0,
  },
  {
    name: "E-Commerce",
    notification: 0,
  },
  {
    name: "Reading",
    notification: 0,
  },
  {
    name: "Education",
    notification: 0,
  },
];
