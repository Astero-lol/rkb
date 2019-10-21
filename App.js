import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

import { HORIZONTAL_GAP, VERTICAL_GAP } from "./src/constats";

import ConnectionController from "./src/components/connection-controller";
import Player from "./src/components/player";

const App = () => {
    const [opened, setOpened] = useState(false);

    return (
        <ImageBackground
            style={styles.background}
            resizeMode='cover'
            source={require('./wall-murals-shiba-inu-dog.jpg')}
        >
            <BlurView tint='light' intensity={50} style={styles.container}>
                <View style={styles.content} >
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <ConnectionController opened={opened} setOpened={setOpened} />
                        </View>
                        <View style={styles.cell}>
                            { !opened && <Player /> }
                        </View>
                    </View>
                </View>
            </BlurView>
        </ImageBackground>
    )
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
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    offsetCell: {
        marginRight: 20
    }
});

export default App;
