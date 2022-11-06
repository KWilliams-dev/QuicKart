import * as React from "react";
import { Text as NativeText, View,
  StyleSheet,
  FlatList,
  Modal,
  ImageBackground,
  Alert } from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMinutes, setHours } from "../redux/timerActions";
import { setGroceryList } from "../redux/groceryListAction";
import CardData from "../components/CardCarousel/CardData/index";
import { Button, Text } from "react-native-paper";
import { styles } from '../styles/ShoppingList.styles';
import { CheckBox } from "../components/Checkbox";



export const ShoppingRouteScreen = ({ navigation }) => {
  //import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

// const{width} = Dimensions.get("window");
// const height = width * 100 /60 //60%

  const { groceryList } = useSelector((state) => state.listReducer);
  const { minutes, hours } = useSelector((state) => state.timerReducer);
  const [seconds, setSeconds] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { total } = useSelector((state) => state.totalReducer);
  const [totalPrice, setPrice] = useState(0.0);
  const[isChecked, setCheck] = useState(false);
  const [currentItem, setCurrentItem] = useState(groceryList[0]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const dispatch = useDispatch();

  const length = groceryList.length - 1;

  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);

      if (seconds === 60) {
        dispatch(setMinutes(minutes + 1));
        setSeconds(0);
      }

      if (minutes === 60) {
        dispatch(setHours(hours + 1));
        dispatch(setMinutes(0));
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  
  const deleteItem = (item) => {
    const items = groceryList.filter((sitem) => sitem.id !== item.id);
    dispatch(setGroceryList(items));
  };

  useEffect(() => {
    let subTotal = 0.0;
    groceryList.forEach((item) => {
      subTotal += item.price;
    });
    subTotal = subTotal.toFixed(2);
    setPrice(subTotal);
  }, [groceryList]);

  const handleStopTimer = () => {
    clearInterval(timer);
  };

   if (!Array.isArray(groceryList) || groceryList.length <= 0) {
    Alert.alert("You have no more items in your shopping cart");
    navigation.navigate("ShoppingList");
    return null;
  }
  
  const nextCard = () => {

    if(currentItemIndex === length){
     
      Alert.alert("You have reached the end of the list");
      return;
    }

    let index = currentItemIndex;
    index+= 1;
    setCurrentItemIndex (index);
    setCurrentItem(groceryList[index]);
    
  };

 

  //console.log(cardData)

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
    <View style={routeStyles.container}>

      <View style={routeStyles.flatList1}>
        
        <CardData
            item={currentItem.name}
            aisle={currentItem.aisle}
            bay={currentItem.bay}
            isActive={true}
          />
      </View>

    <View style={routeStyles.buttonRow}>
    <Button
     style={routeStyles.buttonInRow}
     onPress={() => {
          
          navigation.navigate("ShoppingList");
        }}
    
         mode="contained"
   >

     <Text style={routeStyles.botttomButtonText} variant="headlineLarge">Add</Text>
   </Button>
      
      <Button
        onPress={() => {
          nextCard();
          setCheck(!isChecked);
       }}
       
        style={routeStyles.buttonInRow}
            mode="contained">
   
        <Text style={styles.botttomButtonText} variant="headlineLarge" >Next</Text>
      </Button>




   
    </View>
      <FlatList
        style={routeStyles.flatList}
        data={groceryList}
        renderItem={({ item => {
          return (
            
            <View style={routeStyles.inline}>
            <View style={routeStyles.checkbox}>
            <CheckBox  isChecked={isChecked}/>
                
            </View>

            
              <View style={routeStyles.itemName}>
                <NativeText style={routeStyles.item}>{item.name}</NativeText>
              </View>
              <View style={routeStyles.itemPrice}>
                <NativeText style={routeStyles.currency}>
                  <Text style={routeStyles.priceText}>${item.price}</Text>
                </NativeText>
              </View>
              <View style={routeStyles.trshbttn}>
                <NativeText style={routeStyles.trashButton}>
                  <Button onPress={() => deleteItem(item)} icon="delete" />
                </NativeText>
              </View>
            </View>
          );
        }}
      />

      <View style={routeStyles.bottomContainer}>
        <Text style={routeStyles.bottomText} variant="titleLarge">
          Total Cost:
        </Text>
        <NativeText style={routeStyles.price}>${totalPrice}</NativeText>
        <Text style={routeStyles.bottomText} variant="titleLarge">
          Grocery Count: {groceryList.length}
        </Text>
      </View>
      {/* delete isActive prop if card will control the opacity */}
      {/* query database to test card data props */}
      <Button
        onPress={() => {
          handleStopTimer();
          navigation.navigate("ShoppingFinish");
        }}
        
        style={routeStyles.bottomButton}
        buttonColor="blue"
            mode="contained"
      >
        <Text style={routeStyles.botttomButtonText}>Finish Shopping</Text>
      </Button>
    </View>
    </ImageBackground>
  );
};

const routeStyles = StyleSheet.create({
  inline:{
    flexDirection:"row",
    justifyContent:'space-evenly',
  },
  flatList1: {
    backgroundColor: "white",
    marginTop: 20,
    width: "75%",
    height: "25    %",
    marginBottom: 5,
    marginTop:0,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  flatList: {
    backgroundColor: "white",
    width: "85%",
    height: "50%",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  bottomContainer: {
    height: "7%",
    borderRadius: 15,
    backgroundColor: '#db601b',
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    elevation: 5,
  },
  nextButton: {
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  bottomButton: {
    marginTop: 20,
    marginBottom: 25,
    backgroundColor:'#3F7CAC',
    
  },
  buttonInRow:{
 marginTop: 20,
    marginBottom: 5,
    padding:3,
    width:150,
    backgroundColor:'#3F7CAC',
  },
  buttonRow:{
    flexDirection: "row",
    margin:0,
  },
  trashButton: {
    paddingTop: 10,
    marginLeft: 5,
    marginTop: 11,
  },
  trshbttn: {
    paddingTop: 2,
    paddingLeft: 2,
    justifyContent: "space-evenly",
  },
  checkbox:{
    padding:15
  },
 
});
