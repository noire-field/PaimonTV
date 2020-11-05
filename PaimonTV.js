import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack'

import SplashScreen from './screens/SplashScreen';
import PaimonContainer from './screens/PaimonContainer';

import { appSetInitLoaded } from './store/actions/app.action';

const Stack = createStackNavigator();

const App = (props) => {
	const initLoaded = useSelector((state) => state.app.initLoaded);
	const dispatch = useDispatch();

	const OnLoadCompleted = () => {
        //dispatch(appSetInitLoaded(true));
        props.navigation.navigate('PaimonContainer');
		console.log("[App] Splash Screen Completed!");
	}

	useEffect(() => {
        console.log("[App] First Render");
        

		const timeoutHandler = setTimeout(OnLoadCompleted, 3000);
		return () => {
			clearTimeout(timeoutHandler);
        }
        
    }, []);
    
    console.log("[App] Render: "+(initLoaded ? "True" : "False"));

	return (
        <Stack.Navigator headerMode="none" screenOptions={{ gestureEnabled: false }}>

                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ cardStyleInterpolator: forFade }}/>

                <Stack.Screen name="PaimonContainer" component={PaimonContainer} options={{ cardStyleInterpolator: forFade }}/>

        </Stack.Navigator>
	)
};

const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});
  

export default App;
