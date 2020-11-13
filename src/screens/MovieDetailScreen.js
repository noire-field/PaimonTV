import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Button, Image, FlatList, TouchableOpacity } from 'react-native';

import PaimonText from './../components/PaimonText';
import EpisodeItem from './../components/EpisodeItem';

import * as Colors from './../constants/colors';
import Logger from './../utils/logger';
import { EpisodeObjectToArray } from './../utils/movie';

const sampleData = {
    ep1: {
        progress: 100,
        title: "Episode 1",
        url: "http://downloads.pvp.world/noirefield/starwars/Star.Wars.Episode.II.Attack.of.the.Clones.2002.mp4"
    },
    ep2: {
        progress: 100,
        title: "Episode 2",
        url: "http://downloads.pvp.world/noirefield/starwars/Star.Wars.Episode.II.Attack.of.the.Clones.2002.mp4"
    },
    ep3: {
        progress: 30,
        title: "Episode 3",
        url: "http://downloads.pvp.world/noirefield/starwars/Star.Wars.Episode.II.Attack.of.the.Clones.2002.mp4"
    },
    ep4: {
        progress: 0,
        title: "Episode 4",
        url: "http://downloads.pvp.world/noirefield/starwars/Star.Wars.Episode.II.Attack.of.the.Clones.2002.mp4"
    },
    ep5: {
        progress: 0,
        title: "Episode 5",
        url: "http://downloads.pvp.world/noirefield/starwars/Star.Wars.Episode.II.Attack.of.the.Clones.2002.mp4"
    },
    ep6: {
        progress: 0,
        title: "Episode 6",
        url: "http://downloads.pvp.world/noirefield/starwars/Star.Wars.Episode.II.Attack.of.the.Clones.2002.mp4"
    },
    ep7: {
        progress: 0,
        title: "Episode 7",
        url: "http://downloads.pvp.world/noirefield/starwars/Star.Wars.Episode.II.Attack.of.the.Clones.2002.mp4"
    }
}

const MovieDetailScreen = (props) => {
    Logger.Debug(`[MovieDetailScreen] Render`);

    const [selected, setSelected] = useState(-1);

    const onMovieFocus = (index, movie) => { setSelected(index); }

    const onMovieBlur = (index, movie) => { setSelected(-1); }

    const onEpisodePress = (index, movie) => {
        
    }

    const detail = useSelector(state => state.movie.detail);
    const numOfEp = Object.keys(detail.videos).length;

    const renderEpisodeItem = ({ index, item }) => {
        return (
            <TouchableOpacity
                onFocus={() => onMovieFocus(index, item)}
                onBlur={() => onMovieBlur(index, item)}
                onPress={() => onEpisodePress(index, item)}
            >
                <EpisodeItem key={item.id} title={item.title} progress={item.progress} selected={selected == index ? true : false}/>
            </TouchableOpacity>
        );
    };

    console.log(detail);

    const episodeList = EpisodeObjectToArray(sampleData);
    console.log(episodeList);

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
                            <View style={styles.watchButton}><Button title="Xem phim" color={Colors.ACCENT}/></View>
                            <View><Button title="Thêm vào danh sách"/></View>
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