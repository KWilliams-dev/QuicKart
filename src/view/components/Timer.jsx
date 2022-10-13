import * as React from 'react';
import { Text, View } from 'react-native';
import {useState, useEffect}  from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {setMinutes, setHours} from '../redux/actions'

export const Timer = ({timerStoppped}) => {

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

    timerStoppped ? clearInterval(timer) : null

    return (
        <View>
            <Text>{hours} hours {minutes} mins {seconds} seconds</Text>
        </View>
    )

}