import { SET_GROCERY_LIST } from "./groceryListAction";

const initialState = {
    groceryList: []
}

function listReducer(state = initialState, action) {
    switch(action.type) {
        case SET_GROCERY_LIST:
            return {...state, groceryList: action.payload}
        default:
            return state
    }
}

export default listReducer;