import React from 'react';
import { Text, View, Image, Modal, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from ".././assets/styles/styles";
import Touchable from 'react-native-platform-touchable';
import {Images} from '../Themes/';
import { BlurView } from 'expo';

import * as firebase from "firebase/app"


import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/database'

export default class CallToAction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logged_in:null,
      userid:null,
      modalVisible:false,
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
      let userid = this.props.navigation.getParam('userid', '')
      let logged_in = this.props.navigation.getParam('logged_in', '')
      console.log("userid: " + userid)
      console.log("logged_in: " + logged_in)
      this.setState({userid, logged_in});

    }
    
    handleLog(logged_in){
      if(logged_in != null){
        this.setState({modalVisible:true});
      } else {
        this.props.navigation.navigate("LoginScreen", {origin:"CallToAction"});
      }
    }

    signOut(){
      AsyncStorage.clear();
      let newUserId =  Math.random().toString(36).substr(2, 9)
      AsyncStorage.setItem('userid',newUserId)
      firebase.database().ref('Users/' + newUserId + "/forms").set({taken:false})

      this.setState({
        userid:newUserId,
        modalVisible:false,
        logged_in:false,


      })
    }

  

    render() {
      
      
       
      return (

          <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            >
             <BlurView
                style={{flex:1,}}
                viewRef={this.state.viewRef}
                tint="dark"
                intensity={80}
              >
              <View style={mystyles.modalMain}>
                <TouchableOpacity onPress={this.signOut.bind(this)} style={mystyles.modalButton}>
                  <Text style={{ color:'white',fontSize:20, fontWeight:'bold',}}>
                    Sign out of Horizan
                  </Text>
                </TouchableOpacity>>
                

                  <TouchableOpacity onPress={()=>this.setState({modalVisible:false})}>
                    <Text style={mystyles.fieldText}>Close</Text>
                  </TouchableOpacity>
              </View>
            </BlurView>
          
          </Modal>


          <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={[styles.logoimage,{flex:1,height:150 }]} source={Images.logo} />  
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.para, { color: '#0400CF'}]}>
                    Take hold of tomorrow with
                  </Text>
            <Text style={[styles.title, { color: '#0400CF', fontSize: 75}]}>
                    Horizan
                  </Text>
            </View>
          </View>
            <Touchable onPress={() => this.props.navigation.navigate('FormScreen')} style={[styles.button, {width: '90%', alignSelf:'center',borderRadius: 15, flex: 0,}]} >
                  <Text style={styles.whitetext}>
                    Start Questionnaire
                  </Text>
            </Touchable>
            
            <Touchable onPress={()=>this.handleLog(this.state.logged_in)} style={[styles.button,{ margin:50,justifyContent:'center', backgroundColor:'black', alignItems:'center', height:40, width:'60%', alignSelf:'center', borderRadius:15}]} >
                  <Text style={{fontSize:16, color:'white',}}>
                    {this.props.navigation.getParam('logged_in', '')!=null ? "Log Out" : 'Log in / Register'}
                  </Text>
            </Touchable>

          </View>
        
      );
    }
  }
  const mystyles = StyleSheet.create({
    modalMain:{
      alignSelf:'center',
      top:'40%',
      height:100,
      width:"80%",
      padding:10,
      justifyContent:'space-around',
      alignItems:'center',
      borderRadius:5,
      backgroundColor:'white',
      alignSelf:'center',
    },
    modalButton:{
      width:"80%",
      height:50,
      backgroundColor:'red',
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center',
    },

  })