import { WATCH_SETEPISODE, WATCH_SETBUFFERING, WATCH_SETVIDEOPROGRESS, WATCH_SETVIDEOLOADED, WATCH_REQUIRESEEK } from './../../constants/store';

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

export function watchSetVideoProgress(progress) {
    return {
        type: WATCH_SETVIDEOPROGRESS,
        progress
    }
}

export function watchSetVideoLoaded(loaded) {
    return {
        type: WATCH_SETVIDEOLOADED,
        loaded
    }
}

export function watchRequireSeek(to) {
    return {
        type: WATCH_REQUIRESEEK,
        seek: {
            required: true,
            to
        }
    }
}