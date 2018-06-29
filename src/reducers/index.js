import { combineReducers } from 'redux';
import SchoolReducer from './schoolsreducer';
import GuidelineCategoryReducer from './guidelinecategoryreducer';
import SearchReducer from './searchreducer';
import SchoolSearchReducer from './schoolsearchreducer';
import CheckOnline from './checkonline';
import ActionQueue from './actionqueue';
import IsConnected from './isconnected';

export default combineReducers({
  schoolList: SchoolReducer,
  guideLineCategory: GuidelineCategoryReducer,
  searchReducer: SearchReducer,
  schoolSearchReducer: SchoolSearchReducer,
  checkOnline: CheckOnline,
  actionQueue: ActionQueue,
  isConnected: IsConnected
});
