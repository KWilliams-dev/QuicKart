import * as React from 'react';
import { View, StyleSheet, Button, FlatList, Dimensions, Image } from 'react-native';
import {useState, useEffect}  from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {setMinutes, setHours} from '../redux/timerActions'
import CardData from '../components/CardCarousel/CardData/index';
//import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const DATA = [
    <CardData item={ "Item Name" } aisle={ "A" } bay={ "1" } isActive={ true }/> ,
    <CardData item={ "Item Name" } aisle={ "B" } bay={ "2" } isActive={ true }/>

];


// const{width} = Dimensions.get("window");
// const height = width * 100 /60 //60%
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
            
            <View style = {styles.flatList2} > 
                <FlatList
                data={CardData}
                keyExtractor={(item,index ) => index.toString()}
                horizontal
                pagingEnabled
                renderItem={({item}) => {

                    return <View style={[styles.card, styles.shadowprop]}>
  
                     <CardData item={ "Item Name" } aisle={ "A" } bay={ "1" } isActive={ true }/> 
                        
                    </View>               
                            
                }}
                />

            </View>
            
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
    },
    card: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 55
    },
    shadowprop: {
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowColor: 3,
        shadowOffset: {width: -2}
    },
    flatList2: {
        backgroundColor: 'white',
        marginTop: '20%',
        width: '70%',
        height: '30%',

    },
})