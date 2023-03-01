import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";
import { useNavigation , NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "navigation/type";

const NFT = () => {
  const { width } = useLayout();
  const wItem = (width - 48) / 2;
  const styles = useStyleSheet(themedStyles);
  const { navigate, goBack } = useNavigation<
  NavigationProp<RootStackParamList>
>();
  return (
    <View style={styles.container}>
      {DATA_Page.map((i, _) => (
        <TouchableOpacity key={_} style={styles.touch} activeOpacity={0.7} onPress={()=>
          navigate("ECommerce",{
            screen:"ProductDetails" ,
            params: { data: i },
            merge: true,
            })}>
          <Layout style={[styles.item, { width: wItem, height: wItem }]}>
            <TouchableOpacity>
              <Icon pack="assets" name="heart" style={styles.icon} />
            </TouchableOpacity>
            <Image
              source={i.image}
              /* @ts-ignore */
              style={styles.img}
            />
          </Layout>
          <Text children={i.title} marginTop={12} />
          {/* <Text children={i.price} /> */}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NFT;

const themedStyles = StyleService.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    flex: 1,
    marginTop: 16,
  },
  touch: {
    marginBottom: 24,
  },
  img: {
    alignSelf: "center",
    marginVertical: 40,
    width:140,
    height:120
  },
  icon: {
    tintColor: "text-white-color",
    right: 8,
    top: 10,
    position: "absolute",
  },
  item: {
    borderRadius: 8,
  },
});
const DATA_Page = [
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
