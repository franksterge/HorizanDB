import React from 'react';
import { createStackNavigator } from 'react-navigation';

//There's an expo glitch right now that breaks back button when firebase is imported regularly
//This is a workaround feel free to change later
import firebase from "@firebase/app"
import "firebase/auth"
import "firebase/database"

import { Constants, Font } from 'expo';
import { StyleSheet, Text, View } from 'react-native';

//screens
//import SplashScreen from './screens/SplashScreen';
import CallToAction from './screens/CallToAction';
import FormScreen from './screens/FormScreen';

const RootStack = createStackNavigator({
    CallToAction: { screen: CallToAction },
    FormScreen: { screen: FormScreen }
}
);

export default class App extends React.Component {

  //check if fonts are loaded
  state = {
    fontLoaded: false,
  };

  //load font
  async componentDidMount() {
    await Font.loadAsync({
      'mainFontBold': require('./assets/fonts/Poppins-Bold.ttf'),
      'mainFont': require('./assets/fonts/Poppins-Medium.ttf'),
    });

  //set fonts loaded to true
  this.setState({ fontLoaded: true });
  }

  //render the StackNavigator
  render() {
    if(this.state.fontLoaded){
      return (
        <RootStack />
      );
    }else
    return (
      <View>
        <Text>Loading</Text>
        </View>
    );
  }
}
