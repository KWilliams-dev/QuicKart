import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {useState, useEffect}  from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {setMinutes, setHours} from '../redux/timerActions'
import CardData from '../components/CardCarousel/CardData/index';

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
            <CardData item={ "Item Name" } aisle={ "A" } bay={ "1" } isActive={ true }/>
            <Button title={"Finish Shopping"} onPress={() => {
                navigation.navigate('ShoppingFinish');
                handleStopTimer()
            }}></Button>
            {/* delete isActive prop if card will control the opacity */}
            {/* query database to test card data props */}

            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 32
    }
})