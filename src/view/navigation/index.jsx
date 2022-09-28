import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Welcome } from '../screens/Welcome';
import { ShoppingListScreen } from '../screens/ShoppingList';
import { ShoppingRouteScreen } from '../screens/ShoppingRoute';

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
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Welcome} options={{title: 'Welcome!'}}/>
            <Stack.Screen name="ShoppingList" component={ShoppingListScreen} options={{title: 'Your Grocery List!'}}/>
            <Stack.Screen name="ShoppingRoute" component={ShoppingRouteScreen} options={{title: 'Fastest Route!'}} />
            {/* <Stack.Screen name="Loading" component={LoadingScreeen} /> */}
        </Stack.Navigator>
    )
}