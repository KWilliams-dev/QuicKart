import * as React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { View, Text, StyleSheet } from 'react-native'

export const FinishListItem = ({name, collected}) => {
    return (
        <View style={styles.listItemContainer}>
            {collected ? <MaterialCommunityIcons name='checkbox-marked-outline' size={24} color='black'/>: <MaterialCommunityIcons name='checkbox-blank-outline' size={24} color='black'/>}
            <Text style={styles.listItemText}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 10
    },
    listItemText: {
        paddingLeft: 10,
        fontSize: 20,
        color: '#5A5A5A',
    }
})