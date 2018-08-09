import React, { Component } from 'react';
import { WebView } from 'react-native';

class FormScreen extends Component {

    static navigationOptions = {
        tabBarLabel: '',
        headerStyle: {
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0,
          }
      };

    render() {
        return (
            <WebView 
                source={{uri: 'http://daltonding.com/horizantestform/'}}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={{ flex: 1 }}
            />
        );
    }
}
//daltonding.com/horizantestform/
//old uri: 'https://horizanapp.typeform.com/to/T61uiD'
const styles = {
    typeformStyle: {
        padding: 100
    }
};


export default FormScreen;