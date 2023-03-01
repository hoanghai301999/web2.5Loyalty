import React, { memo } from "react";
import { View, Image, ScrollView , TouchableOpacity} from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { useNavigation , NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "navigation/type";
import Text from "components/Text";
import { Images } from "assets/images";

const Gallery = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { navigate, goBack } = useNavigation<
  NavigationProp<RootStackParamList>
>();
  return (
    <View style={styles.container}>
      <Text category="title3" marginBottom={16} status="white">
        Collection
      </Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((i, _) => {
          return (
            <TouchableOpacity key={_}  activeOpacity={0.7} onPress={()=>navigate("ECommerce",{screen:"ProductDetails"})}>
            <Image
              key={_}
              source={i.image}
              /* @ts-ignore */
              style={styles.img}
              
            />
            </TouchableOpacity>

          );
        })}
      </ScrollView>
    </View>
  );
});

export default Gallery;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  img: {
    borderRadius: 8,
    marginRight: 16,
    width:120,
    height:120
  },
  content: {
    paddingRight: 16,
  },
});
const data = [
  {
    id: 0,
    image: Images.Collection1,
  },
  {
    id: 1,
    image: Images.Collection2,
  },
  {
    id: 2,
    image: Images.Collection3,
  },
  {
    id: 3,
    image: Images.Collection7,
  },
];
