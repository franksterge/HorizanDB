import React from 'react';
import { ScrollView, Dimensions, StyleSheet, View, Text, Button, FlatList, Image, TouchableOpacity, Platform} from 'react-native';

import { SearchBar } from 'react-native-elements'

import styles from '../styles.js'

import Touchable from 'react-native-platform-touchable';

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const {height, width} = Dimensions.get('window');

export default class SchoolsScreen extends React.Component {

  static filterOps = null;

  constructor(props){
      super(props)

      this.state = {

        filterOptions: [0, 0, 0, 1, 0],

        filterOptions1:
        {
          // -1 = low to high, 0 = disabled, 1 = high to low
          az: 0,
          favorites: 1, //1 means enabled
          gpa: 0,
          popularity: 1,
          cost: 0
        },

        userschools: [
        {
          imgUrl: require('../assets/images/harvard.jpg'),
          title: "A University",
          para: "95% Match\n",
          isFavorite: false,
        },
        {
          imgUrl: require('../assets/images/harvard.jpg'),
          title: "B University",
          para: "95% Match",
          isFavorite: true,
        },
        {
          imgUrl: require('../assets/images/harvard.jpg'),
          title: "C University",
          para: "95% Match",
          isFavorite: false,
        },
        {
          imgUrl: require('../assets/images/harvard.jpg'),
          title: "D University",
          para: "95% Match",
          isFavorite: false,
        }]
      }
      this.originalData = this.state.userschools.slice();
      this.arrayholder = this.state.userschools;
      this.handleFilterScreen = this.handleFilterScreen.bind(this)
      filterOps = this.state.filterOptions;
  }

  handleFilterScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('Filters', { returntoroute: navigation.state, filterOptions: this.state.filterOptions})
  }

  static navigationOptions = ({navigation}) => ({
    title: '',
    headerRight: (
      <TouchableOpacity onPress={() => alert('This is a button!')} color="#000">
        <Ionicons name='md-add' size={25} style={{ marginRight:10, padding:5, color: "#000" }} />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity onPress={navigation.getParam('handleFilterScreen')} color="#000">
        <MaterialIcons name='filter-list' size={25} style={{ marginLeft:10, padding:5, color: "#000" }} />
      </TouchableOpacity>
    ),
    headerStyle: { 
      backgroundColor: 'white', 
      borderBottomColor: 'white',
      elevation: 0 
    }
  });

  onFilterUpdate = filterOptions2 => {
    //Update the filters without mutating the state directly
    console.log("onFilterUpdate")
    console.log(filterOptions2)
    this.setState({filterOptions: filterOptions2}, () => {
      newData = this.arrayholder = this.originalData.slice();    
      if(this.state.filterOptions[0] == 2){
        newData = newData.sort((a, b) => a.title.localeCompare(b.title))
      }
      if(this.state.filterOptions[0] == 0){
        newData = newData.sort((a, b) => b.title.localeCompare(a.title))
      }
      if(this.state.filterOptions[2] == 2){
        newData = newData.sort((a, b) => a.gpa > b.gpa)
      }
      if(this.state.filterOptions[2] == 0){
        newData = newData.sort((a, b) => b.gpa > a.gpa)
      }
      if(this.state.filterOptions[3] == 2){
        newData = newData.sort((a, b) => a.popularity > b.popularity)
      }
      if(this.state.filterOptions[3] == 0){
        newData = newData.sort((a, b) => b.popularity > a.popularity)
      }
      if(this.state.filterOptions[4] == 2){
        newData = newData.sort((a, b) => a.cost > b.cost)
      }
      if(this.state.filterOptions[4] == 0){
        newData = newData.sort((a, b) => b.cost > a.cost)
      }
      if(this.state.filterOptions[1] == 1){
        newData = newData.filter(item => {
          return item.isFavorite;
        })
      }
      this.setState({userschools: newData});
    });
    
  }

  searchFilterFunction = text => {
    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ userschools: newData, textValue: text });  
  };
  
  renderListHeader = () => {
    return(
      <View>
      <View style={styles.welcomeContainer}>
          <Text style={styles.headingText}>My Schools</Text>
        </View>
        <SearchBar
          lightTheme
          platform = {Platform.OS === 'ios' ? 'ios' : 'ios'}
          containerStyle={{flex: 1, marginLeft: 7, marginRight: 7, backgroundColor: 'transparent', borderTopColor: 'transparent', borderBottomColor: 'transparent'}}
          onChangeText={text => this.searchFilterFunction(text)}
          value={this.state.textValue}
          placeholder='Search Schools...' />
      </View>
      );
  };

  componentWillReceiveProps(){
   /*  const { navigation } = this.props;
    let newFilters = navigation.getParam('newFilters', undefined);
    console.log("componentWillReceiveProps")
    console.log(newFilters)
    if(newFilters != undefined){
      this.onFilterUpdate(newFilters)
    } */
    console.log('test')
  }

  componentDidUpdate(prevProps, prevState) {
    const { navigation } = this.props;
    let newFilters = navigation.getParam('newFilters', undefined);
    console.log("componentWillReceiveProps")
    console.log(newFilters)
    if(newFilters !== prevState.filterOptions && newFilters !== undefined){
      this.onFilterUpdate(newFilters)
    }
  }

  componentDidMount() {
    
    this.props.navigation.setParams({ handleFilterScreen: this.handleFilterScreen });
  }

  render() {

    return (
      <FlatList
        data={this.state.userschools}
        ListHeaderComponent={this.renderListHeader}
        style={styles.container} showsVerticalScrollIndicator={false} scrollEnabled={true} contentContainerStyle={{flexGrow: 1, marginTop: -60, paddingBottom: 20}}
        keyExtractor={item => item.title}
        renderItem={({ item, key }) => {
            return(
              <Touchable key={key} style={{height: height/5, marginBottom: 10,}}>
              <View style={[styles.cardInListNS, {flexDirection: 'row'}]}>
                <View style={[styles.imgContainer2, {margin: 10}]}>
                    <Image 
                    style={styles.canvasThumb}
                    resizeMode="cover"
                    source={item.imgUrl}/>
                </View>
                <View style={[styles.cardTextContainer, {flex: 2}]}>
                  <Text style={styles.cardTitle}>
                    {item.title}
                    </Text>
                    <Text style={styles.cardPara}>
                    {item.para}
                    </Text>
                  </View>
              </View>
            </Touchable>
            );
          }
        }
      />
    );
  }
}

