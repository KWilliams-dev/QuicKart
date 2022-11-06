import * as React from 'react';
import {useState, useEffect}  from 'react';
import { View, FlatList, Image, Text as NativeText, Alert, ScrollView, SafeAreaView, SectionList, ImageBackground} from 'react-native';
import { Button, Text } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { gql, useQuery} from '@apollo/client';
import { SplashScreen } from './SplashScreen';
import { styles } from '../styles/ShoppingList.styles';
import {useDispatch, useSelector} from 'react-redux'
import { setGroceryList } from '../redux/groceryListAction'
import { setTotal } from '../redux/totalActions';

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

export const ShoppingListScreen = ({ navigation }) => {
  const [inventory, setInventory] = useState([]);
  const [totalPrice, setPrice] = useState(0.0);
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
    });

    dispatch(setGroceryList(routedList));
  };

  useEffect(() => {
    let subTotal = 0.0;
    groceryList.forEach((item) => {
      subTotal += item.price;
    });
    subTotal = subTotal.toFixed(2);
    setPrice(subTotal);
  }, [groceryList]);

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

  const deleteItem = (item) => {
    const items = groceryList.filter((sitem) => sitem.id !== item.id);
    dispatch(setGroceryList(items));
  };
    
  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
      {/*if there is a connection to the database then the splashscreen will load breifly,
        if not then it will load for ever. */}
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <NativeText style={styles.titleText}>Shopping List</NativeText>
          
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
              marginTop: 10,
            }}
            itemTextStyle={{ color: "#222" }}
            itemsContainerStyle={{ maxHeight: 200 }}
            items={inventory}
            textInputProps={{
              placeholder: "placeholder",
              underlineColorAndroid: "transparent",
              style: {
                padding: 12,
              },
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          ></SearchableDropdown>

          <View style={styles.flatList}>
            <FlatList
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
                        <Button
                          onPress={() => deleteItem(item)}
                          icon="delete"
                        />
                      </NativeText>
                    </View>
                  </View>
                );
              }}
            />
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText} variant="titleLarge">
              Total Cost:
            </Text>
            <NativeText style={styles.price}>${totalPrice}</NativeText>
            <Text style={styles.bottomText} variant="titleLarge">
              Grocery Count: {groceryList.length}
            </Text>
          </View>

          <Button
            onPress={() => {
              totalHandler();
              calcRoute();
              navigation.navigate("ShoppingRoute");
            }}
            style={styles.bottomButton}
            buttonColor='blue'
            mode='contained'>
                <Text style={styles.bottomText} variant='headlineMedium'>START SHOPPING</Text>
        </Button>
     </>)}
     </View>
     </ImageBackground>
    );
}