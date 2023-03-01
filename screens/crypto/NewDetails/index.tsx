import React, {memo,useEffect , useState} from 'react';
import {View, ImageBackground} from 'react-native';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';

import Text from 'components/Text';
import Content from 'components/Content';
import Container from 'components/Container';
import NavigationAction from 'components/NavigationAction';
import {Images} from 'assets/images';
import LinearGradient from 'react-native-linear-gradient';
import LitterNew from '../Component/LitterNew';
import ReadMore from 'components/ReadMore';
import BottomTab from '../Component/BottomTab';
import { useNavigation, NavigationProp ,useRoute} from "@react-navigation/native";

const NewDetails = memo(() => {
  const route = useRoute();
  const {height, width, top, bottom} = useLayout();
  const [dataFeed, setDataFeed] = useState(null);
  const styles = useStyleSheet(themedStyles);
  useEffect(() => {
    if (route.params) {
      setDataFeed(route.params.feed);
      console.log(route.params.feed)
    }
  }, [route.params]);
  return (
    <Container style={styles.container}>
      <ImageBackground
        source={Images.ggCourse01}
        style={{
          width: width,
          height: 295 * (height / 812),
          position: 'absolute',
        }}
      />
      <TopNavigation
        appearance={'control'}
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        accessoryRight={<NavigationAction icon="heart" />}
      />
      <Content contentContainerStyle={{paddingTop: 115 * (height / 812)}}>
        <LinearGradient
          style={styles.linearCard}
          colors={['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.27)']}>
          <Text category="title3">
            {dataFeed ? dataFeed.title : ""}
          </Text>
          <Layout style={styles.line} />
          <View style={styles.footer}>
            <View style={styles.titleFooter}>
              <Layout style={styles.icon}>
                <Icon pack="assets" name={dataFeed ? dataFeed.icon : "littecoin"} style={{}} />
              </Layout>
              <Text category="headline">{dataFeed ? dataFeed.coin : "littecoin"}</Text>
            </View>
            <Text category="headline" status={'grey500'}>
              3 days ago
            </Text>
          </View>
        </LinearGradient>
        <Text category="title4" marginBottom={4} marginLeft={24}>
          About
        </Text>
        <ReadMore
          children={dataFeed ? dataFeed.content : ""}
          marginHorizontal={24}
          marginBottom={32}
        />
        <Text category="title4" marginLeft={24} marginBottom={16}>
          Other News
        </Text>
        {DATA.map((item, i) => {
          return <LitterNew item={item} key={i} />;
        })}
      </Content>
    </Container>
  );
});

export default NewDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  line: {
    height: 1,
    marginBottom: 10,
    marginTop: 32,
    backgroundColor: '#CED0DE',
    opacity: 0.5,
  },
  linearCard: {
    marginHorizontal: 24,
    borderRadius: 32,
    padding: 20,
    marginBottom: 32,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{scale: 0.8}],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const DATA = [
  {
    id: 0,
    title: "Get 50% off your next drink and support local farmers with Starbucks",
    date: "3 days ago",
    coin: "Starbucks",
    icon: "littecoin",
    content: "Enjoy a delicious cup of coffee from Starbucks and save 50% on your purchase while supporting local farmers. Starbucks sources its coffee from over 30 countries, and the company is committed to ethical sourcing and environmental stewardship. By buying from Starbucks, you can help support coffee farmers in developing countries and promote sustainable practices.",
    image: Images.Content1,
  },
  {
    id: 1,
    title: "Donate now and make a difference in someone's life",
    date: "3 days ago",
    coin: "Charity",
    content :"Make a difference in someone's life today by donating to a charity of your choice. Whether you want to support children's education, medical research, or environmental conservation, there are countless charities that can benefit from your help. By making a donation, you can help make a positive impact on the world and contribute to a brighter future for all.",
    icon: "littecoin",
    image: Images.Content2,
  },
  {
    id: 2,
    title: "Enjoy 20% off your order from Pizza Hut",
    date: "3 days ago",
    coin: "Pizza Hut",
    content:"Craving a delicious pizza? Look no further than Pizza Hut! With over 18,000 locations worldwide, Pizza Hut is one of the largest pizza chains in the world. And for a limited time, you can enjoy 20% off your order from Pizza Hut. Whether you prefer classic pepperoni or something more adventurous, Pizza Hut has a pizza for everyone.",
    icon: "littecoin",
    image: Images.Content3,
  },
  {
    id: 3,
    title: "Save big on luxury fashion with Gucci",
    date: "3 days ago",
    coin: "Gucci",
    content:"Looking for high-end fashion without breaking the bank? Look no further than Gucci! This luxury fashion brand offers a wide range of clothing, shoes, accessories, and more, all crafted from the finest materials and designed to last. And now, you can save big on your next purchase from Gucci. With discounts up to 20% off, it's the perfect time to upgrade your wardrobe.",
    icon: "littecoin",
    image: Images.collection3,
  },
];
