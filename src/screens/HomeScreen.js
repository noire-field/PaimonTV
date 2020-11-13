import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import MovieCategory from './../components/MovieCategory';
import Sidebar from './../components/Sidebar';
import { movieSetDetail } from './../store/actions/movie.action';

import * as Colors from './../constants/colors';
import Logger from './../utils/logger';

const HomeScreen = (props) => {
    Logger.Debug(`[HomeScreen] Render`);

    const movies = useSelector(state => state.movie.movies);
    const categories = useSelector(state => state.movie.categories);
    const myList = useSelector(state => state.movie.myList);
    const dispatch = useDispatch();

    const onMovieSelect = useCallback((movieId) => {
        dispatch(movieSetDetail(movies[movieId]));
        props.navigation.replace('MovieDetailScreen');
    }, [dispatch]);

    const renderMyList = <MovieCategory key={`-1-mylist`} title='Danh sách của tôi' list={myList} onMovieSelect={onMovieSelect}/>
    const renderCategories = categories.map((cat, index) => <MovieCategory key={`${index}-${cat.title}`} title={cat.title} list={cat.movies} onMovieSelect={onMovieSelect}/>);

    return (
        <View style={styles.container}>
            <Sidebar style={styles.sidebar}/>
            <ScrollView style={styles.movieCategories}>
                {renderMyList}
                {renderCategories}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.PRIMARY,
        flex: 1,
        flexDirection: 'row'
    },
    sidebar: {
        width: '5%'
    },
    movieCategories: {
        paddingTop: 20
    },
});

export default HomeScreen;