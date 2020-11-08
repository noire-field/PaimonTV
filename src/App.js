import React, { useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import reducers from './store/reducers';
import PaimonTV from './PaimonTV';

const store = createStore(reducers, applyMiddleware(ReduxThunk));

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
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
