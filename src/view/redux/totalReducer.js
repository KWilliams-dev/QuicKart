import { SET_TOTAL } from "./totalActions";
import { SET_COUNT } from "./totalActions";

const initialState = {
    total: 0.00, // Initial value for the total property
    count: 0  // Initial value for the count property
}

function totalReducer(state = initialState, action) {
    switch(action.type) {
        // Case for handling the SET_TOTAL action
        case SET_TOTAL:
            return {...state, total: action.payload };
         // Case for handling the SET_COUNT action
        case SET_COUNT:
            return {...state, count: action.payload };
        default: 
            return state
    } 
}

export default totalReducer
