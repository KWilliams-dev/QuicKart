import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {useState, useEffect}  from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {setMinutes, setHours} from '../redux/timerActions'

export const ShoppingRouteScreen = ({navigation}) => {

    const {minutes, hours} = useSelector(state => state.timerReducer);

    const [seconds, setSeconds] = useState(0);

    const dispatch = useDispatch();

    let timer;

    useEffect(() => {

        timer = setInterval(() => {

            setSeconds(seconds + 1)

            if(seconds === 60) {
                dispatch(setMinutes(minutes + 1))
                setSeconds(0)
            }

            if(minutes === 60) {
                dispatch(setHours(hours + 1))
                dispatch(setMinutes(0))
            } 

        }, .1)

        return () => clearInterval(timer)
        
    },)

    const handleStopTimer = () => {
        clearInterval(timer)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Shopping Route Stuff!</Text>
            <Button title={"Finish Shopping"} onPress={() => {
                navigation.navigate('ShoppingFinish');
                handleStopTimer()
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