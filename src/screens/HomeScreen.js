import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';

import MovieCategory from './../components/MovieCategory';
import Sidebar from './../components/Sidebar';
import { movieSetDetail } from './../store/actions/movie.action';

import * as Colors from './../constants/colors';
import Logger from './../utils/logger';
import { SortMyList } from './../utils/movie';

const HomeScreen = (props) => {
    Logger.Debug(`[HomeScreen] Render`);

    const movies = useSelector(state => state.movie.movies);
    const categories = useSelector(state => state.movie.categories);
    const myList = useSelector(state => state.movie.myList);
    const dispatch = useDispatch();

    //const [backgroundUrl, setBackgroundUrl] = useState(null);

    const onMovieSelect = useCallback((movieId) => {
        dispatch(movieSetDetail({id: movieId, ...movies[movieId]}));
        props.navigation.replace('MovieDetailScreen');
    }, [dispatch]);

    /*
    const onMovieHover = useCallback((movie) => {
        setBackgroundUrl(movie.thumbnail);
    }, [dispatch]);*/

    const renderMyList = <MovieCategory key={`-1-mylist`} index={-1} title='Danh sách của tôi' list={SortMyList(myList)} onMovieSelect={onMovieSelect}/>
    const renderCategories = categories.map((cat, index) => <MovieCategory key={`${index}-${cat.title}`} index={index} title={cat.title} list={cat.movies} onMovieSelect={onMovieSelect}/>);

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
        position: 'relative',
        backgroundColor: Colors.PRIMARY,
        flex: 1,
        /*flexDirection: 'row'*/
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '5%',
        height: '100%'
    },
    movieCategories: {
        position: 'absolute',
        top: 0,
        left: '5%',
        width: '95%',
        height: '100%',
        paddingTop: 20,
        backgroundColor: 'rgba(0,0,0,.7)',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: '5%',
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});

export default HomeScreen;