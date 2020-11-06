import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import * as Colors from './../constants/colors';

const SplashScreen = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.splashImage} source={require('./../assets/images/splash_paimon.jpg')}/>
            <ActivityIndicator style={styles.activityIndicator} size="large" color={Colors.ACCENT} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    splashImage: {
        resizeMode: 'contain',
        width: '50%',
        height: '50%'
    },
    activityIndicator: {
        marginTop: 30
    }
});

export default SplashScreen;