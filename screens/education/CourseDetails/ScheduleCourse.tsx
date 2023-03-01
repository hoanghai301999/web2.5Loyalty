import React, { memo } from "react";
import { StyleSheet, useWindowDimensions, View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import ProgressSchedule from "../Component/ProgressSchedule";
import AnimatedAppearance from "components/AnimatedAppearance";

const ScheduleCourse = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <AnimatedAppearance>
        <ProgressSchedule
          step={3}
          timeStep={["Week 1", "Week 2", "Week 3", "Week 4"]}
        />
      </AnimatedAppearance>
    </View>
  );
});

export default ScheduleCourse;

const themedStyles = StyleService.create({
  container: {
    marginTop: 16,
    flexDirection: "row",
    flex: 1,
  },
});
