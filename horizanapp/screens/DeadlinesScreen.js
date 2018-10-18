import React from 'react';
import { StyleSheet, TouchableOpacity, Image, HeaderBackButton , Text, View, AsyncStorage, FlatList, Dimensions } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { NavigationActions, StackActions } from 'react-navigation';
import {Images} from '../Themes';
import moment from 'moment';


import './global.js'
import Swiper from 'react-native-swiper';
import { BlurView } from 'expo';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { addFavorite } from '../redux/actions/index'
import { removeFavorite } from '../redux/actions/remove_favorite'

import { bindActionCreators } from 'redux';

import firebase from "@firebase/app"
import "firebase/auth"
import "firebase/database"
import { deadlines }  from "../assets/deadlines"

class DeadlinesScreen extends React.Component {

  state = {
    signedIn: false,
    stored: false,
    deadlines:deadlines,
    favorites:[],
    user: "test",
    ascending:true, 
    logged_in:false,
    loading:true,
    school_list:null,
    swiper_index:0
    //school_list : this.props.navigation.state.params.school_list

  };

  static navigationOptions = {
    tabBarLabel: '',
    tabBarIcon: (<Image style={{width:50,tintColor:'black',resizeMode:'contain', height:20, alignSelf:'center',}} source={Images.clock_icon}/>),

    Tile:"Deadlines",
    // headerLeft:( <HeaderBackButton onPress={()=>{this.props.navigation.navigate('CallToAction')}}/>),

    headerTitle: ( <Text style={{fontSize:20}}>Your Matches</Text>),
    //headerTitleStyle: {flex: 1, textAlign: 'center'},

  };
  componentDidMount(){

    

    AsyncStorage.getItem('logged_in').then((token) => {
      console.log("DONE")
      // data = firebase.database().ref('Users/' + token + "/schools")
      // data.once('value').then(snapshot => {
      let logged_in = token=="yes";
      let schools = this.props.navigation.getParam('school_list', '')
      var gen_list = Object.keys(schools).map(function(key) {
        return {...schools[key]};
      });
      console.log(token)
        this.setState({
          school_list:schools,
          logged_in:logged_in,
          user:this.props.navigation.getParam('userid', ''),
          school_array:gen_list,
          loading:false
        })
      
      })          
      
  }

  _handleHome = () => {
    this.props.navigation.navigate("CallToAction")
  }

  // setupSurveysListener() {
  //   firebase.database().ref('surveys/users/' + global.user.uid).on('value', (snapshot) => {
  //       snapshot.forEach(function(_child){
  //         console.log(_child.val().data)
  //     });
  //   });
  // }

  swiperIndexChanged(index){
    this.setState({swiper_index:index})
  }
  adjust(index){
    if (this.state.swiper_index == 0 && index == 2){
      return 2
    } else if (this.state.swiper_index == 2 && index == 0){
      return -2
    }

    if (this.state.swiper_index == index){
      return 0
    } else if (this.state.swiper_index < index){
      return 1
    } else {
      return -1
    }
  }

  sort(){
          
    let data = this.state.school_array.slice()
    

    // if (key == "ACT" || key == "SAT"){
      
      return data.sort(function(a,b){
        if(deadlines[b.Schools]["regularDecisionDeadline"] == "rolling"){
          return -1;
        } 
        if(deadlines[a.Schools]["regularDecisionDeadline"] == "rolling"){
          return 1;
        }  
        return Date.parse(deadlines[b.Schools]["regularDecisionDeadline"]) - Date.parse(deadlines[a.Schools]["regularDecisionDeadline"])
      })
    
    // return data.sort(function(a, b){return b[key] - a[key]})
  }

  handleButton(school){

    { this.props.favorites.includes(school) ? 
      this.props.removeFavorite(school)
      :
      this.props.addFavorite(school)
    }

    // let favs = this.state.favorites
    // if (favs.includes(school)){
    //   var index = favs.indexOf(school);
      
    //     favs.splice(index, 1);
      
    // } else {
    //   favs.push(school)
    // }

  }


  render() {
    
  if (this.state.loading){
    return <View/>
  } else {
      
    console.log(this.props.favortes);
    // const hasData = (this.props.navigation.getParam('hasData', 'false') == 'true');
    // const results = hasData ? this.props.navigation.getParam('data', '{ "No results" : "" }') : this.props.navigation.getParam('results', '{ "No results" : "" }');

      //store to user account


      return (

        
        
        
        <View style={{backgroundColor: 'white',flex:1,}} >
        {this.state.logged_in ? null:
          <BlurView
          style={styles.blur}
          viewRef={this.state.viewRef}
          tint="dark"
          intensity={96}
        >

          <TouchableOpacity onPress={()=>this.props.navigation.navigate("LoginScreen", {school_list: this.state.school_list,origin:"resultsScreen"})} style={styles.logInButton}>
            <Text style={styles.loginText}>
              Log in to Horizan to see your results!
            </Text>
          </TouchableOpacity>
        </BlurView>
        }

        <View style={{flex:1}}>


            <FlatList
              scrollEnabled={this.state.logged_in}
              tabLabel="Overall Match"
              style={{backgroundColor: 'white'}}
              data={this.sort()}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.Schools}
              renderItem={({item}) =>
              <View style={styles.resultBox}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                    <Text style={[styles.left]}>{item["Schools"]}</Text><Text style={[styles.right]}> {this.state.deadlines[item["Schools"]]["regularDecisionDeadline"] == "rolling" ? "rolling" : moment(this.state.deadlines[item["Schools"]]["regularDecisionDeadline"]).format('YYYY-MM-DD ')} </Text>
             
                </TouchableOpacity>
              </View>
              }
            />
       

          

          </View>
        </View>
      );
  
  }
}
}




const styles = StyleSheet.create({
  wrapper:{},
  right: {
    textAlign: 'center',
    fontSize: 15,
    flex:0.3,
    marginBottom: 0,
    fontFamily: 'mainFont',
  },
  left:{
    
    textAlign: 'center',
    fontSize: 15,
    flex:0.7,
    marginBottom: 0,
    fontFamily: 'mainFont',
  },
  button: {
    backgroundColor: '#0400CF',
    height: 66,
    flexDirection:'row',
    justifyContent: 'center'
  },
  blur:{
    height:"75%", 
    borderTopRightRadius:5,
    borderTopLeftRadius:5, 
    justifyContent:'center', 
    alignItems:'center',
    position:'absolute',
    bottom:0,
    width:"100%",
    zIndex:5

  },
  logInButton:{

    height:75,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    width:'80%',
    backgroundColor:"#3090C7"
  },
  loginText:{
    fontWeight:"300",
    fontSize:17,
    color:'white',

  },
  
  
});


const mapStateToProps = state => {
  return { favorites: state.favorites };
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addFavorite,
    removeFavorite
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DeadlinesScreen);

