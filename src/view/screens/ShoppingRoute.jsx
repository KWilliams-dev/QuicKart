import * as React from "react";
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Dimensions,
  Image,
  Alert
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMinutes, setHours } from "../redux/timerActions";
import CardData from "../components/CardCarousel/CardData/index";
//import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

// const{width} = Dimensions.get("window");
// const height = width * 100 /60 //60%
export const ShoppingRouteScreen = ({ navigation }) => {
  //const {groceryList} = useSelector(state => state.listReducer);

  const { groceryList } = useSelector((state) => state.listReducer);

  const [currentItem, setCurrentItem] = useState(groceryList[0]);

  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const length = groceryList.length;

  const { minutes, hours } = useSelector((state) => state.timerReducer);

  const [seconds, setSeconds] = useState(0);

  const dispatch = useDispatch();

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
    }, 0.1);

    return () => clearInterval(timer);
  });

  const handleStopTimer = () => {
    clearInterval(timer);
  };

  const nextCard = () => {

    const length = groceryList.length -1;

    if(currentItemIndex === length){

        Alert.alert("You have reached the end of the list");
        return;
    }

    let index = currentItemIndex;
    index+=1;

    setCurrentItemIndex (index);
    setCurrentItem(groceryList[currentItemIndex]);
  };

  const previousCard = () => {
    setCardData(cardData == 0 ? length - 1 : cardData - 1);
  };

  if (!Array.isArray(groceryList) || groceryList.length <= 0) {
    return null;
  }
  //console.log(cardData)

  return (
    <View style={styles.container}>

      <View style={styles.flatList2}>


        <CardData
          item={currentItem.name}
          aisle={currentItem.aisle}
          bay={currentItem.bay}
          isActive={true}
        />

      </View>

      {/* <View style = {styles.flatList3} > 
                <FlatList
                data={groceryList}
                //keyExtractor={(item,index ) => index.toString()}
                horizontal
                pagingEnabled
                renderItem={({item}) => {
                    //const items = {groceryList};

                    return <View style={[styles.card, styles.shadowprop]}>
  
                     <CardData item={item.name} aisle={item.aisle} bay={item.bay} isActive={true}/> 
                     
                    </View>               
                    
                    setCardData (() => {

                        return [...setCardData]
                    })
                }}
                />

            </View> */}

      <View style={{ marginVertical: 20, flexDirection: "row" }}>

        <Button
          title={"PREV"}
          style={{ paddingLeft: 150, marginLeft: 200 }}
          onPress={() => {}}
        ></Button>

        <Button
          title={"NEXT"}
          style={{ paddingLeft: 200 }}
          onPress={() => {

            nextCard();
            
          }}
        >
          {" "}
        </Button>
      </View>

      <Button
        title={"Finish Shopping"}
        onPress={() => {
          navigation.navigate("ShoppingFinish");
          handleStopTimer();
        }}
      ></Button>
      {/* delete isActive prop if card will control the opacity */}
      {/* query database to test card data props */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 32,
  },
  card: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 42,
  },
  shadowprop: {
    shadowColor: "#171717",
    shadowOffset: { width: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  flatList1: {
    backgroundColor: "white",
    marginTop: 20,
    width: "70%",
    height: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  flatList2: {
    backgroundColor: "white",
    marginTop: 5,
    width: "70%",
    height: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonstyle: {
    width: 20,
  },
  flatList3: {
    backgroundColor: "white",
    marginTop: 5,
    width: "70%",
    height: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
});
