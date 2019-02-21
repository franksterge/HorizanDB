import React from 'react';
import { ScrollView, Dimensions, StyleSheet, View, Text, Button, FlatList, Image, TouchableOpacity, Platform} from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import styles from '../styles.js'

const {height, width} = Dimensions.get('window');

export default class SurveysScreen extends React.Component {

  constructor(props){
      super(props)

      this.state = {

        userschools: [
        {
          imgUrl: require('../assets/images/harvard.jpg'),
          title: "A University",
          para: "95% Match\n",
          header: 0
        },
        {
          imgUrl: require('../assets/images/harvard.jpg'),
          title: "B University",
          para: "95% Match",
          header: 0
        },
        {
          imgUrl: require('../assets/images/harvard.jpg'),
          title: "C University",
          para: "95% Match",
          header: 0
        },
        {
          imgUrl: require('../assets/images/harvard.jpg'),
          title: "D University",
          para: "95% Match",
          header: 0
        }]
      
      }

      this.arrayholder = this.state.userschools;
  }

  static navigationOptions = {
    title: '',
    headerRight: (
      <TouchableOpacity onPress={() => alert('This is a button!')} color="#000">
        <Ionicons name='md-add' size={25} style={{ marginRight:10, padding:5, color: "#000" }} />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity onPress={() => alert('This is a button!')} color="#000">
        <MaterialIcons name='filter-list' size={25} style={{ marginLeft:10, padding:5, color: "#000" }} />
      </TouchableOpacity>
    ),
    headerStyle: { 
      backgroundColor: 'white', 
      borderBottomColor: 'white',
      elevation: 0 
    }
  };

  render() {
    return (
      <FlatList
        data={this.state.userschools}
        style={styles.container} showsVerticalScrollIndicator={false} scrollEnabled={true} contentContainerStyle={{flexGrow: 1, marginTop: -60, paddingBottom: 20}}
        keyExtractor={item => item.title}
        renderItem={({ item, key }) => {
          if(item.header == 1) {
            return(
            <View style={styles.welcomeContainer}>
                <Text style={styles.headingText}>My Surveys</Text>
              </View>
              );
          }else{
            return(
              <View key={key} style={{height: height/5, marginBottom: 10,}}>
              <View style={[styles.cardInListNS, {flexDirection: 'row'}]}>
                <View style={[styles.imgContainer2, {margin: 10}]}>
                    <Image 
                    style={styles.canvasThumb}
                    resizeMode="cover"
                    source={item.imgUrl}/>
                </View>
                <View style={[styles.cardTextContainer, {flex: 2}]}>
                  <Text style={styles.cardTitle}>
                    {item.title}
                    </Text>
                    <Text style={styles.cardPara}>
                    {item.para}
                    </Text>
                  </View>
              </View>
            </View>
            );
          }
        }}
      />
      /*<ScrollView style={styles.container} showsVerticalScrollIndicator={false} scrollEnabled={true} contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
        <View style={styles.welcomeContainer}>
              <Text style={styles.headingText}>My Schools</Text>
          </View>
      </ScrollView>*/
    );
  }
}
