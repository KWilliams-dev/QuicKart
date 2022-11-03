import * as React from "react";
import { View, StyleSheet, FlatList, Text as NativeText } from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMinutes, setHours } from "../redux/timerActions";
import { setGroceryList } from "../redux/groceryListAction";
import CardData from "../components/CardCarousel/CardData/index";
import { Button, Text } from "react-native-paper";

export const ShoppingRouteScreen = ({ navigation }) => {
  const { groceryList } = useSelector((state) => state.listReducer);
  const { total } = useSelector((state) => state.totalReducer);
  const { minutes, hours } = useSelector((state) => state.timerReducer);
  const [seconds, setSeconds] = useState(0);
  const [totalPrice, setPrice] = useState(0.0);

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

  return (
    <View style={styles.container}>
      <CardData item={"Item Name"} aisle={"A"} bay={"1"} isActive={true} />

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
