import { combineReducers } from 'redux';
import APIReducer from './APIReducer';
import LibaryReducer from './LibraryReducer';


export default combineReducers({
    api_data: APIReducer,
    libraries: LibaryReducer,

});
