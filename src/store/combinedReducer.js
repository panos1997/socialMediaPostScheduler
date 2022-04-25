import { combineReducers } from 'redux';
import modal from './Slices/modalSlice';
import schedulePost from './Slices/schedulePostSlice';

const combinedReducer = combineReducers({
    modal,
    schedulePost
});

export default combinedReducer;