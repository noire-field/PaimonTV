import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, TVEventHandler } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import PaimonText from './../../components/PaimonText';

import * as Colors from './../../constants/colors';
import Logger from './../../utils/logger';

const VideoControl = (props) => {
    Logger.Debug(`[VideoControl] Render`);

    const [focusRow, setFocusRow] = useState(1);

    useEffect(() => {
        console.log("Register Event");
        var eventHandler = new TVEventHandler();
        eventHandler.enable(this, (cmp, evt) => {
            console.log(evt.eventType);
        });

        return () => {
            eventHandler.disable();
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.progressBar}>
                    <View style={{ ...styles.progress, width: '25%' }}></View>
                    <View style={{ ...styles.progressPoint, left: '25%' }}></View>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.leftButtons}>
                        <PaimonText style={styles.timeText} numberOfLines={1}>Star Wars: Episode II - Attack Of The Clones</PaimonText>
                    </View>
                    <View style={styles.centerButtons}>
                        <View style={styles.button}>
                            <FontAwesome5 name='play' size={24} color={Colors.TEXT_BLUR}/>
                        </View>
                    </View>
                    <View style={styles.rightButtons}>
                        <PaimonText style={styles.timeText}>23:00:00</PaimonText>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
        position: 'absolute', // its parent is relative
        bottom: 0,
        left: 0,
        width: '100%',
        height: '15%'
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    progressBar: {
        position: 'relative',
        height: 3,
        backgroundColor: 'rgba(175,175,175,.5)',
        marginBottom: 15
    },
    progress: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: 'red'
    },
    progressPoint: {
        position: 'absolute',
        top: -6,
        borderRadius: 50,
        width: 15,
        height: 15,
        backgroundColor: 'red'
    },
    buttons: {
        height: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftButtons: {
        flex: 1,
        alignItems: 'flex-start'
    },
    centerButtons: {
        flex: 1,
        alignItems: 'center'
    },
    rightButtons: {
        flex: 1,
        alignItems: 'flex-end'
    },
    timeText: {
        fontSize: 17
    }
});

export default React.memo(VideoControl);