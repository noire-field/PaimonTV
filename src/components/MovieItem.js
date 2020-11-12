import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as Colors from './../constants/colors';

const MovieItem = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: props.image }} onError={(error) => console.log(error.nativeEvent.error)}/>
            <View style={[styles.wrapper, props.selected ? styles.wrapperSelected : styles.wrapperUnselected]}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        height: 200,
        width: 135,
        elevation: 1,
        position: 'relative'
    },
    wrapper: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0
    },
    wrapperUnselected: {
        borderBottomColor: Colors.ACCENT,
        borderBottomWidth: 3
    },
    wrapperSelected: {
        borderColor: Colors.WHITE,
        borderWidth: 3
    },
    image: {
        position: 'absolute',
        resizeMode: 'stretch',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0
    }
})

export default React.memo(MovieItem);