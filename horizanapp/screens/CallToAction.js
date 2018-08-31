import React from 'react';
import { Text, View, Image, AsyncStorage } from 'react-native';
import styles from ".././assets/styles/styles";
import Touchable from 'react-native-platform-touchable';
import {Images} from '../Themes/';

export default class CallToAction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn:false,
      user:null,
    }
  }

  static navigationOptions = {
    tabBarLabel: '',
    headerStyle: {
      opacity:0,
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0
    }
  };

    componentDidMount(){
      AsyncStorage.getItem('userid').then((token) => {
        console.log("DONE")
        this.setState({loggedIn:true, 
                      user: token})
      })
    }

  

    render() {
      

       
      return (
        (this.state.loggedIn ?
          <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
          <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={styles.logoimage} source={Images.logo} />  
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
                    {this.state.user != null ? "Log Out" : 'Log in / Register'}
                  </Text>
            </Touchable>
            <Touchable onPress={() => this.props.navigation.navigate('FormScreen')} style={[styles.button, {flex: 0}]} >
                  <Text style={styles.whitetext}>
                    Start Questionnaire
                  </Text>
            </Touchable>
          </View>
        : <View/>)
      );
    }
  }