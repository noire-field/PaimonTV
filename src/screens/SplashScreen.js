import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, Image, ActivityIndicator, Button, Alert , Text} from 'react-native';

import Logger from './../utils/logger';
import axios from './../utils/axios';

import * as Colors from './../constants/colors';
import { appSetInitLoaded } from './../store/actions/app.action';
import { movieSetMovies, movieSetCategories, movieSetMyList } from './../store/actions/movie.action';
import { MakeCategories, MakeMyList } from './../utils/movie';

const SplashScreen = (props) => {
    const [loadState, setLoadState] = useState(0); // 0 - Nothing / 1 - Loading / 2 - Success / 3 - Error
    const dispatch = useDispatch();

    Logger.Debug(`[SplashScreen] Render (State: ${loadState})`);

    useEffect(() => {
        switch(loadState) {
            case 1: 
                Logger.Debug(`[SplashScreen] Loading server data...`);

                axios.get('/.json').then(({ data }) => {
                    dispatch(movieSetMovies(data.movies));
                    dispatch(movieSetCategories(MakeCategories(data.series, data.movies)));
                    dispatch(movieSetMyList(MakeMyList(data.myList, data.movies), data.myList.sortNumber));
    
                    Logger.Debug(`[SplashScreen] Data is loaded.`);

                    dispatch(appSetInitLoaded(true));
                }).catch((error) => {
                    Logger.Error(`[SplashScreen] Unable to fetch server data`, error);

                    Alert.alert('Lỗi', 'Không thể tải dữ liệu từ máy chủ.', [ { text: 'Đã hiểu' }]);
                    setLoadState(3);
                });

                break;
        }
    }, [loadState]);

    useEffect(() => {
        setLoadState(1);
    }, []);

    var renderContent = null;

    switch(loadState) {
        case 1: renderContent = <ActivityIndicator size="large" color={Colors.ACCENT} />; break;
        case 3: renderContent = <Button title="Thử Lại" onPress={() => setLoadState(1)} color={Colors.ACCENT}/>; break;
        default: renderContent = null;
    }

    return (
        <View style={styles.container}>
            <Image style={styles.splashImage} source={require('./../assets/images/splash_paimon2.png')}/>
            <View style={styles.statusBox}>
                {renderContent}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d1cbbd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    splashImage: {
        resizeMode: 'contain',
        width: '50%',
        height: '50%'
    },
    statusBox: {
        height: 50,
        marginTop: 30
    }
});

export default SplashScreen;