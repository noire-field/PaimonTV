import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, BackHandler } from 'react-native';

import PaimonText from './../components/PaimonText';
import EpisodeItem from './../components/EpisodeItem';
import PaimonButton from './../components/PaimonButton';

import { movieCheckToMyList } from './../store/actions/movie.action';

import * as Colors from './../constants/colors';
import Logger from './../utils/logger';
import { EpisodeObjectToArray, FindMovieInMyList } from './../utils/movie';

const MovieDetailScreen = (props) => {
    Logger.Debug(`[MovieDetailScreen] Render`);

    const [selected, setSelected] = useState(-2);
    const refWatchButton = useRef(null);

    const detail = useSelector(state => state.movie.detail);
    const myList = useSelector(state => state.movie.myList);
    const dispatch = useDispatch();

    const movieInMyList = FindMovieInMyList(detail.id, myList);

    const onEpisodeFocus = (index) => { setSelected(index); }
    const onEpisodeBlur = () => { setSelected(-3); }
    const onEpisodePress = (index, movie) => {

    }

    const onWatchMovie = () => {
        props.navigation.replace('WatchScreen');
    }

    const onCheckMovie = () => {
        console.log("On Add Press");
        if(movieInMyList == -1) dispatch(movieCheckToMyList(detail.id, 1)); // 1 for adding
        else dispatch(movieCheckToMyList(detail.id, -1)); // -1 for removing
    };

    useEffect(() => {
        // Forcefully focus
        if(refWatchButton) refWatchButton.current.focus();

        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            props.navigation.replace('HomeScreen');
            return true;
        });

        return () => {
            backHandler.remove();
        }
    }, []);

    
    const numOfEp = Object.keys(detail.videos).length;

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

    const episodeList = EpisodeObjectToArray(detail.videos);

    return (
        <View style={styles.container}>
            <Image style={styles.backgroundImage} source={{ uri: detail.thumbnail }}/>
            <View style={styles.wrapper}>
                <View style={styles.leftSide}>
                    <View style={styles.thumbnailWrapper}>
                        <Image style={styles.thumbnail} source={{ uri: detail.thumbnail }}/>
                    </View>
                </View>
                <View style={styles.rightSide}>
                    <View style={styles.detailWrapper}>
                        <PaimonText type='header' style={styles.movieTitle}>{detail.title}</PaimonText>
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
                        <View style={styles.episodeListWrapper}>
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
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        resizeMode: 'cover',
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
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20
    },
    rightSide: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 0,
        paddingRight: 10
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
    detailWrapper: {
        height: 200 * 2,
        width: '100%'
    },
    movieTitle: {
        fontSize: 30,
        lineHeight: 30
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
    episodeListWrapper: {
        flex: 1,
        width: '80%'
    },
    episodeList: {
        paddingRight: 10
    }
});

export default MovieDetailScreen;