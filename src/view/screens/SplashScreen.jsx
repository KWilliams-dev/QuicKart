import react, {useEffect} from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import {useNavigation} from '@react-navigation/native'

export const SplashScreen = () => {
    const navigation = useNavigation();

   return(
    <View style = {{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator/>
    </View>
   )
}