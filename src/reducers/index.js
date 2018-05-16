import { combineReducers } from 'redux';
import APIReducer from './APIReducer';

export default combineReducers({
    api_data: APIReducer
});
