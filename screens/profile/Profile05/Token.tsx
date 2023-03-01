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
import { Crypto_Types_Enum } from "constants/Type";
import MarketItem from "./MarketItem";

const Token = () => {
  const { width } = useLayout();
  const wItem = (width - 48) / 2;
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      {DATA_ALL_NEW.map((item, i) => (
        <TouchableOpacity key={i} style={styles.touch} activeOpacity={0.7}>
          <Layout>
            <MarketItem item={item} key={i} style={styles.item} />;
          </Layout>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Token;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  touch: {
    marginBottom: 24,
  },
  img: {
    alignSelf: "center",
    marginVertical: 40,
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
const DATA_ALL_NEW = [
  {
    id: 1,
    title: "Bitcoin",
    icon: "bitcoin",
    coin: 0.03223,
    percent: "+2.39%",
    status: Crypto_Types_Enum.Grow,
    price: "$6,456.45",
    exchange: 13.36,
  },
  {
    id: 0,
    title: "ETHEREUM",
    icon: "eth",
    coin: 0.0007247,
    percent: "+11.39%",
    status: Crypto_Types_Enum.Grow,
    price: "$8,682.45",
    exchange: 24.36,
  },
  {
    id: 2,
    title: "Ripple",
    icon: "xrp",
    coin: 0.7247,
    percent: "-1.9%",
    status: Crypto_Types_Enum.Down,
    price: "$3,282.45",
    exchange: 34.36,
  },
  {
    id: 3,
    title: "Tether",
    icon: "tether",
    coin: 0.247,
    percent: "+1.9%",
    status: Crypto_Types_Enum.Grow,
    price: "$1,682.45",
    exchange: 4.36,
  },
  {
    id: 4,
    title: "Littecoin",
    icon: "littecoin",
    coin: 32.247,
    percent: "+2.932%",
    status: Crypto_Types_Enum.Grow,
    price: "$682.45",
    exchange: 14.36,
  },
  {
    id: 5,
    title: "Achain",
    icon: "achain",
    coin: 123.247,
    percent: "-2.932%",
    status: Crypto_Types_Enum.Down,
    price: "$1,682.45",
    exchange: 14.36,
  },
  {
    id: 6,
    title: "Gala",
    icon: "xrp",
    coin: 123.247,
    percent: "-2.932%",
    status: Crypto_Types_Enum.Down,
    price: "$1,682.45",
    exchange: 14.36,
  },
];
