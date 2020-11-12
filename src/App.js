import React, { useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import Logger from './utils/logger';
import { composeWithDevTools } from 'redux-devtools-extension';


import reducers from './store/reducers';
import PaimonTV from './PaimonTV';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk)));

const App = () => {
    Logger.Debug(`[App] Render`);

	useEffect(() => {
        SplashScreen.hide();
        Logger.Debug(`[App] Splash Screen : Hide`);
	}, [])
	
	return (
		<Provider store={store}>
			<NavigationContainer>
				<PaimonTV/>
			</NavigationContainer>
		</Provider>
	)
};

export default App;
