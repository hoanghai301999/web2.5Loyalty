import React, { memo } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  ViewPager,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import { Images } from "assets/images";
import keyExtractor from "utils/keyExtractor";
import CryptoTabBar from "../Component/CryptoTabBar";
import BottomTab from "../Component/BottomTab";
import Trending from "./Trending";

const News = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeTab, setActiveTab] = React.useState(0);
  const ListHeader = React.useCallback(() => {
    return <></>;
  }, []);

  const renderItem = React.useCallback(() => {
    return (
      <>
        <CryptoTabBar
          tabs={["Trending", "Recent", "Popular"]}
          selectedIndex={activeTab}
          onChange={setActiveTab}
          style={styles.tabBar}
        />
      </>
    );
  }, [activeTab, setActiveTab]);
  const ListFooterComponent = React.useCallback(() => {
    return (
      <>
        <ViewPager
          selectedIndex={activeTab}
          onSelect={setActiveTab}
          swipeEnabled={false}
          shouldLoadComponent={(i) => i === activeTab}
        >
          <Trending data={DATA} />
          <Trending data={DATA} />
          <Trending data={DATA} />
        </ViewPager>
      </>
    );
  }, [activeTab]);
  return (
    <Container style={styles.container} useSafeArea={false}>
      <Layout level={"2"} style={[styles.header, { paddingTop: top }]}>

        <Text category="title2" marginBottom={8}>
          Feed
        </Text>
      </Layout>
      <FlatList
        data={[1]}
        renderItem={renderItem}
        stickyHeaderIndices={[1]}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ListFooterComponent}
      />

    </Container>
  );
});

export default News;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 16,
  },
  content: {},
  tabBar: {
    marginTop: 24,
    marginBottom: 16,
    marginHorizontal: 24,
  },
});
const DATA = [
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
