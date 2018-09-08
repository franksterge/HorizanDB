import React from 'react';
import { Text, View, Image,  TouchableOpacity, AsyncStorage } from 'react-native';
import styles from ".././assets/styles/styles";
import Touchable from 'react-native-platform-touchable';
import {Images} from '../Themes/';
import * as firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/database'

export default class CallToAction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn:false,
      user:null,
      form_complete: false
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
      var form_complete = false;
      AsyncStorage.getItem('userid').then((token) => {
        data = firebase.database().ref('Users/' + token+ "/schools")
          data.once('value').then(snapshot => {
            if (snapshot){
              console.log(snapshot.value)
              console.log("ACTIVATING")
                global.form_completed = true
                form_complete = true
                console.log(snapshot)
                this.setState({form_complete:true})
            }
          })
     
        AsyncStorage.getItem("formCompleted").then((token2) => {
          console.log(token2)
        
          console.log("DONE")
          console.log(form_complete)
          this.setState({loggedIn:true,
                        user: token,
                        })
          })
        })

        

    }

  

    render() {
      
      console.log(this.state)
       
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

            {global.form_completed || this.state.form_complete ? 
           <TouchableOpacity onPress={()=>this.props.navigation.navigate("FormScreen")} style={{ justifyContent:'center', alignItems:'center',width:"60%", height:'8%', alignSelf:"center", marginBottom:25, borderRadius:15, marginTop:25, backgroundColor: '#000000'}}>
                  <Text style={{fontSize:16, color:'white',}}>
           
             Retake Questionnaire
           </Text>
         </TouchableOpacity>
         : null}
          
            {global.form_completed || this.state.form_complete ? 
             
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("ResultsScreen")} style={[styles.button, {width: '90%', alignSelf:'center',borderRadius: 15, flex: 0,}]}>
                <Text style={styles.whitetext}>
                  See your schools
                </Text>
              </TouchableOpacity>
              :
            <Touchable onPress={() => this.props.navigation.navigate('FormScreen')} style={[styles.button, {width: '90%', alignSelf:'center',borderRadius: 15, flex: 0,}]} >
                  <Text style={styles.whitetext}>
                    Start Questionnaire
                  </Text>
            </Touchable>
            }
            <Touchable onPress={() => this.props.navigation.navigate('LoginScreen', {origin: 'CallToAction'})} style={[styles.button, this.state.user != null ? { width:"60%", height:'8%', alignSelf:"center", marginBottom:25, borderRadius:15, marginTop:25, justifyContent:'center', alignItems:'center', backgroundColor: '#000000'} : { justifyContent:'center', alignItems:'center',backgroundColor: '#000000'}]} >
                  <Text style={{fontSize:16, color:'white',}}>
                    {global.signedIn ? "Log Out" : 'Log in / Register'}
                  </Text>
            </Touchable>
          </View>
        : <View/>)
      );
    }
  }