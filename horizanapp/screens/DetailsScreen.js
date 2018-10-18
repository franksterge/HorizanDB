import React from 'react';
import { StyleSheet, Image, Text, Dimensions, Linking, View, TouchableOpacity, WebView } from 'react-native';
import * as firebase from "firebase/app"
import Swiper from 'react-native-swiper';

// import ans_map from "../assets"

import {Images} from '../Themes';

import { connect } from 'react-redux';
import { addFavorite } from '../redux/actions/index'
import { removeFavorite } from '../redux/actions/remove_favorite'
import { Icon } from 'react-native-elements'

import { bindActionCreators } from 'redux';

class SettingsScreen extends React.Component {
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


    static navigationOptions = {
        tabBarLabel: '',
        headerStyle: {
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0,
          }
      };

      componentDidMount(){
        let univ = this.props.navigation.getParam('university', '');
        console.log(univ.school)
        let data = firebase.database().ref('universities/' + univ.Schools.replace("_","."))
        data.once('value').then(snapshot => {
            
            
            this.setState({
                loading:false,
                school_info: snapshot.val(),
            })
        })

      }

      handleClick = () => {
        let site_addr = this.state.school_info["Websites"]
        Linking.canOpenURL(site_addr).then(supported => {
          if (supported) {
            Linking.openURL(site_addr);
          } else {
            console.log("Internal Error with URI: " + site_addr);
          }
        });
      };


  handleButton(school){

    { this.props.favorites.includes(school) ? 
      this.props.removeFavorite(school)
      :
      this.props.addFavorite(school)
    }
  }
      render() {
          


        if (this.state.loading == false){
    
            let img_name = this.state.school_info["Schools"].toLowerCase().split(" ").join("_")
            console.log(img_name)
        return (
            <View style={styles.container}>

             <View style={styles.univ_img_cont}>
                <Image source={Images[img_name.replace("-","")]} style={styles.univ_img}/>

                </View>
                <View style={styles.header}>
                    <Text style={{fontSize:25, fontWeight:'bold', textAlign:'center',}}>
                        {this.state.school_info.Schools} 
                      
                    </Text>
                    <Icon
                    raised
                    size={20}
                    name='heart'
                    type='font-awesome'
                    color={this.props.favorites.indexOf(this.state.school_info) > -1 ? "#ff0000":"#000000"}
                    onPress={()=>this.handleButton(this.state.school_info)}
                  />
                </View>
                <Swiper
                    showsButtons={true}
                    paginationStyle={{bottom:-10}}
                    loop={false}
                >
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        Type: {this.state.ans_map["School size"][this.state.school_info["School size"]]}
                    </Text>
                    <Text style={styles.infoText}>
                        Average SAT: {this.state.school_info["SAT"]}
                    </Text>
                    <Text style={styles.infoText}>
                        Average ACT: {this.state.school_info["ACT"]}
                    </Text>
                    <Text style={styles.infoText}>
                        Location: {this.state.ans_map["Location"][this.state.school_info["Location"]]}
                    </Text>
                    <Text style={styles.infoText}>
                        Environment: {this.state.ans_map["Environment"][this.state.school_info["Environment"]]}
                    </Text>
                        
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        School Size: {this.state.ans_map["School size"][this.state.school_info["School size"]]}
                    </Text>
                    <Text style={styles.infoText}>
                        Gender: {this.state.ans_map["Gender"][this.state.school_info["Gender"]]}
                    </Text>
                    <Text style={styles.infoText}>
                        In state cost: {this.state.school_info["In state Cost"] != undefined ? "N/A" : this.state.ans_map["In state Cost"][this.state.school_info["In state Cost"]]}
                    </Text>
                    <Text style={styles.infoText}>
                        Out of state cost: {this.state.ans_map["Out state Cost"][this.state.school_info["Out state Cost"]]}
                    </Text>
                </View>

                </Swiper>
                <TouchableOpacity onPress={this.handleClick} style={{width:'75%', marginBottom:50, marginTop:50, borderRadius:15, height:50, justifyContent:'center',alignItems:'center',backgroundColor:'blue'}}>
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
    marginTop:25,
    height:'80%',
    width:'100%',
    paddingLeft:'10%',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'flex-start',

  },
  infoText:{
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
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
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
  export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
  