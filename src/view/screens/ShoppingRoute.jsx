import * as React from 'react';
import { View, StyleSheet,FlatList, Text as NativeText, Alert, ScrollView, SafeAreaView, SectionList} from 'react-native';

import {useState, useEffect}  from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {setMinutes, setHours} from '../redux/timerActions'
import { setGroceryList, SET_GROCERY_LIST } from '../redux/groceryListAction';
import CardData from '../components/CardCarousel/CardData/index';
import { Button, Text } from 'react-native-paper';
import Checkbox from '../components/Checkbox';


export const ShoppingRouteScreen = ({navigation}) => {
    const {groceryList} = useSelector(state => state.listReducer);
    const {total} = useSelector(state => state.totalReducer)
    const {minutes, hours} = useSelector(state => state.timerReducer);
    const [seconds, setSeconds] = useState(0);
    const  [selectedItems, setSelectedItems] = useState(groceryList);
    const [totalPrice, setPrice] = useState(0.00);
    //console.log(groceryList);
    //const  [selectedItems, setSelectedItems] = useState([groceryList]);

   
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

    const deleteItem = (item) => {
        const items = groceryList.filter((sitem) => sitem.id !== item.id );
      
        dispatch(setGroceryList(items));
    };

    const checkItem = (item)=>{
        const items = selectedItems
        selectedItems.forEach(element => {
            if(item.id == item.id){
                chec
                return[...items]
            }
        });
    }

    
   
        
    useEffect(() =>{
        let subTotal =0.00
        groceryList.forEach(item=>{
            subTotal += item.price;
        })
        subTotal =subTotal.toFixed(2);
        setPrice(subTotal)
    },[groceryList])
    

 /*   useEffect(() =>{
        let subTotal =0.00
        groceryList.forEach(item=>{
            subTotal += item.price;
        })
        subTotal =subTotal.toFixed(2);
        setPrice(subTotal)
    },[groceryList])
    */
    const handleStopTimer = () => {
        clearInterval(timer)
    }


    return(
       
        <View style={styles.container}>
       
            <CardData item={ "Item Name" } aisle={ "A" } bay={ "1" } isActive={ true }/>
            <Button  onPress={() => {
                
            }}
            style={styles.bottomButton}
            buttonColor='blue'
            mode='contained'>
            
                <Text style={styles.totalDisplay} variant='headlineMedium'>Next</Text>
        </Button>
            <FlatList style={styles.background}
                data={groceryList}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.inline}>
                                <View style={styles.checkbox}>


                                    
                                    <Checkbox isChecked={true} onPress={() => this.setState({checked: !this.state.checked})}/>
                                   
                                </View>
                                <View style={styles.itemName}>
                                    <NativeText style={styles.item}>{item.name}</NativeText>
                                </View>
                                <View style={styles.itemPrice}>
                                    <NativeText style={styles.currency}><Text style={styles.priceText}>${item.price}</Text></NativeText>
                                </View>
                                <View style={styles.trshbttn}>
                                    <NativeText style={styles.trashButton}><Button onPress={() =>  deleteItem(item)} icon="delete"/></NativeText>
                                </View>
                                
                            </View>
                            
                        );
                    }
                }

           />
            <View style={styles.hairline} />
        <View style={styles.bottomContainer}>
            <Text style={styles.bottomText} variant='titleLarge'>Total Cost:</Text><NativeText style={styles.price}>${totalPrice}</NativeText>
            <Text style={styles.bottomText} variant='titleLarge'>Grocery Count: {groceryList.length}</Text>
        </View>
            {/* delete isActive prop if card will control the opacity */}
            {/* query database to test card data props */}
            <Button  onPress={() => {
            
            navigation.navigate('ShoppingFinish');
            }}
            style={styles.bottomButton}
            buttonColor='blue'
            mode='contained'>
            
                <Text style={styles.totalDisplay} variant='headlineMedium'>Finish Shopping</Text>
        </Button>
    
         
        </View>
        
        
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2FFFF',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop:25,
    },
    welcomeText: {
        fontSize: 32
    },
    background:{
        backgroundColor: 'white',
        marginTop: 20,
        width: '75%',
        height: '25    %',
        marginBottom:150,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    bottomButton:{
        marginTop: 30,
        backgroundColor: '#3F7CAC',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    bottomText:{
        color: 'white',
        fontWeight: 'bold',
    },
    titleText: {
        marginTop: 10,
        fontSize: 46
    },
    button: {
        height: '100%'
    },
    flatList: {
        backgroundColor: 'white',
        marginTop: 20,
        width: '85%',
        height: '50%',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    itemName:{
        flex:1,
        marginRight:10,
        paddingRight:10
    },
    inline:{
        flexDirection:"row",
        justifyContent:'space-evenly',
    },
    itemPrice:{
        marginVertical:5,
        marginRight:20 ,
        fontSize: 20,
        height: 44,
        flexWrap:"wrap",
        width:"10%",
        paddingTop:2,
    },
    item: {
        paddingLeft: 0,
        paddingTop: 15,
        padding: 10,
        fontSize: 20,
        height: 44,
        color: '#5A5A5A',
    },
    bottomContainer: {
        height: '7%',
        borderRadius: 15,
        backgroundColor: '#D42B14',
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        paddingBottom:25,
        
    },
    bottomText: {
        color: 'white',
        fontWeight: 'bold'
    },
    priceText: {
        fontSize: 20,
        color:"#dcdcdc",
    },
    currency:{
        paddingTop:8,
        fontSize:20,
        color:"#dcdcdc",
    },
    price:{
        color: 'white',
        fontWeight: 'bold',
        fontSize:20,
        padding:5,
    },
   
    bottomButton: {
        marginTop: 30,
        backgroundColor: '#3F7CAC',
        color:'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    trashButton: {
        paddingTop:10,
        marginLeft:5,
        marginTop: 10
        
    },
    trshbttn:{
        paddingTop:4  ,
        paddingLeft:2,
        justifyContent:'space-evenly',
        
    },
    bottomContainer: {
        height: '7%',
        borderRadius: 15,
        backgroundColor: '#D42B14',
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    checkbox:{
     paddingTop:16,
     paddingLeft:25,
    
   
    },
    hairline: {
  backgroundColor: '#A2A2A2',
  height: 2,
  width: 165
},
})