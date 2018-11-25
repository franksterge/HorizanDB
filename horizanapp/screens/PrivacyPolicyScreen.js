import React from 'react';
import { StyleSheet,Button, Text, View, ScrollView, Linking } from 'react-native';

export default class PrivacyPolicyScreen extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "My Profile!",
        headerLeft: <Button title="Back" onPress={()=>{ navigation.goBack(); }} />,
      });
  render() {
    return (
    <View style={{flex:1, backgroundColor:'white',}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageHeader}>
        Privacy Policy
        </Text>
        <Text style={styles.sectionText}>
        Horizan built the [Horizan] app as a Free app. This SERVICE is provided by Horizan at no cost and is intended for use as is.{"\n\n"}
This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.{"\n\n"}
If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.{"\n\n"}
The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at [Horizan] unless otherwise defined in this Privacy Policy.{"\n\n"}
</Text>
        <View style={styles.section}>
            <Text style={styles.header}>
            Information Collection and Use{"\n"}

            </Text>
            <Text style={styles.sectionText}>
            For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Email, Questionnaire preferences. The information that we request will be retained by us and used as described in this privacy policy.{"\n\n"}
The app does use third party services that may collect information used to identify you.{"\n\n"}
Link to privacy policy of third party service providers used by the app{"\n\n"}
{"\t"}• 
<Text onPress={()=>Linking.openURL(`https://www.google.com/policies/privacy/`)} style={{color:'blue'}}> Google Play Services
            </Text>
            </Text> 
        </View>
        <View style={styles.section}>
            <Text style={styles.header}>
            {"\n"}Log Data{"\n"}

            </Text>
            <Text style={styles.sectionText}>
            We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.

            </Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.header}>
            {"\n"}Cookies{"\n"}

            </Text>
            <Text style={styles.sectionText}>
            Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.{"\n\n"}
This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.

            </Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.header}>
            {"\n"}Service Providers{"\n"}

            </Text>
            <Text style={styles.sectionText}>
            We may employ third-party companies and individuals due to the following reasons:{"\n"}
{"\n\t"}•To facilitate our Service;
{"\n\t"}•To provide the Service on our behalf;
{"\n\t"}•To perform Service-related services; or
{"\n\t"}•To assist us in analyzing how our Service is used.{"\n\n"}
We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.

            </Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.header}>
            {"\n"}Security{"\n"}

            </Text>
            <Text style={styles.sectionText}>
            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
            </Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.header}>
            {"\n"}Links to Other Sites{"\n"}

            </Text>
            <Text style={styles.sectionText}>
            This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.

            </Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.header}>
            {"\n"}Children's Privacy{"\n"}

            </Text>
            <Text style={styles.sectionText}>
            These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.

            </Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.header}>
            {"\n"}Changes to this Privacy Policy{"\n"}

            </Text>
            <Text style={styles.sectionText}>
            We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
            </Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.header}>
            {"\n"}Contact Us{"\n"}

            </Text> 
            <Text style={styles.sectionText}>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.{"\n\n"}
This privacy policy page was created at <Text style={{color:'blue',}} onPress={()=>Linking.openURL(`https://privacypolicytemplate.net/`)}>privacypolicytemplate.net</Text> and modified/generated by <Text style={{color:'blue',}} onPress={()=>Linking.openURL(`https://privacypolicytemplate.net/`)}>App Privacy Policy Generator</Text>
            </Text>
        </View>
      </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pageHeader:{
      marginBottom:10,
      fontSize:25,
      fontWeight:'bold',
  },
  header:{
      fontWeight:'bold',
      alignSelf:'flex-start',
      fontSize:18,
  }
});
