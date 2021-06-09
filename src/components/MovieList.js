import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import MovieItem from './MovieItem';

import Logger from './../utils/logger';


const MovieList = (props) => {
    Logger.Debug("[MovieList] Render "+props.title);

    const [selected, setSelected] = useState(-1);

    const onMovieFocus = (index, movie) => { 
        setSelected(index); 
        if(props.onMovieHover) props.onMovieHover(movie);
    }
    const onMovieBlur = (index, movie) => { setSelected(-1); }
    const onMoviePress = (index, movie) => { props.onMovieSelect(movie.movieId); }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onFocus={() => onMovieFocus(index, item)}
                onBlur={() => onMovieBlur(index, item)}
                onPress={() => onMoviePress(index, item)}
            >
                <MovieItem id={index} image={item.thumbnail} selected={selected == index ? true : false}/>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList contentContainerStyle={styles.list} data={props.list} renderItem={renderItem} keyExtractor={(item) => item.movieId.toString()} horizontal={true}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    list: {
        justifyContent: 'space-between'
    }
})

export default React.memo(MovieList);