import React, { memo } from "react";
import { Image, View , TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { Images } from "assets/images";
import Dots from "components/Dots";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useNavigation , NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "navigation/type";

const Header = memo(() => {
  const { navigate, goBack } = useNavigation<
    NavigationProp<RootStackParamList>
  >();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <Button
        children={"Discount 10% first time"}
        size="large"
        style={styles.btnDiscount}
        onPress={()=>navigate("Crypto",{screen:"NewDetails",params: { feed: DATAFeed[0] }})}
      />
      <Layout level="4" style={styles.layout}>
        <View style={styles.leftLayout}>
          <Dots
            data={DATA}
            widthDot={8}
            heightDot={8}
            widthInterpolate={8}
            translationValue={translationX}
            status="white"
            style={styles.dots}
          />
        </View>
        <Animated.ScrollView
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          horizontal
          decelerationRate="fast"
          onScroll={scrollHandler}
          style={{ width: width, zIndex: -10 }}
          contentContainerStyle={{ width: width * 3.9 }}
        >
          {DATA.map((i, _) => {
            return (
              <TouchableOpacity key={_}  activeOpacity={0.7}  onPress={()=>navigate("Crypto",{screen:"NewDetails",params: { feed: DATAFeed[0] }})}>
                <Animated.View
                  style={[{ width: width, flexDirection: "row" }]}
                  key={_}
                >
                  <Text
                    children={"Discount\n10%\nfirst time"}
                    category="title2"
                    marginRight={55}
                    marginLeft={32}
                  />
                  <Animated.Image
                    source={Images.guyRiding}
                    /* @ts-ignore */
                    style={styles.img}
                  />
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </Animated.ScrollView>
      </Layout>
      <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate("Crypto",{screen:"NewDetails",params: { feed: DATAFeed[0] }})}>
      <Image
        source={Images.Content1}
        style={[
          /* @ts-ignore */
          styles.discountImg,
          { width: width - 32, height: height / 7.45 },
        ]}
      />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate("Crypto",{screen:"NewDetails",params: { feed: DATAFeed[1] }})}>
      <Image
        source={Images.Content2}
        style={[
          /* @ts-ignore */
          styles.discountImg,
          { width: width - 32, height: height / 7.45 },
        ]}
      />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate("Crypto",{screen:"NewDetails",params: { feed: DATAFeed[2] }})}>
      <Image
        source={Images.Content3}
        style={[
          /* @ts-ignore */
          styles.discountImg,
          { width: width - 32, height: height / 7.45 },
        ]}
      />
      </TouchableOpacity>

    </View>
  );
});

export default Header;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 4,
  },
  btnDiscount: {
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 4,
  },
  layout: {
    flexDirection: "row",
    paddingVertical: 20,
    borderRadius: 8,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  leftLayout: {
    justifyContent: "space-between",
    marginBottom: 32,
    marginTop: 12,
  },
  discountImg: {
    borderRadius: 4,
    marginVertical: 8,
  },
  dots: {
    position: "absolute",
    bottom: 0,
    left: 32,
    zIndex: 10,
  },
  img: {
    alignSelf: "flex-start",
  },
});
const DATA = [
  {
    id: 0,
    image: Images.Content1,
  },
  {
    id: 1,
    image: Images.Content2,
  },
  {
    id: 2,
    image: Images.Content3,
  },
  {
    id: 3,
    image: Images.guyRiding,
  },
];
const DATAFeed = [
  {
    id: 0,
    title: "Get 50% off your next drink and support local farmers with Starbucks",
    date: "3 days ago",
    coin: "Starbucks",
    icon: "littecoin",
    content: "Enjoy a delicious cup of coffee from Starbucks and save 50% on your purchase while supporting local farmers. Starbucks sources its coffee from over 30 countries, and the company is committed to ethical sourcing and environmental stewardship. By buying from Starbucks, you can help support coffee farmers in developing countries and promote sustainable practices.",
    image: Images.Content1,
  },
  {
    id: 1,
    title: "Donate now and make a difference in someone's life",
    date: "3 days ago",
    coin: "Charity",
    content :"Make a difference in someone's life today by donating to a charity of your choice. Whether you want to support children's education, medical research, or environmental conservation, there are countless charities that can benefit from your help. By making a donation, you can help make a positive impact on the world and contribute to a brighter future for all.",
    icon: "littecoin",
    image: Images.Content2,
  },
  {
    id: 2,
    title: "Enjoy 20% off your order from Pizza Hut",
    date: "3 days ago",
    coin: "Pizza Hut",
    content:"Craving a delicious pizza? Look no further than Pizza Hut! With over 18,000 locations worldwide, Pizza Hut is one of the largest pizza chains in the world. And for a limited time, you can enjoy 20% off your order from Pizza Hut. Whether you prefer classic pepperoni or something more adventurous, Pizza Hut has a pizza for everyone.",
    icon: "littecoin",
    image: Images.Content3,
  },
  {
    id: 3,
    title: "Save big on luxury fashion with Gucci",
    date: "3 days ago",
    coin: "Gucci",
    content:"Looking for high-end fashion without breaking the bank? Look no further than Gucci! This luxury fashion brand offers a wide range of clothing, shoes, accessories, and more, all crafted from the finest materials and designed to last. And now, you can save big on your next purchase from Gucci. With discounts up to 20% off, it's the perfect time to upgrade your wardrobe.",
    icon: "littecoin",
    image: Images.collection3,
  },
];