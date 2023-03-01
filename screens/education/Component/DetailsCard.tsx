import React, { memo } from "react";
import { View, ImageRequireSource, ViewStyle } from "react-native";
import { StyleService, useStyleSheet, Avatar } from "@ui-kitten/components";

import Text from "components/Text";
import LinearGradient from "react-native-linear-gradient";
import { BlurView } from "@react-native-community/blur";

interface Props {
  title: string;
  avatar: ImageRequireSource;
  madeBy: string;
  price: number;
  discount?: number;
  style?: ViewStyle;
}

const DetailsCard = memo(
  ({ title, avatar, madeBy, price, discount, style }: Props) => {
    const styles = useStyleSheet(themedStyles);
    return (
      <View style={style}>
        <BlurView
          style={styles.content}
          blurAmount={15}
          blurType="light"
          reducedTransparencyFallbackColor="white"
        >
          <View style={styles.title}>
            <Text category="title3">{title}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.user}>
              <Avatar source={avatar} size={"32"} />
              <Text marginLeft={11} category="headline">
                by {madeBy}
              </Text>
            </View>
            <View style={styles.price}>
              <Text
                category="body"
                lineBreakMode="middle"
                opacity={0.4}
                lineThrough
              >
                ${discount ? price : null}{" "}
              </Text>
              <Text category="title3" status={"primary"}>
                ${discount ? discount : null}
              </Text>
            </View>
          </View>
        </BlurView>
      </View>
    );
  }
);

export default DetailsCard;

const themedStyles = StyleService.create({
  user: {
    flexDirection: "row",
    alignItems: "center",
  },
  linear: {
    marginHorizontal: 24,
    borderRadius: 32,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  content: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    borderRadius: 32,
    marginHorizontal: 24,
  },
  title: {
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderColor: "rgba(206, 208, 222, 1)",
    marginBottom: 8,
  },
});
