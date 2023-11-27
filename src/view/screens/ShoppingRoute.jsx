import * as React from "react";
import {
  Text as NativeText,
  View,
  StyleSheet,
  FlatList,
  Modal,
  ImageBackground,
  Alert,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMinutes, setHours } from "../redux/timerActions";
import { setGroceryList } from "../redux/groceryListAction";
import CardData from "../components/CardCarousel/CardData/index";
import { Button, Text } from "react-native-paper";
import { styles } from "../styles/ShoppingList.styles";
import { Ionicons } from '@expo/vector-icons';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';


const Information = () => {
  // useState for the popup window (Modal)
  // useState is a react hook that allows us to add React state to this functional component
  // is the modal visible yes or no? initially the answer is no
  const [modalVisible, setModalVisible] = useState(false);
  return (
    /**  Modal is a component that allows us to create custom "pop-up" windows
     * using animationType prop for that smooth sliding effect
     * transparent prop gives the window a transparent background
     * when user clicks the 'i' icon the useState of modalVisible is set to true (can see window)
     * 
     */
    <View style={styles.information}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        {/* This is the info inside the pop-up window */}
        <View style={styles.modalView}>
          <Text style={{ fontWeight: 'bold' }}>Directions Functionalities</Text>
          <Text style={styles.modalText}>
            - Users can navigate through different shopping items by using the "Picked," "Remove," and "Skip" buttons.
            {'\n\n'}- Swiping left on items in the list also triggers the delete action.
            {'\n\n'}- Users can adjust the quantity of items in their shopping list using the "+" and "-" buttons.
            {'\n\n'}- See the total count of items and the total cost at the bottom.
            {'\n\n'}- Users can finish their shopping by clicking the "Finish Shopping" button.{'\n'}
          </Text>
          {/* when the user clicks 'OK' the pop-up window disappears */}
          <Button
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.bottomButton}
          >
            <Text style={styles.bottomText}>OK</Text>
          </Button>
        </View>
      </Modal>
      {/* When the user clicks the information 'i' icon the popup window is shown */}
      <Ionicons
        name="information-circle-outline"
        size={30}
        color="white"
        onPress={() => setModalVisible(true)}
        style={{ marginTop: 1, left: -20 }}
      />
    </View>
  );
};

export const ShoppingRouteScreen = ({ navigation }) => {
  const { groceryList } = useSelector((state) => state.listReducer);
  const { minutes, hours } = useSelector((state) => state.timerReducer);
  const [seconds, setSeconds] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { total } = useSelector((state) => state.totalReducer);
  const [totalPrice, setPrice] = useState(0.0);
  const [isChecked, setCheck] = useState(false);
  const [currentItem, setCurrentItem] = useState(groceryList[0]);
  const [groceryItems, setGroceryItems] = useState();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0.0);
  const [title, setTitle] = useState('');
  const [removedItems, setRemovedItems] = useState([]);
  const [pickedItems, setPickedItems] = useState([]);
  const [pickedIndex, setPickedIndex] = useState(null);
  const [itemStates, setItemStates] = useState({});


  const dispatch = useDispatch();

  const totalHandler = () => {
    dispatch(setTotal(totalPrice));
  };

  const length = groceryList.length - 1;

  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 59) {
              setHours((prevHours) => prevHours + 1);
              return 0;
            } else {
              return prevMinutes + 1;
            }
          });
          return 0;
        } else {
          return prevSeconds + 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => { 
    let subCount = 0.0;
    groceryList.forEach((item) => {
      subCount += item.quantity || 1;
    });
    setTotalCount(subCount);
  }, [groceryList, totalHandler]);

  useEffect(() => {
    let subTotal = 0.0;
    if (groceryList && groceryList.length > 0) {
      groceryList.forEach((item) => {
        subTotal += item.price * (item.quantity || 1);
      });
      subTotal = subTotal.toFixed(2);
    }
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
    const currentItem = groceryList[currentItemIndex];

    // Check if the current item is still in the list
    const isItemStillInList = groceryList.some(item => item.id === currentItem.id);

    if (!isItemStillInList) {
      // Handle the case where the current item has been removed
      Alert.alert('The current item has been removed from the list');
      return;
    }

    if (currentItemIndex === length) {
      Alert.alert("You have reached the end of the list");
      return;
    }

    let index = currentItemIndex;
    index += 1;
    setCurrentItemIndex(index);
    setCurrentItem(groceryList[index]);
  };

  const QuantityButtons = ({ quantity, onIncrement, onDecrement }) => { 
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 3,
        margin: 35,
      }}>
        <TouchableOpacity onPress={onDecrement}>
          <NativeText style={{ fontSize: 16, marginRight: 3, marginLeft: 3, fontWeight: 'bold' }}> - </NativeText>
        </TouchableOpacity>
        <NativeText style={{ fontSize: 15, marginHorizontal: 4 }}>{quantity}</NativeText>
        <TouchableOpacity onPress={onIncrement}>
          <NativeText style={{ fontSize: 13, marginLeft: 3, fontWeight: 'bold' }}> + </NativeText>
        </TouchableOpacity>
      </View>
    );
  };

  const handleQuantityChange = (item, change) => {
    const updatedList = groceryList.map((groceryItem) => {
      if (groceryItem.id === item.id) {
        const updatedQuantity = (groceryItem.quantity || 1) + change;

        if (updatedQuantity <= 0) {
          // If the updated quantity is zero or negative, remove the item
          return null; // Skip this item in the updated list
        }

        const updatedItem = { ...groceryItem, quantity: updatedQuantity };
        return updatedItem;
      }
      return groceryItem;
    });
    // Remove null items (items with zero or negative quantity) from the updated list
    const filteredList = updatedList.filter((item) => item !== null);

    dispatch(setGroceryList(filteredList));
  };

  // For swipe and delete function 
  const renderRightActions = (progress, dragX, item) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, 0.5, 1],
    });

    return (
      <TouchableOpacity onPress={() => handleDeleteItem(item)}>
        <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'flex-end', padding: 10, borderRadius: 10 }}>
          <Animated.Text
            style={{
              color: 'white',
              fontSize: 16,
              transform: [{ translateX: trans }],
            }}
          >Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleDeleteItem = (item) => {
    // Remove the item from the total count and total price
    const itemQuantity = item.quantity || 1;
    const itemPrice = item.price * itemQuantity;

    setTotalCount((prevCount) => prevCount - itemQuantity);
    setPrice((prevPrice) => (prevPrice - itemPrice).toFixed(2));

    // Move the item to the removedItems list
    setRemovedItems((prevRemovedItems) => [...prevRemovedItems, item]);

    // Remove the item from the groceryList
    const updatedList = groceryList.filter((groceryItem) => groceryItem.id !== item.id);
    dispatch(setGroceryList(updatedList));
  };

  const handlePicked = () => {
    if (currentItem && currentItem.name) {
      // Find the index of the picked item
      const pickedIndex = groceryList.findIndex((groceryItem) => groceryItem.id === currentItem.id);

      // Update item states to mark the item as picked
      setItemStates((prevItemStates) => {
        const updatedItemStates = { ...prevItemStates };
        updatedItemStates[currentItem.id] = 'picked';
        return updatedItemStates;
      });

      setPickedIndex(pickedIndex);

      // Use setTimeout to delay the actual movement to the bottom
      setTimeout(() => {
        // Move the picked item to the bottom of the list
        const updatedList = [
          ...groceryList.slice(0, pickedIndex),
          ...groceryList.slice(pickedIndex + 1),
          currentItem,
        ];

        setPickedIndex(null);

        dispatch(setGroceryList(updatedList));

        // Move to the next card
        nextCard();
      }, 1000); // Adjust the delay as needed
    }
  };

  const handleRemove = () => {
    // Ensure there is an item to remove
    if (!currentItem) {
      console.warn('No item to remove.');
      return;
    }

    // Remove the item from the total count and total price
    const itemQuantity = currentItem.quantity || 1;
    const itemPrice = currentItem.price * itemQuantity;

    setTotalCount((prevCount) => prevCount - itemQuantity);
    setPrice((prevPrice) => (prevPrice - itemPrice).toFixed(2));

    // Move the item to the removedItems list
    setRemovedItems((prevRemovedItems) => [...prevRemovedItems, currentItem]);

    // Remove the item from the groceryList
    const updatedList = groceryList.filter((groceryItem) => groceryItem.id !== currentItem.id);
    dispatch(setGroceryList(updatedList));

    // Log the removed item for verification (you can remove this line in the final version)
    console.log('Item Removed:', currentItem.name);

    // Move to the next card
    nextCard();
  };

  const handleSkip = () => {
    console.log('Item Skipped:', currentItem.name);
    // Move the current item to the bottom of the grocery list
    const updatedList = groceryList.filter(item => item.id !== currentItem.id);
    const skippedItem = groceryList.find(item => item.id === currentItem.id);
    dispatch(setGroceryList([...updatedList, skippedItem]));

    // Rotate the card carousel
    nextCard();
  };

  // // Render the grocery items in a carousel
  // const renderCarousel = () => {
  //   // Implement logic to render the carousel with the grocery items
  //   // You might want to use a library like react-native-snap-carousel for this
  // };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.backgroundImage}>

        <View style={{ backgroundColor: 'black', paddingVertical: 15, alignItems: 'center', position: 'absolute', top: 35, left: 0, right: 0, paddingBottom: 10, paddingTop: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ position: 'absolute', color: 'white', fontSize: 18, left: -180, marginTop: 4, fontWeight: '400' }}>{'<'}</Text>
              <Text style={{ position: 'absolute', color: 'white', fontSize: 18, left: -160, marginTop: 4, fontWeight: '300' }}>List</Text>
            </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 25, fontWeight: '300' }}>Directions</Text>
          <View style={{ position: 'absolute', top: 10, right: 10 }}>
            <Information />
            <View style={styles.container}>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={routeStyles.flatList1}>
            <CardData
              item={currentItem.name}
              aisle={currentItem.aisle}
              bay={currentItem.bay}
              quantity={currentItem.quantity}
              isActive={true}
            />
          </View>

          <View style={routeStyles.buttonRow}>
            <Button
              style={[routeStyles.nextButton, { backgroundColor: '#35693F' }]}
              onPress={handlePicked}
              mode="contained"
            >
              <Text style={styles.actionText}>
                Picked
              </Text>
            </Button>

            <Button
              onPress={handleRemove}
              style={[routeStyles.nextButton, { backgroundColor: '#D84040' }]}
              mode="contained"
            >
              <Text style={styles.actionText}>
                Remove
              </Text>
            </Button>

            <Button
              onPress={handleSkip}
              style={[routeStyles.nextButton, { backgroundColor: 'black' }]}
              mode="contained"
            >
              <Text style={styles.actionText}>
                Skip
              </Text>
            </Button>
          </View>

          <View style={routeStyles.flatList}>
            <FlatList
              data={groceryList}
              style={{ height: 200 }}
              renderItem={({ item, index }) => (
                <Swipeable
                  renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
                  onSwipeableRightOpen={() => handleDeleteItem(item)}
                >

                  <TouchableOpacity
                    onPress={() => {
                      handlePicked(item);
                    }}
                  >

                    <View style={[
                      styles.inline,
                      {
                        backgroundColor:
                          item.id === currentItem.id && itemStates[item.id] === 'picked'
                            ? '#35693F'
                            : item.id === currentItem.id && itemStates[item.id] != 'picked'
                              ? '#F1F1F1'
                              : '#D9D9D9',

                      },
                    ]}>
                      <View style={styles.itemName}>
                        <NativeText style={[styles.item]}>{item.name}</NativeText>
                      </View>
                      <View style={styles.quantityButtons}>
                        <QuantityButtons
                          quantity={item.quantity || 1}
                          onIncrement={() => handleQuantityChange(item, 1)}
                          onDecrement={() => handleQuantityChange(item, -1)} />
                      </View>
                      <View style={styles.itemPrice}>
                        <NativeText style={styles.currency}>
                          <Text style={[styles.priceText, {
                            color:
                              item.id === currentItem.id && itemStates[item.id] === 'picked'
                                ? 'black'
                                : item.id === currentItem.id && itemStates[item.id] != 'picked'
                                  ? 'green'
                                  : 'green',

                          }]}>${(item.price * (item.quantity || 1)).toFixed(2)}</Text>
                        </NativeText>
                      </View>
                      <View>
                        <NativeText style={[{
                          fontSize: 25,
                          color: 'black',
                          fontWeight: 'bold',
                          marginRight: 20,
                          marginTop: 10,
                        }]}>{'>'}</NativeText>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Swipeable>
              )}
            />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.totalContainer, { marginLeft: 35 }]}>
              <Text style={styles.totalText} variant="titleLarge">
                Total Items:
              </Text>
              <NativeText style={[styles.price, { color: 'blue', marginTop: -10 }]}>{totalCount}</NativeText>
            </View>

            <View style={[styles.totalContainer, { marginRight: 35 }]}>
              <Text style={styles.totalText} variant="titleLarge">
                Total Cost:
              </Text>
              <NativeText style={[styles.price, { color: 'green', marginTop: -10 }]}>${totalPrice}</NativeText>
            </View>
          </View>

          {/* delete isActive prop if card will control the opacity */}
          {/* query database to test card data props */}
          <Button
            onPress={() => {
              handleStopTimer();
              navigation.navigate("ShoppingFinish");
            }}
            style={styles.startButton}
            buttonColor='black'
            mode='contained'>
            <Text style={styles.bottomText} variant='headlineMedium'>Finish Shopping</Text>
          </Button>
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

const routeStyles = StyleSheet.create({
  inline: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
  },
  flatList1: {
    backgroundColor: "#D9D9D9",
    marginTop: 85,
    width: "65%",
    height: "30%",
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1.5,
    shadowRadius: 5,
    elevation: 10,
  },
  flatList: {
    backgroundColor: 'white',
    marginTop: 6,
    width: '85%',
    height: '25%',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    height: 45,
    paddingLeft: 1,
    paddingRight: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  bottomButton: {
    marginTop: 30,
    marginBottom: 50,
    borderWidth: 1,
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
  blueName: {
    fontWeight: 'bold',
  },
});
