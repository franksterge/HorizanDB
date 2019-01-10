import React from 'react';
import { StyleSheet,Button, Image, Text, Dimensions, Linking, View, TouchableOpacity, WebView } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';


// import ans_map from "../assets"

import {Images} from '../Themes';

import { connect } from 'react-redux';
import { addFavorite } from '../redux/actions/index'
import { removeFavorite } from '../redux/actions/remove_favorite'


import { bindActionCreators } from 'redux';

import firebase from "@firebase/app"
import "firebase/auth"
import "firebase/database"

class DetailsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading:true,
            school_info:null,
        
            ans_map : {
            "Location": {
                "A": "West Coast",
                "B": "Central",
                "C":"Northeast",
                "D":"Southeast"
            },
            "Environment": {
                "A": "Urban",
                "B": "Suburban",
                "C":"Rural",
            },
            "Gender": {
                "A": "Coed",
                "B": "Men's only",
                "C":"Women's only",
            },
            "PublicPrivate":{
                "A":"Public",
                "B":"Private"
            },
            "School size":{
                "A":"Small (1-5000 students)",
                "B":"Medium (5001-10000 students)",
                "C":"Large (10001 students +)"
            },
            "Out state Cost":{
                "A":"$10000 or less",
                "B":"$10001-$15000",
                "C":"$15001-$20000",
                "D":"$20001+"
            },
            "In state Cost":{
                "A":"$10000 or less",
                "B":"$10001-$15000",
                "C":"$15001-$20000",
                "D":"$20001+"
            }
        
        }}
    }
   


      static navigationOptions = ({ navigation, screenProps }) => ({
        title: "My Profile!",
        headerLeft: <Button title="Back" onPress={()=>{ navigation.goBack(); }} />,
      });

      componentDidMount(){
      
            this.setState({
                loading:false,
                school_info: this.props.navigation.getParam('university', ''),
            })
        

      }

      handleClick = () => {
        // console.log(this.state.school_info);
        let site_addr = this.state.school_info["websites"]
        Linking.canOpenURL(site_addr).then(supported => {
          if (supported) {
            Linking.openURL(site_addr);
          } else {
            console.log("Internal Error with URI: " + site_addr);
          }
        });
      };


  handleButton(school){

    if (this.props.favorites.includes(school)){ 
        firebase.database().ref('Users/' + this.props.auth.userid + "/favorites/"+school["schools"].replace(/_/g,".")).remove()
        
        this.props.removeFavorite(school)
      } else {
        let ref = firebase.database().ref('Users/' + this.props.auth.userid + "/favorites")
  
        let schoolname = school["schools"].replace(/_/g,".")
        ref.update({[schoolname]:school})
        
  
        this.props.addFavorite(school)
      }
  
  }
      render() {
        //   console.log(this.state.school_info)


        if (this.state.loading == false){
    
            let img_name = this.state.school_info["schools"].toLowerCase().split(" ").join("_")
            // console.log(img_name)
        return (
            <View style={styles.container}>

             <View style={styles.univ_img_cont}>
                <Image source={Images[img_name.replace(/-/g,"")]} style={styles.univ_img}/>

                </View>
                <View style={styles.header}>
                    <Text style={{fontSize:25, fontWeight:'bold', textAlign:'center',}}>
                        {this.state.school_info.schools} 
                      
                    </Text>
                    <TouchableOpacity style={{margin:10,borderRadius:10,borderColor:'grey',backgroundColor:this.props.favorites.indexOf(this.state.school_info) > -1 ? "grey":"white",borderWidth:1,padding:10,flexDirection:'row',alignItems:'center',}}
                                                    onPress={()=>this.handleButton(this.state.school_info)}>
                                                    
                        <Text style={{fontSize:15,}}>{ this.props.favorites.indexOf(this.state.school_info) > -1 ? "Remove from ":"Add to "}favorites </Text>
                        <Ionicons  name={ this.props.favorites.indexOf(this.state.school_info) > -1 ? "ios-star":"ios-star-outline"} 
                                size={20} 
                                color={this.props.favorites.indexOf(this.state.school_info) > -1 ?"yellow":"grey"} 
                                onPress={()=>this.handleButton(this.state.school_info)}/>
                    </TouchableOpacity> 
                   
                </View>
                {this.props.auth.income_bracket == "all" ? 
                <Swiper
                    showsButtons={true}
                    paginationStyle={{bottom:-10}}
                    loop={false}
                >

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        Type: {this.state.ans_map["School size"][this.state.school_info["schoolSize"]]}
                    </Text>
                    <Text style={styles.infoText}>
                        Average SAT: {this.state.school_info["sat"]}
                    </Text>
                    <Text style={styles.infoText}>
                        Average ACT: {this.state.school_info["act"]}
                    </Text>
                    <Text style={styles.infoText}>
                        Location: {this.state.ans_map["Location"][this.state.school_info["location"]]}
                    </Text>
                    <Text style={styles.infoText}>
                        Environment: {this.state.ans_map["Environment"][this.state.school_info["environment"]]}
                    </Text>
                    <Text style={styles.infoText}>
                        School Size: {this.state.ans_map["School size"][this.state.school_info["schoolSize"]]}
                    </Text>
                    <Text style={styles.infoText}>
                        Gender: {this.state.ans_map["Gender"][this.state.school_info["gender"]]}
                    </Text>
                        
                </View>
                <View style={{flex:1,}}>
                <Text style={{alignSelf:'center',}}> Adjusted costs by income bracket</Text>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            $0-$30,000: {[this.state.school_info["averageNetPricePerIncome030000"]]}
                        </Text>
                    
                        <Text style={styles.infoText}>
                            $0-$30,000: {[this.state.school_info["averageNetPricePerIncome3000148000"]]}
                        </Text>
                        <Text style={styles.infoText}>
                            $0-$30,000: {[this.state.school_info["averageNetPricePerIncome4800175000"]]}
                        </Text>
                        <Text style={styles.infoText}>
                            $0-$30,000: {[this.state.school_info["averageNetPricePerIncome75001110000"]]}
                        </Text>


                        <Text style={styles.infoText}>
                            $0-$30,000: {[this.state.school_info["averageNetPricePerIncome110001"]]}
                        </Text>
                </View>
                </View>
                </Swiper>
                :
                <Swiper
                showsButtons={true}
                paginationStyle={{bottom:-10}}
                loop={false}
            >

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                    Type: {this.state.ans_map["School size"][this.state.school_info["schoolSize"]]}
                </Text>
                <Text style={styles.infoText}>
                    Average SAT: {this.state.school_info["sat"]}
                </Text>
                <Text style={styles.infoText}>
                    Average ACT: {this.state.school_info["act"]}
                </Text>
                <Text style={styles.infoText}>
                    Location: {this.state.ans_map["Location"][this.state.school_info["location"]]}
                </Text>
                 
            </View>
            <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                            Environment: {this.state.ans_map["Environment"][this.state.school_info["environment"]]}
                    </Text>
                    <Text style={styles.infoText}>
                        School Size: {this.state.ans_map["School size"][this.state.school_info["schoolSize"]]}
                    </Text>
                    <Text style={styles.infoText}>
                        Gender: {this.state.ans_map["Gender"][this.state.school_info["gender"]]}
                    </Text>
                    <Text style={styles.infoText}>
                        Adjusted Estimated Cost: {[this.state.school_info[this.props.auth.income_bracket]]}
                    </Text>
                    
                </View>
            </Swiper>

                }
                <TouchableOpacity onPress={this.handleClick} style={{width:'75%', marginBottom:25, marginTop:25, borderRadius:15, height:30, justifyContent:'center',alignItems:'center',backgroundColor:'blue'}}>
                    <Text style={{color:'white',fontSize:20}}>
                        Visit Website
                    </Text>
                </TouchableOpacity>
               

            </View>
        );
    } else {
        return <View/>
    }
} 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  wrapper: {
      
    },
  infoBox:{
    marginTop:10,
    height:'100%',
    width:'100%',
    paddingLeft:'10%',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'flex-start',

  },
  infoText:{
      flex:1,
      
    textAlign:'left'
  },    
  univ_img: {
    marginBottom:25,
    flex:1,
    width:Dimensions.get('window').width,
    resizeMode:'cover',

  },
  univ_img_cont:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
  },
  header:{
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
  }

});

const mapStateToProps = state => {
    return { favorites: state.favorites, auth: state.auth };
  };
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addFavorite,
      removeFavorite
    }, dispatch)
  );
  export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
  