import React from 'react';
import { StyleSheet,AsyncStorage, TouchableOpacity, Text,Button, Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';

import firebase from "@firebase/app"
import "firebase/auth"
import "firebase/database"



import { connect } from 'react-redux';
import { logOut } from '../redux/actions/log_out'





import {Images} from '../Themes';

class SettingsScreen extends React.Component {



  static navigationOptions = {

    tabBarLabel: '',
    title:"Settings",
    tabBarIcon: <Ionicons name="md-cog" size={25} color="black" />,
    // headerLeft:( <HeaderBackButton onPress={()=>{this.props.navigation.navigate('CallToAction')}}/>),

    headerTitle: ( <Text style={{fontSize:20}}>Your Matches</Text>),
    headerRight: <Button title="Back" onPress={()=>{ navigation.goBack(); }} />
    //headerTitleStyle: {flex: 1, textAlign: 'center'},

  };

  logOut = () => {
    AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
      this.props.logOut()

      firebase.database().ref('Users/' + this.props.auth.userid + "/forms").set({taken:false})
    this.props.navigation.navigate("CallToAction")
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.body}>
        <TouchableOpacity onPress={this.logOut} style={styles.logOutButton}>
          <Text style={styles.buttonText}>
            Log out
          </Text>
        </TouchableOpacity>
        <Text style={styles.bodyText}>
          More Coming soon..
        </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonText:{
    color:'white',
    textAlign:'center',
    fontSize:20,
  },
  body:{
    flex:1,
    justifyContent:'space-around',
    alignItems:'center',
    width:'100%',
  },
  logOutButton:{
    
    width:'70%',
    height:50,
    justifyContent:'center',
    alignContent:'center',
    backgroundColor:'#2D4A5A',
    margin:10,
    borderRadius:15,
  },
  title:{
    
    fontSize:20,
    fontWeight:'bold',
  }
});



const mapStateToProps = state => {
  return { auth: state.auth, favorites:state.favorites,school_list:state.school_list };
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    logOut
    
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
