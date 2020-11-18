import { WATCH_SETEPISODE } from '../../constants/store';

const initState = {
    episode: null,
    startAt: 0
};

export default function(state = initState, action) {
    switch(action.type) {
        case WATCH_SETEPISODE:
            return { ...state, episode: action.data.episode, startAt: action.data.startAt };
    }

    return state;
}