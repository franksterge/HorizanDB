import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from ".././assets/styles/styles";
import Touchable from 'react-native-platform-touchable';

export default class CallToAction extends React.Component {

  static navigationOptions = {
    tabBarLabel: '',
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0
    }
  };

    render() {
      return (
          <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
          <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={styles.logoimage} source={require('.././assets/images/logo.png')} />  
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.para, { color: '#0400CF'}]}>
                    Take hold of tomorrow with
                  </Text>
            <Text style={[styles.title, { color: '#0400CF', fontSize: 75}]}>
                    Horizan
                  </Text>
            </View>
          </View>
          <Touchable onPress={() => this.props.navigation.navigate('LoginScreen', {origin: 'CallToAction'})} style={[styles.button, {backgroundColor: '#000000'}]} >
                  <Text style={styles.whitetext}>
                    {global.signedIn ? 'Log Out' : 'Log in / Register'}
                  </Text>
            </Touchable>
            <Touchable onPress={() => this.props.navigation.navigate('FormScreen')} style={[styles.button, {flex: 0}]} >
                  <Text style={styles.whitetext}>
                    Start Questionnaire
                  </Text>
            </Touchable>
          </View>
      );
    }
  }