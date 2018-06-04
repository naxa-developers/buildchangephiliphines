import { combineReducers } from 'redux';
import SchoolReducer from './schoolsreducer';

export default combineReducers({
  schoolList: SchoolReducer
});
