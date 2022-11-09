import { combineReducers } from 'redux';
import genericReducer1 from './genericReducer1';
import genericReducer2 from './genericReducer2';

const rootReducer = combineReducers({ genericReducer1, genericReducer2 });

export default rootReducer;
