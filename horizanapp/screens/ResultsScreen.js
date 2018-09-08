import React from 'react';
import { StyleSheet, TouchableOpacity,HeaderBackButton , Text, View, AsyncStorage, FlatList, Dimensions } from 'react-native';
import styles from ".././assets/styles/styles";
import Touchable from 'react-native-platform-touchable';
import { NavigationActions, StackActions } from 'react-navigation';
import './global.js'
import Swiper from 'react-native-swiper';
import { BlurView } from 'expo';



import firebase from "@firebase/app"
import "firebase/auth"
import "firebase/database"

const dimensions = Dimensions.get('window');

export default class ResultsScreen extends React.PureComponent {

  state = {
    signedIn: false,
    stored: false,
    user: "test",
    loading:true,
    school_list:null,
    swiper_index:0
    //school_list : this.props.navigation.state.params.school_list

  };

  static navigationOptions = {
    tabBarLabel: '',
    // headerLeft:( <HeaderBackButton onPress={()=>{this.props.navigation.navigate('CallToAction')}}/>),

    headerTitle: ( <Text style={{fontSize:20}}>Your Matches</Text>),
    //headerTitleStyle: {flex: 1, textAlign: 'center'},

  };
  componentDidMount(){
    

    AsyncStorage.getItem('userid').then((token) => {
      console.log("DONE")
      data = firebase.database().ref('Users/' + token + "/schools")
      data.once('value').then(snapshot => {
        
      var gen_list = Object.keys(snapshot.val()).map(function(key) {
        return {...snapshot.val()[key]};
      });
        this.setState({
          school_list:snapshot.val(),
          user:token,
          school_array:gen_list,
          loading:false
        })
      
      })          
      });
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

  render() {
   
  if (this.state.loading){
    return <View/>
  } else {
    
    
    // const hasData = (this.props.navigation.getParam('hasData', 'false') == 'true');
    // const results = hasData ? this.props.navigation.getParam('data', '{ "No results" : "" }') : this.props.navigation.getParam('results', '{ "No results" : "" }');

      //store to user account
      return (
        
        
        <View style={{backgroundColor: 'white',flex:1,}} >
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around',height:50}}>
        <TouchableOpacity onPress={() => this.swiper.scrollBy(this.adjust(0))} style={[this.state.swiper_index == 0 ? {borderBottomWidth:2, borderBottomColor:'blue'}: null, {height:50, alignItems:'center', justifyContent:'center',flex:1}]}>
          <Text style={{fontSize:20}}> Overall </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.swiper.scrollBy(this.adjust(1))} style={[this.state.swiper_index == 1 ? {borderBottomWidth:2, borderBottomColor:'blue'}: null, {height:50, alignItems:'center', justifyContent:'center',flex:1}]}>
        <Text style={{fontSize:20}}> ACT </Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => this.swiper.scrollBy(this.adjust(2))} style={[this.state.swiper_index == 2 ? {borderBottomWidth:2, borderBottomColor:'blue'}: null, {height:50, alignItems:'center', justifyContent:'center',flex:1}]}>
        <Text style={{fontSize:20}}> SAT </Text>
        </TouchableOpacity>


        </View>
        

        {global.signedIn ? null : 
        <BlurView
        style={{height:"75%", borderRadius:10, justifyContent:'center', alignItems:'center',position:'absolute',bottom:0,width:"100%",zIndex:5}}
          tint={"dark"}
          intensity={98}
        >
        <View style={{flexDirection:'column', justifyContent:'center',alignItems:'center',}}>
          <Text stye={{fontSize:20, color:"white"}}>
            Create an account to see the rest of your matches!
          </Text>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate("LoginScreen")}  style={{ backgroundColor: 'purple', justifyContent:'center', alignItems:'center', borderRadius:10, marginTop:20, padding:15,height:50}}>
            <Text style={{fontSize:15, color: "white"}}> Create an Account </Text>
          </TouchableOpacity>

          

        </View>
        </BlurView>}


        <View style={{flex:1}}>
      <Swiper style={mystyles.wrapper} 
              showsButtons={false}
              loop={false}
              showsPagination={false}
              ref={component => (this.swiper = component)}
              onIndexChanged={index => { this.swiperIndexChanged(index); }}
              paginationStyle={{top:0}}
              >
      <FlatList
              style={{backgroundColor: 'white'}}
              data={this.state.school_array.sort(function(a, b){return b["overall_match"] - a["overall_match"]})}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.school}
              renderItem={({item}) =>
              <View style={styles.flatview}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                    <Text style={[styles.para, {position:'absolute',left:20}]}>{item["school"]}</Text><Text style={[styles.para,{width:55, right:20, position:'absolute'}]}> {(item.overall_match*100).toFixed(2)}% </Text>
                </TouchableOpacity>
              </View>
              }
            />
        <FlatList
              style={{backgroundColor: 'white'}}
              data={this.state.school_array.sort(function(a, b){return b["act_ratio"] - a["act_ratio"]})}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.school}
              renderItem={({item}) =>
              <View style={styles.flatview}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                    <Text style={[styles.para, {position:'absolute',left:20}]}>{item.school}</Text><Text style={[styles.para,{width:55, right:20, position:'absolute'}]}> {(item.act_ratio*100).toFixed(2)}% </Text>
                </TouchableOpacity>
              </View>
              }
            />
            <FlatList
              style={{backgroundColor: 'white'}}
              data={this.state.school_array.sort(function(a, b){return b["sat_ratio"] - a["sat_ratio"]})}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.school}
              renderItem={({item}) =>
              <View style={styles.flatview}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                    <Text style={[styles.para, {position:'absolute',left:20}]}>{item.school}</Text><Text style={[styles.para,{width:55, right:20, position:'absolute'}]}> {(item.sat_ratio*100).toFixed(2)}% </Text>
                </TouchableOpacity>
              </View>
              }
            />
       
          </Swiper>
          </View>
        </View>
      );
  
  }
}
}



const mystyles = StyleSheet.create({
  wrapper:{}
  
});

