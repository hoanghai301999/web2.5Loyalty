import * as React from "react";
import { View, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import {
  Layout,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";
import useToggle from "hooks/useToggle";

interface DropProps {
  name: string;
}

interface ButtonDropProps {
  title: string;
  data?: DropProps[];
  style?: StyleProp<ViewStyle>;
}

const ButtonDrop = React.memo(({ data, title, style }: ButtonDropProps) => {
  const styles = useStyleSheet(themedStyles);
  const [isOpen, toggle] = useToggle(false);

  const _onToggle = React.useCallback(() => {
    if (data && data.length > 0) {
      toggle();
    } else {
    }
  }, [data]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={_onToggle}
        activeOpacity={0.7}
        style={[styles.button]}
      >
        <Text category="title4">{title}</Text>
        <Icon
          pack="assets"
          name="arrowRight16"
          style={[styles.icon, isOpen && styles.tranform]}
        />
      </TouchableOpacity>
      {isOpen && data && (
        <Layout style={styles.layout} level="4">
          {data.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.button,
                  i < data.length - 1 && { marginBottom: 16 },
                ]}
              >
                <Text category="headline">{item.name}</Text>
                <Icon pack="assets" name="arrowRight16" style={styles.icon} />
              </TouchableOpacity>
            );
          })}
        </Layout>
      )}
    </View>
  );
});

export default ButtonDrop;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  layout: {
    backgroundColor: "#00000050",
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  icon: {
    tintColor: "text-white-color",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tranform: {
    transform: [{ rotate: "90deg" }],
  },
});
