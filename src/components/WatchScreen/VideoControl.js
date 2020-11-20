import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, TVEventHandler, Animated } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import PaimonText from './../../components/PaimonText';
import { watchRequireSeek } from './../../store/actions/watch.action';

import * as Colors from './../../constants/colors';
import Logger from './../../utils/logger';
import { DurationSecondToText } from './../../utils/movie';

function GetCurrentSecond() {
    return Math.floor(Date.now() / 1000);
}

const VideoControl = (props) => {
    Logger.Debug(`[VideoControl] Render`);

    const dispatch = useDispatch();

    const controlFading = useRef(false);
    const pressCount = useRef(0);
    const fadeAnim = useRef(new Animated.Value(0))
    const customTimer = useRef([0,0]);

    const [controlShown, setControlShown] = useState(false);
    const [focusRow, setFocusRow] = useState(1);
    const [playing, setPlaying] = useState(false);
    const [seeking, setSeeking] = useState(false);
    const [seekPos, setSeekPos] = useState(0);

    const movieTitle = useSelector(state => state.watch.movieTitle);
    const episodeTitle = useSelector(state => state.watch.episode.title);

    const videoLoaded = useSelector(state => state.watch.videoLoaded);
    const tempCurrentProgress = useSelector(state => state.watch.currentProgress);
    const currentProgress = seeking ? seekPos : tempCurrentProgress;
    const maxProgress = useSelector(state => state.watch.episode.duration);
    const progressPercent = currentProgress / maxProgress * 100;
    const remainProgressText = DurationSecondToText(Math.round(Math.abs(maxProgress - currentProgress)));

    const HideControl = () => {
        if(controlFading.current || !controlShown) return;

        controlFading.current = true;
        fadeAnim.current.setValue(1);
        Animated.timing(fadeAnim.current, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
        }).start(() => {
            controlFading.current = false;
        });

        setControlShown(false);
    }

    const ShowControl = () => {
        if(controlFading.current || controlShown) return;

        controlFading.current = true;

        fadeAnim.current.setValue(0);
        Animated.timing(fadeAnim.current, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start(() => {
            controlFading.current = false;
            updateControlFadingTimer();
        });

        setControlShown(true);
    }

    const OnMoveHorizontal = (moveUp) => {
        pressCount.current++
        if(pressCount.current % 2 != 0)
            return;

        ShowControl();

        if(moveUp) { setFocusRow(0); } 
        else { setFocusRow(1); }
    }

    const OnMoveVertical = (moveRight) => {
        pressCount.current++
        if(pressCount.current % 2 != 0)
            return;

        ShowControl();

        if(!controlFading.current && controlShown && videoLoaded) // Completely Shown?
        {
            if(!seeking) setSeeking(true)
            
            updateSeekingTimer();
            setSeekPos(Math.min(Math.max(currentProgress + (moveRight ? 10 : -10), 0), maxProgress));
        }
    }

    const OnSelect = () => {
        pressCount.current++
        if(pressCount.current % 2 != 0)
            return;

        ShowControl();

        //if(focusRow == 1) { // The Play/Pause button
        

         // Directional Pad double-click bug fix
        setPlaying(playing ? false: true);
        
        //}
    }

    const CompleteSeeking = () => {
        if(!seeking) return;

        dispatch(watchRequireSeek(seekPos))
        setSeeking(false);
    }

    const updateControlFadingTimer = () => { customTimer.current[0] = GetCurrentSecond() + 2 }
    const updateSeekingTimer = () => { customTimer.current[1] = GetCurrentSecond() + 2 }
    
    useEffect(() => {
        if(controlShown) {
            var currentSecond = GetCurrentSecond();
            if(currentSecond >= customTimer.current[0])
                HideControl();
            if(currentSecond >= customTimer.current[1])
                CompleteSeeking();
            
            //var handler = setTimeout(HideControl, 1500);
            //return () => { clearTimeout(handler); }
        }
    });

    useEffect(() => {
        var eventHandler = new TVEventHandler();
        eventHandler.enable(this, (cmp, evt) => {
            updateControlFadingTimer();
            switch(evt.eventType) {
                case 'left': OnMoveVertical(false); break;
                case 'right': OnMoveVertical(true); break;
                case 'up': OnMoveHorizontal(true); break;
                case 'down': OnMoveHorizontal(false); break;
                case 'select': OnSelect(); break;
            }
        });

        return () => { eventHandler.disable(); }
    })

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Animated.View style={{ opacity: fadeAnim.current }}>
                    <View style={[styles.progressBar, focusRow == 0 ? styles.progressBarSelected : {}]}>
                        <View style={[ styles.progress, { width: progressPercent+"%" }]}></View>
                        <View style={[ styles.progressPoint, focusRow == 0 ? styles.progressPointSelected : {}, { left: progressPercent+"%" }]}></View>
                    </View>
                    <View style={styles.buttons}>
                        <View style={styles.leftButtons}>
                            <PaimonText style={styles.titleText} numberOfLines={1}>{movieTitle}</PaimonText>
                            <PaimonText style={styles.episodeText} numberOfLines={1}>{episodeTitle}</PaimonText>
                        </View>
                        <View style={styles.centerButtons}>
                            <TouchableOpacity>
                                <View style={styles.button}>
                                    <FontAwesome5 name={playing ? 'pause' : 'play'} size={focusRow == 1 ? 26 : 24} color={focusRow == 1 ? Colors.TEXT_FOCUS : Colors.TEXT_BLUR}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rightButtons}>
                            <PaimonText style={styles.timeText}>{remainProgressText}</PaimonText>
                        </View>
                    </View>
                </Animated.View>
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
        marginTop: 1,
        marginBottom: 15
    },
    progressBarSelected: {
        height: 5,
        marginTop: 0,
        marginBottom: 14
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
    progressPointSelected: {
        top: -5
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