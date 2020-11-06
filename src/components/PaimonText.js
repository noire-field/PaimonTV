import React from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Colors from './../constants/colors';
import * as TextConst from './../constants/text';

const PaimonText = (props) => {
    const extraStyles = {

    };

    switch(props.type) {
        case 'header': 
            extraStyles.fontSize = TextConst.TEXT_HEADER;
            extraStyles.fontFamily = 'NetflixSans-Medium';
        break;
        default: break;
    }

    const textStyles = {
        ...styles.text,
        ...extraStyles,
        ...props.style
    }

    return <Text style={textStyles}>{props.children}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'NetflixSans-Regular',
        color: Colors.WHITE
    }
});

PaimonText.defaultProps = {

}

export default React.memo(PaimonText);