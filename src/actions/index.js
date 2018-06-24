import { NetInfo } from 'react-native';

export const tappedOnViewSchools = (token) => {
  return (dispatch) => {
    fetch('http://139.59.67.104:4001/core/api/project/2/', {
      method: 'GET',
      headers: {
        Authorization: 'token '+token
      }
    })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({ type: 'tapped_on_view_schools', payload: responseJson });
    })
   .catch((error) => {
      console.error(error);
    });
  };
};

export const openedGuidelinesCategoryScene = (token) => {
  return (dispatch) => {
    fetch('http://bccms.naxa.com.np/core/api/material-list/2/', {
      method: 'GET',
      headers: {
        Authorization: 'token '+token
      }
    })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({ type: 'opened_guidelines_category_scene', payload: responseJson });
    })
   .catch((error) => {
      console.error(error);
    });
  };
};

export const userSearched = (text) => {
  return {
    type: 'user_searched',
    payload: text
  };
};

export const intelliSearch = (text) => {
  return {
    type: 'intelli_search',
    payload: text
  };
};

export const checkOnline = () => {
  return (dispatch) => {
    NetInfo.isConnected.fetch()
    .then(isConnected => {
      if (isConnected) {
        dispatch({ type: 'check_online', payload: isConnected });
      }
      dispatch({ type: 'check_online', payload: isConnected });
    });
  };
};
