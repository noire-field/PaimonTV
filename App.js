import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';

import reducers from './store/reducers';
import PaimonTV from './PaimonTV';

const store = createStore(reducers, applyMiddleware(ReduxThunk));

const App = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<PaimonTV/>
			</NavigationContainer>
		</Provider>
	)
};

export default App;
