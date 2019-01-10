import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  FlatList,
  Dimensions
} from 'react-native';
import { WebBrowser, BlurView } from 'expo';

import { MonoText } from '../components/StyledText';

import Swiper from 'react-native-swiper';

import styles from '../styles.js'

const {height, width} = Dimensions.get('window');

//Note about imgUrl: using require for now since images are local. When images are from the internet use uri
//and make imgurl a string
const tips = [
  {
    imgUrl: require('../assets/images/fafsa.jpg'),
    title: "FAFSA Frenzy",
    para: "Everyone is doing the FAFSA, do yours ASAP to get the most money!"
  },
  {
    imgUrl: require('../assets/images/extracurriculars.png'),
    title: "Tip: Extracurriculars!",
    para: "Colleges look at these, so make sure you've been spending your free time wisely!"
  }
]

const recColleges = [
  {
    imgUrl: require('../assets/images/harvard.jpg'),
    title: "A University",
    para: "95% Match"
  },
  {
    imgUrl: require('../assets/images/harvard.jpg'),
    title: "B University",
    para: "95% Match"
  },
  {
    imgUrl: require('../assets/images/harvard.jpg'),
    title: "C University",
    para: "95% Match"
  },
  {
    imgUrl: require('../assets/images/harvard.jpg'),
    title: "D University",
    para: "95% Match"
  }
]

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      tips: tips,
      recColleges: recColleges
    };
  }

  render() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} scrollEnabled={true} contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
        <View style={styles.welcomeContainer}>
              <Text style={styles.headingText}>Horizan Home</Text>
          </View>
          <Swiper style={styles.cardContainer} >
          {this.state.tips.map((item, key) => {
            return (
              <View key={key} style={styles.cardContainer}>
                        <View style={styles.card}>
                        <View style={styles.imgContainer}>
                            <Image 
                            style={styles.canvas}
                            resizeMode="cover"
                            source={item.imgUrl}/>
                        </View>
                        <View style={styles.cardTextContainer}>
                          <Text style={styles.cardTitle}>
                            {item.title}
                            </Text>
                            <Text style={styles.cardPara}>
                            {item.para}
                            </Text>
                          </View>
                        </View>
                      </View>
            )
          })}
          </Swiper>
          <Text style={styles.sectionText}>
                    Colleges in your favorites
          </Text>
          {
            this.state.recColleges.map((item, key) => (
              <View key={key} style={styles.cardContainer}>
              <View style={styles.cardInList}>
                <View style={styles.imgContainer}>
                    <Image 
                    style={styles.canvas}
                    resizeMode="cover"
                    source={item.imgUrl}/>
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>
                    {item.title}
                    </Text>
                    <Text style={styles.cardPara}>
                    {item.para}
                    </Text>
                  </View>
              </View>
            </View>
            ))
          }
          <View style={styles.cardContainerMore}>
              <View style={styles.moreCard}>
                <View style={styles.cardTextContainer}>
                  <Text style={[styles.cardTitle, {fontSize: 18, color: 'white', textAlign: 'center'}]}>
                    View all
                    </Text>
                  </View>
              </View>
            </View>
        </ScrollView>

    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

}
