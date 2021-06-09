import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Alert } from 'react-native';
import { Video } from 'expo-av';
import throttle from 'lodash.throttle';

import { movieUpdateEpisodeProgress } from './../../store/actions/movie.action';
import { watchSetBuffering, watchSetVideoLoaded, watchSetVideoProgress } from './../../store/actions/watch.action';

import Logger from './../../utils/logger';

const VideoPlayer = (props) => {
    Logger.Debug(`[VideoPlayer] Render`);

    const dispatch = useDispatch();

    const videoRef = useRef(null);
    const [error, setError] = useState(false);
    
    const videoUrl = useSelector(state => state.watch.episode ? state.watch.episode.url : '');
    const startAt = useSelector(state => state.watch.startAt);
    const seek = useSelector(state => state.watch.seek);
    const playback = useSelector(state => state.watch.playback);
    //const videoLoaded = useSelector(state => state.watch.videoLoaded);

    const onLoad = () => {
        dispatch(watchSetBuffering(false));
        dispatch(watchSetVideoLoaded(true));
        if(startAt > 0) videoRef.current.setPositionAsync(startAt * 1000);
    }

    const onPlaybackStatusUpdate = (status) => {
        if(!videoRef.current) return;
        
        // Update Video Progress
        if(status.positionMillis === undefined) status.positionMillis = 0;
        const currentSec = status.positionMillis / 1000;
        
        updateVideoStatus(currentSec); // Throttled to 1s
        updateVideoProgress(currentSec); // Throttled to 5s
        
        if(status.didJustFinish) {
            props.navigation.replace('MovieDetailScreen');
        }
    }
    
	const onError = (error) => {
		Logger.Error(`[Component.WatchScreen.VideoPlayer] Unable to play the episode`, error);
        Alert.alert('Lỗi', 'Không thể phát tập phim này', [ { text: 'Đã hiểu' }]);

        setError(true);
    }
    
    const updateVideoStatus = throttle((currentSecond) => {
        dispatch(watchSetVideoProgress(currentSecond))
    }, 1000);

    const updateVideoProgress = throttle((currentSecond) => {
        dispatch(movieUpdateEpisodeProgress(currentSecond))
    }, 5000);

    useEffect(() => {
        if(!seek.required || !videoRef.current)
            return;

        if(seek.to > 0)
            videoRef.current.setPositionAsync(seek.to * 1000);
    }, [seek]);

    useEffect(() => {
        if(!videoRef.current)
            return;

        if(playback) videoRef.current.playAsync();
        else videoRef.current.pauseAsync();
    }, [playback])

    useEffect(() => {
        dispatch(watchSetBuffering(true));
    }, [])

    if(!videoUrl || error) return (<View style={[styles.container, props.style]}></View>);

    return (
        <View style={[styles.container, props.style]}>
            <Video
                ref={videoRef}
                style={styles.video}
                source={{
                    uri: videoUrl
                }}
                resizeMode="contain"
                shouldPlay
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                onLoad={onLoad}
                onError={onError}
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

export default VideoPlayer;