import React, { memo, useCallback ,useEffect,useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Icon,
  Layout,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";

import Content from "components/Content";
import NewItem, { NewProps } from "./NewItem";
import { isEmpty } from "lodash";
import AnimatedAppearance from "components/AnimatedAppearance";
import Text from "components/Text";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";
import LitterNew from "../Component/LitterNew";
import { useNavigation, NavigationProp ,useRoute} from "@react-navigation/native";
import { RootStackParamList } from "navigation/type";

interface Props {
  data: NewProps[];
}

const Trending = memo(({ data }: Props) => {
  const route = useRoute();
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataFeed, setDataFeed] = useState(null);
  const { navigate, goBack } = useNavigation<
    NavigationProp<RootStackParamList>
  >();
  useEffect(() => {
    if (route.params) {
      setDataFeed(route.params.feed);
      console.log(route.params.feed)
    }
  }, [route.params]);
  const onPress = React.useCallback((i) => {
    setSelectedIndex(i);
  }, []);
  const RenderPage = useCallback(() => {
    return (
      <View>
        {DATA_ETH.map((item, i) => {
          return <LitterNew item={item} key={i} />;
        })}
      </View>
    );
  }, []);
  return (
    <AnimatedAppearance>
      <View style={styles.container}>
        <Content contentContainerStyle={styles.content} horizontal>
          {isEmpty(data)
            ? null
            : data.map((item, i) => {
                return (
                  <NewItem item={item} key={i} onPress={() => onPress(i)} />
                );
              })}
        </Content>
        <View style={styles.title}>
          <View style={styles.coin}>
            <Layout level={"5"} style={styles.icon}>
              <Icon pack="assets" name={data[selectedIndex].icon} style={{}} />
            </Layout>
            <Text category="headline" marginLeft={8}>
              {data[selectedIndex].coin}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.54}>
            <Text category="subhead" status={"primary"}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <RenderPage />
      </View>
    </AnimatedAppearance>
  );
});

export default Trending;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: "row",
    paddingLeft: 24,
    marginBottom: 32,
  },
  coin: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
});
const DATA_ETH = [
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
