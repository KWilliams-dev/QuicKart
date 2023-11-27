import * as React from 'react';
import { useState, useEffect } from "react";
import { Text as NativeText, View, FlatList, Modal, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import { styles } from '../styles/ShoppingList.styles';
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, Text } from "react-native-paper";
import { setGroceryList } from "../redux/groceryListAction";

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
                    <Text style={{ fontWeight: 'bold' }}>Finish Shopping Functionalities</Text>
                    <Text style={styles.modalText}>
                        - Swiping left on items in the list also triggers the delete action.
                        {'\n\n'}- Users can adjust the quantity of items in their shopping list using the "+" and "-" buttons.
                        {'\n\n'}- See the total cost at the bottom.
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

export const FinishShoppingScreen = ({ navigation }) => {

    // useSelector is one aspect of React - Redux (it allows us to access globally stored variables)
    const { minutes, hours } = useSelector(state => state.timerReducer);
    const { groceryList } = useSelector(state => state.listReducer);
    const { total, setTotal } = useSelector(state => state.totalReducer);
    const [totalCount, setTotalCount] = useState(0.0);
    const [totalPrice, setPrice] = useState(0.0);
    const [removedItems, setRemovedItems] = useState([]);

    const dispatch = useDispatch();

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

    const totalHandler = () => {
        dispatch(setTotal(totalPrice));
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

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ImageBackground source={require('../assets/fsBackground.png')} style={styles.backgroundImage}>

                <View style={{ backgroundColor: 'black', paddingVertical: 15, alignItems: 'center', position: 'absolute', top: 35, left: 0, right: 0, paddingBottom: 10, paddingTop: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ position: 'absolute', color: 'white', fontSize: 18, left: -180, marginTop: 4, fontWeight: '400' }}>{'<'}</Text>
                        <Text style={{ position: 'absolute', color: 'white', fontSize: 18, left: -160, marginTop: 4, fontWeight: '300' }}>Route</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 25, fontWeight: '300' }}>Thank You!</Text>
                    <View style={{ position: 'absolute', top: 10, right: 10 }}>
                        <Information />
                        <View style={styles.container}>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.finishShoppingTimerView}>
                        <Text style={styles.finishShoppingTimerText}>{hours} hrs : {minutes} mins</Text>
                    </View>
                    <View style={styles.finishShoppingFlatList}>
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

                    <Button
                        style={[styles.startButton, { marginTop: 45 }]}
                        buttonColor='black'
                        mode='contained'>
                        <Text style={styles.bottomText} variant='headlineMedium'>Total Cost: </Text>
                        <NativeText style={[styles.finishShoppingBottomText, { color: 'green', size: 20 }]}>${totalPrice}</NativeText>
                    </Button>

                    <Text
                        style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginTop: 35,
                        }}>
                        Leave a Review{' '}
                        <Text style={{ textDecorationLine: 'underline', color: 'white' }}>here</Text>
                    </Text>

                </View>
            </ImageBackground>
        </GestureHandlerRootView>
    )
}
