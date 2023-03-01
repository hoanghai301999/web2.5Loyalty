import React, { memo,useState , useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
  Input,
} from "@ui-kitten/components";
import { useNavigation , NavigationProp} from "@react-navigation/native";
import { RootStackParamList } from "navigation/type";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Text from "components/Text";
import Container from "components/Container";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthService from "../../services/auth.services";
import authServices from "../../services/auth.services";

const SignUp01 = memo(() => {
  const { navigate, goBack } = useNavigation<
    NavigationProp<RootStackParamList>
  >();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const styles = useStyleSheet(themedStyles);
  const [activeTab, setActiveTab] = React.useState(0);


  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId: '151273202076-es8f5r5n5rs58iqul41japp9u4viopko.apps.googleusercontent.com',
    });
    // Check if user is already signed in
    _isSignedIn();
  }, []);
  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      // Set User Info if user is already signed in
      
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info.user);
      authServices.setCurrentAuthUser(info.user);
      await _signInWallet();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        //alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        //alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo.user);
      authServices.setCurrentAuthUser(userInfo.user);
      await _signInWallet();
      //console.log('User Info --> ', userInfo);

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (
          error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
        ) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  const _signInWallet = async () => {
      const res = await AuthService.login(userInfo.id,"auth_check").catch( error => {
        // handle error
        AuthService.register(userInfo.id,"auth_check");
        })
  }

  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null); 
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };
  return (
    <Container style={[styles.container, { paddingBottom: bottom + 8 }]}>


      <KeyboardAwareScrollView
        extraHeight={30}
        enableOnAndroid
        extraScrollHeight={30}
        showsVerticalScrollIndicator={false}
      >


        <View style={styles.middleView}>
          <Layout style={styles.line} level="2" />
          <Text
            center
            category="body"
            status="placeholder"
            marginVertical={48}
            marginHorizontal={16}
          >
            Or Signup with Email
          </Text>
          <Layout style={styles.line} level="2" />
        </View>

        <Button
          activeOpacity={0.55}
          style={styles.btnGG}
          status="success"
          children="Continue with Google"
          onPress={() => _signIn().then(() => {console.log('Signed in with Google!');  navigate("Tabs") })}
          accessoryLeft={() => {
            return (
              <Icon
                animation="pulse"
                pack="assets"
                name="gg"
                style={styles.icon}
              />
            );
          }}
        />
      </KeyboardAwareScrollView>

    </Container>
  );
});

export default SignUp01;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  bottom: {
    position: "absolute",
    bottom: 8,
    width: "100%",
  },
  input: {
    paddingHorizontal: 32,
  },
  image: {
    width: 48,
    height: 48,
  },
  tabBar: {
    marginHorizontal: 80,
  },
  line: {
    height: 1,
    flex: 1,
  },
  facebook: {
    backgroundColor: "#6979F8",
    marginHorizontal: 32,
    justifyContent: "flex-start",
    marginTop: 40,
    marginBottom: 24,
  },
  icon: {
    tintColor: "color-basic-100",
    marginRight: 32,
    marginLeft: 16,
  },
  btnGG: {
    backgroundColor: "#FF647C",
    marginHorizontal: 32,
    justifyContent: "flex-start",
  },
  middleView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  signIn: {
    marginHorizontal: 32,
    marginTop: 24,
  },
});
