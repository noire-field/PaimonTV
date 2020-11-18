import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, BackHandler, Image } from 'react-native';

import ScreenLoading from './../components/WatchScreen/ScreenLoading';
import VideoPlayer from './../components/WatchScreen/VideoPlayer';

import Logger from './../utils/logger';

const WatchScreen = (props) => {
    Logger.Debug(`[WatchScreen] Render`);

    // Back Button Handler
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            props.navigation.replace('MovieDetailScreen');
            return true;
        });

        return () => {
            backHandler.remove();
        }
    }, []);

    // State
    const episode = useSelector(state => state.movie.watch.episode);

    if(!episode) { // No Video Loaded? (Rare case, almost impossible)
        props.navigation.replace('MovieDetailScreen');
        return null;
    }

    // <Image style={styles.image} source={{ uri: "https://s27514.pcdn.co/wp-content/uploads/2019/07/Titanic_Still.jpg.optimal.jpg" }}/>
    
	return (
		<View style={styles.container}>
            <VideoPlayer style={styles.fullscreen}/>
            <ScreenLoading style={styles.fullscreen}/>
        </View>
	);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative'
    },
    fullscreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    image: {
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    }
});

export default WatchScreen;
