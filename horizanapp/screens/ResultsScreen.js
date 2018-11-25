import React from 'react';
import { StyleSheet, TouchableOpacity, Image, HeaderBackButton , Text, View, AsyncStorage, FlatList, Dimensions } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { NavigationActions, StackActions } from 'react-navigation';
import {Images} from '../Themes';
import { Ionicons } from '@expo/vector-icons';


import './global.js'
import Swiper from 'react-native-swiper';
import { BlurView } from 'expo';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { addFavorite } from '../redux/actions/index'
import { removeFavorite } from '../redux/actions/remove_favorite'

import { bindActionCreators } from 'redux';

import firebase from "@firebase/app"
import "firebase/auth"
import "firebase/database"



const dimensions = Dimensions.get('window');

class ResultsScreen extends React.PureComponent {

  state = {
    signedIn: false,
    stored: false,
    favorites:[],
    user: "test",
    ascending:true, 
    loading:true,
    school_list:null,
    swiper_index:0
    //school_list : this.props.navigation.state.params.school_list

  };

  static navigationOptions = {
    header:null,
    headerVisible:false,
    headerLeft:null,
    style:({borderWidth:1}),
    tabBarIcon: (<Image style={{width:50,tintColor:'black',resizeMode:'contain', height:20, alignSelf:'center',}} source={Images.check_icon}/>),

    title:"Matches",
    tabBarLabel: '',
    // headerLeft:( <HeaderBackButton onPress={()=>{this.props.navigation.navigate('CallToAction')}}/>),

    headerTitle: ( <Text style={{fontSize:20}}>Your Matches</Text>),
    //headerTitleStyle: {flex: 1, textAlign: 'center'},

  };
  componentDidMount(){
    // console.log(this.props.auth)
      // data = firebase.database().ref('Users/' + token + "/schools")
      // data.once('value').then(snapshot => {
      let schools = this.props.school_list
      // console.log("===============")
      // console.log(this.props.favorites);
      // console.log("===============")

      
      var gen_list = Object.keys(schools).map(function(key) {
        return {...schools[key]};
      });
        this.setState({
          school_list:schools,
          school_array:gen_list,
          favorites:this.props.favorites,
          loading:false
        
      
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

  sort(key){
    let data = this.props.school_list.slice()
    if (key.includes("average")){
       
      return data.sort(function(a,b){
        // console.l
        // console.log(a)
        // console.log(key);
        return (parseInt(a[key].replace("$","").replace(",","")) - parseInt(b[key].replace("$","").replace(",","")))
      })
    }

    if (key == "act" || key == "sat"){
      // console.log(data)

      if (key == "sat"){
        // console.log(data.sat_ratio)
        data = data.filter(data => data.sat_ratio > 1);
      }
      if (key == "act"){
        data = data.filter(data => data.act_ratio > 1);
      }
      // console.log(data);
      return data.sort(function(a,b){
        return ((parseInt(b[key].split("-")[0])+parseInt(b[key].split("-")[1]))/2) - ((parseInt(a[key].split("-")[0])+parseInt(a[key].split("-")[1]))/2)
      })
    }
    return data.sort(function(a, b){return b[key] - a[key]})
  }

  handleButton(school){   
   
    if (this.props.favorites.includes(school)){ 
      firebase.database().ref('Users/' + this.props.auth.userid + "/favorites/"+school["schools"].replace(".","_")).remove()
      
      this.props.removeFavorite(school)
    } else {
      let ref = firebase.database().ref('Users/' + this.props.auth.userid + "/favorites")

      let schoolname = school["schools"].replace(".","_")

      ref.update({[schoolname]:school})
      

      this.props.addFavorite(school)
      // console.log(this.props.favorites)
      // console.log(school);
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
    // console.log("favorites below")
    // console.log(this.props.favorites)
    // console.log("favorites above");
    
  if (this.state.loading){
    return <View/>
  } else {
      
    // const hasData = (this.props.navigation.getParam('hasData', 'false') == 'true');
    // const results = hasData ? this.props.navigation.getParam('data', '{ "No results" : "" }') : this.props.navigation.getParam('results', '{ "No results" : "" }');

      //store to user account

      return (

        <View style={{backgroundColor: 'white',flex:1,}} >
        {this.props.auth.logged_in == "yes" ? null:
          <BlurView
          style={styles.blur}
          viewRef={this.state.viewRef}
          tint="dark"
          intensity={96}
        >

          <TouchableOpacity onPress={()=>this.props.navigation.navigate("LoginScreen",{origin:"resultsScreen"})} style={styles.logInButton}>
            <Text style={styles.loginText}>
              Log in to Horizan to see your results!
            </Text>
          </TouchableOpacity>
        </BlurView>
        }

        <View style={{flex:1}}>
        <ScrollableTabView
            style={{marginTop:0, }}
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar />}
          >

            <FlatList
            extraData={this.props.favorites}
            refreshing={true}
              scrollEnabled={this.props.auth.logged_in == "yes"}
              tabLabel="Overall Match"
              style={{backgroundColor: 'white'}}
              data={this.sort("overall_match")}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.schools}
              renderItem={({item}) =>
              <View style={styles.flatview}>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('DetailsScreen', { university: item })}} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                  <Text style={[styles.left]}>{item["schools"]}</Text><Text style={[styles.right]}> {(item.overall_match*100).toFixed(2)}% </Text>
                  <TouchableOpacity style={styles.favorite}  onPress={()=>this.handleButton(item)}>
                  <Ionicons  name={this.props.favorites.some(e => e.schools == item.schools) ? "ios-star":"ios-star-outline"} size={32} color={this.props.favorites.some(e => e.schools == item.schools) ?"yellow":"grey"} />
                  </TouchableOpacity>
              </TouchableOpacity>
            </View>
              }
            />
           {this.props.school_list.slice().filter(item => item.act_ratio > 1).length > 0 ? 
            <FlatList
              scrollEnabled={this.props.auth.logged_in == "yes"}
              tabLabel="ACT"
              style={{backgroundColor: 'white'}}
              data={this.sort("act")}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.schools}
              renderItem={({item}) =>
              <View style={styles.flatview}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                  <Text style={[styles.left]}>{item["schools"]}</Text><Text style={[styles.right]}> {item["act"]} </Text>
                  <TouchableOpacity style={styles.favorite}  onPress={()=>this.handleButton(item)}>
                  <Ionicons  name={this.props.favorites.some(e => e.schools == item.schools) ? "ios-star":"ios-star-outline"} size={32} color={this.props.favorites.some(e => e.schools == item.schools) ?"yellow":"grey"} />
                  </TouchableOpacity>
              </TouchableOpacity>
            </View>
              }
            />
            : 
            <View tabLabel="ACT" style={{justifyContent:'center', alignItems:'center', padding:20, flex:1}}>
               <Text style={{textAlign:'center',fontSize:20}}>
                  You ACT score is too low to match with any schools..
               </Text>

            </View>
            }
             {this.props.school_list.slice().filter(item => item.sat_ratio > 1).length > 0 ? 
            <FlatList
              scrollEnabled={this.props.auth.logged_in == "yes"}
              tabLabel="SAT"
              style={{backgroundColor: 'white'}}
              data={this.sort("sat")}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.schools}
              renderItem={({item}) =>
              <View style={styles.flatview}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                  <Text style={[styles.left]}>{item["schools"]}</Text><Text style={[styles.right]}> {item["sat"]} </Text>
                  <TouchableOpacity style={styles.favorite}  onPress={()=>this.handleButton(item)}>
                  <Ionicons  name={ this.props.favorites.some(e => e.schools == item.schools) ? "ios-star":"ios-star-outline"} size={32} color={this.props.favorites.some(e => e.schools == item.schools)?"yellow":"grey"} />

                  </TouchableOpacity>
              </TouchableOpacity>
            </View>
              }
            />
            : 
            <View tabLabel="SAT" style={{justifyContent:'center', alignItems:'center', padding:20, flex:1}}>
               <Text style={{textAlign:'center',fontSize:20}}>
                  You SAT score is too low to match with any schools..
               </Text>

            </View>
            }

            {this.props.auth.income_bracket == "all" ? null :
              <FlatList
              scrollEnabled={this.props.auth.logged_in == "yes"}
              tabLabel="Cost"
              style={{backgroundColor: 'white'}}
              data={this.sort(this.props.auth.income_bracket)}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.schools}
              renderItem={({item}) =>
              <View style={styles.flatview}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                  <Text style={[styles.left]}>{item["schools"]}</Text><Text style={[styles.right]}> {item[this.props.auth.income_bracket]} </Text>
                  <TouchableOpacity style={styles.favorite}  onPress={()=>this.handleButton(item)}>
                  <Ionicons  name={ this.props.favorites.some(e => e.schools == item.schools) ? "ios-star":"ios-star-outline"} size={32} color={this.props.favorites.some(e => e.schools == item.schools) ?"yellow":"grey"} />

                  </TouchableOpacity>
              </TouchableOpacity>
            </View>
              }
            />
            }

          </ScrollableTabView>
          </View>
        </View>
      );
  }
}
}


const styles = StyleSheet.create({
  favorite:{
  
    justifyContent:'center',
    alignItems:'center',
  },
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
  return { favorites: state.favorites, auth:state.auth, school_list:state.school_list};
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addFavorite,
    removeFavorite
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ResultsScreen);

