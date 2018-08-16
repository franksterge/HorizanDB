import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import styles from ".././assets/styles/styles";

export default class ResultsScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: '',
    headerStyle: {
        backgroundColor: 'white',
        elevation: 0,
        shadowOpacity: 0,
      }
  };

  render() {
    const results = this.props.navigation.getParam('results', 'No results, some error occured :(');
    return (
      <View style={styles.container} >
        <Text style={styles.text}>
          Your Matches
        </Text>
          <FlatList
          data={JSON.parse(results)}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style={styles.flatview}>
            <Text style={styles.para}>{item}</Text>
            <Text style={styles.para}>{item}</Text>
          </View>
          }
          keyExtractor={item => item}
        />
      </View>
    );
  }
}

