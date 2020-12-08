import { WATCH_SETEPISODE, WATCH_SETBUFFERING, WATCH_SETVIDEOPROGRESS, WATCH_SETVIDEOLOADED, WATCH_REQUIRESEEK, WATCH_SETPLAYBACK } from '../../constants/store';

const initState = {
    movieTitle: "",
    episode: null,
    startAt: 0,
    currentProgress: 0,
    buffering: false,
    videoLoaded: false,
    seek: {
        required: false,
        to: 0
    },
    playback: false
};

export default function(state = initState, action) {
    switch(action.type) {
        case WATCH_SETEPISODE:
            return { ...state, movieTitle: action.data.movieTitle, episode: action.data.episode, startAt: action.data.startAt };
        case WATCH_SETBUFFERING:
            return { ...state, buffering: action.buffering };
        case WATCH_SETVIDEOPROGRESS:
            return { ...state, currentProgress: action.progress };
        case WATCH_SETVIDEOLOADED:
            return { ...state, videoLoaded: action.loaded };
        case WATCH_REQUIRESEEK:
            return { ...state, seek: action.seek };
        case WATCH_SETPLAYBACK:
            return { ...state, playback: action.playback }
    }

    return state;
}