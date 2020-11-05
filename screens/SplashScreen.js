import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const SplashScreen = (props) => {
    React.useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('PaimonContainer');
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <Text>Splash Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1
    }
});

export default SplashScreen;