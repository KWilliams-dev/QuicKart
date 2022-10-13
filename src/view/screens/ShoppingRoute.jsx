import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {useState}  from 'react';
import { Timer } from '../components/Timer';

export const ShoppingRouteScreen = ({navigation}) => {

    const [timerStopped, setTimerStopped] = useState(false)

    const handleStopTimer = (timerStopped) => {
        setTimerStopped(timerStopped)
    }

    return(
        <View style={styles.container}>
            {!timerStopped ? <Timer timerStoppped={timerStopped}/> : <Timer timerStopped={timerStopped}/>}
            <Text style={styles.welcomeText}>Shopping Route Stuff!</Text>
            <Button title={"Finish Shopping"} onPress={() => {
                navigation.navigate('ShoppingFinish');
                handleStopTimer(true)
            }}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: 32
    }
})