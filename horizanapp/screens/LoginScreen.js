import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Constants, Google } from 'expo';
import styles from ".././assets/styles/styles";
import Touchable from 'react-native-platform-touchable';
import { TextField } from 'react-native-material-textfield';
import { Ionicons } from '@expo/vector-icons';

import firebase from "@firebase/app"
import "firebase/auth"
import "firebase/database"

export default class LoginScreen extends Component {

    static navigationOptions = {
        tabBarLabel: '',
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0
        }
      };

    componentDidMount(){
        //Constantly check for login, then upload info to firebase
        this._checkForUser();
    }

  _checkForUser = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user);
        Alert.alert(
          'Got Data!',
          `Hi ${user.displayName}!`,
      );
        () => this.props.navigation.navigate('CallToAction');
      } else {
        // No user is signed in.
      }
    });
  }

  _handleGoogleLogin = async () => {
    try {
      const results = await Google.logInAsync({
       // androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
       // iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '7107222998-j63jutpdimj4u5m9str4opk79olqmhee.apps.googleusercontent.com',
        iosClientId: '7107222998-qcmpffaqdkfo0cse1i10gf0t48n2t4go.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      switch (results.type) {
        case 'success': {
            const credential = firebase.auth.GoogleAuthProvider.credential(results.idToken, results.accessToken);
            firebase.auth().signInAndRetrieveDataWithCredential(credential);
            Alert.alert(
                'Logged in!',
                `Hi ${results.user.name}!`,
            );
            break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
      console.log(e);
    }
  };
//        <Image source={require('.././assets/images/logo.png')} />
  render() {
    return (
        <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
            <Text style={[styles.para, {flex: 0, marginBottom: 40, marginTop: 10}]}>
                Log into your Horizan Account
            </Text>
            <ScrollView scrollEnabled={false} contentContainerStyle={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
                <TextField style={{marginBottom: 20}} label={'Email'} baseColor={'#00BCD4'} keyboardType={'email-address'}/>
                <TextField secureTextEntry={true} label={'Password'} baseColor={'#00BCD4'} />
                <Touchable onPress={() => this.props.navigation.navigate('LoginScreen')} style={[styles.button, {marginTop: 20}]} >
                        <Text style={styles.whitetext}>
                            Log in
                        </Text>
                    </Touchable>
                <Touchable onPress={() => this.props.navigation.navigate('RegisterScreen')} style={[styles.button, {backgroundColor: 'black', marginTop: 10}]} >
                        <Text style={styles.whitetext}>
                            Register
                        </Text>
                </Touchable>
                <TouchableOpacity style={[styles.button, {backgroundColor: 'transparent', padding: 6, margin: 10, marginTop: 40}]} onPress={this._handleGoogleLogin}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Image style={mystyles.image} source={require('.././assets/images/google.png')} />
                    </View>
                </TouchableOpacity>
            </ScrollView>
      </View>
    );
  }
}

const mystyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 191,
    height: 46,
    margin: 15,
    resizeMode: 'contain' }
});
