import * as React from 'react';
import { SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Unorderedlist from 'react-native-unordered-list';

export const Welcome = ({navigation}) => {
    const Header = () => {
        return(
            <View style={styles.header}>
                   
                <View style={styles.headerBoxContainer}>
                    <View style={styles.headBoxInner}>
                      <Image source = {require('../assets/quickKartLogo.png')} />
                    </View>
                 </View>
            </View>
        )
    }

    const Texts = () => {
        return(
            <View>
             <Text style={styles.welcomeText}>Welcome!</Text>
            </View>
        )
    }

    const Boxes = () => {
        return(

            
            <View style={styles.boxContainer}>

             <View style={styles.box}>
                <View style={styles.inner}>
                    <Text> This app is the result of an idea from
                         Sasa Mitrovich that landed in the hands of 
                        six awesome engineers who built the founadtions.
                        Abdullahi Munye (Data Modeler), Khamilah Nixon 
                        (Documentation Lead), Kyle Williams (Code Architect),
                         Joe Nsengiyumva (Testing Lead), Raven Gardner (UI/UX Lead), 
                         Alan Oliver Santiesteban (Team Manager)
                    </Text>

                    <Text>The purpose of this app is to:</Text>

                    <Unorderedlist><Text> 
                        Make Grocery shopping efficient by optimizing 
                        most of your time by providing the fastest
                        route to each item in your shopping list.
                    </Text></Unorderedlist>

                    <Unorderedlist><Text>
                        You will be able to see the total cost of your items,
                        a visual representation of your route, the total time
                       spent shopping once youve completed your list.
                     </Text></Unorderedlist>
                </View>
             </View>

             {/* <View style={styles.box}>
                <View style={styles.inner}>
                    <Text>Box 2</Text>
                </View>
             </View> */}

             {/* <View style={styles.box}>
                <View style={styles.inner}>
                    <Text>Box 3</Text>
                </View>
             </View> */}

             
               
             
               
             
            </View>
        )
    }

    const Buttons = () => {
        return(

            <Button onPress={() => navigation.navigate('ShoppingList')} style={styles.appButtonContainer} buttonColor='blue' mode='contained'
               title = "START SHOPPING">
            <Text style={styles.appButtonText} variant='headlineMedium'>START SHOPPING</Text></Button>

        )}

    return(
        <SafeAreaView style={styles.container}>
            <Header/>
            <Texts/>
            <Boxes/>
            <Buttons/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#F2FFFF"
        
    },
    header:{
        width: '80%',
        height: '32%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'F2FFFF',
        padding: 5,
    },
    headerBoxContainer: {
        width: '100%',
        height: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    headBoxInner:{
        flex:1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxContainer: {
        backgroundColor: 'red',
        marginTop: 20,
        width: '85%',
        height: '50%',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        alignItems: 'center',
    },
    box:{
        backgroundColor: 'red',
        marginTop: 20,
        width: '85%',
        height: '85%',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    box1:{
        width: '100%',
        height: '20%',
        backgroundColor: '#fff',
        padding: 5,
    },
    inner:{
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    appButtonContainer: {
        marginTop: 30,
        backgroundColor: '#3F7CAC',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
      },
      appButtonText: {
        color: 'white',
        fontWeight: 'bold'
      },
      welcomeText: {
        color: 'Black',
        fontWeight: 'bold',
        fontSize: 48,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
      }
});