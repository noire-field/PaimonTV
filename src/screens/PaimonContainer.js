import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import MovieDetailScreen from './MovieDetailScreen';

import * as Colors from './../constants/colors';
import { sharedScreenOptions } from './../navigation/navigation.config';

import Logger from './../utils/logger';
//import WatchScreen from './WatchScreen';

const Stack = createStackNavigator();

const PaimonContainer = (props) => {
    Logger.Debug(`[PaimonContainer] Render`);

    return (
        <View style={styles.container}>
            {/* <WatchScreen/> */}
            <Stack.Navigator headerMode="none" screenOptions={{ ...sharedScreenOptions }} initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen}/>
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