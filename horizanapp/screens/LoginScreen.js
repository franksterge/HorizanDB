import React, { Component } from 'react';
import { Text, View, StyleSheet,HeaderBackButton, TextInput, Button, Modal, AsyncStorage, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Constants, Google } from 'expo';
import styles from ".././assets/styles/styles";
import Touchable from 'react-native-platform-touchable';
import { TextField } from 'react-native-material-textfield';
import { Ionicons } from '@expo/vector-icons';
import {StackActions, NavigationActions} from 'react-navigation';
import './global.js'
import {Images} from '../Themes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logIn } from '../redux/actions/log_in'
import { addFavorite } from '../redux/actions/index'
import { addSchools } from '../redux/actions/add_schools'
import { setIncome } from '../redux/actions/set_income'
import * as Progress from 'react-native-progress';


import firebase from "@firebase/app"
import "firebase/auth"
import "firebase/database"

class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible:false,
      loading:false,
      email:'',
      password1:'',
      password2:'',
    }
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "My Profile!",
    headerLeft: <Button title="Back" onPress={()=>{ navigation.goBack(); }} />,
  });

    componentDidMount(){
        //Constantly check for login, then upload info to firebase
    }

  _checkForUser = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        // console.log(user);
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
        behavior:'web',
       // androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
       // iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        //androidClientId: '7107222998-j63jutpdimj4u5m9str4opk79olqmhee.apps.googleusercontent.com',
        // iosClientId: "697630274134-299bvmv4rlnais3gfk4pnudimii6dpn3.apps.googleusercontent.com",
        iosClientId: '7107222998-qcmpffaqdkfo0cse1i10gf0t48n2t4go.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });


      switch (results.type) {
        case 'success': {
          this.setState({loading:true})
          // this.props.navigation.navigate('LoginLoading', {results:results})
          // console.log(this.props)
          let olduserid = this.props.auth.userid
          this.props.logIn(results["user"]["email"].replace(".","_"))

          // console.log(results);
          // console.log('Users/' + olduserid);
          // console.log(this.props)
          let newuserid = this.props.auth.userid

          let data_raw = firebase.database().ref('Users/'+newuserid)
          data_raw.once('value').then(snapshot=>{
            let data = snapshot.val();
            if (data != null && data["schools"] != null){
              this.props.setIncome(data["income"])

              this.props.addSchools(data["schools"])
              // console.log("retrieving existing data")
              if (data["favorites"] != null){
                for (var school in data['favorites']){
                  this.props.addFavorite(data['favorites'][school])
                }
              }
              // console.log(data["income"])
             

              this.props.navigation.navigate("ResultsScreen")
          

            } else {
                // console.log("transferring data")
               
                let oldDataRaw = firebase.database().ref('Users/' + olduserid);
                oldDataRaw.once('value').then(oldsnapshot => {
                  
                  let oldData = oldsnapshot.val()
                  this.props.setIncome(oldData["income"])
                  this.props.addSchools(oldData["schools"])
                  if (oldData["schools"] != null){
                    // console.log("form taken in temp user")
                    if (oldData != null && oldData["schools"] != null){
                      if (oldData["favorites"] != null){
                        for (var school in oldData['favorites']){
                          this.props.addFavorite(oldData['favorites'][school])
                        }
                      }
                      

                    firebase.database().ref('Users/' + [newuserid]).set(oldData)
                    this.props.navigation.navigate("ResultsScreen")
                  } else {
                    // console.log("form not taken")
                    if (snapshot.val() == null){
                      firebase.database().ref('Users/' + [newuserid]+"/forms").set({taken:false})
                      this.props.navigation.navigate("CallToAction", {userid:newuserid,logged_in:"yes"})
  
                    } 
                  }
                }})
            }
          })


          // // case when user is logging in and has before
          // let newdata = firebase.database().ref('Users/' + newuserid)
          // newdata.once('value').then(snapshot => {
          //   console.log("entering check")
          //   let data = snapshot.val()
          //   if (data != null && data["schools"] != null){
          //     this.props.addSchools(data["schools"])
          //     console.log("form taken logged in ")
          //     this.props.navigation.navigate("ResultsScreen", {school_list:snapshot.val()})

          //   } 
          // })
     
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
              <Text style={[styles.para, {flex: 0, marginBottom: 40, marginTop: 10}]}>
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
      if (this.state.loading){
        return (
          <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
          <View style={{flex:0, justifyContent:'center',alignItems:'center',height:150, width:150, }}>
              <Progress.CircleSnail spinDuration={5000} style={{position:'absolute',}} size={100} color={"#FFDA6B"} thickness={25} indeterminate={true} />
              <Progress.CircleSnail spinDuration={5000} style={{position:'absolute',}} size={150} color={"#56B0F2"}  thickness={25} indeterminate={true} />
              <Progress.CircleSnail spinDuration={5000} style={{position:'absolute',}} size={200} color={"#0400CF"}  thickness={25} indeterminate={true} />
          </View>
          <View style={{flex: 0, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.para, { color: '#0400CF'}]}>
                  Take hold of tomorrow with
                </Text>
          <Text style={[styles.title, { color: '#0400CF', fontSize: 75}]}>
                  Horizan
                </Text>
          </View>
          <Text style={[styles.para, {fontSize:20, marginBottom:50,color: '#0400CF'}]}>
                  Now Loading...
                </Text>
        </View>
        )
      } else {
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
}


const mapStateToProps = state => {
  return { auth: state.auth, favorites:state.favorites,school_list:state.school_list };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    logIn,
    addFavorite, 
    addSchools,
    setIncome
  }, dispatch)
);
export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);


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
