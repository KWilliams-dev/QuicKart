import { SET_TOTAL } from "./totalActions";

const initialState = {
    total: 0
}

function totalReducer(state = initialState, action) {
    switch(action.type) {
        case SET_TOTAL:
            return {...state, total: action.payload };
        default: 
            return state
    } 
}

export default totalReducer