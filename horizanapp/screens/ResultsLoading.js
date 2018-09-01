import React from 'react';
import * as Progress from 'react-native-progress';
import { StyleSheet, Text, View, AsyncStorage, Image} from 'react-native';
import styles from './Styles/ResultsLoadingStyle';
import {Images} from '../Themes';
import * as firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/functions'
import {scores} from './scores_dict';





export default class ResultsLoading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       user:"test",
       loading:true,
       
    }
  }


  componentDidMount(){
    AsyncStorage.getItem('userid').then((token) => {
      console.log("DONE")
      this.setState({//user: token,
                      loading:false})
    })
  }



  render() {
    if (this.state.loading){
      return <View/>
    } else{

    
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }

    function cartesian(arg) {
      var r = [], max = arg.length-1;
      function helper(arr, i) {
          for (var j=0, l=arg[i].length; j<l; j++) {
              var a = arr.slice(0); // clone arr
              a.push(arg[i][j]);
              if (i==max)
                  r.push(a);
              else
                  helper(a, i+1);
          }
      }
      helper([], 0);
      return r;
  }

    writeUserData = (email,schools) => {
      firebase.database().ref('Users/').push({
          email,
          schools,
      }).then((data)=>{
          //success callback
          console.log('data ' , data)
      }).catch((error)=>{
          //error callback
          console.log('error ' , error)
      })
  }

    handleUserData = (ans, scoreArray) => {
      //First parse array to get only the letter choices
      //Then take the letter choices and filter starting from the beginning
      //let numArr = [];
      const ansArray = [];
      for (var i = 0; i < ans.length; i++){
        ansArray.push(ans[i].split(''))
      }
      
      // for(let i = 0; i < ans.length; i++){
      //     let line = ans[i];
      //     console.log(line)
      //     if(line != null){
      //         if(Array.isArray(line)){   //if theres this then parse differently
      //             const tmpArray = [];
      //             for(let j = 0; j < line.length; j++){
      //                 let temp = line[j].toString().split(". ")
      //                 tmpArray.push(temp[0]);
      //             }
      //             ansArray.push(tmpArray);
      //         }else{
      //             line = line.toString().split("\r\n");
      //             const tmpArray = [];
      //             for(let j = 0; j < line.length; j++){
      //                 let temp = line[j].toString().split(". ")
      //                 tmpArray.push(temp[0]);
      //             }
      //             ansArray.push(tmpArray);
      //         }
      //     }else{
      //         console.log("undefined here")
      //         ansArray.push([""]);
      //     }
      // }
      const answers = {"(2, 1, 0, 1, 2, -1, 3)": ["Adelphi University", "American University", "Boston College", "Brandeis University", "Hofstra University", "Immaculata University", "Lesley University", "Princeton University", "Rensselaer Polytechnic Institute", "Robert Morris University", "Rochester Institute of Technology", "Seton Hall University", "St John Fisher College", "Tufts University", "Villanova University", "Widener University"], "(2, 2, 0, 1, 2, -1, 3)": ["Andrews University", "Carnegie Mellon University", "Case Western Reserve University", "Clarkson University", "Cornell University", "Dartmouth College"], "(0, 2, 0, 0, 2, 1, 3)": ["Arizona State University- Tempe", "University of California- Merced", "Washington State University"], "(0, 2, 0, 0, 2, -1, 3)": ["Ashland University"], "(3, 1, 0, 1, 2, 1, 3)": ["Auburn University"], "(0, 1, 0, 1, 2, -1, 3)": ["Azusa Pacific University", "Biola University", "California Institute of Technology", "Pepperdine University", "Stanford University"], "(1, 1, 0, 0, 2, 0, 3)": ["Ball State University"], "(1, 0, 0, 1, 2, -1, 3)": ["Baylor University", "DePaul University", "Edgewood College", "Illinois Institute of Technology", "Loyola University Chicago", "Marquette University", "Rice University", "Saint Louis University", "Southern Methodist University"], "(1, 1, 0, 1, 2, -1, 3)": ["Benedictine University", "Dallas Baptist University", "Maryville University of St. Louis", "Northwestern University", "Texas Christian University", "Washington University in St. Louis"], "(2, 1, 0, 0, 2, 0, 3)": ["Binghamton University- SUNY", "Stony Brook University- SUNY", "University at Albany- SUNY", "University at Buffalo- SUNY", "West Virginia University"], "(2, 0, 0, 1, 2, -1, 3)": ["Boston University", "Brown University", "Clark University", "Columbia University", "Drexel University", "Duquesne University", "Fordham University", "George Washington University", "Georgetown University", "Harvard University", "Howard University", "Johns Hopkins University", "Lehigh University", "Massachusetts Institute of Technology", "New School", "New York University", "Northeastern University", "Pace University", "Shenandoah University", "St. John's University", "Stevens Institute of Technology", "Suffolk University", "Syracuse University", "The Catholic University of America", "Worcester Polytechnic Institute", "Yale University", "Yeshiva University"], "(2, 2, 0, 0, 2, 1, 2)": ["Bowling Green State University"], "(0, 0, 0, 1, 2, -1, 0)": ["Brigham Young University- Provo"], "(0, 0, 0, 0, 2, 0, 2)": ["California State University- Fresno", "California State University- Fullerton", "San Diego State University"], "(2, 2, 0, 0, 2, 1, 3)": ["Central Michigan University", "University of Rhode Island", "Virginia Tech"], "(3, 1, 0, 0, 2, 1, 3)": ["Clemson University", "University of Alabama"], "(2, 1, 0, 0, 1, 3, 3)": ["College of William & Mary"], "(0, 1, 0, 0, 0, 2, 3)": ["Colorado School of Mines"], "(0, 0, 0, 0, 2, 1, 3)": ["Colorado State University", "University of Arizona", "University of California- Berkeley", "University of California- Los Angeles", "University of California- Riverside", "University of Hawaii- Manoa", "University of Oregon", "University of Washington"], "(3, 1, 0, 1, 2, -1, 3)": ["Duke University", "Lipscomb University", "Nova Southeastern University", "Wake Forest University"], "(3, 0, 0, 0, 2, 0, 3)": ["East Carolina University", "Florida State University", "North Carolina State University- Raleigh", "University of Arkansas", "University of North Carolina- Greensboro"], "(3, 0, 0, 1, 2, -1, 3)": ["Emory University", "Florida Institute of Technology", "Mercer University", "Tulane University", "Union University", "Vanderbilt University"], "(3, 2, 0, 1, 2, -1, 3)": ["Gardner Webb University"], "(2, 1, 0, 0, 2, 1, 3)": ["George Mason University", "Michigan State University", "Montclair State University", "Ohio University", "University of Delaware", "University of Maryland College Park", "University of Maryland- Baltimore County", "University of Massachusetts- Boston"], "(3, 0, 0, 0, 2, 1, 3)": ["Georgia Institute of Technology", "Louisiana State University- Baton Rogue", "University of Alabama- Birmingham", "University of Georgia", "University of Kentucky", "University of South Carolina", "University of Tennessee"], "(1, 0, 0, 0, 2, 1, 3)": ["Illinois State University", "Indiana University- Bloomington", "Ohio State University- Columbus", "Purdue University-West Lafayette", "Texas A&M University- College Station", "Texas Tech University", "University of Chicago", "University of Cincinnati", "University of Houston", "University of Illinois- Chicago", "University of Kansas", "University of Louisville", "University of Minnesota- Twin Cities", "University of Missouri- St. Louis", "University of Texas- Austin", "University of Wisconsin- Madison"], "(1, 0, 0, 0, 2, 0, 3)": ["Indiana University- Purdue University- Indianapolis", "Iowa State University", "Kansas State University", "North Dakota State University", "Oklahoma State University", "University of Iowa", "University of Missouri", "University of Missouri- Kansas City", "University of Nebraska- Lincoln", "University of North Dakota", "University of Oklahoma"], "(2, 1, 0, 0, 2, 1, 2)": ["Kent State University"], "(3, 2, 0, 0, 2, 0, 2)": ["Louisiana Tech University"], "(1, 2, 0, 0, 2, 1, 3)": ["Miami University- Oxford"], "(2, 2, 0, 0, 1, 2, 3)": ["Michigan Technological University"], "(3, 2, 0, 0, 2, 0, 3)": ["Mississippi State University", "University of Mississippi"], "(1, 2, 0, 0, 1, 0, 3)": ["Missouri University of Science & Technology"], "(0, 0, 0, 0, 2, 0, 3)": ["Montana State University", "New Mexico State University", "University of Montana", "University of New Mexico", "University of Utah", "Utah State University"], "(2, 0, 0, 0, 1, 2, 3)": ["New Jersey Institute of Technology"], "(1, 1, 0, 1, 2, 1, 3)": ["Northern Illinois University"], "(2, 0, 0, 0, 2, 1, 3)": ["Old Dominion University", "Rutgers University- New Brunswick", "University of Colorado- Denver", "University of Massachusetts- Lowell", "University of Michigan- Ann Arbor", "Virginia Commonwealth University"], "(0, 1, 0, 0, 2, 1, 3)": ["Oregon State University", "University of California- Santa Barbara", "University of California- Santa Cruz"], "(2, 0, 0, 0, 2, 2, 3)": ["Pennsylvania State University- University Park", "Temple University"], "(2, 0, 0, 0, 1, 1, 3)": ["Rutgers University- Newark"], "(0, 0, 0, 1, 2, -1, 3)": ["Seattle Pacific University"], "(1, 2, 0, 0, 2, 0, 1)": ["South Dakota State University"], "(1, 2, 0, 0, 2, 1, 1)": ["Southern Illinois University- Carbondale"], "(2, 0, 0, 0, 0, 0, 2)": ["SUNY College of Environmental Science and Forestry"], "(3, 2, 0, 0, 0, -1, 3)": ["Tennessee Technological University"], "(3, 0, 0, 0, 0, 1, 3)": ["University of Alabama- Huntsville"], "(0, 0, 0, 0, 0, 0, 3)": ["University of Alaska- Fairbanks"], "(0, 0, 0, 1, 2, 1, 3)": ["University of California- Davis"], "(0, 1, 0, 0, 2, 2, 3)": ["University of California- Irvine"], "(0, 0, 0, 0, 2, 2, 3)": ["University of California- San Diego"], "(3, 1, 0, 0, 2, 0, 3)": ["University of Central Florida", "University of Florida", "University of North Carolina- Chapel Hill", "University of North Carolina- Charlotte"], "(3, 2, 0, 0, 2, 1, 3)": ["University of Connecticut"], "(2, 1, 0, 0, 2, -1, 3)": ["University of Dayton", "University of Hartford", "University of Rochester"], "(0, 0, 0, 0, 2, -1, 3)": ["University of Denver", "University of San Diego", "University of San Francisco", "University of the Pacific"], "(0, 2, 0, 0, 1, 0, 3)": ["University of Idaho"], "(1, 0, 0, 0, 2, 2, 3)": ["University of Illinois- Urbana Champaign"], "(0, 1, 0, 0, 2, -1, 3)": ["University of La Verne", "University of Southern California"], "(2, 2, 0, 0, 1, 1, 3)": ["University of Maine"], "(2, 1, 0, 0, 2, 2, 3)": ["University of Massachusetts- Amherst", "University of New Hampshire", "University of Vermont", "University of Virginia"], "(2, 1, 0, 0, 1, 1, 3)": ["University of Massachusetts- Dartmouth"], "(3, 1, 0, 0, 2, -1, 3)": ["University of Miami"], "(2, 0, 0, 0, 2, -1, 3)": ["University of Notre Dame", "University of Pennsylvania"], "(2, 0, 0, 1, 2, 2, 3)": ["University of Pittsburgh"], "(1, 2, 0, 0, 1, 0, 1)": ["University of South Dakota"], "(3, 0, 0, 0, 2, 0, 2)": ["University of South Florida"], "(3, 1, 0, 0, 2, -1, 0)": ["University of Southern Mississippi"], "(1, 0, 0, 0, 2, -1, 3)": ["University of St Thomas", "University of Tulsa"], "(1, 1, 0, 0, 2, 1, 3)": ["University of Texas- Dallas"], "(0, 1, 0, 0, 1, 0, 1)": ["University of Wyoming"], "(2, 0, 0, 0, 2, 1, 1)": ["Western Michigan University"]}
      const numArray = [];
      ans_perms = cartesian(ansArray)
      console.log(ans_perms.length)

      for(let i = 0; i < ans_perms.length; i++){
          const arr = ans_perms[i];
          const temp = [];
          for(let j = 0; j < arr.length; j++){
              switch(arr[j]){
                  case "A": temp.push(0); break;
                  case "B": temp.push(1); break;
                  case "C": temp.push(2); break;
                  case "D": temp.push(3); break;
                  case "E": temp.push(4); break;
                  case "F": temp.push(5); break;
                  default: temp.push(-1); break;
              }
          }
          numArray.push(temp);
      }
      console.log("NUM")
      console.log(numArray)
      console.log(numArray.length)
      const matches = [];
      //Now filter by each question starting from 1
      for (const key of Object.keys(answers)) {
          let temp = key.substring(1, key.length-1);  
          let ot = temp.split(", ")
          let t = ot.map(x => parseInt(x, 10));
          let matchRate = 0;
          for (const perm of numArray){ 

            for(let i = 0; i < t.length; i++){
                if(perm[i] == t[i]){
                    matchRate++;
                }
            }
            if(matchRate > 4){
  
                const ar2 = answers[key];
                for(let i = 0; i < ar2.length; i++){
                    if (!matches.includes(ar2[i])){
                    matches.push(ar2[i]);
                    }
                }
            }
          }

      }
      const matches2 = []
      const uSAT = isNaN(scoreArray[0]) ? 1600 : parseInt(scoreArray[0], 10);
      const uACT = isNaN(scoreArray[1]) ? 35 : parseInt(scoreArray[1], 10)
      const scaledSAT = uSAT/1600
      const scaledACT = uACT/36

  
      if(scaledSAT >= scaledACT){
          //Now filter by SAT
          const SATScores = scores["SAT_25th"];
          for (let i = 0; i < matches.length; i++) {
              //SAT
              if(SATScores[matches[i]] == 'NaN'){
                  continue;
              }
              const score = parseInt(SATScores[matches[i]], 10);
              if(uSAT > score){
                  matches2.push(matches[i])
              }
          }
      }else{
          //sort by act here
          const ACTScores = scores["ACT_25th"];
          for (let i = 0; i < matches.length; i++) {
              //ACT
              if(ACTScores[matches[i]] == 'NaN'){
                  continue;
              }
              const score = parseInt(ACTScores[matches[i]], 10);
              if(uACT > score){
                  matches2.push(matches[i])
              }
          }
      }
  
      return matches2;
  }
  
    let answers = this.props.navigation.state.params.form_results
    console.log(answers)

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

    const tt = handleUserData(ansArray, scoreArray);

    console.log(tt)

    

    writeUserData(this.state.user,tt)


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
