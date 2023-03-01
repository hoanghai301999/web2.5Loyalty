import * as React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { Images } from "assets/images";
import Text from "components/Text";
import useLayout from "hooks/useLayout";
interface IDrawerTabProps {
  data: { title: string }[];
}

const DrawerTab = React.memo(({ data }: IDrawerTabProps) => {
  const styles = useStyleSheet(themedStyles);
  const { width, height } = useLayout();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {data.map((item, i) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {}}
              key={i}
              style={styles.button}
            >
              <Text category="title4" status={"white"}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Image
        source={Images.menu.menu10}
        style={{
          width: 236 * (width / 375),
          height: 182 * (height / 812),
        }}
      />
    </View>
  );
});

export default DrawerTab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    borderLeftWidth: 0.6,
    borderColor: "background-basic-color-2",
    justifyContent: "space-between",
  },
  button: {
    paddingRight: 16,
    paddingVertical: 16,
    flexDirection: "row",
    marginBottom: 12,
    borderRadius: 16,
    justifyContent: "space-between",
  },
  content: {
    paddingHorizontal: 24,
  },
});
