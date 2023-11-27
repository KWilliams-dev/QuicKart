import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, FlatList, Text as NativeText, Alert, Animated, ImageBackground, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { gql, useQuery } from '@apollo/client';
import { SplashScreen } from './SplashScreen';
import { styles } from '../styles/ShoppingList.styles';
import { useDispatch, useSelector } from 'react-redux'
import { setGroceryList } from '../redux/groceryListAction'
import { setTotal } from '../redux/totalActions';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

const GET_ITEMS = gql`
  query GetInventory($id: Int!) {
    getInventory(id: $id) {
      id
      name
      aisle
      bay
      price
      xVal
      yVal
    }
  }
`;

// Info Icon component/functionalitiy.
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
          <Text style={{ fontWeight: 'bold' }}>Shopping List Functionalities</Text>
          <Text style={styles.modalText}>
            - Add items to your shopping list by searching and selecting from the inventory.
            {'\n\n'}- Set a title for your shopping list and enter your budget to manage your expenses.
            {'\n\n'}- Swipe left on items to delete them from the list.
            {'\n\n'}- Adjust the quantity of items using the "+" and "-" buttons.
            {'\n\n'}- See the total count of items and the total cost at the bottom.
            {'\n\n'}- Receive a budget limit popup if you exceed your specified budget.
            {'\n\n'}- Start shopping and follow the suggested route for efficient shopping.{'\n'}
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

export const ShoppingListScreen = ({ navigation }) => {
  const [inventory, setInventory] = useState([]);
  const [totalPrice, setPrice] = useState(0.0);
  const [totalCount, setTotalCount] = useState(0.0);
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');
  const [budgetLimitVisible, setBudgetLimitVisible] = useState(false);
  const [budgetLimitShown, setBudgetLimitShown] = useState(false);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  const { loading, error, data } = useQuery(GET_ITEMS, {
    variables: { id: 123 },
  });
  const { groceryList } = useSelector((state) => state.listReducer);

  const dispatch = useDispatch();

  const totalHandler = () => {
    dispatch(setTotal(totalPrice));
  };

  /*
   *  Helper method to get the first closest item to the entrance.
   *  We don't pass in originX and originY here because we know the
   *  entrance coordinates already. This method is on it's own to help
   *  with code readability even though it's only called once in calcRoute()
   */

  function getFirstItem(arr) {
    const listWithDistances = [];

    let firstItem;

    arr.forEach((item) => {
      let x2 = item.xVal;
      let y2 = item.yVal;
      let xDistance = Math.abs(x2 - 27);
      let yDistance = Math.abs(y2 - 29);
      let distance = xDistance + yDistance;

      item = {
        ...item,
        distance: distance,
      };

      listWithDistances.push(item);
    });

    listWithDistances.sort((a, b) => a.distance - b.distance);

    firstItem = listWithDistances.shift();

    return firstItem;
  }

  /*
   *  Helper method to get the next closest item from the updated point of origin
   *  Takes in arr which is the updated array list from calcRoute().
   *  The item that was considered the next item for the user to get previously is now
   *  the new point of origin item.xVal = originX | item.yVal = originY
   */

  function getNextItem(arr, originX, originY) {
    const listWithDistances = [];

    let nextItem;

    arr.forEach((item) => {
      let x2 = item.xVal;
      let y2 = item.yVal;
      let xDistance = Math.abs(x2 - originX);
      let yDistance = Math.abs(y2 - originY);
      let distance = xDistance + yDistance;

      item = {
        ...item,
        distance: distance,
      };

      listWithDistances.push(item);
    });

    listWithDistances.sort((a, b) => a.distance - b.distance);

    nextItem = listWithDistances.shift();

    return nextItem;
  }

  /*
   *  Bulk of the routing is done in this method with the help
   *  of the helper methods. We start off by distinquishing the first item,
   *  then move on to running a for loop for the length of the input list - 1
   *  because we already got the first item. We can't get the first item in the
   *  for loop because it will call it multiple times and the logic for getting the
   *  first item only needs to be called once.
   */

  const calcRoute = () => {
    const routedList = [];

    let nextItem;

    let firstItem = getFirstItem(groceryList);

    routedList.push(firstItem);

    let deprecatedSelectedItems = groceryList.filter(
      (sitem) => sitem.collected !== true
    );

    deprecatedSelectedItems = deprecatedSelectedItems.filter(
      (sitem) => sitem.id !== firstItem.id
    );

    const listLength = deprecatedSelectedItems.length;

    let originX = firstItem.xVal;
    let originY = firstItem.yVal;

    for (let i = 0; i < listLength; i++) {
      nextItem = getNextItem(deprecatedSelectedItems, originX, originY);
      routedList.push(nextItem);
      deprecatedSelectedItems = deprecatedSelectedItems.filter(
        (sitem) => sitem.id !== nextItem.id
      );
      originX = nextItem.xVal;
      originY = nextItem.yVal;
    }

    routedList.forEach((el) => {
      console.log("Name: " + el.name);
      console.log("Price: " + el.price);
    });

    dispatch(setGroceryList(routedList));
  };

  // This is a functional component called QuantityButtons that takes three props:
  // - quantity: the current quantity value
  // - onIncrement: a function to handle the increment action
  // - onDecrement: a function to handle the decrement action
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
        {/* The TouchableOpacity component makes its child components touchable */}
        <TouchableOpacity onPress={onDecrement}>
          <NativeText style={{ fontSize: 16, marginRight: 3, marginLeft: 3, fontWeight: 'bold' }}> - </NativeText>
        </TouchableOpacity>
        {/* Display a Text component showing the current quantity value */}
        <NativeText style={{ fontSize: 15, marginHorizontal: 4 }}>{quantity}</NativeText>
        {/* Another TouchableOpacity for the increment action */}
        <TouchableOpacity onPress={onIncrement}>
          <NativeText style={{ fontSize: 13, marginLeft: 3, fontWeight: 'bold' }}> + </NativeText>
        </TouchableOpacity>
      </View>
    );
  };

  // This function, handleQuantityChange, takes two parameters:
  // - item: the grocery item whose quantity is to be changed
  // - change: the amount by which the quantity should be changed
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

  const BudgetLimitPopup = () => {
    return (
      <View style={styles.information}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={budgetLimitVisible}
        >
          {/* This is the info inside the pop-up window */}
          <View style={styles.information}>
            <View style={styles.modalView}>
              <Text style={{ fontWeight: 'bold' }}>Budget Limit Reached</Text>
              <Text style={styles.modalText}>You have exceeded your budget.</Text>
              {/* when user clicks 'OK' the pop-up window disappears */}
              <Button
                onPress={() => setBudgetLimitVisible(false)}
                style={styles.bottomButton}
              >
                <Text style={styles.bottomText}>OK</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  // For comparing the total and budget.
  useEffect(() => {
    const total = parseFloat(totalPrice);
    const budgetValue = parseFloat(budget);

    // Check if the budget limit popup has not been shown yet and the conditions are met
    if (!budgetLimitShown && total >= budgetValue && budgetValue > 0) {
      // Show the budget limit popup
      Alert.alert(
        'Budget Limit Reached',
        'You have exceeded your budget.',
        [
          { text: 'OK', onPress: () => setBudgetLimitShown(true) }
        ],
        { cancelable: false }
      );
    }
  }, [totalPrice, budget, budgetLimitShown]);


  // Use another useEffect to automatically close the budget limit popup after a certain delay
  useEffect(() => {
    const closeBudgetLimitPopup = () => {
      // Close the budget limit popup
      setBudgetLimitVisible(false);
    };
    // Set a timeout to close the budget limit popup after 5000 milliseconds (adjust as needed)
    const timeoutId = setTimeout(closeBudgetLimitPopup, 5000);

    // Clear the timeout if the component unmounts or if budgetLimitShown changes
    return () => clearTimeout(timeoutId);
  }, [budgetLimitShown, groceryList]);


  // For total cost and count.
  useEffect(() => {
    let subCount = 0.0;
    groceryList.forEach((item) => {
      subCount += item.quantity || 1;
    });
    console.log('');
    console.log('List Title:', title);
    console.log('Total Count:', subCount);
    setTotalCount(subCount);
  }, [groceryList, totalHandler]);

  // For budget.
  useEffect(() => {
    let subTotal = 0.0;
    groceryList.forEach((item) => {
      subTotal += item.price * (item.quantity || 1);
    });
    subTotal = subTotal.toFixed(2);
    console.log('Total Cost: ', subTotal);
    console.log('    Budget: ', budget);
    console.log('');
    setPrice(subTotal);
  }, [groceryList, totalHandler]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error fetching inventory", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setInventory(data.getInventory);
    }
  }, [data]);

  const handleDeleteItem = (item) => {
    const updatedList = groceryList.filter((groceryItem) => groceryItem.id !== item.id);
    dispatch(setGroceryList(updatedList));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={{ position: 'absolute' }}>
            <BudgetLimitPopup />
            <View style={styles.container}>
            </View>
          </View>

          <View style={{ backgroundColor: 'black', paddingVertical: 15, alignItems: 'center', position: 'absolute', top: 35, left: 0, right: 0, paddingBottom: 10, paddingTop: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ position: 'absolute', color: 'white', fontSize: 18, left: -180, marginTop: 4, fontWeight: '400' }}>{'<'}</Text>
              <Text style={{ position: 'absolute', color: 'white', fontSize: 18, left: -160, marginTop: 4, fontWeight: '300' }}>Sign In</Text>
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 25, fontWeight: '300' }}>Shopping List</Text>
            <View style={{ position: 'absolute', top: 10, right: 10 }}>
              <Information />
              <View style={styles.container}>
              </View>
            </View>
          </View>

          {/* List Title text input */}
          <View style={[styles.inputContainer, { marginTop: 90 }]}>
            <Text style={styles.titleText}>List Title:</Text>
            <TextInput
              style={styles.textInput}
              placeholder={formattedDate}
              value={title}
              onChangeText={(text) => setTitle(text)}
              backgroundColor='white'
            />
          </View>

          {/* Budget text input */}
          <View style={[styles.inputContainer, { marginTop: 2 }]}>
            <Text style={styles.titleText}>Enter Budget:</Text>
            <TextInput
              style={[styles.textInput, { color: 'green' }]}
              placeholder="$$$"
              value={budget}
              onChangeText={(text) => setBudget(text)}
              backgroundColor='white'
            />
          </View>

          {/*if there is a connection to the database then the splashscreen will load breifly,
        if not then it will load for ever. */}
          {loading ? (
            <SplashScreen />
          ) : (
            <>

              <SearchableDropdown
                onItemSelect={(item) => {
                  // creates a new version of the item that contains a collected property.
                  item = {
                    ...item,
                    collected: false,
                  };
                  const items = groceryList;

                  const isFound = items.some((sitem) => {
                    if (sitem.id === item.id) {
                      return true;
                    } else {
                      return false;
                    }
                  });

                  if (isFound == true) {
                    Alert.alert("Item has already been added");
                  } else {
                    items.push(item);
                  }

                  dispatch(setGroceryList(items));
                }}
                containerStyle={styles.dropdown}
                itemStyle={{
                  padding: 10,
                  backgroundColor: "#F1F5F2",
                  borderColor: "#bbb",
                  borderWidth: 1,
                  marginTop: 5,
                }}
                itemTextStyle={{ color: "#222" }}
                itemsContainerStyle={{ maxHeight: 200 }}
                items={inventory}
                textInputProps={{
                  placeholder: "Search item...",
                  underlineColorAndroid: "transparent",
                  style: {
                    padding: 8,
                  },
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              ></SearchableDropdown>

              <View style={styles.flatList}>
                <FlatList
                  data={groceryList}
                  style={{ height: 200 }}
                  renderItem={({ item, index }) => (
                    <Swipeable
                      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
                      onSwipeableRightOpen={() => handleDeleteItem(item)}
                    >
                      <View style={[styles.inline, { backgroundColor: index % 2 === 0 ? '#F1F1F1' : '#D9D9D9' }]}>
                        <View style={styles.itemName}>
                          <NativeText style={styles.item}>{item.name}</NativeText>
                        </View>
                        <View style={styles.quantityButtons}>
                          <QuantityButtons
                            quantity={item.quantity || 1}
                            onIncrement={() => handleQuantityChange(item, 1)}
                            onDecrement={() => handleQuantityChange(item, -1)} />
                        </View>
                        <View style={styles.itemPrice}>
                          <NativeText style={styles.currency}>
                            <Text style={styles.priceText}>${(item.price * (item.quantity || 1)).toFixed(2)}</Text>
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

              <BudgetLimitPopup />

              <Button
                onPress={() => {
                  totalHandler();
                  calcRoute();

                  navigation.navigate("ShoppingRoute");
                }}
                style={styles.startButton}
                buttonColor='black'
                mode='contained'>
                <Text style={styles.bottomText} variant='headlineMedium'>Start Shopping</Text>
              </Button>
            </>)}
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
}
