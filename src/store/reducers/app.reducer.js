import { APP_SETINITLOADED } from './../../constants/store';

const initState = {
    initLoaded: false
};

export default function(state = initState, action) {
    switch(action.type) {
        case APP_SETINITLOADED:
            return {...state, initLoaded: action.loaded};
    }

    return state;
}