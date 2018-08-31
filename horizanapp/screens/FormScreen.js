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

            answer_one : {1:false,2:false,3:false,4:false}, // region
            answer_two: {1:false,2:false,3:false}, // urban
            answer_three:0, // SAT * 
            answer_four:0, // ACT * 
            answer_five: {1:false,2:false,3:false}, //gender
            answer_six: {1:false,2:false}, // pub/priv
            answer_seven: {1:false,2:false,3:false}, //size
            answer_eight: {1:false,2:false,3:false,4:false}, // in-state $
            answer_nine: {1:false,2:false,3:false,4:false}, // out-state $,
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
      };

    // _onMessage = (message) => {
    //     let text = message.nativeEvent.data;
    //     const out = this;
    //     console.log(text)
    //     if(text.startsWith("<pre style")){
    //         const start = text.indexOf("[");
    //         const end = text.indexOf("]");
    //         text = text.substring(start, end+1);

    //         const resetAction = StackActions.reset({
    //             index: 0,
    //             actions: [NavigationActions.navigate({ routeName: 'ResultsScreen', params: {
    //                 results: text
    //             } })],
    //           });
    //           out.props.navigation.dispatch(resetAction);

    //         /* const pushAction = StackActions.push({
    //             routeName: 'ResultsScreen',
    //             params: {
    //                 results: text
    //             },
    //           });
    //         out.props.navigation.dispatch(pushAction); */
    //     }
    // }

    render() {

        handleFormSubmit = () => {
            if (this.state.answer_three == 0 || this.state.answer_four == 0){
                this.setState({failed_submit: true})
            } else {
                this.props.navigation.navigate("ResultsLoading")
                
            }

        }



        activate_one = (index) => {
            answer_one = this.state.answer_one
            answer_one[index] = !answer_one[index]
            this.setState(answer_one)
        }        
        activate_two = (index) => {
            answer_two = this.state.answer_two
            answer_two[index] = !answer_two[index]
            this.setState(answer_two)
        }

        activate_five = (index) => {
            answer_five = this.state.answer_five
            answer_five[index] = !answer_five[index]
            this.setState(answer_five)
        }

        activate_six = (index) => {
            answer_six = this.state.answer_six
            answer_six[index] = !answer_six[index]
            this.setState(answer_six)
        }
        activate_seven = (index) => {
            answer_seven = this.state.answer_seven
            answer_seven[index] = !answer_seven[index]
            this.setState(answer_seven)
        }

        activate_eight = (index) => {
            answer_eight = this.state.answer_eight
            answer_eight[index] = !answer_eight[index]
            this.setState(answer_eight)
        }
        activate_nine = (index) => {
            answer_nine = this.state.answer_nine
            answer_nine[index] = !answer_nine[index]
            this.setState(answer_nine)
        }



        return (
         <View style={StyleSheet.absoluteFill}>
            <KeyboardAwareScrollView contentContainerStyle={{justifyContent:'space-around'}} style={styles.background}>
            

                <View style={styles.question}>
                    <Text style={styles.questionText}> What region do you see yourself going to school? </Text>
                    <View style={styles.multiChoiceContainer}>
                        <TouchableOpacity onPress = {()=>activate_one(1)} style={this.state.answer_one[1] ? styles.choiceBoxActive : styles.choiceBox}>
                                <Image source={Images.west_coast} style={styles.choiceBoxIcon}/>
                                <Text style={styles.choiceText}> West Coast </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_one(2)} style={this.state.answer_one[2] ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.central} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Central </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_one(3)} style={this.state.answer_one[3] ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.north_east} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Northeast </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_one(4)} style={this.state.answer_one[4] ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.south_east} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Southeast </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                 <View style={styles.question}>
                    <Text style={styles.questionText}> Of the following, which is your ideal environment? </Text>
                    <View style={styles.multiChoiceContainer}>
                        <TouchableOpacity onPress = {()=>activate_two(1)} style={this.state.answer_two[1] ? styles.choiceBoxActive : styles.choiceBox}>
                                <Image source={Images.urban} style={styles.choiceBoxIcon}/>
                                <Text style={styles.choiceText}> Urban </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_two(2)} style={this.state.answer_two[2] ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.suburban} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Suburban </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_two(3)} style={this.state.answer_two[3] ? styles.choiceBoxActive : styles.choiceBox}>
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
                                onChangeText={(answer_three) => this.setState({answer_three})}
                              />
                    { this.state.failed_submit && this.state.answer_three == 0 ? 
                        <Text style={[styles.questionText,{color:'red'}]}> This field is required </Text>
                    : null}

                </View>
                <View style={styles.question}>
                    <Text style={styles.questionText}> What is your ACT score? <Text style={{color:'red'}}> * </Text> </Text>
                    <TextInput style={styles.questionInput}
                                keyboardType={"numeric"}
                                returnKeyType={"done"}
                                maxLength={2}
                                onChangeText={(answer_four) => this.setState({answer_four})}
                                />
                    { this.state.failed_submit && this.state.answer_four == 0 ? 
                        <Text style={[styles.questionText,{color:'red'}]}> This field is required </Text>
                    : null}
                </View>


                <View style={styles.question}>
                    <Text style={styles.questionText}>What is your preferred gender distribution? </Text>
                    <View style={styles.multiChoiceContainer}>
                        <TouchableOpacity onPress = {()=>activate_five(1)} style={this.state.answer_five[1] ? styles.choiceBoxActive : styles.choiceBox}>
                                <Image source={Images.coed} style={styles.choiceBoxIcon}/>
                                <Text style={styles.choiceText}> Coed </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_five(2)} style={this.state.answer_five[2] ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.men_only} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Men's only </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_five(3)} style={this.state.answer_five[3] ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.women_only} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Women's only </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionText}> Would you like to attend a public or private school?</Text>
                    <View style={styles.multiChoiceContainer}>
                        <TouchableOpacity onPress = {()=>activate_six(1)} style={this.state.answer_six[1] ? styles.choiceBoxActive : styles.choiceBox}>
                                <Image source={Images.public} style={styles.choiceBoxIcon}/>
                                <Text style={styles.choiceText}> Public </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>activate_six(2)} style={this.state.answer_six[2] ? styles.choiceBoxActive : styles.choiceBox}>
                            <Image source={Images.private} style={styles.choiceBoxIcon}/>
                            <Text style={styles.choiceText}> Private </Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionText}> What is your preferred school size?</Text>
                    <CheckBox
                        title='Small (1-5000 students)'
                        checked={this.state.answer_seven[1]}
                        onPress = {()=>activate_seven(1)}
                        />
                     <CheckBox
                        title='Medium (5001-10000 students)'
                        checked={this.state.answer_seven[2]}
                        onPress = {()=>activate_seven(2)}
                        />
                     <CheckBox
                        title='Large (10001 students +)'
                        checked={this.state.answer_seven[3]}
                        onPress = {()=>activate_seven(3)}
                        />
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionText}> What is the maximum you hope to spend on in-state tuition?</Text>
                    <CheckBox
                        title='$10000 or less'
                        checked={this.state.answer_eight[1]}
                        onPress = {()=>activate_eight(1)}
                        />
                     <CheckBox
                        title='$10001-$15000'
                        checked={this.state.answer_eight[2]}
                        onPress = {()=>activate_eight(2)}
                        />
                     <CheckBox
                        title='$15001-$20000'
                        checked={this.state.answer_eight[3]}
                        onPress = {()=>activate_eight(3)}
                        />
                    <CheckBox
                        title='$20001+'
                        checked={this.state.answer_eight[4]}
                        onPress = {()=>activate_eight(4)}
                        />
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionText}> What is the maximum you hope to spend on out-of-state/private tuition?</Text>
                    <CheckBox
                        title='$10000 or less'
                        checked={this.state.answer_nine[1]}
                        onPress = {()=>activate_nine(1)}
                        />
                     <CheckBox
                        title='$10001-$15000'
                        checked={this.state.answer_nine[2]}
                        onPress = {()=>activate_nine(2)}
                        />
                     <CheckBox
                        title='$15001-$20000'
                        checked={this.state.answer_nine[3]}
                        onPress = {()=>activate_nine(3)}
                        />
                    <CheckBox
                        title='$20001+'
                        checked={this.state.answer_nine[4]}
                        onPress = {()=>activate_nine(4)}
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
// //daltonding.com/horizantestform/
// //old uri: 'https://horizanapp.typeform.com/to/T61uiD'
// const styles = {
//     typeformStyle: {
//         padding: 100
//     }
// };


export default FormScreen;