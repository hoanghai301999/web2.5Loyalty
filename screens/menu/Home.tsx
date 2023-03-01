import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "navigation/type";
import Container from "components/Container";
import { Button, TopNavigation } from "@ui-kitten/components";
import NavigationAction from "components/NavigationAction";
import Content from "components/Content";

interface ItemProp {
  title:
    | "Menu"
    | "Menu01"
    | "Menu02"
    | "Menu03"
    | "Menu04"
    | "Menu05"
    | "Menu06"
    | "Menu07"
    | "Menu08"
    | "Menu09"
    | "Menu10";
}
const Home = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<RootStackParamList>>();

  const RenderItem = ({ title }: ItemProp) => {
    return (
      <Button
        children={title}
        style={styles.button}
        onPress={() => navigate("Menu", { screen: title })}
      />
    );
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction onPress={goBack} />}
        title="Menu"
      />
      <Content contentContainerStyle={styles.content}>
        <RenderItem title="Menu01" />
        <RenderItem title="Menu02" />
        <RenderItem title="Menu03" />
        <RenderItem title="Menu04" />
        <RenderItem title="Menu05" />
        <RenderItem title="Menu06" />
        <RenderItem title="Menu07" />
        <RenderItem title="Menu08" />
        <RenderItem title="Menu09" />
        <RenderItem title="Menu10" />
      </Content>
    </Container>
  );
});
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: "center",
    paddingBottom: 90,
    marginHorizontal: 24,
  },
  button: {
    marginTop: 12,
  },
});
