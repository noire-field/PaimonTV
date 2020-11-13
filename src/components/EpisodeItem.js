import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

import PaimonText from './PaimonText';
import * as Colors from './../constants/colors';

const EpisodeItem = (props) => {

    return (
        <View style={styles.container}>
            <View style={[styles.wrapper, props.selected ? styles.wrapperSelected : styles.wrapperUnselected]}>
                <PaimonText>{props.title}</PaimonText>
                <PaimonText>45:32</PaimonText>
            </View>
            <View style={{ ...styles.progressBar, width: `${props.progress}%` }}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: 30,
        marginVertical: 5
    },
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        paddingHorizontal: 5,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        borderWidth: 0.5
    },
    wrapperUnselected: {
        borderColor: 'rgb(100,100,100)',
        backgroundColor: 'rgba(50,50,50,0.5)'
    },
    wrapperSelected: {
        borderColor: 'rgb(100,100,100)',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    progressBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 2,
        backgroundColor: Colors.ACCENT
    }
});

export default React.memo(EpisodeItem);