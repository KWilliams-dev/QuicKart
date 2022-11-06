import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Welcome } from '../screens/Welcome';
import { ShoppingListScreen } from '../screens/ShoppingList';
import { ShoppingRouteScreen } from '../screens/ShoppingRoute';
import { FinishShoppingScreen } from '../screens/FinishShopping';
import SignInScreen from '../screens/SignInScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}

function RootNavigator() {
    return(
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="Home" component={Welcome} options={{title: 'Welcome!'}}/>
            <Stack.Screen name="ShoppingList" component={ShoppingListScreen} options={{title: 'Your Grocery List!'}}/>
            <Stack.Screen name="SignIn" component={SignInScreen} options={{title: 'Please Sign In!'}}/>
            <Stack.Screen name="ShoppingRoute" component={ShoppingRouteScreen} options={{title: 'Fastest Route!'}} />
            <Stack.Screen name="ShoppingFinish" component={FinishShoppingScreen} options={{title: "You're all done!"}}/>
        </Stack.Navigator>
    )
}