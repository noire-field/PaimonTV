import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack'

import SplashScreen from './screens/SplashScreen';
import PaimonContainer from './screens/PaimonContainer';
import { sharedScreenOptions } from './navigation/navigation.config';

import Logger from './utils/logger';

const Stack = createStackNavigator();

const PaimonTV = (props) => {
	const initLoaded = useSelector((state) => state.app.initLoaded);

    Logger.Debug(`[PaimonTV] Render (initLoaded: ${initLoaded == true ? "True" : "False"})`);

	return (
        <Stack.Navigator headerMode="none" screenOptions={{ ...sharedScreenOptions }}>
            {!initLoaded ? 
                (<Stack.Screen name="SplashScreen" component={SplashScreen}/>)
                :
                (<Stack.Screen name="PaimonContainer" component={PaimonContainer}/>)
            }
        </Stack.Navigator>
	)
};

export default PaimonTV;

// adb shell su root date $(date +%m%d%H%M%Y.%S)