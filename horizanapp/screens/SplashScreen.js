import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

class SplashScreen extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            height: 0
        };
    }

    onLayout = (e) => {
        this.setState({ 
            height: e.nativeEvent.layout.height
        });
    }

    resolveImagePosition(height) {
        return {
            top: height / 3
        };
    }

    resolveHorizanTextPosition(height) {
        return {
            top: height / 2
        };
    }

    resolveSubHeaderTextPosition(height) {
        return {
            top: 15 * height / 24
        };
    }

    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <TouchableOpacity 
                style={styles.containerStyle} 
                onPress={() => navigate('CallToAction', { screen: 'CallToAction' })}
            >
                <View style={styles.containerStyle} onLayout={this.onLayout}>
                    <Image
                        source={require('../images/logo.png')}
                        style={[styles.imageStyle, this.resolveImagePosition(this.state.height)]}
                    />
                    <Text style={[styles.horizanTextStyle, 
                        this.resolveHorizanTextPosition(this.state.height)]}>Horizan</Text>
                    <Text style={[styles.subheaderTextStyle, 
                        this.resolveSubHeaderTextPosition(this.state.height)]}>Take hold of tommorrow</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: '#E3EFFF',
        alignItems: 'center',
        flex: 1
    },
    horizanTextStyle: {
        fontSize: 60,
        color: '#0400CF',
        fontWeight: 'bold',
        position: 'absolute'
    },
    subheaderTextStyle: {
        fontSize: 20,
        color: '#0400CF',
        position: 'absolute'
    },
    imageStyle: {
        position: 'absolute'
    }
};

export default SplashScreen;