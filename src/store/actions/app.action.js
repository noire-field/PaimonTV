import { APP_SETINITLOADED } from './../../constants/store';

export function appSetInitLoaded(loaded) {
    return {
        type: APP_SETINITLOADED,
        loaded: loaded
    };
}