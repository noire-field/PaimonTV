import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Button, Image } from 'react-native';

import PaimonText from './../components/PaimonText';

import * as Colors from './../constants/colors';
import Logger from './../utils/logger';

const MovieDetailScreen = (props) => {
    Logger.Debug(`[MovieDetailScreen] Render`);

    const detail = useSelector(state => state.movie.detail);

    console.log(detail);

    var numOfEp = Object.keys(detail.videos).length;

    return (
        <View style={styles.container}>
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
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.PRIMARY,
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
        flexDirection: 'row'
    },
    watchButton: {
        marginRight: 10
    }
});

export default MovieDetailScreen;