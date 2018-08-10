import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Constants, Google } from 'expo';
import styles from ".././assets/styles/styles";
import Touchable from 'react-native-platform-touchable';
import { TextField } from 'react-native-material-textfield';
import { Ionicons } from '@expo/vector-icons';

export default class LoginScreen extends Component {

    static navigationOptions = {
        tabBarLabel: '',
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0
        }
      };

  _handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
       // androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
       // iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '7107222998-j63jutpdimj4u5m9str4opk79olqmhee.apps.googleusercontent.com',
        iosClientId: '',
        scopes: ['profile', 'email']
      });

      switch (type) {
        case 'success': {
          Alert.alert(
            'Logged in!',
            `Hi ${user.name}!`,
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
    }
  };
//        <Image source={require('.././assets/images/logo.png')} />
  render() {
    return (
        <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
            <Text style={[styles.para, {flex: 0, marginBottom: 40}]}>
                Log into your Horizan Account
            </Text>
            <ScrollView contentContainerStyle={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
                <TextField style={{marginBottom: 20}} label={'Email'} baseColor={'#00BCD4'} keyboardType={'email-address'}/>
                <TextField secureTextEntry={true} label={'Password'} baseColor={'#00BCD4'} />
                <Touchable onPress={() => this.props.navigation.navigate('LoginScreen')} style={[styles.button, {marginTop: 20}]} >
                        <Text style={styles.whitetext}>
                            Log in
                        </Text>
                    </Touchable>
                <Touchable onPress={() => this.props.navigation.navigate('LoginScreen')} style={[styles.button, {backgroundColor: 'black', marginTop: 10}]} >
                        <Text style={styles.whitetext}>
                            Register
                        </Text>
                </Touchable>
                <TouchableOpacity style={[styles.button, {backgroundColor: 'transparent', flex: 0, padding: 6, margin: 10, marginTop: 40}]} onPress={this._handleGoogleLogin}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Image style={mystyles.image} source={require('.././assets/images/google.png')} />
                    </View>
                </TouchableOpacity>
            </ScrollView>
      </View>
    );
  }
}

/*  //old method, apparently cant use google logo if you dont design it right wow
<Ionicons name = "logo-google" size={42} color="white" style={{marginRight: 10}}/>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={[styles.whitetext, {fontSize: 18}]}>
                    Sign in with Google </Text>
                    </View>

*/

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
