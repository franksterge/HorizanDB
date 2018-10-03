import React from 'react';
import { StyleSheet, TouchableOpacity, HeaderBackButton , Text, View, AsyncStorage, FlatList, Dimensions } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { NavigationActions, StackActions } from 'react-navigation';
import './global.js'
import Swiper from 'react-native-swiper';
import { BlurView } from 'expo';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';



import firebase from "@firebase/app"
import "firebase/auth"
import "firebase/database"

const dimensions = Dimensions.get('window');

export default class ResultsScreen extends React.PureComponent {

  state = {
    signedIn: false,
    stored: false,
    user: "test",
    ascending:true, 
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

  sort(key){
    let data = this.state.school_array.slice()
    if (key == "ACT" || key == "SAT"){
      
      return data.sort(function(a,b){
        return ((parseInt(b[key].split("-")[0])+parseInt(b[key].split("-")[1]))/2) - ((parseInt(a[key].split("-")[0])+parseInt(a[key].split("-")[1]))/2)
      })
    }
    return data.sort(function(a, b){return b[key] - a[key]})
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
        

        <View style={{flex:1}}>
        <ScrollableTabView
            style={{marginTop:0, }}
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar />}
          >
            <FlatList
              tabLabel="Overall Match"
              style={{backgroundColor: 'white'}}
              data={this.sort("overall_match")}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.Schools}
              renderItem={({item}) =>
              <View style={styles.resultBox}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                    <Text style={[styles.left]}>{item["Schools"]}</Text><Text style={[styles.right]}> {(item.overall_match*100).toFixed(2)}% </Text>
                </TouchableOpacity>
              </View>
              }
            />
            <FlatList
              tabLabel="University Quality"
              style={{backgroundColor: 'white'}}
              data={this.sort("Overall")}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.Schools}
              renderItem={({item}) =>
              <View style={styles.flatview}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                    <Text style={[styles.left]}>{item["Schools"]}</Text><Text style={[styles.right]}> {item.Overall} </Text>
                </TouchableOpacity>
              </View>
              }
            />
            <FlatList
              tabLabel="ACT"
              style={{backgroundColor: 'white'}}
              data={this.sort("ACT")}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.Schools}
              renderItem={({item}) =>
              <View style={styles.flatview}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                    <Text style={[styles.left]}>{item["Schools"]}</Text><Text style={[styles.right]}> {item.ACT} </Text>
                </TouchableOpacity>
              </View>
              }
            />
            <FlatList
              tabLabel="SAT"
              style={{backgroundColor: 'white'}}
              data={this.sort("SAT")}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.Schools}
              renderItem={({item}) =>
              <View style={styles.flatview}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                    <Text style={[styles.left]}>{item["Schools"]}</Text><Text style={[styles.right]}> {item.SAT} </Text>
                </TouchableOpacity>
              </View>
              }
            />
            <FlatList
              tabLabel="Community"
              style={{backgroundColor: 'white'}}
              data={this.sort("Community")}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.Schools}
              renderItem={({item}) =>
              <View style={styles.flatview}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                    <Text style={[styles.left]}>{item["Schools"]}</Text><Text style={[styles.right]}> {item.Community} </Text>
                </TouchableOpacity>
              </View>
              }
            />
            <FlatList
              tabLabel="Internships"
              style={{backgroundColor: 'white'}}
              data={this.sort("Internships")}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.Schools}
              renderItem={({item}) =>
              <View style={styles.flatview}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                    <Text style={[styles.left]}>{item["Schools"]}</Text><Text style={[styles.right]}> {item.Internships} </Text>
                </TouchableOpacity>
              </View>
              }
            />
            <FlatList
              tabLabel="Crime"
              style={{backgroundColor: 'white'}}
              data={this.sort("Crime")}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.Schools}
              renderItem={({item}) =>
              <View style={styles.flatview}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { university: item })} style={[styles.button, { alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor: '#e0e0e0', margin: 5}]} >
                    <Text style={[styles.left]}>{item["Schools"]}</Text><Text style={[styles.right]}> {item.Crime} </Text>
                </TouchableOpacity>
              </View>
              }
            />


          </ScrollableTabView>
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
  
  
});

