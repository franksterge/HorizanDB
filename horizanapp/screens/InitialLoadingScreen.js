import React from 'react';
import { StyleSheet, Image, AsyncStorage, Text, View } from 'react-native';
import {Images} from '../Themes';
import styles from ".././assets/styles/styles";
import * as Progress from 'react-native-progress';
import * as firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/database'
import { connect } from 'react-redux';




class InitialLoadingScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        headerTitle:<View/>,
        header:null,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0
        }
      };

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
        AsyncStorage.getItem('logged_in', (error, logged_in) => {
            AsyncStorage.getItem('form_completed', (error2, form_completed) => {
                AsyncStorage.getItem('userid', (error3, userid) => {
                    if(error || error2 || error3){alert('Something went wrong!')}
                    console.log(userid)
                   
                    if(userid === null){ 
                        console.log("creating user id")
                        let newUserId =  Math.random().toString(36).substr(2, 9)
                        userid = newUserId
                        console.log("setting");
                        console.log(newUserId)
                        AsyncStorage.setItem('userid',newUserId)
                        firebase.database().ref('Users/' + newUserId + "/forms").set({taken:false})
                    }

                    
                    if(form_completed == "yes"){
                        let data = firebase.database().ref('Users/' + userid + "/schools")
                        data.once('value').then(snapshot => {

                        
                        if(logged_in){



                            console.log("logged in and completed form")
                            this.props.navigation.navigate("FavoritesTab", {school_list:snapshot.val()});
                        } else {
                            console.log("form completed not logged in")
                            this.props.navigation.navigate("LoginScreen", {school_list:snapshot.val()});
                        }    
                      })
                        
                    } else {
                        console.log("form not taken")
                        this.props.navigation.navigate("CallToAction", {userid:userid, logged_in:logged_in} );
                    }
                })
            })
        })
    }


            

        
    
    
        
  
    //   _checkForUser = () => {
    //     const out = this;
    //     firebase.auth().onAuthStateChanged(function(user) {
    //       if (user) {
    //         // User is signed in.
    //         global.user = user;
    //         console.log(user);

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

      userIsLoggedIn(){
        
      }

      userNotLoggedIn(){

      }
    
      _storeLoggedIn = async (value) => {
        const out = this;
        try{
          await AsyncStorage.setItem('loggedInBefore', value);
        } catch(e){}
      }
    
    
      
  render() {
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
    );
  }
}



const mapStateToProps = (state) => {
  const { friends } = state
  return { friends }
};

export default connect(mapStateToProps)(InitialLoadingScreen);