import { combineReducers } from 'redux';
import SchoolReducer from './schoolsreducer';
import GuidelineCategoryReducer from './guidelinecategoryreducer';
import SearchReducer from './searchreducer';
import SchoolSearchReducer from './schoolsearchreducer';
import CheckOnline from './checkonline';
import ActionQueue from './actionqueue';
import IsConnected from './isconnected';
import CurrentSelectedSchool from './currentselectedschool';
import CurrentUserGroup from './currentusergroup';
import CurrentSelectedAddress from './currentselectedaddress';

export default combineReducers({
  schoolList: SchoolReducer,
  guideLineCategory: GuidelineCategoryReducer,
  searchReducer: SearchReducer,
  schoolSearchReducer: SchoolSearchReducer,
  checkOnline: CheckOnline,
  actionQueue: ActionQueue,
  isConnected: IsConnected,
  currentSelectedSchool: CurrentSelectedSchool,
  currentUserGroup: CurrentUserGroup,
  currentSelectedAddress: CurrentSelectedAddress
});
