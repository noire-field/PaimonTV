import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import * as Colors from './../../constants/colors';
import Logger from './../../utils/logger';

const ScreenLoading = (props) => {
    Logger.Debug(`[ScreenLoading] Render`);

    if(props.show)
        return (
            <View style={[props.style, styles.container]}>
                <ActivityIndicator size='large' color={Colors.ACCENT}/>
            </View>
        );
    else 
        return null;
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
});

export default React.memo(ScreenLoading);