import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Modal, Button } from 'react-native';

import { HORIZONTAL_GAP, VERTICAL_GAP } from "./src/constats";

import ConnectionController from "./src/components/connection-controller";

const App = () => {
    const [text, setText] = useState('1');
    const [visible, setVisible] = useState(false);

    const handleChangeText = value => setText(value);

    return (
        <View style={styles.container}>
            <View style={styles.content} >
                <ConnectionController />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: HORIZONTAL_GAP,
        paddingVertical: VERTICAL_GAP,
        backgroundColor: 'pink',
    },
    content: {
        flex: 6,
        backgroundColor: 'green',
    },
});

export default App;
