import { WATCH_SETEPISODE, WATCH_SETBUFFERING } from './../../constants/store';

export function watchSetEpisode(episode, startAt) {
    return {
        type: WATCH_SETEPISODE,
        data: {
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