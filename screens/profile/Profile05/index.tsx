import React, { memo ,useEffect , useState  } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
  ViewPager,
} from "@ui-kitten/components";
import { useNavigation , NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "navigation/type";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import CardBalance from "./CardBalance";
import Line from "components/Line";
import TabBar from "../../../components/TabBarProfile";
import NFT from "./NFT";
import useLayout from "hooks/useLayout";
import auth from '@react-native-firebase/auth';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import AuthService from "../../../services/auth.services";
import authServices from "../../../services/auth.services";
import UserService from "../../../services/user.service";

const Profile05 = memo(() => {
  const { navigate, goBack } = useNavigation<
  NavigationProp<RootStackParamList>
>();
  const { top, bottom, height } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [userInfo, setUserInfo] = useState(null);
  const [dataBalance, setDataBalance] = React.useState(DATA);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  useEffect(() => {
    async function setUserData() {
      const user = await authServices.getCurrentAuthUser();
      const balance = await UserService.getUserBoard(user.id);
      user.balance = balance.balance;
      setUserInfo(user);
    }
    setUserData()
  }, []);
  const _signOut = async () => {
    await GoogleSignin.signOut();
    await AuthService.logout();
    await AuthService.logoutAuth();
    navigate("Auth",{screen:"SignUp01"})
  }
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        title="Wallet"
        accessoryRight={
          <View style={{ flexDirection: "row" }}>
            <NavigationAction marginRight={-8} />
            <NavigationAction icon="shopping" />
          </View>
        }
      />
      <Content style={{ paddingTop: 6 }}>
        {userInfo ? 
          <CardBalance item={userInfo}  />
        :""}
        

        <View style={styles.cardHis}>
          <TouchableOpacity style={styles.flexRow} activeOpacity={0.7} onPress={()=>navigate("Finance",{screen:"ListTransaction"})}>
            <Text category="title3" children="Transaction History" status="white" />
            <Icon pack="assets" name="rightArrow" style={styles.iconArrow} />
          </TouchableOpacity>
          <Line
            backgroundColor={theme["color-basic-1300"]}
            marginTop={16}
            marginBottom={26}
          />
          <View style={styles.item}>
            {DATA_item.map((i, _) => (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                activeOpacity={0.64}
                key={_}
                onPress={()=>navigate(i.app,{screen:i.screen})}
              >
                <Icon
                  pack="assets"
                  name={i.icon}
                  style={{ tintColor: theme["text-white-color"] }}
                />
                <Text
                  children={i.title}
                  status="snow"
                  category="caption1"
                  marginTop={14}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Layout
          level="2"
          style={{ borderRadius: 24, paddingBottom: bottom + 40 , marginBottom:35 }}
        >
          <TabBar
            tabs={[ "NFT"]}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
            style={styles.tabBar}
          />
          <ViewPager
            shouldLoadComponent={(index) => index === activeIndex}
            selectedIndex={activeIndex}
            onSelect={setActiveIndex}
          >
            <NFT />

          </ViewPager>
          
        </Layout>
        <Layout style={[styles.buttonView, { paddingBottom: bottom + 16 }]}>
        <Button children="Log out" size="large"  onPress={()=>_signOut()} />
      </Layout>
      </Content>
    </Container>
  );
});

export default Profile05;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNav: {
    paddingHorizontal: 4,
  },
  cardHis: {
    backgroundColor: "background-basic-color-2",
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  tabBar: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  buttonView: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  iconArrow: {
    tintColor: "text-snow-color",
    width: 16,
    height: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
const DATA = {
  id: 0,
  balance: "$12,680.99",
  name: "Myrtle Burns",
  avatar: Images.avatar0,
};
const DATA_item = [
  {
    id: 0,
    icon: "upArrow",
    title: "Send",
    app:"Finance",
    screen : "AddTransaction"
  },
  {
    id: 1,
    icon: "downArrow",
    title: "Withdraw",
    app:"Delivery",
    screen : "Success"
  },
  {
    id: 2,
    icon: "exchange",
    title: "Swap",
    app:"Crypto",
    screen : "Exchange"
  },
  {
    id: 3,
    icon: "creditCard",
    title: "Deposit",
    app:"Finance",
    screen : "Transfer"
  }
];
