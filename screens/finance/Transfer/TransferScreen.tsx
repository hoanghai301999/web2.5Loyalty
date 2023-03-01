import React, { memo } from "react";
import { View,TouchableOpacity,TextInput,StyleSheet } from "react-native";
import {
  useStyleSheet,
  Avatar,
  TopNavigation,
  Icon,
  Layout,
  StyleService,
  Button,
  useTheme
} from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import Asterisk from "./Asterisk";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import CurrencyText from "components/CurrencyText";
import NavigationAction from "components/NavigationAction";

import { Images } from "assets/images";
import { FinanceStackParamList } from "navigation/type";

const TransferScreen = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();
  const [type, setType] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const { width,bottom } = useLayout();
  const progress = useDerivedValue(() => {
    return type
      ? withTiming(1, { duration: 150 })
      : withTiming(0, { duration: 150 });
  }, [type]);

  const style = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme["color-radical-600"], theme["color-salmon-600"]]
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  const expense = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [1, 0], [0.5, 1]);
    const scale = interpolate(progress.value, [1, 0], [1, 1.1]);

    return {
      opacity: opacity,
      transform: [{ scale: scale }],
    };
  });
  return (
    <Container>
      <TopNavigation
        title="Deposit"

        accessoryLeft={() => <NavigationAction icon="leftArrow" />}
        accessoryRight={() => <NavigationAction />}
      />
      <Content contentContainerStyle={styles.contentContainerStyle}>
      <Animated.View style={[styles.box, { width: width - 48 }, style]}>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setType(false)}
            >
              <Animated.View style={expense}>
                <Text category="headline" status="white">
                  Total Deposit
                </Text>
              </Animated.View>
            </TouchableOpacity>

          </View>
          
          <View style={{ marginTop: 4 }}>
            <CurrencyText category="title3" status="white">
              {value === "" ? 0 : parseInt(value)}
            </CurrencyText>
            <TextInput
              style={[styles.input, { ...StyleSheet.absoluteFillObject }]}
              keyboardType="number-pad"
              selectionColor="transparent"
              onChangeText={setValue}
            />
          </View>
        </Animated.View>


        <Layout level="2" style={styles.card}>
          <View style={styles.row}>
            <Text category="headline">Transfer card</Text>
            <Text category="headline" uppercase>
              Visa
            </Text>
          </View>
          <View style={styles.cardNumber}>
            <Asterisk number={4} />
            <Asterisk number={4} />
            <Asterisk number={4} />
            <Text category="title3">1313</Text>
          </View>
        </Layout>
        <Layout level="2" style={styles.note}>
          <Text category="body" style={styles.text}>
            GLWS Bro
          </Text>
        </Layout>
      </Content>
      <Layout style={[styles.bottom, { paddingBottom: bottom + 16 }]}>
        <Button
          activeOpacity={0.7}
          children="Deposit"
          onPress={goBack}
        />
      </Layout>
    </Container>
  );
});

export default TransferScreen;

const themedStyles = StyleService.create({
  contentContainerStyle: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  avatar: {
    alignSelf: "center",
    borderRadius: 32,
  },
  boxView: {
    marginTop: 54,
  },
  box: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: "color-radical-600",
  },
  iconView: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: -24,
    borderColor: "background-basic-color-1",
    backgroundColor: "color-salmon-100",
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "color-basic-100",
  },
  card: {
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "color-basic-1500",
    marginTop: 24,
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardNumber: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  note: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  text: {
    color: "color-basic-1100",
  },
  input: {
    color: "transparent",
    paddingLeft: 14,
    fontSize: 24,
  },
  bottom: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingTop: 8,
    paddingHorizontal: 24,
  },
});
