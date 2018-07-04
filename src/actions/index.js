import _ from 'lodash';
import { NetInfo, AsyncStorage } from 'react-native';

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





export const requestPerson = (data) => {
  console.log('request_person_bhirta');
  console.log(data);
  return (dispatch, getState) => {
    AsyncStorage.getItem('token').then(token => {
      const { isConnected } = getState();
      if (_.isEmpty(data.checklistItemData.last_submission)) {
        const url = 'http://bccms.naxa.com.np/core/api/report/';
        const formdata = new FormData();
        formdata.append('report_status', data.checklistItemValue);
        formdata.append('checklist', data.checklistItemData.id);
        formdata.append('comment', 'USAGE OF POST');

        const req = {
          method: 'POST',
          headers: {
            Authorization: 'token ' + token,
            'Content-Type': 'multipart/form-data'
          },
          body: formdata
        };
        if (isConnected) {
          console.log({ url, req });
          fetch(url, req)
            .then((res) => {
              console.log(res);
              dispatch({ type: 'REMOVE_FROM_ACTION_QUEUE', payload: { url, report_status: data.checklistItemValue, checklist: data.checklistItemData.id, comment: 'USAGE_OF_POST' } });
            })
            .catch((error) => console.log(error));
        } else {
          dispatch({ type: 'ADD_TO_ACTION_QUEUE', payload: { url, report_status: data.checklistItemValue, checklist: data.checklistItemData.id, comment: 'USAGE_OF_POST' } });
        }
      }
      else if (!_.isEmpty(data.checklistItemData.last_submission)) {
        const url = 'http://bccms.naxa.com.np/core/api/report/'+data.checklistItemData.last_submission.id+'/';
        const formdata = new FormData();
        formdata.append('report_status', data.checklistItemValue);
        formdata.append('checklist', data.checklistItemData.id);
        formdata.append('comment', 'USAGE OF PUT');

        const req = {
          method: 'PUT',
          headers: {
            Authorization: 'token ' + token,
            'Content-Type': 'multipart/form-data'
          },
          body: formdata
        };
        if (isConnected) {
          console.log({ url, req });
          fetch(url, req)
            .then((res) => {
              console.log(res);
               dispatch({ type: 'REMOVE_FROM_ACTION_QUEUE', payload: { url, report_status: data.checklistItemValue, checklist: data.checklistItemData.id, comment: 'USAGE_OF_PUT' } });
            })
            .catch((error) => console.log(error));
        } else {
          dispatch({ type: 'ADD_TO_ACTION_QUEUE', payload: { url, report_status: data.checklistItemValue, checklist: data.checklistItemData.id, comment: 'USAGE_OF_PUT' } });
        }
      }
  });
  };
};



export const requestPersonByUrl = (eachElement) => {
  return (dispatch) => {
    fetch(eachElement.url, eachElement.req)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: 'REMOVE_FROM_ACTION_QUEUE', payload: { url: eachElement.url, req: eachElement.req } });
      });
  };
};

export const connectionState = ({ status }) => {
  return { type: 'CHANGE_CONNECTION_STATUS', isConnected: status };
};
