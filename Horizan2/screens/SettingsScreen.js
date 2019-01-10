import React from 'react';
import { ScrollView, Dimensions, StyleSheet, View, Text, Button, FlatList, Image} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import styles from '../styles.js'

const {height, width} = Dimensions.get('window');

export default class SettingsScreen extends React.Component {

  constructor(props){
      super(props)

      this.state = {

        userschools: [
        {
          title: "header placeholder",
          header: 1
        },
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
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <FlatList
        data={this.state.userschools}
        style={styles.container} showsVerticalScrollIndicator={false} scrollEnabled={true} contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}
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

