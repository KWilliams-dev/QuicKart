import * as React from "react";
import { Text as NativeText, View,
  StyleSheet,
  Button,
  FlatList,
  Dimensions,
  Image,
  Alert } from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMinutes, setHours } from "../redux/timerActions";
import { setGroceryList } from "../redux/groceryListAction";
import CardData from "../components/CardCarousel/CardData/index";
import { Button, Text } from "react-native-paper";


export const ShoppingRouteScreen = ({ navigation }) => {
  //import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

// const{width} = Dimensions.get("window");
// const height = width * 100 /60 //60%

  const { groceryList } = useSelector((state) => state.listReducer);

  const [currentItem, setCurrentItem] = useState(groceryList[0]);

  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const { minutes, hours } = useSelector((state) => state.timerReducer);

  const [seconds, setSeconds] = useState(0);

  const { total } = useSelector((state) => state.totalReducer);

  const [totalPrice, setPrice] = useState(0.0);

  const dispatch = useDispatch();

  const length = groceryList.length;

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
    groceryList.forEach((item) => {
      console.log(item.name);
      console.log(item.price);
    });
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

      <FlatList
        style={styles.background}
        data={groceryList}
        renderItem={({ item }) => {
          return (
            <View style={styles.inline}>
              <View style={styles.itemName}>
                <NativeText style={styles.item}>{item.name}</NativeText>
              </View>
              <View style={styles.itemPrice}>
                <NativeText style={styles.currency}>
                  <Text style={styles.priceText}>${item.price}</Text>
                </NativeText>
              </View>
              <View style={styles.trshbttn}>
                <NativeText style={styles.trashButton}>
                  <Button onPress={() => deleteItem(item)} icon="delete" />
                </NativeText>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText} variant="titleLarge">
          Total Cost:
        </Text>
        <NativeText style={styles.price}>${totalPrice}</NativeText>
        <Text style={styles.bottomText} variant="titleLarge">
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
        style={styles.bottomButton}
      >
        <Text style={styles.botttomButtonText}>Finish Shopping</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    backgroundColor: "#F2FFFF",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: 25,
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
  background: {
    backgroundColor: "white",
    marginTop: 20,
    width: "75%",
    height: "25    %",
    marginBottom: 150,
    borderRadius: 15,
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
  },
  botttomButtonText: {
    fontSize: 18,
    color: "#0089e3",
  },
  bottomText: {
    color: "white",
    fontWeight: "bold",
  },
  titleText: {
    marginTop: 10,
    fontSize: 46,
  },
  button: {
    height: "100%",
  },
  flatList: {
    backgroundColor: "white",
    marginTop: 20,
    width: "85%",
    height: "50%",
    borderRadius: 15,
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
    elevation: 5,
  },
  itemName: {
    flex: 1,
    marginRight: 10,
    paddingRight: 10,
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  itemPrice: {
    marginVertical: 5,
    marginRight: 20,
    fontSize: 20,
    height: 44,
    flexWrap: "wrap",
    width: "10%",
  },
  item: {
    paddingLeft: 25,
    paddingTop: 15,
    padding: 10,
    fontSize: 20,
    height: 44,
    color: "#5A5A5A",
  },
  bottomContainer: {
    height: "7%",
    borderRadius: 15,
    backgroundColor: "#D42B14",
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
  bottomText: {
    color: "white",
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 20,
    color: "#dcdcdc",
  },
  currency: {
    paddingTop: 8,
    fontSize: 20,
    color: "#dcdcdc",
  },
  price: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
  },

  bottomButton: {
    marginTop: 20,
    marginBottom: 25,
  },
  trashButton: {
    paddingTop: 10,
    marginLeft: 5,
    marginTop: 10,
  },
  trshbttn: {
    paddingTop: 2,
    paddingLeft: 2,
    justifyContent: "space-evenly",
  },
});
