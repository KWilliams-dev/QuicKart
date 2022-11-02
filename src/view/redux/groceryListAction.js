export const SET_GROCERY_LIST = 'SET_GROCERY_LIST';
export const Delete_Item = 'Delete_Item';
export const Add_Item = 'Add_Item';

export const setGroceryList = groceryList => dispatch => {
    dispatch({
        type: SET_GROCERY_LIST,
        payload: groceryList
    })
}

export const deleteGroceryList = groceryList =>dispatch=>{
    dispatch({
        type:Delete_Item,
        payload:groceryList
    })
}