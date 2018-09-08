import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, WebView } from 'react-native';
import {Images} from '../Themes';


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
            <View style={styles.container}>

             <View style={styles.univ_img_cont}>
                <Image source={Images.public} style={styles.univ_img}/>

                </View>
                <View style={styles.header}>
                    <Text style={{fontSize:25, fontWeight:'bold', textAlign:'center',}}>
                        {univ.school}
                    </Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        School Size:
                    </Text>
                    <Text style={styles.infoText}>
                        Gender:
                    </Text>
                    <Text style={styles.infoText}>
                        In state cost:
                    </Text>
                    <Text style={styles.infoText}>
                        Out of state cost:
                    </Text>
                        
                </View>
                <TouchableOpacity onPress={()=>alert("direct me to school site")} style={{width:'75%', marginTop:50, borderRadius:15, height:50, justifyContent:'center',alignItems:'center',backgroundColor:'blue'}}>
                    <Text style={{color:'white',fontSize:20}}>
                        Visit Website
                    </Text>
                </TouchableOpacity>
               

            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoBox:{
    marginTop:50,
    height:'20%',
    width:'75%',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'flex-start',

  },
  univ_img:{
    height:250,
    resizeMode:'contain',

  },
  univ_img_cont:{
      justifyContent:'center',
      alignItems:'center',
  }

});
