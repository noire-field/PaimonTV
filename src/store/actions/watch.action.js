import { WATCH_SETEPISODE } from './../../constants/store';

export function watchSetEpisode(episode, startAt) {
    return {
        type: WATCH_SETEPISODE,
        data: {
            episode,
            startAt
        }
    };
}