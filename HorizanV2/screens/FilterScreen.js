import React from 'react';
import { ScrollView, Dimensions, StyleSheet, View, Text, FlatList, Image, TouchableOpacity} from 'react-native';

import { ButtonGroup, colors, Button } from 'react-native-elements';

import Ionicons from "react-native-vector-icons/Ionicons";
//import FontAwesome from "react-native-vector-icons/FontAwesome";

import styles from '../styles.js'
import SchoolsScreen from './SchoolsScreen.js';

const {height, width} = Dimensions.get('window');

export default class FilterScreen extends React.Component {

  constructor(props){
      super(props)

      this.navigation = this.props.navigation;

      this.state = {

        currentIndex: 0,

        selectedIndexes: [0, 0, 0, 0, 0],

        filterOptions: [
        {
          title: "Favorites",
          sortOption: 1,
          type: 2
        },
        {
          title: "Alphabetical",
          sortOption: 1,
          type: 3
        },
        {
          title: "GPA",
          sortOption: 1,
          type: 3
        },
        {
          title: "Popularity",
          sortOption: 1,
          type: 3
        },
        {
          title: "Cost",
          sortOption: 1,
          type: 3
        },
        ]
      
      }

      this.updateIndex = this.updateIndex.bind(this)
      this.workaround = this.workaround.bind(this)
      this.handleSave = this.handleSave.bind(this)
  }

  workaround() {

    temparray = [];
    for(i = 0; i < this.state.filterOptions.length; i++){
      temparray.push({title: this.state.filterOptions[i].title, sortOption: this.userFilters[i], type: this.state.filterOptions[i].type})
      
    }
    this.setState({filterOptions: temparray}, () => {
      selectedIndexes1 = [];
      for(i = 0; i < this.state.filterOptions.length; i++){
        selectedIndexes1.push(this.state.filterOptions[i].sortOption);
      }
        this.setState({selectedIndexes: selectedIndexes1})
    })

/*       this.setState({filterOptions: [
        {
          title: "Alphabetical",
          sortOption: this.userFilters.az
        },
        {
          title: "GPA",
          sortOption: this.userFilters.gpa
        },
        {
          title: "Favorites",
          sortOption: this.userFilters.favorites
        },
        {
          title: "Popularity",
          sortOption: this.userFilters.popularity
        },
        ]},  */
        
        
        
  }

  handleSave = () => {
    const { navigation } = this.props;
    const { routeName, key } = navigation.getParam('returntoroute');
    console.log("Handle Save")
    console.log(this.state.selectedIndexes)
    navigation.navigate({ routeName, key, params: {newFilters: this.state.selectedIndexes} });
    //test(this.state.selectedIndexes);
  }

  static navigationOptions = ({navigation}) =>  ({
    title: 'Filter',
    headerRight: (
      <TouchableOpacity onPress={navigation.getParam('handleSave')} color="#000">
        <Text style={{fontSize: 18, marginRight: 10}}>Save</Text>
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()} color="#000">
        <Text style={{fontSize: 18, marginLeft: 10}}>Cancel</Text>
      </TouchableOpacity>
    ),
    headerStyle: { 
      backgroundColor: 'white', 
      borderBottomColor: 'white',
      elevation: 0 
    }
  });

  componentDidMount() {
    this.userFilters = this.navigation.getParam('filterOptions', '')
    this.onFilterUpdate = this.navigation.getParam('onFilterUpdate', {})
    this.props.navigation.setParams({ handleSave: this.handleSave });
    this.workaround()
  }

  updateIndex = (selectedIndex, index) => {
    let options = this.state.selectedIndexes.slice()
    options[selectedIndex] = index
    this.setState({selectedIndexes: options})
  }

  render() {
    const buttons3 = ['Descending', 'Off', 'Ascending']
    const buttons2 = ['Off', 'On']
    const selectedIndexes = this.state.selectedIndexes

    return (
      <FlatList
        data={this.state.filterOptions}
        ListFooterComponent={() => <Button title='Reset to Default' onPress={() => this.setState({selectedIndexes: SchoolsScreen.defaultFilters})} buttonStyle={{margin: 20, backgroundColor: '#ff6659'}} />}
        style={styles.container} showsVerticalScrollIndicator={false} scrollEnabled={true} contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}
        keyExtractor={item => item.title}
        renderItem={({ item, index }) => {
          if(item.type == 2){
            return(
              <View style={{height: height/5, marginBottom: -30}}>
              <View style={[styles.cardInListNS, {flexDirection: 'row'}]}>
                <View style={[styles.cardTextContainer, {flex: 1, justifyContent: 'flex-end'}]}>
                  <Text style={styles.cardTitle}>
                    {item.title}
                  </Text>
                </View>
                  <ButtonGroup
                      onPress={this.updateIndex.bind(this, index)}
                      selectedIndex={selectedIndexes[index]}
                      buttons={buttons2}
                      containerStyle={{height: 50, flex: 1}}
                    />
              </View>
            </View>
            );
          }else if(item.type == 3){
            return(
              <View style={{height: height/5, marginBottom: -30}}>
              <View style={[styles.cardInListNS, {flexDirection: 'row'}]}>
                <View style={[styles.cardTextContainer, {flex: 1, justifyContent: 'flex-end'}]}>
                  <Text style={styles.cardTitle}>
                    {item.title}
                  </Text>
                </View>
                  <ButtonGroup
                      onPress={this.updateIndex.bind(this, index)}
                      selectedIndex={selectedIndexes[index]}
                      buttons={buttons3}
                      containerStyle={{height: 50, flex: 1}}
                    />
              </View>
            </View>
            );
          }
            
          }
        }
      />
      /*<ScrollView style={styles.container} showsVerticalScrollIndicator={false} scrollEnabled={true} contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
        <View style={styles.welcomeContainer}>
              <Text style={styles.headingText}>My Schools</Text>
          </View>
      </ScrollView>*/
    );
  }
}

