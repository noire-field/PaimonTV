import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import MovieItem from './MovieItem';

const MovieList = (props) => {
    console.log("Movie List Render "+props.title);
    const [selected, setSelected] = useState(-1);

    const onMovieFocus = (index, movie) => {
        setSelected(index);
    }

    const onMovieBlur = (index, movie) => {
        setSelected(-1);
    }

    const onMoviePress = (index, movie) => {
        props.onMovieSelect(movie.movieId);
    }

    const renderItem = (itemData) => {
        return (
            <TouchableOpacity
                onFocus={() => onMovieFocus(itemData.index, itemData.item)}
                onBlur={() => onMovieBlur(itemData.index, itemData.item)}
                onPress={() => onMoviePress(itemData.index, itemData.item)}
            >
                <MovieItem id={itemData.index} image={itemData.item.thumbnail} selected={selected == itemData.index ? true : false}/>
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