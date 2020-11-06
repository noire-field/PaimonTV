import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import MovieItem from './MovieItem';

const MovieList = (props) => {
    const renderItem = (itemData) => {
        return <MovieItem image={itemData.item.imageUrl}/>
    }

    return (
        <View style={styles.container}>
            <FlatList contentContainerStyle={styles.list} data={props.list} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} horizontal={true}/>
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

export default MovieList;