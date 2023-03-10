import React, { memo } from "react";
import { Image, TouchableOpacity } from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "navigation/type";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from "recyclerlistview";
import { isEmpty } from "lodash";
import { View_Types_Enum } from "constants/Type";
import { Images } from "assets/images";
import { RefreshControl } from "react-native-web-refresh-control";

const Category = memo(() => {
  const { navigate, goBack } = useNavigation<
    NavigationProp<RootStackParamList>
  >();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const dataProvider = React.useRef(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    })
  ).current;

  const budgetProvider = React.useMemo(() => {
    if (data.length) {
      return dataProvider.cloneWithRows(data);
    }
    return dataProvider.cloneWithRows([]);
  }, [data]);

  const layoutProvider = React.useRef(
    new LayoutProvider(
      (index) => {
        if (index % 2 === 0) {
          return View_Types_Enum.Left;
        } else {
          return View_Types_Enum.Right;
        }
      },
      (type, dim) => {
        dim.width = (width - 20) / 2;
        dim.height = 170;
      }
    )
  ).current;

  const renderItem = React.useCallback((type, item, index, dim) => {
    return (
      <TouchableOpacity style={[styles.item]} onPress={()=>navigate("ECommerce",{screen:"GridProduct"})}>
        <Image
          source={item.image}
          style={{ width: (width - 48) / 2, borderRadius: 4, height: 120 }}
        />
        <Text
          children={item.title}
          category="headline"
          marginTop={12}
          status="white"
        />
      </TouchableOpacity>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <Layout level="2" style={[{ paddingTop: top }, styles.topNav]}>
        <Layout level="2" style={styles.flexRow}>
          <NavigationAction icon="leftArrow" />
          <NavigationAction icon="search" />
        </Layout>
        <Text
          marginLeft={16}
          marginBottom={8}
          children="Collection"
          category="title2"
          status="white"
        />
      </Layout>
      {!isEmpty(data) && (
        <RecyclerListView
          rowRenderer={renderItem}
          dataProvider={budgetProvider}
          layoutProvider={layoutProvider}
          scrollThrottle={16}
          style={{ flex: 1 }}
          renderAheadOffset={0}
          scrollViewProps={{
            contentContainerStyle: { paddingBottom: bottom + 40 },
            showsVerticalScrollIndicator: false,
            refreshControl: <RefreshControl tintColor="#F0DF67" />,
          }}
        />
      )}
    </Container>
  );
});

export default Category;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  topNav: {
    paddingHorizontal: 4,
    justifyContent: "space-between",
    width: "100%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  item: {
    margin: 16,
  },
});
const data = [
  {
    id: 0,
    image: Images.Collection1,
    title: "Cuisine",
  },
  {
    id: 1,
    image: Images.Collection2,
    title: "Cosmetics",
  },
  {
    id: 2,
    image: Images.Collection3,
    title: "Entertainment",
  },
  {
    id: 3,
    image: Images.Collection5,
    title: "Fashion",
  },
  {
    id: 4,
    image: Images.Collection6,
    title: "Shopping",
  },
  {
    id: 5,
    image: Images.Collection7,
    title: "Charity",
  }
];
