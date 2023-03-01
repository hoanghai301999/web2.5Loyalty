import React, { memo } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  FlatList,
} from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  ViewPager,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import keyExtractor from "utils/keyExtractor";
import FrequencyTab from "screens/finance/AssetReport/FrequencyTab";
import ExchangeTab from "./ExchangeTab";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import BottomTab from "../Component/BottomTab";
import ExchangeScreen from "./ExchangeScreen";

const Exchange = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [selectIndex, setSelectIndex] = React.useState(0);

  const renderItem = React.useCallback(() => {
    return (
      <ExchangeTab
        style={styles.tabBar}
        activeIndex={selectIndex}
        onChange={setSelectIndex}
        tabs={[
          "BTC/USD",
          "BTC/USD",
          "BTC/USD",
          "BTC/USD",
          "BTC/USD",
          "BTC/USD",
        ]}
      />
    );
  }, [selectIndex]);
  const ListHeaderComponent = React.useCallback(() => {
    return <></>;
  }, []);
  const ListFooterComponent = React.useCallback(() => {
    return (
      <ViewPager
        selectedIndex={selectIndex}
        onSelect={setSelectIndex}
        shouldLoadComponent={(i) => selectIndex === i}
      >
        <ExchangeScreen title="BTC" icon="bitcoin" priceCoin={6456.45} />
        <ExchangeScreen title="ETH" icon="eth" priceCoin={6456.45} />
        <></>
        <></>
        <></>
      </ViewPager>
    );
  }, [selectIndex]);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.header}
        title={'Exchange'}
        accessoryLeft={<NavigationAction icon="undo" status="opacity" />}
        accessoryRight={<NavigationAction icon="settings" status="opacity" />}
      />
      <FlatList
        data={[1]}
        renderItem={renderItem}
        stickyHeaderIndices={[1]}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
      />
    </Container>
  );
});

export default Exchange;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  header: {
    borderBottomColor: "color-basic-1500",
    borderBottomWidth: 1,
  },
  tabBar: {
    paddingLeft: 24,
    paddingTop: 24,
    marginBottom: 40,
  },
});
