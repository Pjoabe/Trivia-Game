import { combineReducers } from 'redux';
import userInfo from './userInfo';
import genericReducer2 from './genericReducer2';

const rootReducer = combineReducers({ userInfo, genericReducer2 });

export default rootReducer;
