import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import listReducer from './groceryListReducer';
import timerReducer from './timerReducer'

const rootReducer = combineReducers({ timerReducer, listReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk)); 
