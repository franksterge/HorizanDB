import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { WebView, AsyncStorage, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight, Image,  View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './Styles/FormScreenStyles';
import {Images} from '../Themes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { CheckBox } from 'react-native-elements';
import ResultsLoading from './ResultsLoading';



class FormScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            failed_submit : false, 
            bad_amounts_sat: false, 
            bad_amounts_act: false, 
            ans_array : [
                "",//region
                "",//urban
                0,//sat*
                0,//act*
                "",//gender*
                "",//pub/priv
                "",//size
                "",//in-state$
                "",//out-state$
            ]

           
        }
        
    }

    static navigationOptions = {
        tabBarLabel: '',
        headerTitle:<Image style={{height:'70%',width:'70%',resizeMode:'contain'}} source={Images.logo_full}/>,
        headerStyle: {
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0,
          },
        }

    render() {

        handleFormSubmit = () => {
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
                
                this.props.navigation.navigate("ResultsLoading", {form_results : this.state.ans_array })
                
            //  }

        }

        activate_answer = (index, value) => {

        
            answer = this.state.ans_array
            if (answer[index].includes(value)){
                console.log("found")
                answer[index] = answer[index].replace(value,"")
            } else {
                    answer[index] += value
                }
                this.setState({ans_array:answer})
            return


        }

        changeNum = (index, val) => {
            answer = this.state.ans_array
            answer[index] = val
            this.setState({ans_array:answer})
        }


 

        return (
         <View style={StyleSheet.absoluteFill}>
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
                    <Text style={styles.questionText}> What is your SAT score? <Text style={{color:'red'}}> * </Text> </Text>
                    <TextInput style={styles.questionInput}
                                keyboardType={"numeric"}
                                returnKeyType={"done"}
                                maxLength={4}
                                onChangeText={(num) => changeNum(2,num)}
                              />
                    { this.state.failed_submit && this.state.answer_three == 0 ? 
                        <Text style={[styles.questionText,{color:'red'}]}> This field is required </Text>
                    : null}
                    { this.state.bad_amounts_sat && this.state.answer_three == 0 ? 
                        <Text style={[styles.questionText,{color:'red'}]}> The maximum score for the SAT is 1600 </Text>
                    : null}

                </View>
                <View style={styles.question}>
                    <Text style={styles.questionText}> What is your ACT score? <Text style={{color:'red'}}> * </Text> </Text>
                    <TextInput style={styles.questionInput}
                                keyboardType={"numeric"}
                                returnKeyType={"done"}
                                maxLength={2}
                                onChangeText={(num) => changeNum(3,num)}
                                />
                    { this.state.failed_submit && this.state.answer_four == 0 ? 
                        <Text style={[styles.questionText,{color:'red'}]}> This field is required </Text>
                    : null}
                    { this.state.bad_amounts_act && this.state.answer_four == 0 ? 
                        <Text style={[styles.questionText,{color:'red'}]}> The maximum score for the ACT is 36 </Text>
                    : null}
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
                    <Text style={styles.questionText}> What is your preferred school size?</Text>
                    <CheckBox
                        title='Small (1-5000 students)'
                        checked={this.state.ans_array[6].includes("A")}
                        onPress = {()=>activate_answer(6,"A")}
                        />
                     <CheckBox
                        title='Medium (5001-10000 students)'
                        checked={this.state.ans_array[6].includes("B")}
                        onPress = {()=>activate_answer(6,"B")}
                        />
                     <CheckBox
                        title='Large (10001 students +)'
                        checked={this.state.ans_array[6].includes("C")}
                        onPress = {()=>activate_answer(6,"C")}
                        />
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionText}> What is the maximum you hope to spend on in-state tuition?</Text>
                    <CheckBox
                        title='$10000 or less'
                        checked={this.state.ans_array[7].includes("A")}
                        onPress = {()=>activate_answer(7,"A")}
                        />
                     <CheckBox
                        title='$10001-$15000'
                        checked={this.state.ans_array[7].includes("B")}
                        onPress = {()=>activate_answer(7,"B")}
                        />
                     <CheckBox
                        title='$15001-$20000'
                        checked={this.state.ans_array[7].includes("C")}
                        onPress = {()=>activate_answer(7,"C")}
                        />
                    <CheckBox
                        title='$20001+'
                        checked={this.state.ans_array[7].includes("D")}
                        onPress = {()=>activate_answer(7,"D")}
                        />
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionText}> What is the maximum you hope to spend on out-of-state/private tuition?</Text>
                    <CheckBox
                        title='$10000 or less'
                        checked={this.state.ans_array[8].includes("A")}
                        onPress = {()=>activate_answer(8,"A")}
                        />
                     <CheckBox
                        title='$10001-$15000'
                        checked={this.state.ans_array[8].includes("B")}
                        onPress = {()=>activate_answer(8,"B")}
                        />
                     <CheckBox
                        title='$15001-$20000'
                        checked={this.state.ans_array[8].includes("C")}
                        onPress = {()=>activate_answer(8,"C")}
                        />
                    <CheckBox
                        title='$20001+'
                        checked={this.state.ans_array[8].includes("D")}
                        onPress = {()=>activate_answer(8,"D")}
                        />
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



export default FormScreen;