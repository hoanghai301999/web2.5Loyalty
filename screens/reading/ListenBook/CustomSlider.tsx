import React from "react";
import { View } from "react-native";
import { useTheme, StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import timeConvert from "utils/timeConvert";
import { useProgress } from "react-native-track-player";
import Slider from "@react-native-community/slider";
import { Images } from "assets/images";

interface Props {
  value: number;
  maxValue: number;
  onSlidingComplete?: (value: number | Array<number>) => void;
  onSlidingStart?: (value: number | Array<number>) => void;
}

const CustomSlider = ({
  value,
  maxValue,
  onSlidingComplete,
  onSlidingStart,
}: Props) => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const progress = useProgress();

  return (
    <View style={styles.container}>
      <Slider
        value={value}
        step={1}
        minimumValue={0}
        maximumValue={maxValue}
        minimumTrackTintColor={theme["color-salmon-600"]}
        style={{ width: width - 48 }}
        maximumTrackTintColor={theme["background-basic-color-2"]}
        onSlidingStart={onSlidingStart}
        thumbImage={Images.thumbSlider}
        onSlidingComplete={onSlidingComplete}
      />
      <View style={styles.time}>
        <Text category="caption1" status="white">
          {timeConvert(progress.position)}
        </Text>
        <Text category="caption1" status="white">
          {timeConvert(progress.duration)}
        </Text>
      </View>
    </View>
  );
};

export default CustomSlider;

const themedStyles = StyleService.create({
  container: {
    alignItems: "center",
    marginTop: 24,
  },
  time: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  thumbStyle: {
    width: 12,
    height: 12,
  },
});
