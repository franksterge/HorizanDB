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

    console.log("loading start")
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }

//     function cartesian(arg) {
//       var r = [], max = arg.length-1;
//       function helper(arr, i) {
//           for (var j=0, l=arg[i].length; j<l; j++) {
//               var a = arr.slice(0); // clone arr
//               a.push(arg[i][j]);
//               if (i==max)
//                   r.push(a);
//               else
//                   helper(a, i+1);
//           }
//       }
//       helper([], 0);
//       return r;
//   }


    writeUserData = (schools) => {
        // if (this.state.user  == 'test') {
        //     this.props.navigation.navigate("ResultsScreen", {school_list : schools});
        
        // }

      var db = firebase.database().ref('Users/' + this.state.user).set({schools})
      .then((data)=>{
          //success callback
          console.log('data ' , data)
          this.props.navigation.navigate("ResultsScreen", {school_list : schools})
      }).catch((error)=>{
          //error callback
          console.log('error ' , error)
          alert("Error " + error)
      })
  }

    // handleUserData = (ans, scoreArray) => {
    //   //First parse array to get only the letter choices
    //   //Then take the letter choices and filter starting from the beginning
    //   //let numArr = [];
    //   const ansArray = [];
    //   for (var i = 0; i < ans.length; i++){
    //     ansArray.push(ans[i].split(''))
    //   }
      

    //   console.log("computation start")
    //   let scores = { "SAT_25th": { "Adelphi University": 1060.0, "American University": 1180.0, "Andrews University": 1040.0, "Arizona State University- Tempe": 1120.0, "Ashland University": 965.0, "Auburn University": 1130.0, "Azusa Pacific University": 990.0, "Ball State University": 1080.0, "Baylor University": 1020.0, "Benedictine University": 916.0, "Binghamton University- SUNY": 1290.0, "Biola University": 1063.0, "Boston College": 1320.0, "Boston University": 1040.0, "Bowling Green State University": 990.0, "Brandeis University": 1280.0, "Brigham Young University- Provo": 1210.0, "Brown University": 1405.0, "California Institute of Technology": 1530.0, "California State University- Fresno": 910.0, "California State University- Fullerton": 1020.0, "Carnegie Mellon University": 1430.0, "Case Western Reserve University": 1340.0, "Central Michigan University": 1010.0, "Clark University": 1240.0, "Clarkson University": 1143.0, "Clemson University": 1220.0, "College of William & Mary": 1300.0, "Colorado School of Mines": 1310.0, "Colorado State University": 1100.0, "Columbia University": 1120.0, "Cornell University": 1390.0, "Dallas Baptist University": 1090.0, "Dartmouth College": 1430.0, "DePaul University": 1080.0, "Drexel University": 1160.0, "Duke University": 1380.0, "Duquesne University": 1120.0, "East Carolina University": 1030.0, "Edgewood College": 1060.0, "Emory University": 1350.0, "Florida Institute of Technology": 1130.0, "Florida State University": 1190.0, "Fordham University": 1230.0, "Gardner Webb University": 1000.0, "George Mason University": 1100.0, "George Washington University": 1280.0, "Georgetown University": 1350.0, "Georgia Institute of Technology": 1090.0, "Harvard University": 1460.0, "Hofstra University": 1130.0, "Howard University": 930.0, "Illinois Institute of Technology": 1230.0, "Illinois State University": NaN, "Immaculata University": 950.0, "Indiana University- Bloomington": 1140.0, "Indiana University- Purdue University- Indianapolis": 995.0, "Iowa State University": 1160.0, "Johns Hopkins University": 1450.0, "Kansas State University": 1020.0, "Kent State University": 866.0, "Lehigh University": 1270.0, "Lesley University": 1020.0, "Lipscomb University": 1060.0, "Louisiana State University- Baton Rogue": 1060.0, "Louisiana Tech University": 870.0, "Loyola University Chicago": 1120.0, "Marquette University": 1130.0, "Maryville University of St. Louis": 983.0, "Massachusetts Institute of Technology": 1490.0, "Mercer University": 1170.0, "Miami University- Oxford": 1190.0, "Michigan State University": 1100.0, "Michigan Technological University": 1160.0, "Mississippi State University": 1070.0, "Missouri University of Science & Technology": 1100.0, "Montana State University": 1090.0, "Montclair State University": 990.0, "New Jersey Institute of Technology": 1190.0, "New Mexico State University": 910.0, "New School": 1100.0, "New York University": 1080.0, "North Carolina State University- Raleigh": 1230.0, "North Dakota State University": 1060.0, "Northeastern University": 910.0, "Northern Illinois University": 980.0, "Northwestern University": 1420.0, "Nova Southeastern University": 1080.0, "Ohio State University- Columbus": 1260.0, "Ohio University": 1080.0, "Oklahoma State University": 1070.0, "Old Dominion University": 980.0, "Oregon State University": 1070.0, "Pace University": 1040.0, "Pennsylvania State University- University Park": 1160.0, "Pepperdine University": 1200.0, "Princeton University": 1430.0, "Purdue University-West Lafayette": 1150.0, "Rensselaer Polytechnic Institute": 1320.0, "Rice University": 1490.0, "Robert Morris University": 1020.0, "Rochester Institute of Technology": 1190.0, "Rutgers University- New Brunswick": 1190.0, "Rutgers University- Newark": 910.0, "Saint Louis University": 1170.0, "San Diego State University": 1090.0, "Seattle Pacific University": 1060.0, "Seton Hall University": 1140.0, "Shenandoah University": 1010.0, "South Dakota State University": 980.0, "Southern Illinois University- Carbondale": 920.0, "Southern Methodist University": 1270.0, "St John Fisher College": 970.0, "St. John's University": 1060.0, "Stanford University": 1390.0, "Stevens Institute of Technology": 1320.0, "Stony Brook University- SUNY": 1210.0, "Suffolk University": 1000.0, "SUNY College of Environmental Science and Forestry": 1150.0, "Syracuse University": 1160.0, "Temple University": 1010.0, "Tennessee Technological University": 1010.0, "Texas A&M University- College Station": 960.0, "Texas Christian University": 1130.0, "Texas Tech University": 1070.0, "The Catholic University of America": 1040.0, "Tufts University": 1410.0, "Tulane University": 1330.0, "Union University": 980.0, "University at Albany- SUNY": 1080.0, "University at Buffalo- SUNY": 880.0, "University of Alabama": 990.0, "University of Alabama- Birmingham": 990.0, "University of Alabama- Huntsville": 1080.0, "University of Alaska- Fairbanks": 1030.0, "University of Arizona": 1170.0, "University of Arkansas": 1110.0, "University of California- Berkeley": 1260.0, "University of California- Davis": 1130.0, "University of California- Irvine": 1170.0, "University of California- Los Angeles": 1220.0, "University of California- Merced": 1000.0, "University of California- Riverside": 1090.0, "University of California- San Diego": 1210.0, "University of California- Santa Barbara": 1190.0, "University of California- Santa Cruz": 1160.0, "University of Central Florida": 1150.0, "University of Chicago": 1480.0, "University of Cincinnati": 1120.0, "University of Colorado- Denver": 1060.0, "University of Connecticut": 1210.0, "University of Dayton": 1100.0, "University of Delaware": 1130.0, "University of Denver": 1060.0, "University of Florida": 1150.0, "University of Georgia": 1200.0, "University of Hartford": 1010.0, "University of Hawaii- Manoa": 1050.0, "University of Houston": 1110.0, "University of Idaho": 1010.0, "University of Illinois- Chicago": 1080.0, "University of Illinois- Urbana Champaign": 1340.0, "University of Iowa": 1140.0, "University of Kansas": 1110.0, "University of Kentucky": 1080.0, "University of La Verne": 1020.0, "University of Louisville": 1070.0, "University of Maine": 1050.0, "University of Maryland College Park": 1280.0, "University of Maryland- Baltimore County": 1140.0, "University of Massachusetts- Amherst": 1180.0, "University of Massachusetts- Boston": 1040.0, "University of Massachusetts- Dartmouth": 1000.0, "University of Massachusetts- Lowell": 1130.0, "University of Miami": 1230.0, "University of Michigan- Ann Arbor": 1330.0, "University of Minnesota- Twin Cities": 1270.0, "University of Mississippi": 1070.0, "University of Missouri": 1120.0, "University of Missouri- Kansas City": 1105.0, "University of Missouri- St. Louis": 1065.0, "University of Montana": 1115.0, "University of Nebraska- Lincoln": 1100.0, "University of New Hampshire": 1070.0, "University of New Mexico": 930.0, "University of North Carolina- Chapel Hill": 1270.0, "University of North Carolina- Charlotte": 1110.0, "University of North Carolina- Greensboro": 1030.0, "University of North Dakota": 1050.0, "University of Notre Dame": 1370.0, "University of Oklahoma": 1150.0, "University of Oregon": 1080.0, "University of Pennsylvania": 1420.0, "University of Pittsburgh": 1240.0, "University of Rhode Island": 1050.0, "University of Rochester": 1230.0, "University of San Diego": 1210.0, "University of San Francisco": 1100.0, "University of South Carolina": 1170.0, "University of South Dakota": 1010.0, "University of South Florida": 1150.0, "University of Southern California": 1300.0, "University of Southern Mississippi": 940.0, "University of St Thomas": 1070.0, "University of Tennessee": 1140.0, "University of Texas- Austin": 1220.0, "University of Texas- Dallas": 1220.0, "University of the Pacific": 1070.0, "University of Tulsa": 1150.0, "University of Utah": 1110.0, "University of Vermont": 1180.0, "University of Virginia": 1310.0, "University of Washington": 1080.0, "University of Wisconsin- Madison": 1280.0, "University of Wyoming": 1040.0, "Utah State University": 1000.0, "Vanderbilt University": 1440.0, "Villanova University": 1250.0, "Virginia Commonwealth University": 1070.0, "Virginia Tech": 1180.0, "Wake Forest University": 1290.0, "Washington State University": 1020.0, "Washington University in St. Louis": 1470.0, "West Virginia University": 900.0, "Western Michigan University": 960.0, "Widener University": 1020.0, "Worcester Polytechnic Institute": 1270.0, "Yale University": 1460.0, "Yeshiva University": 1160.0 }, "ACT_25th": { "Adelphi University": 22.0, "American University": 26.0, "Andrews University": 21.0, "Arizona State University- Tempe": 22.0, "Ashland University": 20.0, "Auburn University": 24.0, "Azusa Pacific University": 21.0, "Ball State University": 20.0, "Baylor University": 19.0, "Benedictine University": 19.0, "Binghamton University- SUNY": 28.0, "Biola University": 21.0, "Boston College": 31.0, "Boston University": 21.0, "Bowling Green State University": 19.0, "Brandeis University": 29.0, "Brigham Young University- Provo": 27.0, "Brown University": 31.0, "California Institute of Technology": 34.0, "California State University- Fresno": 16.0, "California State University- Fullerton": 19.0, "Carnegie Mellon University": 32.0, "Case Western Reserve University": 30.0, "Central Michigan University": 20.0, "Clark University": 26.0, "Clarkson University": 24.0, "Clemson University": 27.0, "College of William & Mary": 29.0, "Colorado School of Mines": 28.0, "Colorado State University": 22.0, "Columbia University": 23.0, "Cornell University": 31.0, "Dallas Baptist University": 19.0, "Dartmouth College": 30.0, "DePaul University": 22.0, "Drexel University": 24.0, "Duke University": 31.0, "Duquesne University": 24.0, "East Carolina University": 20.0, "Edgewood College": 21.0, "Emory University": 30.0, "Florida Institute of Technology": 24.0, "Florida State University": 26.0, "Fordham University": 27.0, "Gardner Webb University": 19.0, "George Mason University": 24.0, "George Washington University": 29.0, "Georgetown University": 30.0, "Georgia Institute of Technology": 30.0, "Harvard University": 32.0, "Hofstra University": 24.0, "Howard University": 19.0, "Illinois Institute of Technology": 25.0, "Illinois State University": 21.0, "Immaculata University": 17.0, "Indiana University- Bloomington": 25.0, "Indiana University- Purdue University- Indianapolis": 19.0, "Iowa State University": 22.0, "Johns Hopkins University": 33.0, "Kansas State University": 22.0, "Kent State University": 17.0, "Lehigh University": 29.0, "Lesley University": 20.0, "Lipscomb University": 23.0, "Louisiana State University- Baton Rogue": 23.0, "Louisiana Tech University": 22.0, "Loyola University Chicago": 24.0, "Marquette University": 24.0, "Maryville University of St. Louis": 21.0, "Massachusetts Institute of Technology": 33.0, "Mercer University": 25.0, "Miami University- Oxford": 26.0, "Michigan State University": 23.0, "Michigan Technological University": 25.0, "Mississippi State University": 22.0, "Missouri University of Science & Technology": 25.0, "Montana State University": 21.0, "Montclair State University": 18.0, "New Jersey Institute of Technology": 24.0, "New Mexico State University": 18.0, "New School": 24.0, "New York University": 24.0, "North Carolina State University- Raleigh": 26.0, "North Dakota State University": 21.0, "Northeastern University": 15.0, "Northern Illinois University": 19.0, "Northwestern University": 32.0, "Nova Southeastern University": 23.0, "Ohio State University- Columbus": 27.0, "Ohio University": 22.0, "Oklahoma State University": 22.0, "Old Dominion University": 18.0, "Oregon State University": 22.0, "Pace University": 21.0, "Pennsylvania State University- University Park": 25.0, "Pepperdine University": 26.0, "Princeton University": 31.0, "Purdue University-West Lafayette": 25.0, "Rensselaer Polytechnic Institute": 28.0, "Rice University": 33.0, "Robert Morris University": 21.0, "Rochester Institute of Technology": 26.0, "Rutgers University- New Brunswick": NaN, "Rutgers University- Newark": NaN, "Saint Louis University": 25.0, "San Diego State University": 23.0, "Seattle Pacific University": 21.0, "Seton Hall University": 24.0, "Shenandoah University": 20.0, "South Dakota State University": 20.0, "Southern Illinois University- Carbondale": 20.0, "Southern Methodist University": 28.0, "St John Fisher College": 22.0, "St. John's University": 22.0, "Stanford University": 32.0, "Stevens Institute of Technology": 29.0, "Stony Brook University- SUNY": 26.0, "Suffolk University": 21.0, "SUNY College of Environmental Science and Forestry": 24.0, "Syracuse University": 25.0, "Temple University": 22.0, "Tennessee Technological University": 21.0, "Texas A&M University- College Station": 18.0, "Texas Christian University": 25.0, "Texas Tech University": 22.0, "The Catholic University of America": 22.0, "Tufts University": 31.0, "Tulane University": 30.0, "Union University": 20.0, "University at Albany- SUNY": 22.0, "University at Buffalo- SUNY": 24.0, "University of Alabama": 21.0, "University of Alabama- Birmingham": 21.0, "University of Alabama- Huntsville": 25.0, "University of Alaska- Fairbanks": 17.0, "University of Arizona": 21.0, "University of Arkansas": 23.0, "University of California- Berkeley": 30.0, "University of California- Davis": 25.0, "University of California- Irvine": 25.0, "University of California- Los Angeles": 29.0, "University of California- Merced": 20.0, "University of California- Riverside": 23.0, "University of California- San Diego": 27.0, "University of California- Santa Barbara": 28.0, "University of California- Santa Cruz": 26.0, "University of Central Florida": 24.0, "University of Chicago": 32.0, "University of Cincinnati": 23.0, "University of Colorado- Denver": 21.0, "University of Connecticut": 26.0, "University of Dayton": 24.0, "University of Delaware": 25.0, "University of Denver": 21.0, "University of Florida": 24.0, "University of Georgia": 26.0, "University of Hartford": 19.0, "University of Hawaii- Manoa": 21.0, "University of Houston": 23.0, "University of Idaho": 20.0, "University of Illinois- Chicago": 20.0, "University of Illinois- Urbana Champaign": 26.0, "University of Iowa": 23.0, "University of Kansas": 23.0, "University of Kentucky": 22.0, "University of La Verne": 19.0, "University of Louisville": 22.0, "University of Maine": 22.0, "University of Maryland College Park": 29.0, "University of Maryland- Baltimore County": 24.0, "University of Massachusetts- Amherst": 26.0, "University of Massachusetts- Boston": 21.0, "University of Massachusetts- Dartmouth": 19.0, "University of Massachusetts- Lowell": 24.0, "University of Miami": 28.0, "University of Michigan- Ann Arbor": 30.0, "University of Minnesota- Twin Cities": 26.0, "University of Mississippi": 22.0, "University of Missouri": 23.0, "University of Missouri- Kansas City": 21.0, "University of Missouri- St. Louis": 22.0, "University of Montana": 22.0, "University of Nebraska- Lincoln": 22.0, "University of New Hampshire": 23.0, "University of New Mexico": 19.0, "University of North Carolina- Chapel Hill": 28.0, "University of North Carolina- Charlotte": 22.0, "University of North Carolina- Greensboro": 20.0, "University of North Dakota": 21.0, "University of Notre Dame": 32.0, "University of Oklahoma": 23.0, "University of Oregon": 22.0, "University of Pennsylvania": 32.0, "University of Pittsburgh": 27.0, "University of Rhode Island": 22.0, "University of Rochester": 22.0, "University of San Diego": 27.0, "University of San Francisco": 22.0, "University of South Carolina": 25.0, "University of South Dakota": 20.0, "University of South Florida": 24.0, "University of Southern California": 30.0, "University of Southern Mississippi": 19.0, "University of St Thomas": 21.0, "University of Tennessee": 24.0, "University of Texas- Austin": 26.0, "University of Texas- Dallas": 26.0, "University of the Pacific": 22.0, "University of Tulsa": 25.0, "University of Utah": 22.0, "University of Vermont": 25.0, "University of Virginia": 29.0, "University of Washington": 22.0, "University of Wisconsin- Madison": 27.0, "University of Wyoming": 22.0, "Utah State University": 21.0, "Vanderbilt University": 32.0, "Villanova University": 30.0, "Virginia Commonwealth University": 21.0, "Virginia Tech": 25.0, "Wake Forest University": 28.0, "Washington State University": 20.0, "Washington University in St. Louis": 32.0, "West Virginia University": 17.0, "Western Michigan University": 20.0, "Widener University": 20.0, "Worcester Polytechnic Institute": 27.0, "Yale University": 32.0, "Yeshiva University": 23.0 } };
    //   const answers = {"(2, 1, 0, 1, 2, -1, 3)": ["Adelphi University", "American University", "Boston College", "Brandeis University", "Hofstra University", "Immaculata University", "Lesley University", "Princeton University", "Rensselaer Polytechnic Institute", "Robert Morris University", "Rochester Institute of Technology", "Seton Hall University", "St John Fisher College", "Tufts University", "Villanova University", "Widener University"], "(2, 2, 0, 1, 2, -1, 3)": ["Andrews University", "Carnegie Mellon University", "Case Western Reserve University", "Clarkson University", "Cornell University", "Dartmouth College"], "(0, 2, 0, 0, 2, 1, 3)": ["Arizona State University- Tempe", "University of California- Merced", "Washington State University"], "(0, 2, 0, 0, 2, -1, 3)": ["Ashland University"], "(3, 1, 0, 1, 2, 1, 3)": ["Auburn University"], "(0, 1, 0, 1, 2, -1, 3)": ["Azusa Pacific University", "Biola University", "California Institute of Technology", "Pepperdine University", "Stanford University"], "(1, 1, 0, 0, 2, 0, 3)": ["Ball State University"], "(1, 0, 0, 1, 2, -1, 3)": ["Baylor University", "DePaul University", "Edgewood College", "Illinois Institute of Technology", "Loyola University Chicago", "Marquette University", "Rice University", "Saint Louis University", "Southern Methodist University"], "(1, 1, 0, 1, 2, -1, 3)": ["Benedictine University", "Dallas Baptist University", "Maryville University of St. Louis", "Northwestern University", "Texas Christian University", "Washington University in St. Louis"], "(2, 1, 0, 0, 2, 0, 3)": ["Binghamton University- SUNY", "Stony Brook University- SUNY", "University at Albany- SUNY", "University at Buffalo- SUNY", "West Virginia University"], "(2, 0, 0, 1, 2, -1, 3)": ["Boston University", "Brown University", "Clark University", "Columbia University", "Drexel University", "Duquesne University", "Fordham University", "George Washington University", "Georgetown University", "Harvard University", "Howard University", "Johns Hopkins University", "Lehigh University", "Massachusetts Institute of Technology", "New School", "New York University", "Northeastern University", "Pace University", "Shenandoah University", "St. John's University", "Stevens Institute of Technology", "Suffolk University", "Syracuse University", "The Catholic University of America", "Worcester Polytechnic Institute", "Yale University", "Yeshiva University"], "(2, 2, 0, 0, 2, 1, 2)": ["Bowling Green State University"], "(0, 0, 0, 1, 2, -1, 0)": ["Brigham Young University- Provo"], "(0, 0, 0, 0, 2, 0, 2)": ["California State University- Fresno", "California State University- Fullerton", "San Diego State University"], "(2, 2, 0, 0, 2, 1, 3)": ["Central Michigan University", "University of Rhode Island", "Virginia Tech"], "(3, 1, 0, 0, 2, 1, 3)": ["Clemson University", "University of Alabama"], "(2, 1, 0, 0, 1, 3, 3)": ["College of William & Mary"], "(0, 1, 0, 0, 0, 2, 3)": ["Colorado School of Mines"], "(0, 0, 0, 0, 2, 1, 3)": ["Colorado State University", "University of Arizona", "University of California- Berkeley", "University of California- Los Angeles", "University of California- Riverside", "University of Hawaii- Manoa", "University of Oregon", "University of Washington"], "(3, 1, 0, 1, 2, -1, 3)": ["Duke University", "Lipscomb University", "Nova Southeastern University", "Wake Forest University"], "(3, 0, 0, 0, 2, 0, 3)": ["East Carolina University", "Florida State University", "North Carolina State University- Raleigh", "University of Arkansas", "University of North Carolina- Greensboro"], "(3, 0, 0, 1, 2, -1, 3)": ["Emory University", "Florida Institute of Technology", "Mercer University", "Tulane University", "Union University", "Vanderbilt University"], "(3, 2, 0, 1, 2, -1, 3)": ["Gardner Webb University"], "(2, 1, 0, 0, 2, 1, 3)": ["George Mason University", "Michigan State University", "Montclair State University", "Ohio University", "University of Delaware", "University of Maryland College Park", "University of Maryland- Baltimore County", "University of Massachusetts- Boston"], "(3, 0, 0, 0, 2, 1, 3)": ["Georgia Institute of Technology", "Louisiana State University- Baton Rogue", "University of Alabama- Birmingham", "University of Georgia", "University of Kentucky", "University of South Carolina", "University of Tennessee"], "(1, 0, 0, 0, 2, 1, 3)": ["Illinois State University", "Indiana University- Bloomington", "Ohio State University- Columbus", "Purdue University-West Lafayette", "Texas A&M University- College Station", "Texas Tech University", "University of Chicago", "University of Cincinnati", "University of Houston", "University of Illinois- Chicago", "University of Kansas", "University of Louisville", "University of Minnesota- Twin Cities", "University of Missouri- St. Louis", "University of Texas- Austin", "University of Wisconsin- Madison"], "(1, 0, 0, 0, 2, 0, 3)": ["Indiana University- Purdue University- Indianapolis", "Iowa State University", "Kansas State University", "North Dakota State University", "Oklahoma State University", "University of Iowa", "University of Missouri", "University of Missouri- Kansas City", "University of Nebraska- Lincoln", "University of North Dakota", "University of Oklahoma"], "(2, 1, 0, 0, 2, 1, 2)": ["Kent State University"], "(3, 2, 0, 0, 2, 0, 2)": ["Louisiana Tech University"], "(1, 2, 0, 0, 2, 1, 3)": ["Miami University- Oxford"], "(2, 2, 0, 0, 1, 2, 3)": ["Michigan Technological University"], "(3, 2, 0, 0, 2, 0, 3)": ["Mississippi State University", "University of Mississippi"], "(1, 2, 0, 0, 1, 0, 3)": ["Missouri University of Science & Technology"], "(0, 0, 0, 0, 2, 0, 3)": ["Montana State University", "New Mexico State University", "University of Montana", "University of New Mexico", "University of Utah", "Utah State University"], "(2, 0, 0, 0, 1, 2, 3)": ["New Jersey Institute of Technology"], "(1, 1, 0, 1, 2, 1, 3)": ["Northern Illinois University"], "(2, 0, 0, 0, 2, 1, 3)": ["Old Dominion University", "Rutgers University- New Brunswick", "University of Colorado- Denver", "University of Massachusetts- Lowell", "University of Michigan- Ann Arbor", "Virginia Commonwealth University"], "(0, 1, 0, 0, 2, 1, 3)": ["Oregon State University", "University of California- Santa Barbara", "University of California- Santa Cruz"], "(2, 0, 0, 0, 2, 2, 3)": ["Pennsylvania State University- University Park", "Temple University"], "(2, 0, 0, 0, 1, 1, 3)": ["Rutgers University- Newark"], "(0, 0, 0, 1, 2, -1, 3)": ["Seattle Pacific University"], "(1, 2, 0, 0, 2, 0, 1)": ["South Dakota State University"], "(1, 2, 0, 0, 2, 1, 1)": ["Southern Illinois University- Carbondale"], "(2, 0, 0, 0, 0, 0, 2)": ["SUNY College of Environmental Science and Forestry"], "(3, 2, 0, 0, 0, -1, 3)": ["Tennessee Technological University"], "(3, 0, 0, 0, 0, 1, 3)": ["University of Alabama- Huntsville"], "(0, 0, 0, 0, 0, 0, 3)": ["University of Alaska- Fairbanks"], "(0, 0, 0, 1, 2, 1, 3)": ["University of California- Davis"], "(0, 1, 0, 0, 2, 2, 3)": ["University of California- Irvine"], "(0, 0, 0, 0, 2, 2, 3)": ["University of California- San Diego"], "(3, 1, 0, 0, 2, 0, 3)": ["University of Central Florida", "University of Florida", "University of North Carolina- Chapel Hill", "University of North Carolina- Charlotte"], "(3, 2, 0, 0, 2, 1, 3)": ["University of Connecticut"], "(2, 1, 0, 0, 2, -1, 3)": ["University of Dayton", "University of Hartford", "University of Rochester"], "(0, 0, 0, 0, 2, -1, 3)": ["University of Denver", "University of San Diego", "University of San Francisco", "University of the Pacific"], "(0, 2, 0, 0, 1, 0, 3)": ["University of Idaho"], "(1, 0, 0, 0, 2, 2, 3)": ["University of Illinois- Urbana Champaign"], "(0, 1, 0, 0, 2, -1, 3)": ["University of La Verne", "University of Southern California"], "(2, 2, 0, 0, 1, 1, 3)": ["University of Maine"], "(2, 1, 0, 0, 2, 2, 3)": ["University of Massachusetts- Amherst", "University of New Hampshire", "University of Vermont", "University of Virginia"], "(2, 1, 0, 0, 1, 1, 3)": ["University of Massachusetts- Dartmouth"], "(3, 1, 0, 0, 2, -1, 3)": ["University of Miami"], "(2, 0, 0, 0, 2, -1, 3)": ["University of Notre Dame", "University of Pennsylvania"], "(2, 0, 0, 1, 2, 2, 3)": ["University of Pittsburgh"], "(1, 2, 0, 0, 1, 0, 1)": ["University of South Dakota"], "(3, 0, 0, 0, 2, 0, 2)": ["University of South Florida"], "(3, 1, 0, 0, 2, -1, 0)": ["University of Southern Mississippi"], "(1, 0, 0, 0, 2, -1, 3)": ["University of St Thomas", "University of Tulsa"], "(1, 1, 0, 0, 2, 1, 3)": ["University of Texas- Dallas"], "(0, 1, 0, 0, 1, 0, 1)": ["University of Wyoming"], "(2, 0, 0, 0, 2, 1, 1)": ["Western Michigan University"]}
    //   const numArray = [];
    //   ans_perms = cartesian(ansArray)
    //   console.log(ans_perms.length)

    //   for(let i = 0; i < ans_perms.length; i++){
    //       const arr = ans_perms[i];
    //       const temp = [];
    //       for(let j = 0; j < arr.length; j++){
    //           switch(arr[j]){
    //               case "A": temp.push(0); break;
    //               case "B": temp.push(1); break;
    //               case "C": temp.push(2); break;
    //               case "D": temp.push(3); break;
    //               case "E": temp.push(4); break;
    //               case "F": temp.push(5); break;
    //               default: temp.push(-1); break;
    //           }
    //       }
    //       numArray.push(temp);
    //   }
    //   const matches = {};
    //   //Now filter by each question starting from 1
    //   for (const key of Object.keys(answers)) {
    //       let temp = key.substring(1, key.length-1);  
    //       let ot = temp.split(", ")
    //       let t = ot.map(x => parseInt(x, 10));
    //       let matchRate = 0;
    //       for (const perm of numArray){ 

    //         for(let i = 0; i < t.length; i++){
    //             if(perm[i] == t[i]){
    //                 matchRate++;
    //             }
    //         }
    //         if(matchRate > 4){
  
    //             const ar2 = answers[key];
    //             for(let i = 0; i < ar2.length; i++){
    //                 if (!Object.keys(matches).includes(ar2[i])){

    //                     const uSAT = isNaN(scoreArray[0]) ? 1600 : parseInt(scoreArray[0], 10);
    //                     const uACT = isNaN(scoreArray[1]) ? 35 : parseInt(scoreArray[1], 10)
    //                     const scaledSAT = uSAT/1600
    //                     const scaledACT = uACT/36
                  
                  
    //                     const SATScores = scores["SAT_25th"]
    //                     const ACTScores = scores["ACT_25th"]
                  
    //                     let school_sat_score = parseInt(SATScores[ar2[i]], 10);
    //                     let school_act_score = parseInt(ACTScores[ar2[i]], 10);
                        
    //                     let sat_ratio = 0
    //                     let act_ratio = 0
                        
                        
                  
    //                     if(SATScores[matches[i]] != 'NaN'){
    //                           sat_ratio = Math.abs(1-(uSAT / school_sat_score))
    //                     }
    //                     if(ACTScores[matches[i]] != 'NaN'){
    //                         act_ratio = Math.abs(1-(uACT / school_act_score))
                          
    //                     } 

    //                     if (isNaN(act_ratio)){
    //                         act_ratio = 0
    //                     }
    //                     if (isNaN(sat_ratio)){
    //                         sat_ratio = 0
    //                     }
                       
 
    //                     let ans = {}
                        
    //                     ans["act_ratio"] = act_ratio
    //                     ans["sat_ratio"] = sat_ratio
    //                     ans["overall_match"] = matchRate / 7
                    
                        
    //                     matches[ar2[i]]= ans;
    //                 }
    //             }
    //         }
    //       }

    //   }
    //   return matches

  
    //   if(scaledSAT >= scaledACT){
    //       //Now filter by SAT
    //       const SATScores = scores["SAT_25th"];
    //       for (let i = 0; i < matches.length; i++) {
    //           //SAT
    //           if(SATScores[matches[i]] == 'NaN'){
    //               continue;
    //           }
              
    //           const score = parseInt(SATScores[matches[i]], 10);
    //           if(uSAT > score){
    //               matches2.push(matches[i])
    //           }
    //       }
    //   }else{
    //       //sort by act here
    //       const ACTScores = scores["ACT_25th"];
    //       for (let i = 0; i < matches.length; i++) {
    //           //ACT
             
    //           const score = parseInt(ACTScores[matches[i]], 10);
    //           if(uACT > score){
    //               matches2.push(matches[i])
    //           }
    //       }
    //   }
  
    //   return matches2;
//   }
  
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

    r = fetch('https://us-central1-horizanapp-dae00.cloudfunctions.net/handleUserData', {
        method: 'POST',

        body:JSON.stringify([ansArray,scoreArray])
        
    }).then( res => res.json())
    .then(res => writeUserData(res))
    console.log(r)

    // const tt = handleUserData(ansArray, scoreArray);



    

    


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
