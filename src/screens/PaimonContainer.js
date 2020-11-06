import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';

import * as Colors from './../constants/colors';
import { sharedScreenOptions } from './../navigation/navigation.config';

const Stack = createStackNavigator();

const PaimonContainer = (props) => {
    return (
        <View style={styles.container}>
            <Stack.Navigator headerMode="none" screenOptions={{ ...sharedScreenOptions }} initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            </Stack.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY
    }
});

export default PaimonContainer;