import * as React from 'react';
import { FlatList, View, Text } from 'react-native';
import { styles } from '../styles/ShoppingList.styles';
import {useSelector} from 'react-redux'

export const FinishShoppingScreen = () => {

    // useSelector is one aspect of React - Redux (it allows us to access globally stored variables)
    const {minutes, hours} = useSelector(state => state.timerReducer);
    const {groceryList} = useSelector(state => state.listReducer);

    return (
        <View style={styles.container}>
            <Text style={styles.finishShoppingTitle}>Thank You!</Text>
            <View style={styles.finishShoppingTimerView}>
                <Text style={styles.finishShoppingTimerText}>{hours} hrs : {minutes} mins</Text>
            </View>
            <View style={styles.flatList}>
                <FlatList
                data={groceryList}
                style={styles.finishShoppingList}
                renderItem={({item}) => { return(<Text style={styles.item}>{item.name}</Text>);
            }}
                />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.finishShoppingBottomText}>Total: $0.00</Text>
            </View>
        </View>
    )
}