import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import {
  HomeScreen,
  OrderDeliveryScreen,
  RestaurantScreen,
} from './App/screens';
import Tabs from './App/navigation/Tabs';

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Roboto-Black': require('./App/assets/fonts/Roboto-Black.ttf'),
    'Roboto-Black': require('./App/assets/fonts/Roboto-Black.ttf'),
    'Roboto-BlackItalic': require('./App/assets/fonts/Roboto-BlackItalic.ttf'),
    'Roboto-Bold': require('./App/assets/fonts/Roboto-Bold.ttf'),
    'Roboto-BoldItalic': require('./App/assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Italic': require('./App/assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Light': require('./App/assets/fonts/Roboto-Light.ttf'),
    'Roboto-LightItalic': require('./App/assets/fonts/Roboto-LightItalic.ttf'),
    'Roboto-Medium': require('./App/assets/fonts/Roboto-Medium.ttf'),
    'Roboto-MediumItalic': require('./App/assets/fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Regular': require('./App/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('./App/assets/fonts/Roboto-Thin.ttf'),
    'Roboto-ThinItalic': require('./App/assets/fonts/Roboto-ThinItalic.ttf'),
    'RobotoCondensed-Bold': require('./App/assets/fonts/RobotoCondensed-Bold.ttf'),
    'RobotoCondensed-BoldItalic': require('./App/assets/fonts/RobotoCondensed-BoldItalic.ttf'),
    'RobotoCondensed-Italic': require('./App/assets/fonts/RobotoCondensed-Italic.ttf'),
    'RobotoCondensed-Light': require('./App/assets/fonts/RobotoCondensed-Light.ttf'),
    'RobotoCondensed-LightItalic': require('./App/assets/fonts/RobotoCondensed-LightItalic.ttf'),
    'RobotoCondensed-Regular': require('./App/assets/fonts/RobotoCondensed-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Home"}
        >
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen name="OrderDelivery" component={OrderDeliveryScreen} />
        </Stack.Navigator>

      </NavigationContainer>

    );
  }
}

const styles = StyleSheet.create({

});
