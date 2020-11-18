import { combineReducers } from 'redux';

import appReducer from './app.reducer';
import movieReducer from './movie.reducer';
import watchReducer from './watch.reducer';

export default combineReducers({
    app: appReducer,
    movie: movieReducer,
    watch: watchReducer
});