import * as React from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Icon,
  Avatar,
  Button,
} from "@ui-kitten/components";

import useLayout from "hooks/useLayout";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Content from "components/Content";
import keyExtractor from "utils/keyExtractor";
import ButtonNav from "./ButtonNav";
import { Images } from "assets/images";

const Menu09 = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const ListHeaderComponent = () => {
    return (
      <Layout level="4" style={styles.header}>
        <View style={styles.topHeader}>
          <View style={styles.information}>
            {/* @ts-ignore */}
            <Avatar source={Images.avatar1} size="64" style={styles.avatar} />
            <View>
              <Text category="title3">Myrtle Burns</Text>
              <Text category="subhead" opacity={0.6}>
                Balance: $12,680.99
              </Text>
            </View>
          </View>
          <Icon pack="assets" name="rightChevron" style={styles.chevron} />
        </View>
        <Button
          children={"Become Gold Member"}
          size="medium"
          style={styles.buttonGold}
          accessoryLeft={() => <Icon pack="assets" name="crown" />}
        />
      </Layout>
    );
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNavigation}
        accessoryRight={
          <NavigationAction
            size="medium"
            backgroundColor={theme["background-basic-color-4"]}
          />
        }
      />
      <FlatList
        data={DATA}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.content}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => {
          return <ButtonNav button={item} onPress={() => {}} />;
        }}
      />
    </Container>
  );
});

export default Menu09;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNavigation: {
    paddingRight: 24,
  },
  content: {
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 32,
    borderRadius: 16,
    padding: 16,
  },
  information: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    marginRight: 12,
  },
  chevron: {
    tintColor: "text-white-color",
  },
  buttonGold: {
    marginTop: 8,
    marginLeft: 80,
  },
});
const DATA = [
  {
    icon: "onboarding",
    name: "Onboarding",
    notification: 0,
    backgroundColor: "#0084F4",
  },
  {
    icon: "auth",
    name: "Authentication",
    notification: 0,
    backgroundColor: "#00C48C",
  },
  {
    icon: "social",
    name: "Social",
    notification: 9,
    backgroundColor: "#FFA26B",
  },
  {
    icon: "profile",
    name: "Profiles",
    notification: 0,
    backgroundColor: "#FF647C",
  },
  {
    icon: "food_delivery",
    name: "Food Delivery",
    notification: 0,
    backgroundColor: "#FFCF5C",
  },
  {
    icon: "finance",
    name: "Finance",
    notification: 0,
    backgroundColor: "#4B66EA",
  },
];
