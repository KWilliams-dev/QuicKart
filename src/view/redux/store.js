import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import listReducer from './groceryListReducer';
import timerReducer from './timerReducer'
import totalReducer from './totalReducer';

const rootReducer = combineReducers({ timerReducer, listReducer, totalReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk)); 
