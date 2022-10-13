import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import timerReducer from './reducers'

const rootReducer = combineReducers({ timerReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk)); 
