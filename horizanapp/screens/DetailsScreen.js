import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';

export default class SettingsScreen extends React.Component {
    
    static navigationOptions = {
        tabBarLabel: '',
        headerStyle: {
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0,
          }
      };

      render() {
        const univ = this.props.navigation.getParam('university', '');
        return (
            <WebView 
                source={{uri: 'https://www.google.com/search?q=' + encodeURIComponent(univ)}}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={{ flex: 1 }}
            />
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
