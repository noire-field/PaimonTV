import { WATCH_SETEPISODE, WATCH_SETBUFFERING } from '../../constants/store';

const initState = {
    episode: null,
    startAt: 0,
    buffering: false
};

export default function(state = initState, action) {
    switch(action.type) {
        case WATCH_SETEPISODE:
            return { ...state, episode: action.data.episode, startAt: action.data.startAt };
        case WATCH_SETBUFFERING:
            return { ...state, buffering: action.buffering };
    }

    return state;
}