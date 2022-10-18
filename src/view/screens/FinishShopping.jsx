import * as React from 'react';
import { FlatList, View, Text } from 'react-native';
import { styles } from '../styles/ShoppingList.styles';
import {useSelector} from 'react-redux'
import { FinishListItem } from '../components/FinishListItem';

export const FinishShoppingScreen = () => {

    // useSelector is one aspect of React - Redux (it allows us to access globally stored variables)
    const {minutes, hours} = useSelector(state => state.timerReducer);
    const {groceryList} = useSelector(state => state.listReducer);
    const {total} = useSelector(state => state.totalReducer)

    return (
        <View style={styles.container}>
            <Text style={styles.finishShoppingTitle}>Thank You!</Text>
            <View style={styles.finishShoppingTimerView}>
                <Text style={styles.finishShoppingTimerText}>{hours} hrs : {minutes} mins</Text>
            </View>
            <View style={styles.finishShoppingFlatList}>
                <FlatList
                data={groceryList}
                style={styles.finishShoppingList}
                renderItem={({item}) => { return(<FinishListItem name={item.name} collected={item.collected}/>);
            }}
                />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.finishShoppingBottomText}>Total: ${total}</Text>
            </View>
        </View>
    )
}