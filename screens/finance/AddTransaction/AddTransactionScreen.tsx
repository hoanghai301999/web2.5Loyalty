import React, { memo } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme, TopNavigation, Button, Icon , Input } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import UserService from "../../../services/user.service";
import AuthService from "../../../services/auth.services";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import InputSelect from "./InputSelect";
import Content from "components/Content";
import Container from "components/Container";
import CurrencyText from "components/CurrencyText";
import NavigationAction from "components/NavigationAction";

import { FinanceStackParamList } from "navigation/type";

const AddTransactionScreen = memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();
  const { width, bottom } = useLayout();

  const [type, setType] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
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
  const createTransaction = async () => {
    const user = await AuthService.getCurrentUser();
    const res = await UserService.sendTransaction(user.address,address,value);
    setValue("");
    setAddress("");
    alert("Send successful");
    goBack();
  }

  const expense = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [1, 0], [0.5, 1]);
    const scale = interpolate(progress.value, [1, 0], [1, 1.1]);

    return {
      opacity: opacity,
      transform: [{ scale: scale }],
    };
  });

  const income = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1], [0.5, 1]);
    const scale = interpolate(progress.value, [0, 1], [1, 1.1]);

    return {
      opacity: opacity,
      transform: [{ scale: scale }],
    };
  });

  return (
    <Container>
      <TopNavigation
        title="Add Transaction"
        accessoryLeft={<NavigationAction icon="leftArrow" />}
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
                  Send
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

        <Input
          style={styles.inputAddress}
          placeholder="Receive Address"
          onChangeText={setAddress}
          status="primary"
        />
        
      </Content>
      <Button
        children="Send"
        style={[styles.button, { bottom: bottom + 16 }]}
        accessoryRight={<Icon pack="assets" name="rightArrow" />}
        onPress={()=>{createTransaction()}}
      />
    </Container>
  );
});

export default AddTransactionScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  box: {
    padding: 16,
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
  },
  input: {
    color: "transparent",
    paddingLeft: 14,
    fontSize: 24,
  },
  inputAddress: {
    marginTop: 40,
    marginBottom: 24,
  },
  shape: {
    height: 101.6,
    marginTop: 32,
  },
  button: {
    position: "absolute",
    right: 24,
    left: 190,
  },
  dash: {
    height: 89,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 12,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
