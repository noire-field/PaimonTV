import { WATCH_SETEPISODE, WATCH_SETBUFFERING, WATCH_SETVIDEOREF, WATCH_SETVIDEOLOADED } from './../../constants/store';

export function watchSetEpisode(movieTitle, episode, startAt) {
    return {
        type: WATCH_SETEPISODE,
        data: {
            movieTitle,
            episode,
            startAt
        }
    };
}

export function watchSetBuffering(buffering) {
    return {
        type: WATCH_SETBUFFERING,
        buffering
    }
}

export function watchSetVideoRef(videoRef) {
    return {
        type: WATCH_SETVIDEOREF,
        videoRef
    }
}

export function watchSetVideoLoaded(loaded) {
    return {
        type: WATCH_SETVIDEOLOADED,
        loaded
    }
}