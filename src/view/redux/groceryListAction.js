export const SET_GROCERY_LIST = 'SET_GROCERY_LIST';


export const setGroceryList = groceryList => dispatch => {
    dispatch({
        type: SET_GROCERY_LIST,
        payload: groceryList
    })
}
