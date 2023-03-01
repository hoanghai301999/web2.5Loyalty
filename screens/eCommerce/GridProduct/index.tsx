import React, { memo } from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Select,
  IndexPath,
  SelectItem,
  Button,
  Icon,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import { RefreshControl } from "react-native-web-refresh-control";
import { useNavigation , NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "navigation/type";
const GridProduct = memo(() => {
  const { height, width, top, bottom } = useLayout();

  const styles = useStyleSheet(themedStyles);
  const [selectIndex, setSelectIndex] = React.useState<IndexPath | IndexPath[]>(
    new IndexPath(0)
  );
  
  const { navigate, goBack } = useNavigation<
  NavigationProp<RootStackParamList>
>();
  const dataSelect = ["Sort by Price", "Sort by Name", "Sort by Discount"];
  /* @ts-ignore */
  const displayValue = dataSelect[selectIndex.row];
  const wItem = (width - 48) / 2;
  const renderItem = React.useCallback(
    ({ item }) => (
      <TouchableOpacity style={styles.touch} activeOpacity={0.7} onPress={()=>
        navigate("ECommerce",{
          screen:"ProductDetails1" ,
          params: { data: item },
          merge: true,
          })}>
        <Layout
          style={[styles.item, { width: wItem, height: wItem }]}
          level="2"
        >
          <TouchableOpacity>
            <Icon pack="assets" name="heart" style={styles.icon} />
          </TouchableOpacity>
          <Image
            source={item.image}
            /* @ts-ignore */
            style={styles.img}
          />
        </Layout>
        <Text
          children={item.title}
          status="white"
          marginTop={12}
          category="headline"
        />
        <Text
          children={item.price}
          status="snow"
          category="subhead"
          marginTop={4}
        />
      </TouchableOpacity>
    ),
    []
  );
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        title="NFT Marketplace"
        accessoryRight={
          <View style={styles.rightNav}>
            <NavigationAction icon="heart" marginRight={-8} />
            <NavigationAction icon="shopping" />
          </View>
        }
      />
      <View style={styles.viewSelect}>
        <Select
          selectedIndex={selectIndex}
          size="large"
          onSelect={(index) => setSelectIndex(index)}
          status="basic"
          style={styles.select}
          value={displayValue}
        >
          <SelectItem title="Sort by Price" />
          <SelectItem title="Option 1" />
          <SelectItem title="Option 2" />
        </Select>
        <Button
          accessoryRight={<Icon pack="assets" name="filter" />}
          style={styles.filter}
        />
      </View>
      <FlatList
        data={data}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        numColumns={2}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(i, _) => i.id.toString()}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      />
    </Container>
  );
});

export default GridProduct;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNav: {
    paddingHorizontal: 4,
  },
  rightNav: {
    flexDirection: "row",
  },
  viewSelect: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 4,
  },
  icon: {
    tintColor: "text-white-color",
    right: 8,
    top: 10,
    position: "absolute",
  },
  img: {
    alignSelf: "center",
    marginVertical: 40,
    width:120,
    height:120
  },
  contentContainer: {
    justifyContent: "space-between",
    marginLeft: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  select: {
    flex: 1,
    marginRight: 16,
    borderRadius: 0,
  },
  touch: {
    marginBottom: 16,
  },
  filter: {
    marginBottom: 8,
  },
  item: {
    borderRadius: 8,
    marginRight: 16,
  },
});
const data = [
  {
    id: 0,
    image: Images.NFT1,
    title: "Hambergur Voucher",
    discount: "15%",
    expired_date:"13/4/2023",
    price: "123 FLOW"
  },
  {
    id: 1,
    image: Images.NFT2,
    title: "Starbuck Discount",
    discount: "20%",
    expired_date:"13/4/2023",
    price: "28 FLOW",
  },
  {
    id: 2,
    image: Images.NFT3,
    title: "Cocacola Discount",
    discount: "15%",
    expired_date:"13/4/2023",
    price: "45 FLOW",
  },
  {
    id: 3,
    image: Images.NFT4,
    title: "Louis Vuitton NFT",
    discount: "15%",
    expired_date:"13/4/2023",
    price: "55 FLOW",
  },
  {
    id: 4,
    image: Images.NFT5,
    title: "mcdonald's Discount",
    discount: "15%",
    expired_date:"13/4/2023",
    price: "55 FLOW",
    
  },
  {
    id: 5,
    image: Images.NFT6,
    title: "Boba Tea Voucher",
    discount: "15%",
    expired_date:"13/4/2023",
    price: "55 FLOW",
  },
];
