import React from 'react';
import { StyleSheet, Image, Button, ScrollView, TouchableOpacity, Dimensions, AsyncStorage, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Images} from '../Themes';
import moment from 'moment';


import { connect } from 'react-redux';
import { addFavorite } from '../redux/actions/index'
import { removeFavorite } from '../redux/actions/remove_favorite'
import { deadlines }  from "../assets/deadlines"



import { bindActionCreators } from 'redux';

import { Icon } from 'react-native-elements'


import Swiper from 'react-native-swiper';



class FavoritesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites:[{empty:true}],
    }
  }


  static navigationOptions = {

    tabBarLabel: '',
    title:"Favorites",
    tabBarIcon: (<Image style={{width:50,tintColor:'black',resizeMode:'contain', height:20, alignSelf:'center',}} source={Images.heart_icon}/>),
    // headerLeft:( <HeaderBackButton onPress={()=>{this.props.navigation.navigate('CallToAction')}}/>),

    headerTitle: ( <Text style={{fontSize:20}}>Your Matches</Text>),
    headerRight: <Button title="Back" onPress={()=>{ navigation.goBack(); }} />
    //headerTitleStyle: {flex: 1, textAlign: 'center'},

  };

  _renderItem (item) {
    // console.log(item)
    console.log(item["schools"].toLowerCase().replace(/\./g,""))
   return (
      
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("DetailsScreen",{university:item})}}
        key={item.schools} style={styles.favoritesCardContainer}>

        <View style={styles.cardHeader}>
          <View style={styles.matchBox}>
            <Text style={styles.matchText}> {item.overall_match.toFixed(2)*100}% Match</Text>
          </View>
          <View style={styles.schoolBox}>
            <Text style={styles.schoolText}> {item.schools}</Text>
          </View>
          <View style={styles.deadlineBox}>
            <Text style={styles.deadlineText}> Next deadline: {deadlines[item.schools]["regularDecisionDeadline"] == "rolling" ? "Rolling" : moment(deadlines[item.schools]["regularDecisionDeadline"]).format("LL")}</Text>
          </View>
        </View>
        
          <Image source={Images[item["schools"].toLowerCase().replace(/\./g,"").split(" ").join("_").replace(/&/g,"")]} style={styles.favoriteCardImage}/>
      </TouchableOpacity>
        
    );
    
}
  
  render() {
    var {height, width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{borderBottomWidth:1}}>
            <Text style={styles.headerText}>
              Favorites
            </Text>
          </View>
        </View>
        {this.props.favorites.length == 0? 
        
        <View style={[styles.favoritesCardContainer,{width:'90%',backgroundColor:'#D3D3D3'}]}>
        <Text>
          You don't have any favorites yet..
        </Text>
          <TouchableOpacity style={styles.addSomeButton} onPress={()=>this.props.navigation.navigate("ResultsScreen")}>
          <Text style={{color:'white',fontSize:20,}}>
            Add some!

          </Text>
        </TouchableOpacity>
      </View>
      :
      
        <Swiper 
                    showsButtons={false}
                    showsPagination={false}
                    loop={false}
                >
        {this.props.favorites.map(school => this._renderItem(school))}
        </Swiper>
        }
         <TouchableOpacity style={styles.retakeButton} onPress={()=>this.props.navigation.navigate("FormScreen")}>
            <Text>Retake Questionnaire</Text>
        
          </TouchableOpacity>

        <View style={styles.mightLikeBox}>
          <View style={{ alignSelf:'flex-start',borderBottomWidth:1}}>
            <Text style={styles.headerText}>
              Schools you may like
            </Text>
          </View>
         
          <ScrollView>
            <Text style={{marginTop:15}}> Coming soon..</Text>

          </ScrollView>
        </View>

        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mightLikeBox:{
    width:'100%',
    height:'20%',
    paddingLeft:30,
    justifyContent:'flex-start',
    alignItems:'flex-start',
  },
  headerContainer:{
    height:50, 
    paddingLeft:30,
    width:'100%',
    justifyContent:'flex-end',
    marginBottom:15,

  },
  addSomeButton:{
    height:50, 
    width:'50%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#0400CF',
    marginTop:40,
    borderRadius:10,

  },

  retakeButton:{
    height:'8%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#D3D3D3',
    borderColor:'grey',
    margin:10,
    width:'80%',
    borderRadius:10,

  },
  matchBox:{
    
  },
  matchText:{
    color:'#38ACEC',
    fontSize:12
  },
  schoolText:{
    fontSize:20,

  },
  deadlineText:{
    color:'grey'

  },
  cardHeader:{
    
    flexDirection:'column',
    width:Dimensions.get('window').width*.9,
    
    justifyContent:'flex-start',
    alignItems:'flex-start',
  },
  headerText:{
    marginBottom:10,
    fontSize:30, 
    borderBottomWidth:1, 
    borderColor:'black',
    fontWeight:'bold',
  },
  favoritesCardContainer:{
    padding:8,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:'white',

    height:'75%',
   
  },
  favoriteCardImage:{
    borderRadius:15,
    marginTop:0,
    
    height:'85%', 
    width:Dimensions.get('window').width*.9,
    resizeMode:'cover',
  }
  
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
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
