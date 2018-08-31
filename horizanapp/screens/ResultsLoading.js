import React from 'react';
import * as Progress from 'react-native-progress';
import { StyleSheet, Text, View, Image} from 'react-native';
import styles from './Styles/ResultsLoadingStyle';
import {Images} from '../Themes';
import * as firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/functions'



export default class ResultsLoading extends React.Component {
  render() {
    fetch('<Yout Firebase Cloud Function URL>', {
      method: 'POST',
      headers: {
          
      },
      body: JSON.stringify({
          
      })
  })

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
