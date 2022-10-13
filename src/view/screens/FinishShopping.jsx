import * as React from 'react';
import { FlatList, View, Text } from 'react-native';
import { styles } from '../styles/ShoppingList.styles';
import { Timer } from './ShoppingRoute';
import {useSelector, useDispatch} from 'react-redux'

export const FinishShoppingScreen = () => {

    const {minutes, hours} = useSelector(state => state.timerReducer);

    return (
        <View style={styles.container}>
            <Text style={styles.finishShoppingTitle}>Thank You!</Text>
            <View style={styles.finishShoppingTimerView}>
                <Text style={styles.finishShoppingTimerText}>{hours} hrs : {minutes + 1} mins</Text>
            </View>
            <View style={styles.finishShoppingListContainer}>
                <FlatList style={styles.finishShoppingList}/>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.finishShoppingBottomText}>Total: $0.00</Text>
            </View>
        </View>
    )
}