import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default styles = StyleSheet.create({
    container: {
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
    },
    title: {
      textAlign: 'center',
      fontSize: 30,
      marginBottom: 0,
      fontFamily: 'mainFontBold',
    },
    para: {
      textAlign: 'center',
      fontSize: 15,
      marginBottom: 0,
      fontFamily: 'mainFont',
    },
    whitetitle: {
      color: 'white',
      textAlign: 'center',
      fontSize: 30,
      marginBottom: 0,
      fontFamily: 'mainFontBold',
    },
    whitetext: {
      color: 'white',
      textAlign: 'center',
      fontSize: 22,
      marginBottom: 0,
      fontFamily: 'mainFontBold',
    },
    button: {
      backgroundColor: '#0400CF',
      height: 66,
      justifyContent: 'center'
    },
    input: {
      color: 'black',
      width: 200,
      fontSize: 25,
      marginBottom: 50,
      borderColor: '#0400CF',
      borderBottomWidth: 4,
      paddingBottom: 5,
      textAlign: 'center'
    },
    logoimage: {
      justifyContent: 'center',
      alignItems: 'center',
      width: deviceWidth / 1.2,
      resizeMode: 'contain' }
  });