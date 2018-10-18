import React from 'react';
import * as Progress from 'react-native-progress';
import { StyleSheet, Text, View, AsyncStorage, Image} from 'react-native';
import styles from './Styles/ResultsLoadingStyle';
import {Images} from '../Themes';
import * as firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/functions'





export default class ResultsLoading extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructing")
    this.state = {
       user:"test",
       loading:true,
       
    }
  }


  componentDidMount(){
    global.form_completed = true
      console.log("getting data")
    AsyncStorage.getItem('userid').then((token) => {
      console.log("DONE")
      this.setState({user: token,
                      loading:false})
    })
  }



  render() {
    if (this.state.loading){
      return(
        <View style={styles.background}>
        <Image source={Images.logo_full} style={styles.headerImage}/>
          <View style={{alignItems:'center',height:"50%",justifyContent:"space-around"}}>
              <Text style={styles.headerText}> Fetching your matches now... </Text>
              <Progress.Circle size={100} indeterminate={true} />
          </View>
          
  
  
        </View> 
      )
    } else{
      const writeUserData = (schools) => {
        // if (this.state.user  == 'test') {
        //     this.props.navigation.navigate("ResultsScreen", {school_list : schools});
        
        // }
        console.log("in writing")
       AsyncStorage.getItem('userid', (error, userid) => {
         console.log(userid)
          if(error) console.error('Something went wrong!');
          if(userid){ 
            console.log('Getting key was successfull', userid); 
            firebase.database().ref('Users/' + userid + "/forms").set({taken:true})

            var db = firebase.database().ref('Users/' + userid).set({schools})
            .then((data)=>{
                //success callback
                console.log('data ' , data)
                this.props.navigation.navigate("ResultsScreen", {school_list : schools, userid:userid,})
            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
                alert("Error " + error)
            })
          }
        });

   
  }

    console.log("loading start")
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }


  
    let answers = this.props.navigation.state.params.form_results

    const req = answers;
    //const test = this[formMappings.questions[0]];
    const ansArray = [];
    const scoreArray = [];
    
    ansArray.push(req[0]); //Location
    ansArray.push(req[1]); //Environment
    ansArray.push(req[4]); //Gender
    ansArray.push(req[5]);  //Public/Private
    ansArray.push(req[6]); //School Size
    ansArray.push(req[7]); //In-state Cost
    ansArray.push(req[8]); //Out of state cost
    
    scoreArray.push(req[2]);  //SAT
    scoreArray.push(req[3]); //ACT

    let r = fetch('https://us-central1-horizanapp-dae00.cloudfunctions.net/handleUserData', {
        method: 'POST',

        body:JSON.stringify([ansArray,scoreArray])
        
    }).then(res=>res.json())
    .then(res => writeUserData(res))




    

    


    return (

      <View style={styles.background}>
      <Image source={Images.logo_full} style={styles.headerImage}/>
        <View style={{alignItems:'center',height:"50%",justifyContent:"space-around"}}>
            <Text style={styles.headerText}> Fetching your matches now... </Text>
            <Progress.Circle size={100} indeterminate={true} />
        </View>
        


      </View>
    );
  }
}
}
