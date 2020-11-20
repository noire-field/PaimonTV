import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import throttle from 'lodash.throttle';

import { movieUpdateEpisodeProgress } from './../../store/actions/movie.action';
import { watchSetBuffering, watchSetVideoLoaded, watchSetVideoProgress } from './../../store/actions/watch.action';

import Logger from './../../utils/logger';

const VideoPlayer = (props) => {
    Logger.Debug(`[VideoPlayer] Render`);

    const dispatch = useDispatch();

    const videoRef = useRef(null);

    const videoUrl = useSelector(state => state.watch.episode.url);
    const startAt = useSelector(state => state.watch.startAt);
    const seek = useSelector(state => state.watch.seek);

    const onVideoRef = (ref) => {
        videoRef.current = ref;
    }

    const onBuffer = ({ isBuffering }) => {
        dispatch(watchSetBuffering(isBuffering));
    }
    
	const videoError = (error) => {
		console.log("Error");
		console.log(error);
    }
    const onProgress = (progress) => {
        updateVideoStatus(progress);
    }
    const onSeek = (data) => {
        //console.log("Seek");
        //console.log(data);
    }
    const onLoad = () => {
        videoRef.current.seek(startAt);
        dispatch(watchSetVideoLoaded(true));
    }

    const updateVideoStatus = throttle((progress) => {
        dispatch(watchSetVideoProgress(progress.currentTime))
        dispatch(movieUpdateEpisodeProgress(progress.currentTime))
    }, 1000);

    useEffect(() => {
        if(!seek.required || !videoRef.current)
            return;

        if(seek.to > 0) videoRef.current.seek(seek.to);
    }, [seek]);

    return (
        <View style={[styles.container, props.style]}>
            <Video source={{ uri: videoUrl }}   // Can be a URL or a local file.
                ref={onVideoRef}                                      // Store reference
                onBuffer={onBuffer}                // Callback when remote video is buffering
                onError={videoError}               // Callback when video cannot be loaded
                onProgress={onProgress}
                onSeek={onSeek}
                onLoad={onLoad}
                style={styles.video}
                bufferConfig={{
                    minBufferMs: 10 * 1000,
                    maxBufferMs: 60 * 1000,
                    bufferForPlaybackMs: 10 * 1000,
                    bufferForPlaybackAfterRebufferMs: 10 * 1000
                }}
                />
        </View>
    );
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 1
	},
	video: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%'
	}
});

export default React.memo(VideoPlayer);