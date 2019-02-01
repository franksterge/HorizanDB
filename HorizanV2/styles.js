import { StyleSheet, Dimensions, Platform }from 'react-native';

const {height, width} = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
    },
    contentContainer: {
      paddingTop: 30,
    },
    welcomeContainer: {
      flex: 1,
      alignItems: 'flex-start',
      marginBottom: 0,
      paddingTop: 65,
      backgroundColor: 'white'
    },
    recColleges: {
      flex: 1,
    },
    cardContainer: {
      height: height/3,
      marginBottom: 30,
    },
    cardContainerMore: {
      height: height/9,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
    },
    card: {
      flex: 1,
      height: 200,
      backgroundColor: 'white',
      margin: 20,
      borderRadius: 10,
      elevation: 2,
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: {height: 0},
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
    },
    cardInList: {
      flex: 1,
      height: 200,
      backgroundColor: 'white',
      margin: 20,
      marginBottom: -15,
      borderRadius: 10,
      elevation: 2,
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: {height: 0},
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
    },
    cardInListNS: {
        flex: 1,
        height: 200,
        backgroundColor: 'white',
        margin: 10,
        marginBottom: -15,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    moreCard: {
      flex: 1,
      height: 200,
      backgroundColor: '#0077c2',
      margin: 20,
      marginBottom: 10,
      borderRadius: 10,
      elevation: 2,
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: {height: 0},
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardTitle: {
      flex: 1,
      fontSize: 24,
    },
    cardPara: {
      color: 'grey',
      flex: 1,
      fontSize: 15,
    },
    imgContainer: {
      flex: 1,
      width: '100%',
      borderTopLeftRadius: 10, 
      borderTopRightRadius: 10,
      overflow: "hidden"
    },
    imgContainer2: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
        overflow: "hidden"
      },
    canvas: {
      flex: 1,
      width: '100%',
    },
    canvasThumb: {
        flex: 1,
        width: '100%',
      },
    cardTextContainer: {
      flex: 1,
      padding: 10
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    headingText: {
      marginLeft: 30,
      marginBottom: 5,
      fontSize: 28,
      color: '#0400CF',
      textAlign: 'center',
    },
    sectionText: {
      fontSize: 18,
      marginLeft: 30,
      marginBottom: 0,
      color: 'grey'
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
  });
  