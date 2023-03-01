import * as React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Avatar,
  Divider,
} from "@ui-kitten/components";

import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import ButtonDrop from "./ButtonDrop";
import keyExtractor from "utils/keyExtractor";

const Menu02 = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  const [activeIndex, setActiveIndex] = React.useState(0);

  const ref = React.useRef<FlatList>(null);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNavigation}
        accessoryRight={<NavigationAction />}
        accessoryLeft={<Avatar source={Images.uiLogo} />}
      />
      <FlatList
        contentContainerStyle={styles.content}
        data={DATA}
        ref={ref}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setActiveIndex(index);
              }}
            >
              <ButtonDrop
                title={item.title}
                data={item.data}
                style={{ marginTop: index > 0 ? 24 : 0 }}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
      />
    </Container>
  );
});

export default Menu02;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    marginLeft: 16,
  },
  content: {
    backgroundColor: "background-basic-color-4",
    marginHorizontal: 8,
    borderRadius: 16,
    padding: 24,
  },
  divider: {
    backgroundColor: "background-basic-color-5",
    opacity: 0.2,
    marginTop: 24,
  },
});
const DATA = [
  {
    title: "01.Onboarding",
    data: [{ name: "Onboarding 01" }, { name: "Onboarding 02" }],
  },
  {
    title: "02.Authencation",
    data: [
      { name: "Sign In" },
      { name: "Sign Up" },
      { name: "Forgot Password" },
    ],
  },
  {
    title: "03.Socical Media",
    data: [{ name: "New Feed" }, { name: "Post" }, { name: "Messager" }],
  },
  {
    title: "04.Profile",
    data: [
      { name: "Profile 01" },
      { name: "Profile 02" },
      { name: "Profile 03" },
      { name: "Profile 04" },
    ],
  },
  {
    title: "05.Food Delivery",
    data: [
      { name: "Food & Drink" },
      { name: "Food Details" },
      { name: "Restaurant" },
      { name: "My Order" },
    ],
  },
  {
    title: "06.Finance",
    data: [
      { name: "Month Chart" },
      { name: "List Transaction" },
      { name: "Add Transaction" },
      { name: "Categories Transaction" },
    ],
  },
  {
    title: "07.E-Commerce",
    data: [
      { name: "Categories" },
      { name: "Grid Product" },
      { name: "List Product" },
      { name: "Shop - Reviews" },
    ],
  },
  {
    title: "08.Reading",
    data: [{ name: "Audio Book" }, { name: "Reading" }, { name: "List Books" }],
  },
  {
    title: "09.Education",
    data: [
      { name: "My Course" },
      { name: "Course Details" },
      { name: "Payment" },
      { name: "Course Statisic" },
    ],
  },
  {
    title: "10.Fitness",
    data: [
      { name: "Workout List" },
      { name: "Set Plan" },
      { name: "Activity" },
      { name: "Running" },
    ],
  },
];
