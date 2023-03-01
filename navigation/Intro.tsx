import React, { memo , useEffect, useState} from "react"; 
import { StyleSheet, Image, FlatList } from "react-native";
import { Button } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import Container from "components/Container";

import { Images } from "assets/images";
import { RootStackParamList } from "./type";

const Intro = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  
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
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };
  const data = [
    {
      children: "OnBoarding",
      onPress: () => navigate("Onbroading", { screen: "Onboarding" }),
    },
    {
      children: "Auth",
      onPress: () => navigate("Auth", { screen: "Home" }),
    },
    {
      children: "Social",
      onPress: () => navigate("Social", { screen: "Home" }),
    },
    {
      children: "Profile",
      onPress: () => navigate("Profile", { screen: "Home" }),
    },
    {
      children: "Finance",
      onPress: () => navigate("Finance", { screen: "Home" }),
    },
    {
      children: "ECommerce",
      onPress: () => navigate("ECommerce", { screen: "Home" }),
    },
    {
      children: "Reading",
      onPress: () => navigate("Reading", { screen: "Home" }),
    },
    {
      children: "Fitness",
      onPress: () => navigate("Fitness", { screen: "Home" }),
    },
    {
      children: "Health",
      onPress: () => navigate("Health", { screen: "Home" }),
    },
    {
      children: "Education",
      onPress: () => navigate("Education", { screen: "Home" }),
    },
    {
      children: "Delivery",
      onPress: () => navigate("Delivery", { screen: "Home" }),
    },
    {
      children: "Menu",
      onPress: () => navigate("Menu", { screen: "Home" }),
    },
    {
      children: 'Crypto',
      onPress: () => navigate("Crypto", { screen: "Home" }),
    },
  ];

  const ListHeaderComponent = React.useCallback(() => {
    return <Image source={Images.logo4} style={styles.image} />;
  }, []);

  const renderItem = React.useCallback(({ item }) => {
    return <Button style={styles.button} {...item} size={"small"} />;
  }, []);

  return (
    <Container style={styles.container}>
      <ListHeaderComponent />
      <FlatList
        data={data || []}
        renderItem={renderItem}
        keyExtractor={(i, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Container>
  );
});

export default Intro;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  contentContainerStyle: {
    paddingHorizontal: 32,
  },
  image: {
    alignSelf: "center",
    transform: [{ scale: 0.5 }],
  },
  button: {
    marginTop: 12,
  },
});
