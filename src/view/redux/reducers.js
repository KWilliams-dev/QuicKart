import { SET_MINUTES, SET_HOURS } from "./actions";

const initialState = {
    minutes: 0,
    hours: 0
}

function timerReducer(state = initialState, action) {
    switch(action.type) {
        case SET_MINUTES:
            return {...state, minutes: action.payload };
        case SET_HOURS:
            return { ...state, hours: action.payload };
        default: 
            return state
    }   
}

export default timerReducer;