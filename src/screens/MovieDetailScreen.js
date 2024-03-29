import React, { useState, useRef, useEffect } from 'react';
import { Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, BackHandler, Animated } from 'react-native';

import PaimonText from './../components/PaimonText';
import EpisodeItem from './../components/EpisodeItem';
import PaimonButton from './../components/PaimonButton';

import { movieCheckToMyList } from './../store/actions/movie.action';
import { watchResetPlayer, watchSetEpisode, watchSetPlayback } from './../store/actions/watch.action';

import * as Colors from './../constants/colors';
import Logger from './../utils/logger';
import { EpisodeObjectToArray, FindMovieInMyList, ScanMovieEpisodes, GetEpisodeCompletedRate } from './../utils/movie';

const MovieDetailScreen = (props) => {
    Logger.Debug(`[MovieDetailScreen] Render`);

    const [selected, setSelected] = useState(-2);
    const refWatchButton = useRef(null);
    //const fadeAnim = useRef(new Animated.Value(0))
    
    const detail = useSelector(state => state.movie.detail);
    const myList = useSelector(state => state.movie.myList);
    const dispatch = useDispatch();

    const movieInMyList = FindMovieInMyList(detail.id, myList);
    const episodeList = EpisodeObjectToArray(detail.episodes ? detail.episodes : {});
    const numOfEp = detail.episodes ? Object.keys(detail.episodes).length : 0;

    const onEpisodeFocus = (index) => { setSelected(index); }
    const onEpisodeBlur = () => { setSelected(-3); }
    const onEpisodePress = (index, episode) => {
        var completedRate = GetEpisodeCompletedRate(episode);
        var startAt = 0;

        if(completedRate < 92)
            startAt = episode.progress;
        
        dispatch(watchSetEpisode(detail.title, episode, startAt));
        dispatch(watchSetPlayback(true));

        props.navigation.replace('WatchScreen');
    }

    const onWatchMovie = () => {
        if(episodeList.length <= 0) return;
        
        var episodeIndex = ScanMovieEpisodes(episodeList)
        onEpisodePress(episodeIndex, episodeList[episodeIndex]);
    }

    const onCheckMovie = () => {
        if(movieInMyList == -1) dispatch(movieCheckToMyList(detail.id, 1)); // 1 for adding
        else dispatch(movieCheckToMyList(detail.id, -1)); // -1 for removing
    };

    
    useEffect(() => {
        // Forcefully focus
        if(refWatchButton) refWatchButton.current.focus();

        /*
        fadeAnim.current.setValue(0);
        Animated.timing(fadeAnim.current, {
            toValue: 1,
            delay: 500,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            dispatch(watchResetPlayer());
            Logger.Debug(`[MovieDetailScreen] Reset Video Player`);
        });*/

        dispatch(watchResetPlayer());
        Logger.Debug(`[MovieDetailScreen] Reset Video Player`);

        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            props.navigation.replace('HomeScreen');
            return true;
        });

        return () => {
            backHandler.remove();
        }
    }, []);

    const renderEpisodeItem = ({ index, item }) => {
        return (
            <TouchableOpacity
                onFocus={() => onEpisodeFocus(index, item)}
                onBlur={() => onEpisodeBlur(index, item)}
                onPress={() => onEpisodePress(index, item)}
            >
                <EpisodeItem key={item.id} title={item.title} duration={item.duration} progress={item.progress} selected={selected == index ? true : false}/>
            </TouchableOpacity>
        );
    };

    /*
    <Animated.View style={{ opacity: fadeAnim.current }}>
    </Animated.View>
    */
    return (
        <View style={styles.container}>
            <View style={styles.backgroundImageWrapper}>
                <Image style={styles.backgroundImage} source={{ uri: detail.thumbnail }}/>
            </View>
            <View style={styles.wrapper}>
                <View style={styles.leftSide}>
                    <View style={styles.thumbnailWrapper}>
                        <Image style={styles.thumbnail} source={{ uri: detail.thumbnail }}/>
                    </View>
                </View>
                <View style={styles.rightSide}>
                    <View style={Platform.isTV ? styles.detailWrapperTV : styles.detailWrapperPhone}>
                        <PaimonText type='header' style={styles.movieTitle} numberOfLines={1}>{detail.title}</PaimonText>
                        <PaimonText type='sub-header' style={styles.movieSubTitle} numberOfLines={1}>{detail.subTitle}</PaimonText>
                        <View style={styles.movieInfo}>
                            <PaimonText style={styles.movieYear}>{detail.year}</PaimonText>
                            <PaimonText style={styles.movieNumOfEp}>{numOfEp} Tập</PaimonText>
                        </View>
                        <View style={styles.buttons}>
                            <View style={styles.watchButton}>
                                <TouchableOpacity
                                    onFocus={() => onEpisodeFocus(-2, null)}
                                    onBlur={() => onEpisodeBlur(-2, null)}
                                    onPress={onWatchMovie}
                                    ref={refWatchButton}
                                >
                                    <PaimonButton title="Xem phim" color={Colors.ACCENT} selected={selected == -2}/>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onFocus={() => onEpisodeFocus(-1, null)}
                                    onBlur={() => onEpisodeBlur(-1, null)}
                                    onPress={onCheckMovie}
                                >
                                    <PaimonButton title={movieInMyList == -1 ? 'Thêm vào danh sách' : 'Xóa khỏi danh sách'} color={Colors.BLUE} selected={selected == -1}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <PaimonText type="header">Danh sách tập</PaimonText>
                        <View style={Platform.isTV ? styles.episodeListWrapperTV : styles.episodeListWrapperPhone }>
                            <FlatList data={episodeList} contentContainerStyle={styles.episodeList} renderItem={renderEpisodeItem} keyExtractor={(item) => item.id}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    backgroundImageWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%'
    },
    backgroundImage: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%'
    },
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.7)',
        flex: 1,
        flexDirection: 'row'
    },
    leftSide: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10
    },
    rightSide: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    thumbnailWrapper: {
        height: 200 * 2,
        width: 135 * 2,
        borderWidth: 1,
        borderColor: Colors.WHITE
    },
    thumbnail: {
        resizeMode: 'stretch',
        width: '100%',
        height: '100%'
    },
    detailWrapperPhone: {
        paddingTop: 15,
        height: '100%',
        width: '100%'
    },
    detailWrapperTV: {
        padding: 10,
        paddingTop: 70,
        height: '100%',
        width: '100%'
    },
    movieTitle: {
        fontSize: 30,
        lineHeight: 30
    },
    movieSubTitle: {
        fontSize: 20,
        lineHeight: 22,
        marginBottom: 5
    },
    movieInfo: {
        flexDirection: 'row',
        marginBottom: 20
    },
    movieYear: {
        fontSize: 18,
        marginRight: 10
    },
    movieNumOfEp: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 10,
        backgroundColor: Colors.WHITE,
        color: 'black',
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: 20
    },
    watchButton: {
        marginRight: 10
    },
    episodeListWrapperTV: {
        flex: 1,
        width: '85%'
    },
    episodeListWrapperPhone: {
        flex: 1,
        width: '100%'
    },
    episodeList: {
        paddingRight: 10
    }
});

export default MovieDetailScreen;