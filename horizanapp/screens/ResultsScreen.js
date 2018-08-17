import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import styles from ".././assets/styles/styles";
import Touchable from 'react-native-platform-touchable';
import { NavigationActions, StackActions } from 'react-navigation';
import './global.js'

import firebase from "@firebase/app"
import "firebase/auth"
import "firebase/database"

const dimensions = Dimensions.get('window');

export default class ResultsScreen extends React.PureComponent {

  state = {
    signedIn: false,
    stored: false
  };

  static navigationOptions = {
    tabBarLabel: '',
    headerTitle: ( <Text style={[styles.title, {flex: 1, fontSize: 20, justifyContent: 'center', alignItems: 'center'}]}>Your Matches</Text>),
    //headerTitleStyle: {flex: 1, textAlign: 'center'},
    headerLeft: null,
    headerStyle: {
        backgroundColor: 'white',
        elevation: 0,
        shadowOpacity: 0,
      }
  };

  async componentWillMount() {
      this.setupSurveysListener();
  }

  async componentDidMount() {
    if(global.signedIn){
      const hasData = (this.props.navigation.getParam('hasData', 'false') == 'true');
      const results = hasData ? this.props.navigation.getParam('data', '{ "No results" : "" }') : this.props.navigation.getParam('results', '{ "No results" : "" }');
      this._storeSurvey(results);
    }
  }

  _storeSurvey(data1) {
    const postsRef = firebase.database().ref('surveys/users/' + global.user.uid);
    const utcDate1 = new Date(Date.now());
    const currentDateTime = utcDate1.toUTCString()
    postsRef.push().set({
        timestamp: currentDateTime,
        data: data1
    });
  }

  _handleHome = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'CallToAction' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  setupSurveysListener() {
    firebase.database().ref('surveys/users/' + global.user.uid).on('value', (snapshot) => {
        snapshot.forEach(function(_child){
          console.log(_child.val().data)
      });
    });
  }

  render() {
    const hasData = (this.props.navigation.getParam('hasData', 'false') == 'true');
    const results = hasData ? this.props.navigation.getParam('data', '{ "No results" : "" }') : this.props.navigation.getParam('results', '{ "No results" : "" }');
    if(global.signedIn){
      //store to user account
      return (
        <View style={{backgroundColor: 'white'}} >
          <View style={{marginBottom: 50, backgroundColor: 'white'}} >
              <FlatList
              style={{backgroundColor: 'white'}}
              data={JSON.parse(results)}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
              <View style={styles.flatview}>
              <Touchable onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, {backgroundColor: '#e0e0e0', margin: 5}]} >
                  <Text style={styles.para}>{item}</Text>
              </Touchable>
              </View>
              }
            />
          </View>
          <View style={[mystyles.positionInBottom, {backgroundColor: 'white'}]} >
            <Touchable onPress={this._handleHome} style={[styles.button, {height: 50}]} >
              <Text style={styles.whitetext}>
                  Home
              </Text>
            </Touchable>
          </View>
        </View>
      );
    }else{
      const data1 = results
      return (
        <View style={{backgroundColor: 'white', flex: 1}} >
          <Text style={styles.title}>
              Sign in to see your results!
          </Text>
            <Touchable onPress={() => this.props.navigation.navigate('LoginScreen', {origin : 'ResultsScreen', containsData: 'true', data: data1})} style={[styles.button, {height: 50}]} >
              <Text style={styles.whitetext}>
                  Log in / Register
              </Text>
            </Touchable>
        </View>
        );
    }
  }
}



const mystyles = StyleSheet.create({
  positionInBottom: {
    position: 'absolute',
    width: dimensions.width,
    height: 50,
    bottom: 0,
    zIndex: 100,
  }
});

