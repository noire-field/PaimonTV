import { WATCH_SETEPISODE, WATCH_SETBUFFERING, WATCH_SETVIDEOREF, WATCH_SETVIDEOLOADED } from '../../constants/store';

const initState = {
    movieTitle: "",
    episode: null,
    startAt: 0,
    buffering: false,
    videoRef: null,
    videoLoaded: false
};

export default function(state = initState, action) {
    switch(action.type) {
        case WATCH_SETEPISODE:
            return { ...state, movieTitle: action.data.movieTitle, episode: action.data.episode, startAt: action.data.startAt };
        case WATCH_SETBUFFERING:
            return { ...state, buffering: action.buffering };
        case WATCH_SETVIDEOREF:
            return { ...state, videoRef: action.videoRef };
        case WATCH_SETVIDEOLOADED:
            return { ...state, videoLoaded: action.loaded };
    }

    return state;
}