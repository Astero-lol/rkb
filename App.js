import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Modal, Button, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

import { HORIZONTAL_GAP, VERTICAL_GAP } from "./src/constats";

import ConnectionController from "./src/components/connection-controller";

const App = () => {
    const [text, setText] = useState('1');
    const [visible, setVisible] = useState(false);

    const handleChangeText = value => setText(value);

    return (
        <ImageBackground
            style={ styles.background }
            resizeMode='cover'
            source={require('./wall-murals-shiba-inu-dog.jpg')}
        >
            <BlurView tint='light' intensity={50} style={styles.container}>
                <View style={styles.content} >
                    <ConnectionController />
                </View>
            </BlurView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: HORIZONTAL_GAP,
        paddingVertical: VERTICAL_GAP,
        backgroundColor: 'pink',
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    }
});

export default App;
