import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { StackActions, NavigationActions } from 'react-navigation';
import { WebView, AsyncStorage, TextInput, StyleSheet, TouchableOpacity, Button, TouchableHighlight, Image,  View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './Styles/FormScreenStyles';
import {Images} from '../Themes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import ResultsLoading from './ResultsLoading';
import * as firebase from "firebase/app"
import { connect } from 'react-redux';
import { formComplete } from '../redux/actions/form_complete'
import { bindActionCreators } from 'redux';



import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/database'


class FormScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            ans_array : [
                "Z",//region
                "Z",//urban
                1601,//sat
                37,//act
                "Z",//gender*
                "Z",//pub/priv
                "Z",//size
                "Z",//fam-income
                "Z",
            ]  
        }   
    }


    static navigationOptions = ({ navigation, screenProps }) => ({
        tabBarLabel: '',
        headerLeft: <Button title="Back" onPress={()=>{ navigation.goBack(); }} />,
        headerTitle:<Image style={{height:'70%',width:'70%',resizeMode:'contain'}} source={Images.logo_full}/>,
        headerStyle: {
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0,
          },
        })

    render() {

        const handleFormSubmit = () => {
            // if (if this.state.ans_array[2] == 0 || this.state.ans_array[2] == 0){
                  // this.setState({failed_submit: true})
            // } 
            // if (parseInt(this.state.ans_array[2]) > 1600){
            //         this.setState({  bad_amounts_sat: true})
            // }
            // if (parseInt(this.state.ans_array[3]) > 36){
            //     this.setState({bad_amounts_act: true})
                
            // }
            //     console.log(this.state.ans_array)
            // if (this.state.failed_submit || this.state.bad_amounts_act || this.state.bad_amounts_sat ){
            //     return 
            // } else {
                this.props.formComplete("yes")
                console.log(this.state.ans_array)
                firebase.database().ref('Users/' + this.props.auth.userid + "/forms").set({taken:true, results:this.state.ans_array})
                // console.log("done")
                this.props.navigation.navigate("ResultsLoading", {form_results : this.state.ans_array })
                
            //  }

        }

        const activate_answer = (index, value) => {
            let answer = this.state.ans_array
            if(answer[index] == "Z"){
                answer[index] = value
            } else if (answer[index].includes(value)){
                // console.log("found")
                answer[index] = answer[index].replace(value,"")
            } else {
                    answer[index] += value
                }
            if (answer[index] == ''){
                answer[index] = "Z"
            }
                this.setState({ans_array:answer})
            return
        }


        const activate_single_answer = (index, value) => {
            let answer = this.state.ans_array
            answer[index] = value
            this.setState({ans_array:answer})
            return
        }

        const changeNum = (index, val) => {
            let answer = this.state.ans_array
            answer[index] = val
            this.setState({ans_array:answer})
        }


 

        return (
         <View style={{flex:1,}}>
            <KeyboardAwareScrollView contentContainerStyle={{justifyContent:'space-around'}} style={styles.background}>
            

                <View style={styles.question}>
                    <Text style={styles.questionText}> What region do you see yourself going to school? </Text>
                    <View style={styles.multiChoiceContainer}>
                        <TouchableOpacity onPress = {()=> activate_answer(0,"A")} style={this.state.ans_array[0].includes("A") ? styles.choiceBoxActive : styles.choiceBox}>
                                <Image source={Images.west_coast} style={styles.choiceBoxIcon}/>
                                <Text style={styles.choiceText}> West Coast </Text> 
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_answer(0,"B")} style={this.state.ans_array[0].includes("B") ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.central} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Central </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_answer(0,"C")} style={this.state.ans_array[0].includes("C") ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.north_east} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Northeast </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_answer(0,"D")} style={this.state.ans_array[0].includes("D") ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.south_east} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Southeast </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                 <View style={styles.question}>
                    <Text style={styles.questionText}> Of the following, which is your ideal environment? </Text>
                    <View style={styles.multiChoiceContainer}>
                    <TouchableOpacity onPress = {()=>activate_answer(1,"A")} style={this.state.ans_array[1].includes("A") ? styles.choiceBoxActive : styles.choiceBox}>
                                <Image source={Images.urban} style={styles.choiceBoxIcon}/>
                                <Text style={styles.choiceText}> Urban </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_answer(1,"B")} style={this.state.ans_array[1].includes("B") ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.suburban} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Suburban </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_answer(1,"C")} style={this.state.ans_array[1].includes("C") ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.rural} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Rural </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            
                <View style={styles.question}>
                    <Text style={styles.questionText}> What is your SAT score? </Text>
                    <TextInput style={styles.questionInput}
                                keyboardType={"numeric"}
                                returnKeyType={"done"}
                                maxLength={4}
                                onChangeText={(num) => changeNum(2,num)}
                              />
                    

                </View>
                <View style={styles.question}>
                    <Text style={styles.questionText}> What is your ACT score? </Text>
                    <TextInput style={styles.questionInput}
                                keyboardType={"numeric"}
                                returnKeyType={"done"}
                                maxLength={2}
                                onChangeText={(num) => changeNum(3,num)}
                                />
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionText}>What is your preferred gender distribution? </Text>
                    <View style={styles.multiChoiceContainer}>
                    <TouchableOpacity onPress = {()=>activate_answer(4,"A")} style={this.state.ans_array[4].includes("A") ? styles.choiceBoxActive : styles.choiceBox}>
                                <Image source={Images.coed} style={styles.choiceBoxIcon}/>
                                <Text style={styles.choiceText}> Coed </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_answer(4,"B")} style={this.state.ans_array[4].includes("B") ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.men_only} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Men's only </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_answer(4,"C")} style={this.state.ans_array[4].includes("C") ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.women_only} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Women's only </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionText}> Would you like to attend a public or private school?</Text>
                    <View style={styles.multiChoiceContainer}>
                    <TouchableOpacity onPress = {()=>activate_answer(5,"A")} style={this.state.ans_array[5].includes("A") ? styles.choiceBoxActive : styles.choiceBox}>
                                <Image source={Images.public} style={styles.choiceBoxIcon}/>
                                <Text style={styles.choiceText}> Public </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_answer(5,"B")} style={this.state.ans_array[5].includes("B") ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.private} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Private </Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionText}> What is your preferred school size? </Text>
                <TouchableOpacity onPress = {()=>activate_answer(6,"A")} style={styles.checkBoxStyles}>
                    <Ionicons style={{flex:.3}} name={ this.state.ans_array[6].includes("A") ? "md-checkmark-circle":"md-checkmark-circle-outline"} size={32} color="grey" />
                    <Text style={{flex:1}}>Small (1-5000 students)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>activate_answer(6,"B")} style={styles.checkBoxStyles}>
                    <Ionicons style={{flex:.3}} name={ this.state.ans_array[6].includes("B") ? "md-checkmark-circle":"md-checkmark-circle-outline"} size={32} color="grey" />
                    <Text style={{flex:1}}>Medium (5001-10000 students) </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>activate_answer(6,"C")} style={styles.checkBoxStyles}>
                    <Ionicons style={{flex:.3}} name={ this.state.ans_array[6].includes("C") ? "md-checkmark-circle":"md-checkmark-circle-outline"} size={32} color="grey" />
                    <Text style={{flex:1}}> Large (10001 students +)</Text>
                </TouchableOpacity>
                    
                </View>


                <View style={styles.question}>
                    <Text style={styles.questionText}> What is your total family net income?</Text>
                <TouchableOpacity onPress = {()=>activate_single_answer(7,"A")} style={styles.checkBoxStyles}>
                    <Ionicons style={{flex:.3}} name={ this.state.ans_array[7].includes("A") ? "md-checkmark-circle":"md-checkmark-circle-outline"} size={32} color="grey" />
                    <Text style={{flex:1}}> $30000 or less </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>activate_single_answer(7,"B")} style={styles.checkBoxStyles}>
                    <Ionicons style={{flex:.3}} name={ this.state.ans_array[7].includes("B") ? "md-checkmark-circle":"md-checkmark-circle-outline"} size={32} color="grey" />
                    <Text style={{flex:1}}> $30001-$48000 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>activate_single_answer(7,"C")} style={styles.checkBoxStyles}>
                    <Ionicons style={{flex:.3}} name={ this.state.ans_array[7].includes("C") ? "md-checkmark-circle":"md-checkmark-circle-outline"} size={32} color="grey" />
                    <Text style={{flex:1}}> $48001-$75000 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>activate_single_answer(7,"D")} style={styles.checkBoxStyles}>
                    <Ionicons style={{flex:.3}} name={ this.state.ans_array[7].includes("D") ? "md-checkmark-circle":"md-checkmark-circle-outline"} size={32} color="grey" />
                    <Text style={{flex:1}}> $75001-$110000 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>activate_single_answer(7,"E")} style={styles.checkBoxStyles}>
                    <Ionicons style={{flex:.3}} name={ this.state.ans_array[7].includes("E") ? "md-checkmark-circle":"md-checkmark-circle-outline"} size={32} color="grey" />
                    <Text style={{flex:1}}> $110001+ </Text>
                </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.submitButton}
                                onPress = {()=>handleFormSubmit()}>

                    <Text style={styles.submitText}> Submit </Text>
                </TouchableOpacity>

            </KeyboardAwareScrollView>
            </View>
         
        );
    }
}


  

const mapStateToProps = state => {
    return { auth: state.auth };
  };
  
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      formComplete
    }, dispatch)
  );
export default connect(mapStateToProps, mapDispatchToProps)(FormScreen);
