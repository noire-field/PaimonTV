import { combineReducers } from 'redux';

import appReducer from './app.reducer';
import movieReducer from './movie.reducer';

export default combineReducers({
    app: appReducer,
    movie: movieReducer
});