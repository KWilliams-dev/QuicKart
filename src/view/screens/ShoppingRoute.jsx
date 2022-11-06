import * as React from "react";
import {
  Text as NativeText,
  View,
  StyleSheet,
  FlatList,
  Modal,
  ImageBackground,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMinutes, setHours } from "../redux/timerActions";
import { setGroceryList } from "../redux/groceryListAction";
import CardData from "../components/CardCarousel/CardData/index";
import { Button, Text } from "react-native-paper";
import { styles } from "../styles/ShoppingList.styles";
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
  const [isChecked, setCheck] = useState(false);
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
    if (currentItemIndex === length) {
      Alert.alert("You have reached the end of the list");
      return;
    }

    let index = currentItemIndex;
    index += 1;
    setCurrentItemIndex(index);
    setCurrentItem(groceryList[index]);
  };

  //console.log(cardData)

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
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
            style={routeStyles.nextButton}
            onPress={() => {
              navigation.navigate("ShoppingList");
            }}
            mode="contained"
          >
            <Text style={styles.bottomText}>
              ADD
            </Text>
          </Button>

          <Button
            onPress={() => {
              nextCard();
              setCheck(!isChecked);
            }}
            style={routeStyles.nextButton}
            mode="contained"
          >
            <Text style={styles.bottomText}>
              NEXT
            </Text>
          </Button>
        </View>
        <FlatList
          style={routeStyles.flatList}
          data={groceryList}
          renderItem={({ item }) => {
            return (
              <View style={styles.inline}>
                <View style={routeStyles.checkbox}>
                  <CheckBox isChecked={isChecked} />
                </View>

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
          mode="contained"
          style={routeStyles.bottomButton}
          buttonColor="blue"
        >
          <Text style={styles.bottomText} variant="headlineMedium">
            FINISH SHOPPING
          </Text>
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
    width: "70%",
    height: "30%",
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
    elevation: 2,
  },
  bottomContainer: {
    height: "7%",
    borderRadius: 15,
    backgroundColor: "#db601b",
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  nextButton: {
    backgroundColor: "#000000",
    shadowColor: "#000",
    borderRadius: 50,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  bottomButton: {
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: "#000000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonRow: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-evenly",
    marginTop: 15,
    marginBottom: 15,
  },
  checkbox: {
    padding: 15,
  },
});
