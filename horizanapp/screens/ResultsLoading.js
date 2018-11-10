import React from 'react';
// import * as Progress from 'react-native-progress';
import { StyleSheet, Text, View, AsyncStorage, Image} from 'react-native';
import styles from './Styles/ResultsLoadingStyle';
import {Images} from '../Themes';
import * as firebase from "firebase/app"
import { logIn } from '../redux/actions/log_in'
import { connect } from 'react-redux';
import { addSchools } from '../redux/actions/add_schools'
import { setIncome } from '../redux/actions/set_income'
import * as Progress from 'react-native-progress';



import { bindActionCreators } from 'redux';


import 'firebase/firestore'
import 'firebase/functions'


class ResultsLoading extends React.Component {
  constructor(props) {
    super(props)
    // console.log("constructing")
    this.state = {
       user:"test",
       loading:false,
       done:false,
       
    }
  }

  shouldComponentUpdate(){
    return false;
  }

  componentDidMount(){
      // console.log("getting data")

  }


  writeUserData(schools, inc){
    const incomeDataMap={
      "A":"averageNetPricePerIncome030000",
      "B":"averageNetPricePerIncome3000148000",
      "C":"averageNetPricePerIncome4800175000",
      "D":"averageNetPricePerIncome75001110000",
      "E":"averageNetPricePerIncome110001",
      "Z":"all"
    }

    // console.log("in writing")
    let userid = this.props.auth.userid
    //  console.log(userid)
      if(userid){ 
        // console.log('Getting key was successfull', userid); 
        firebase.database().ref('Users/' + userid + "/forms").set({taken:true})
        this.props.setIncome(incomeDataMap[inc]);
        this.props.addSchools(schools);
        var db = firebase.database().ref('Users/' + userid+"/schools")
        db.set(schools)
        .then(()=>{
            this.props.navigation.navigate("ResultsScreen");
            this.setState({done:true})
            // console.log("page should be dead")
            
        }).catch((error)=>{
            //error callback
            // console.log('error ' , error)
            alert("Error " + error)
        })
      }
}


  render(){
    if (this.state.done){
      return <View/>
    } else {

    const incomeDataMap={
      "A":"averageNetPricePerIncome030000",
      "B":"averageNetPricePerIncome3000148000",
      "C":"averageNetPricePerIncome4800175000",
      "D":"averageNetPricePerIncome75001110000",
      "E":"averageNetPricePerIncome110001",
      "Z":"all"
    }
      
  
  
    let answers = this.props.navigation.state.params.form_results

    const req = answers;
    //const test = this[formMappings.questions[0]];
    const ansArray = [];
    const scoreArray = [];
    firebase.database().ref('Users/' + this.props.auth.userid +"/income").set(incomeDataMap[req[7]])
    
    ansArray.push(req[0]); //Location
    ansArray.push(req[1]); //Environment
    ansArray.push(req[4]); //Gender
    ansArray.push(req[5]);  //Public/Private
    ansArray.push(req[6]); //School Size
    ansArray.push(req[7]); //income
    ansArray.push(req[8]);
    
    scoreArray.push(req[2]);  //SAT
    scoreArray.push(req[3]); //ACT

    let r = fetch('https://us-central1-horizanapp-dae00.cloudfunctions.net/handleUserData', {
        method: 'POST',

        body:JSON.stringify([ansArray,scoreArray])
        
    }).then(res=>res.json()).then(res => this.writeUserData(res, req[7]));



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


const mapStateToProps = state => {
  return { auth: state.auth, school_list:state.school_list, favorites:state.favorites };
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addSchools,
    setIncome,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ResultsLoading);
