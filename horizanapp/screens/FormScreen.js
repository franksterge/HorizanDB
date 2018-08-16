import React, { Component } from 'react';
import { StackActions } from 'react-navigation';
import { WebView, Alert, ActivityIndicator } from 'react-native';

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
        let text = message.nativeEvent.data;
        const out = this;
        console.log(text)
        if(text.startsWith("<pre style")){
            const start = text.indexOf("[");
            const end = text.indexOf("]");
            text = text.substring(start, end+1);
            const pushAction = StackActions.push({
                routeName: 'ResultsScreen',
                params: {
                    results: text
                },
              });
            out.props.navigation.dispatch(pushAction);
        }
    }

    renderLoading = () => {
        return(<ActivityIndicator/>);
    }

    render() {
        //const jsCode = "window.postMessage(document.getElementByClassName(\"pre\"))"
        const jsCode = `
        function init() {
            postMessage(document.body.innerHTML);
        }
        function whenRNPostMessageReady(cb) {
            if (postMessage.length === 1) cb();
            else setTimeout(function() { whenRNPostMessageReady(cb) }, 1000);
        }
        if (document.readyState === 'complete') {
            if(window.location.href == 'https://us-central1-horizanapp-dae00.cloudfunctions.net/getUserResults'){
                document.body.style.color = "white";
            }
            whenRNPostMessageReady(init);
        } else {
            window.addEventListener('load', function() {
                if(window.location.href == 'https://us-central1-horizanapp-dae00.cloudfunctions.net/getUserResults'){
                    document.body.style.color = "white";
                }
                whenRNPostMessageReady(init);
            }, false);
        }
    `
        return (
            <WebView 
                source={{uri: 'http://daltonding.com/horizantestform/'}}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                injectedJavaScript={jsCode}
                renderLoading={this.renderLoading.bind(this)}
                onMessage={this._onMessage}
                onShouldStartLoadWithRequest={this.renderLoading.bind(this)}
                onNavigationStateChange = {this.renderLoading.bind(this)} 
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