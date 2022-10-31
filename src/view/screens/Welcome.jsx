import * as React from 'react';
import { SafeAreaView, View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Unorderedlist from 'react-native-unordered-list';
import { styles } from '../styles/ShoppingList.styles';


export const Welcome = ({navigation}) => {

    // const Header = () => {
    //     return(
    //         <View style={styles.header}>
                   
    //             <View style={styles.headerBoxContainer}>
    //                 <View style={styles.headBoxInner}>
    //                   <Image source = {require('../assets/quickKartLogo.png')} />
    //                 </View>
    //              </View>
    //         </View>
    //     )
    // }


    const Boxes = () => {
        return(
                <View>
                    <Text style={styles.welcomeText}>Find Your Quickest Route Everytime You Shop</Text>
                </View>
        
            // <View style={styles.boxContainer}>

            //  <View style={styles.box}>
            //     <View style={styles.inner}>
            //         <Text> This app is the result of an idea from
            //              Sasa Mitrovich that landed in the hands of 
            //             six awesome engineers who built the founadtions.
            //             Abdullahi Munye (Data Modeler), Khamilah Nixon 
            //             (Documentation Lead), Kyle Williams (Code Architect),
            //              Joe Nsengiyumva (Testing Lead), Raven Gardner (UI/UX Lead), 
            //              Alan Oliver Santiesteban (Team Manager)
            //         </Text>

            //         <Text>The purpose of this app is to:</Text>

            //         <Unorderedlist><Text> 
            //             Make Grocery shopping efficient by optimizing 
            //             most of your time by providing the fastest
            //             route to each item in your shopping list.
            //         </Text></Unorderedlist>

            //         <Unorderedlist><Text>
            //             You will be able to see the total cost of your items,
            //             a visual representation of your route, the total time
            //            spent shopping once youve completed your list.
            //          </Text></Unorderedlist>
            //     </View>
            //  </View>
            // </View>
        )
    }

    const Buttons = () => {
        return(

            <Button onPress={() => navigation.navigate('ShoppingList')} style={styles.bottomButton}
            mode='contained'
               title = "START SHOPPING">
            <Text style={styles.bottomText} variant='headlineMedium'>START SHOPPING</Text></Button>

        )}


        
    return(
        <ImageBackground source={require('../assets/welcomeBG.png')} style={styles.backgroundImage}>

        <SafeAreaView style={styles.container}>
            <Boxes/>
            <Buttons/>
        </SafeAreaView>

        </ImageBackground>
    );
};

