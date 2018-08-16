import React, { Component } from 'react';
import { WebView, Alert } from 'react-native';

class FormScreen extends Component {

    static navigationOptions = {
        tabBarLabel: '',
        headerStyle: {
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0,
          }
      };

    _onMessage = (message) => {
        if(message.nativeEvent.data.length > 0){
            console.log(message.nativeEvent.data)
            Alert.alert(
                'message.nativeEvent.data'
            );
        }
    }

    render() {
        const jsCode = "window.postMessage(document.getElementByClassName(\"pre\").textContent)"
        return (
            <WebView 
                source={{uri: 'http://daltonding.com/horizantestform/'}}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                onMessage={this._onMessage}
                injectedJavaScript={jsCode}
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