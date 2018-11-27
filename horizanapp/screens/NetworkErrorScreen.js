import React from 'react';
import { StyleSheet,TouchableOpacity, Button, Text, View, ScrollView, Linking } from 'react-native';


export default class NetworkErrorScreen extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "My Profile!",
        headerLeft: null,
      });

      tryAgain = () => {
          console.log("entering")
        if (this.props.navigation.state.params.last_screen == "ResultsLoading"){
            this.props.navigation.navigate("ResultsLoading",{form_results: this.props.navigation.state.params.form_results});
        } else if (this.props.navigation.state.params.last_screen == "InitialLoading"){
            this.props.navigation.navigate("InitialLoading");
        }
      }
  render() {
      console.log(this.props.navigation.state.params.last_screen)
    return (
    <View style={styles.container}>
        <Text style={styles.header}>
            Uh oh...
        </Text>
        <Text style={styles.bodyText}>
            There seems to be a issue with your internet connection{"\n"}
        </Text>

        <Text style={styles.bodyText}>
            Would you like to 
        </Text>

        <TouchableOpacity onPress={this.tryAgain} style={styles.backButton}>
            <Text style={styles.buttonText}>
                Try again?
            </Text>
        
        </TouchableOpacity>
    
    </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
  },
  header:{
      marginBottom:15,
      fontSize:25,
      fontWeight:'bold',
  },
  bodyText:{
      textAlign:'center',
      fontSize:18,
      margin:10,
  },
  buttonText:{
    color:'white',
    fontWeight:'500'
  },
  backButton:{
      height:'10%',
      justifyContent:'center',
      width:'50%',
      alignItems:'center',
      borderRadius:5, 
      backgroundColor:"#0400CF"
  },
  
});

