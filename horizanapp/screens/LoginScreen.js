import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Modal, AsyncStorage, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Constants, Google } from 'expo';
import styles from ".././assets/styles/styles";
import Touchable from 'react-native-platform-touchable';
import { TextField } from 'react-native-material-textfield';
import { Ionicons } from '@expo/vector-icons';
import {StackActions, NavigationActions} from 'react-navigation';
import './global.js'
import {Images} from '../Themes';


import firebase from "@firebase/app"
import "firebase/auth"
import "firebase/database"

export default class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible:false,
      email:'',
      password1:'',
      password2:'',
    }
  }

    static navigationOptions = {
        tabBarLabel: '',
        headerTitle:<Image style={{height:'70%',width:'70%',resizeMode:'contain'}} source={Images.logo_full}/>,

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
        // console.log(user);
        global.user = user;
/*         Alert.alert(
          'Got Data!',
          `Hi ${user.displayName}!`,
      ); */
       // () => this.props.navigation.navigate('CallToAction');
      } else {
        // No user is signed in.
      }
    });
  }

  handleLogout = () => {

    AsyncStorage.clear()
    const out = this;
      firebase.auth().signOut()
    
      this.props.navigation.navigate("CallToAction",{logged_in:null})
   
  }

  handleEmailSignin = () => {
    // in progress
    let data = firebase.database().ref('/' + univ.Schools.replace("_","."))
        data.once('value').then(snapshot => {
               
            this.setState({
                loading:false,
                school_info: snapshot.val(),
            })
        })
  }

  _handleGoogleLogin = async () => {
    const out = this;
    try {
      const results = await Google.logInAsync({
       // androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
       // iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '7107222998-j63jutpdimj4u5m9str4opk79olqmhee.apps.googleusercontent.com',
        iosClientId: '7107222998-qcmpffaqdkfo0cse1i10gf0t48n2t4go.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      const origin = this.props.navigation.getParam('origin', '');

      switch (results.type) {
        case 'success': {
          AsyncStorage.setItem("logged_in","yes")
          let olduserid = ''
          AsyncStorage.getItem('userid', (error3, userid) => {
            olduserid = userid
          })
          console.log(results);
          let newuserid = results["user"]["email"].replace(".","_")
          
          let oldData = firebase.database().ref('Users/' + olduserid)
          oldData.once('value').then(snapshot => {
            if (snapshot.val() == null){
              firebase.database().ref('Users/' + [newuserid]).set({form:"yes"})
              AsyncStorage.setItem("userid",newuserid)

            } else {
              firebase.database().ref('Users/' + [newuserid]).set(snapshot.val())
              AsyncStorage.setItem("userid",newuserid)
            }})
          //     let tempData = firebase.database().ref('Users/' + olduserid)
          //     tempData.once('value').then(snapshot2 => {
          //       firebase.database().ref('Users/' + newuserid).set(snapshot2.val())
          //     })
          //     AsyncStorage.setItem("userid",newuserid)

          //   }
          // })
          // firebase.database().ref('Users/' + [newuserid]).set(snapshot.val())
          // AsyncStorage.setItem("userid",newuserid)
          
            console.log("test")

          // const credential = firebase.auth.GoogleAuthProvider.credential(results.idToken, results.accessToken);
          // firebase.auth().signInAndRetrieveDataWithCredential(credential);

          if (origin == "resultsScreen"){
            console.log("TeST")
            this.props.navigation.navigate("ResultsScreen", {school_list:this.props.navigation.getParam('school_list', '')})
            
          } else {
            this.props.navigation.navigate("CallToAction", {userid:newuserid,logged_in:"yes"})
          }

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
    const origin = this.props.navigation.getParam('origin', '');
    let logged_in = this.props.navigation.getParam('logged_in', '');
    if(!logged_in){
          return (
            <View style={{backgroundColor: 'white', flex: 1,}}>
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            >
          <View style={mystyles.modalMain}>
            <Text style={{ color:'white',fontSize:20, fontWeight:'bold',}}>
              Sign in to Horizan
            </Text>
            <View style={mystyles.field}>
              <Text style={mystyles.fieldText}>
                Email
              </Text>
              <TextInput style={mystyles.textInput}/>

            </View>
            <View style={mystyles.field}>
              <Text style={mystyles.fieldText}>
                Password
              </Text>
              <TextInput style={mystyles.textInput}/>

            </View>

            <View style={mystyles.field}>
              <Text style={mystyles.fieldText}>
                Confirm Password
              </Text>
              <TextInput style={mystyles.textInput}/>

            </View>
            <View style={{justifyContent:'space-between', alignItems:'center',}}>
            <TouchableOpacity style={mystyles.submitButton} onPress={this.handleEmailSignin}>
              <Text style={[mystyles.fieldText,{fontSize:18}]}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({modalVisible:false})}>
              <Text style={mystyles.fieldText}>Close</Text>
            </TouchableOpacity>
            </View>

          </View>
          </Modal>
              <Text onPress={()=>AsyncStorage.clear()} style={[styles.para, {flex: 0, marginBottom: 40, marginTop: 10}]}>
                    Log into your Horizan Account
                </Text>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                
                    {/*<TextField style={{marginBottom: 20}} label={'Email'} baseColor={'#00BCD4'} keyboardType={'email-address'}/>
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
                    */}
                    {/* <TouchableOpacity style={mystyles.button} onPress={()=>this.setState({modalVisible:true})}>
                      <Text style={{color:"white"}}>
                        Sign in with email
                      </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={[{backgroundColor: 'transparent', padding: 6, margin: 10, }]} onPress={this._handleGoogleLogin}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Image style={mystyles.image} source={Images.google_login} />
                        </View>
                    </TouchableOpacity>
                    
          </View>
          
          </View>
        );
    }else{
          return (
            <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
           
                <Text style={[styles.para, {flex: 0, marginBottom: 40, marginTop: 10}]}>
                    Log out your Horizan Account
                </Text>
                <ScrollView scrollEnabled={false} contentContainerStyle={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
                    {/*<TextField style={{marginBottom: 20}} label={'Email'} baseColor={'#00BCD4'} keyboardType={'email-address'}/>
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
                    */}
                    <Touchable onPress={this.handleLogout} style={[styles.button, {backgroundColor: 'red', marginTop: 10}]} >
                            <Text style={styles.whitetext}>
                                Log Out
                            </Text>
                    </Touchable>
                </ScrollView>
          </View>
        );
    }
    
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
  fieldText:{
    color:'white',
  },
  submitButton:{
    width:150,
     height:30, 
     justifyContent:'center', 
     alignItems:'center',
     borderWidth:.5, 
     borderRadius:4, 
     borderColor:'white',
     marginBottom:15
    },
  modalMain:{
    flex:1,
    padding:10,
    justifyContent:'space-around',
    alignItems:'center',
    borderRadius:5,
    width:'100%',
    backgroundColor:'#2A396B',
    alignSelf:'center',
    borderWidth:1,
  },
  field:{
    justifyContent:'center',
    alignItems:'center',
  },
  textInput:{
    borderBottomWidth:.5,
    marginTop:10,
    width:150,
    borderColor:'white',
  },
  button:{
    backgroundColor:"#4D4D4D",
    width: 191,
    height: 46,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    alignSelf:'center',
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
