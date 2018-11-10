import React from 'react';
import { StyleSheet, Image, AsyncStorage, Text, View } from 'react-native';
import {Images} from '../Themes';
import styles from ".././assets/styles/styles";
// import * as Progress from 'react-native-progress';
import * as firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/database'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logIn } from '../redux/actions/log_in'
import { addFavorite } from '../redux/actions/index'
import { addSchools } from '../redux/actions/add_schools'
import { formComplete } from '../redux/actions/form_complete'
import { setIncome } from '../redux/actions/set_income'
import * as Progress from 'react-native-progress';







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
            // console.log("cancelled")
            //return {cancelled: true};
          }
        } catch(e) {
          // console.log("error")
          //return {error: true};
        }
    }
    
      //load font
      async componentDidMount() {

          // console.log("logged in? >" + this.props.auth.logged_in)
          let userid = this.props.auth.userid
          // console.log(userid);
          let dataBody = firebase.database().ref('Users/' + userid)
          dataBody.once('value').then(snapshot=>{
            let data = snapshot.val()
            if (data == null){
              this.props.navigation.navigate("CallToAction", {userid:userid, logged_in:"no"} );
              return 
            }
         
            if (data["forms"]["taken"]){
              this.props.formComplete("yes")
             
              
              if(this.props.auth.logged_in=="yes"){
                  // console.log("logged in and completed form")
                  
                  for (var school in data["favorites"]){
                  
                    this.props.addFavorite(data['favorites'][school]);
                  }
                  this.props.addSchools(data["schools"])
                  this.props.setIncome(data["income"])


                  this.props.navigation.navigate("FavoritesTab");
              } else {
                  // console.log("form completed not logged in")
                  this.props.navigation.navigate("LoginScreen");
              }    
              
          } else {
              // console.log("form not taken")
              this.props.navigation.navigate("CallToAction", {userid:userid, logged_in:"yes"} );
          }
      })
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
        <Text onPress={()=>AsyncStorage.clear()} style={[styles.title, { color: '#0400CF', fontSize: 75}]}>
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

const mapStateToProps = state => {
  return { auth: state.auth, favorites:state.favorites, school_list:state.school_list };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    logIn,
    addFavorite,
    addSchools,
    formComplete,
    setIncome
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(InitialLoadingScreen);