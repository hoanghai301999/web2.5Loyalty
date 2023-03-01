import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import createStackNavigator from "./createStackNavigator";
import { RootStackParamList } from "./type";

import Intro from "./Intro";
import OnboardingNavigator from "./OnboardingNavigator";
import AuthNavigator from "./AuthNavigator";
import SocialNavigator from "./SocialNavigator";
import FinanceNavigator from "./FinanceNavigator";
import ProfileNavigator from "./ProfileNavigator";
import ECommerceStackNavigator from "./ECommerceNavigator";
import FitnessNavigator from "./FitnessStackNavigator";
import ReadingStackNavigator from "./ReadingStackNavigator";
import HealthStackNavigator from "./HealthStackNavigator";
import EducationStackNavigator from "./EducationStackNavigator";
import DeliveryStackNavigator from "./DeliveryStackNavigator";
import CryptoStackNavigator from "./CryptoStackNavigator";
import MenuStackNavigator from "./MenuNavigator";
import TabNavigator from "./TabsNavigator";

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const AppContainer = () => {
  const [authenticated, setAuthenticated] = useState(false);

useEffect(() => {
  GoogleSignin.configure({
    webClientId:
      '151273202076-d32sc2ngvj3kv4iea79ajmn2n3uu8aa6.apps.googleusercontent.com',
  });
  
}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Auth"
      > 
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Tabs"  component={TabNavigator} />
          <Stack.Screen name="Profile" component={ProfileNavigator} />
          <Stack.Screen name="Onbroading" component={OnboardingNavigator} />
          <Stack.Screen name="Social" component={SocialNavigator} />
          <Stack.Screen name="Menu" component={MenuStackNavigator} /> 
          <Stack.Screen name="Finance" component={FinanceNavigator} />
          <Stack.Screen name="Reading" component={ReadingStackNavigator} />
          <Stack.Screen name="ECommerce" component={ECommerceStackNavigator} />
          <Stack.Screen name="Fitness" component={FitnessNavigator} />
          <Stack.Screen name="Health" component={HealthStackNavigator} />
          <Stack.Screen name="Education" component={EducationStackNavigator} />
          <Stack.Screen name="Delivery" component={DeliveryStackNavigator} />
          <Stack.Screen name="Crypto" component={CryptoStackNavigator} />
          
        {/* 
      
       */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppContainer;
