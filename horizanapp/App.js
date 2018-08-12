import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Constants, Font } from 'expo';
import { StyleSheet, Text, View, Alert, AsyncStorage} from 'react-native';

//There's an expo glitch right now that breaks back button when firebase is imported regularly
//This is a workaround feel free to change later
import firebase from "@firebase/app"
import "firebase/auth"
import "firebase/database"

//screens
import CallToAction from './screens/CallToAction';
import FormScreen from './screens/FormScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ResultsScreen from './screens/ResultsScreen';
import SettingsScreen from './screens/SettingsScreen';
import RegisterScreen from './screens/RegisterScreen';

//Configure Firebase Settings
var config = {
  apiKey: "AIzaSyA-4NL5bmgBaOQBGSig-bMVyHOiqYCcK8c",
  authDomain: "horizanapp-dae00.firebaseapp.com",
  databaseURL: "https://horizanapp-dae00.firebaseio.com",
  projectId: "horizanapp-dae00",
  storageBucket: "",
  messagingSenderId: "517669103032"
};

//init firebase
try {
  firebase.initializeApp(config);
  console.log('initialized');
} catch (e) {
  console.log('App reloaded, so firebase did not re-initialize');
}

const RootStack = createStackNavigator({
  LoginFlow: {
    screen: createStackNavigator({
      CallToAction: { screen: CallToAction }, //welcome
      FormScreen: { screen: FormScreen }, //the form
      LoginScreen: { screen: LoginScreen },  //login page
      RegisterScreen: { screen: RegisterScreen }, //Register page
      ResultsScreen: { screen: ResultsScreen }  //show results
    })
  },
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

const HomeStack = createStackNavigator({
  MainFlow: {
    screen: createStackNavigator({
      HomeScreen: { screen: HomeScreen }, //main home screen
      SettingsScreen: { screen: SettingsScreen }  //tbd settings screen
    })
  }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });

export default class App extends React.Component {
    //check if fonts are loaded
    state = {
      fontLoaded: false,
      signedIn: false,
      name: "",
      photoUrl: ""
    };

  //Google Authentication
  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: 7107222998-j63jutpdimj4u5m9str4opk79olqmhee.apps.googleusercontent.com,
        iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        //return result.accessToken;
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: results.user.photoUrl
        })
      } else {
        console.log("cancelled")
        //return {cancelled: true};
      }
    } catch(e) {
      console.log("error")
      //return {error: true};
    }
}

  //load font
  async componentDidMount() {
    await Font.loadAsync({
      'mainFontBold': require('./assets/fonts/Poppins-Bold.ttf'),
      'mainFont': require('./assets/fonts/Poppins-Medium.ttf'),
    });

    //check cache if they logged in before
    this._checkLoggedInBefore();
    //But double check and go to login screen if their account got logged out for whatever reason
    this._checkForUser();

  //set fonts loaded to true
  this.setState({ fontLoaded: true });
  }

  _checkForUser = () => {
    const out = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user);
        Alert.alert(
          'Got Data!',
          `Hi ${user.displayName}!`,
      );
      //  () => this.props.navigation.navigate('HomeScreen');
      out.setState({ signedIn: true});
      out._storeLoggedIn('true');
      } else {
        // No user is signed in.
        out._storeLoggedIn('false');
        out.setState({ signedIn: false });
        Alert.alert(
          'Not logged in!',
          `Please sign in`,
      );
      }
    });
  }

  _storeLoggedIn = async (value) => {
    const out = this;
    try{
      await AsyncStorage.setItem('loggedInBefore', value);
    } catch(e){}
  }

  _checkLoggedInBefore = async () => {
    try {
      const value = await AsyncStorage.getItem('loggedInBefore');
      const s = JSON.parse(value);
      this.setState({signedIn: s });
    }catch(e){}
  }

  //render the StackNavigator
  render() {
    if(this.state.fontLoaded){

      if(this.state.signedIn){    //if signed in, skip directly to home screen
          return(<HomeStack />);
      }else{    //if not signed in, allow survey but require login after
        return (
          <RootStack />
        );
      }


    }else{ return(<View></View>) }
  }
}