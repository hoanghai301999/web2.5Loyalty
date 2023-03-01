import * as React from "react";
import {
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Icon,
} from "@ui-kitten/components";

import useLayout from "hooks/useLayout";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import { Icons } from "assets/icons";

const Menu03 = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { height, width } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <ImageBackground
      source={Images.menu}
      style={{
        width: width,
        height: height,
        backgroundColor: "#F46E86",
        opacity: 0.9,
      }}
    >
      <Container style={styles.container}>
        <TopNavigation
          accessoryLeft={<NavigationAction status="white" />}
          appearance="control"
          accessoryRight={
            <View style={[styles.social, { gap: 20 }]}>
              {Social.map((item, i) => {
                return (
                  //@ts-ignore
                  <Image source={item} key={i} style={styles.socialItem} />
                );
              })}
            </View>
          }
        />
        <ScrollView>
          {DATA.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setActiveIndex(i);
                }}
              >
                <Text
                  category="title3"
                  status={activeIndex === i ? "basic" : "placeholder"}
                  marginBottom={32}
                  marginLeft={40}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Container>
    </ImageBackground>
  );
});

export default Menu03;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "#12100F99",
  },
  social: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialItem: {
    marginHorizontal: 6,
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
const Social = [
  Icons.instagram,
  Icons.facebook_circle,
  Icons.twitter,
  Icons.pinterest,
  Icons.behance,
];
