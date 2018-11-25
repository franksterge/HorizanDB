import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { Constants, Font } from 'expo';
import { StyleSheet,Image, Text, View, Alert, AsyncStorage} from 'react-native';
import {Images} from './Themes';



import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistor, store } from './redux/store';

import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/index';
import { PersistGate } from 'redux-persist/integration/react'




//There's an expo glitch right now that breaks back button when firebase is imported regularly
//This is a workaround feel free to change later
import firebase from "@firebase/app"
import "firebase/auth"
import "firebase/database"

//screens
import NetworkErrorScreen from './screens/NetworkErrorScreen';
import CallToAction from './screens/CallToAction';
import FormScreen from './screens/FormScreen';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen'
import LoginScreen from './screens/LoginScreen';
import ResultsScreen from './screens/ResultsScreen';
import SettingsScreen from './screens/SettingsScreen';
import RegisterScreen from './screens/RegisterScreen';
import DetailsScreen from './screens/DetailsScreen';
import ResultsLoading from "./screens/ResultsLoading";
import InitialLoading from "./screens/InitialLoadingScreen"
import DeadlinesScreen from "./screens/DeadlinesScreen"
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen"


//global variables
import './screens/global.js'
import InitialLoadingScreen from './screens/InitialLoadingScreen';


import Sentry from 'sentry-expo';

// Remove this once Sentry is correctly setup.
// Sentry.enableInExpoDevelopment = true;

Sentry.config('https://c216f4692225444e88ff0f34500f877a@sentry.io/1321346').install();


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
  // console.log('initialized');
} catch (e) {
  // console.log('App reloaded, so firebase did not re-initialize');
}

const RootStack = createStackNavigator({
  LoginFlow: {
    screen: createStackNavigator({
      InitialLoading: { screen: InitialLoading },
      NetworkErrorScreen: {screen: NetworkErrorScreen},
      CallToAction: { screen: CallToAction }, //welcome
      FormScreen: { screen: FormScreen }, //the form
      LoginScreen: { screen: LoginScreen },  //login page
      RegisterScreen: { screen: RegisterScreen }, //Register page
      ResultsLoading: { screen: ResultsLoading },
      DetailsScreen: { screen: DetailsScreen },
      PrivacyPolicyScreen: {screen:PrivacyPolicyScreen},

      FavoritesTab: { screen: createBottomTabNavigator({
        FavoritesScreen: { screen: FavoritesScreen }, 
        Deadlines: { screen: DeadlinesScreen },
        ResultsScreen: { screen: ResultsScreen },  //show results
        },{
          navigationOptions: {
            header:null,
        }
        })
      }
    }, {
      headerMode: 'float',

      navigationOptions: {
        gesturesEnabled:false,
        headerLeft:null,
        tabBarLabel: '',
        headerTitle:<Image style={{height:'70%',width:'70%',resizeMode:'contain'}} source={Images.logo_full}/>,
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0
        }
      }})
  },
  
},
{
    navigationOptions: {
      header:null,
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
//   signIn = async () => {
//     try {
//       const result = await Expo.Google.logInAsync({
//         androidClientId: 7107222998-j63jutpdimj4u5m9str4opk79olqmhee.apps.googleusercontent.com,
//         iosClientId: YOUR_CLIENT_ID_HERE,
//         scopes: ['profile', 'email'],
//       });

//       if (result.type === 'success') {
//         //return result.accessToken;
//         this.setState({
//           signedIn: true,
//           name: result.user.name,
//           photoUrl: results.user.photoUrl
//         })
//       } else {
//         console.log("cancelled")
//         //return {cancelled: true};
//       }
//     } catch(e) {
//       console.log("error")
//       //return {error: true};
//     }
// }

//   //load font
  async componentDidMount() {
    await Font.loadAsync({
      'mainFontBold': require('./assets/fonts/Poppins-Bold.ttf'),
      'mainFont': require('./assets/fonts/Poppins-Medium.ttf'),
    });
    // AsyncStorage.getItem('userid', (error, result) => {
    //   if(error) console.error('Something went wrong!');
    //   else if(result) console.log('Getting key was successfull', result);
    //   else if(result === null) AsyncStorage.setItem('userid',Math.random().toString(36).substr(2, 9))
    // });

  

    
    

//     //check cache if they logged in before
//     this._checkLoggedInBefore();
//     //But double check and go to login screen if their account got logged out for whatever reason
//     this._checkForUser();

//   //set fonts loaded to true
    this.setState({ fontLoaded: true });
  }

//   _checkForUser = () => {
//     const out = this;
//     firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         // User is signed in.
//         global.user = user;
//         console.log(user);
// /*         Alert.alert(
//           'Welcome!',
//           `Hi ${user.displayName}!`,
//       ); */
//       //  () => this.props.navigation.navigate('HomeScreen');
//       out.setState({ signedIn: true});
//       out._storeLoggedIn('true');
//       global.form_completed = true;
//       global.signedIn = true;
//       } else {
//         // No user is signed in.
//         out._storeLoggedIn('false');
//         out.setState({ signedIn: false });
//         global.signedIn = false;
//       }
//     });
//   }

//   _storeLoggedIn = async (value) => {
//     const out = this;
//     try{
//       await AsyncStorage.setItem('loggedInBefore', value);
//     } catch(e){}
//   }

//   _checkLoggedInBefore = async () => {
//     try {
//       const value = await AsyncStorage.getItem('userid');
      
//       const s = JSON.parse(value);
//       console.log(s)
//       this.setState({signedIn: s });
//       if (s == "none"){
//         global.signedIn = false;
//       } else {
//         global.form_completed = true
//         global.signedIn = true;
//       }
//     }catch(e){}
//   }

  //render the StackNavigator
  render() {
    if(this.state.fontLoaded){
      //this.state.signedIn
      if(false){    //if signed in, skip directly to home screen
          return(<HomeStack />);
      }else{    //if not signed in, allow survey but require login after
        return (
          <Provider store={ store }>
            <PersistGate loading={<View/>} persistor={persistor}>

              <RootStack />
            </PersistGate>
          </Provider>
            
        );
      }


    }else{ return(<View></View>) }
  }
}