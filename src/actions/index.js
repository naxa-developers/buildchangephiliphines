import _ from 'lodash';
import { NetInfo, AsyncStorage } from 'react-native';

export const tappedOnViewSchools = (token) => {
  return (dispatch) => {
    fetch('http://bccms.naxa.com.np/core/api/project/1/', {
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
    fetch('http://bccms.naxa.com.np/core/api/material-list/1/', {
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
      console.log('isConnectedko_value');
      console.log(isConnected);
      if (_.isEmpty(data.checklistItemData.last_submission)) {
        const url = 'http://bccms.naxa.com.np/core/api/report/';
        const formdata = new FormData();
        formdata.append('report_status', data.checklistItemValue);
        formdata.append('checklist', data.checklistItemData.id);
        formdata.append('comment', 'USAGE OF POST');
        formdata.append('user', data.userId);


        const req = {
          method: 'POST',
          headers: {
            Authorization: 'token ' + token,
            'Content-Type': 'multipart/form-data'
          },
          body: formdata
        };
        if (isConnected.isConnected) {
          console.log({ url, req });
          fetch(url, req)
            .then((res) => {
              console.log(res);
              dispatch({ type: 'REMOVE_FROM_ACTION_QUEUE', payload: { userId: data.userId, url, report_status: data.checklistItemValue, checklist: data.checklistItemData.id, comment: 'USAGE_OF_POST', method: 'POST' } });
            })
            .catch((error) => console.log(error));
        } else {
          dispatch({ type: 'ADD_TO_ACTION_QUEUE', payload: { userId: data.userId, url, report_status: data.checklistItemValue, checklist: data.checklistItemData.id, comment: 'USAGE_OF_POST', method: 'POST' } });
        }
      }
      else if (!_.isEmpty(data.checklistItemData.last_submission)) {
        const url = 'http://bccms.naxa.com.np/core/api/report/'+data.checklistItemData.last_submission.id+'/';
        const formdata = new FormData();
        formdata.append('report_status', data.checklistItemValue);
        formdata.append('checklist', data.checklistItemData.id);
        formdata.append('comment', 'USAGE OF PUT');
        formdata.append('user', data.userId);


        const req = {
          method: 'PUT',
          headers: {
            Authorization: 'token ' + token,
            'Content-Type': 'multipart/form-data'
          },
          body: formdata
        };
        if (isConnected.isConnected) {
          console.log({ url, req });
          fetch(url, req)
            .then((res) => {
              console.log(res);
               dispatch({ type: 'REMOVE_FROM_ACTION_QUEUE', payload: { userId: data.userId, url, report_status: data.checklistItemValue, checklist: data.checklistItemData.id, comment: 'USAGE_OF_PUT', method: 'PUT' } });
            })
            .catch((error) => console.log(error));
        } else {
          dispatch({ type: 'ADD_TO_ACTION_QUEUE', payload: { userId: data.userId, url, report_status: data.checklistItemValue, checklist: data.checklistItemData.id, comment: 'USAGE_OF_PUT', method: 'PUT' } });
        }
      }
  });
  };
};



export const requestPersonByUrl = (eachElement) => {
  return (dispatch) => {
    AsyncStorage.getItem('token').then(token => {
      const formdata = new FormData();
      formdata.append('report_status', eachElement.report_status);
      formdata.append('checklist', eachElement.checklist);
      formdata.append('comment', eachElement.comment);
      formdata.append('user', eachElement.userId);


      const req = {
        method: eachElement.method,
        headers: {
          Authorization: 'token ' + token,
          'Content-Type': 'multipart/form-data'
        },
        body: formdata
      };
      fetch(eachElement.url, req)
        .then((res) => {
          console.log(res);
          dispatch({ type: 'REMOVE_FROM_ACTION_QUEUE', payload: { userId: eachElement.userId, url: eachElement.url, report_status: eachElement.report_status, checklist: eachElement.checklist, comment: eachElement.comment, method: eachElement.method } });
        })
        .catch((error) => console.log(error));
    });
  };
};

export const connectionState = (status) => {
  console.log('connectionStateko_bhitra');
  console.log('statusko_value');
  console.log(status);
  console.log('returned_action_ko_value');
  console.log({ type: 'CHANGE_CONNECTION_STATUS', payload: status.status });
  return { type: 'CHANGE_CONNECTION_STATUS', payload: status.status };
};

export const storeCurrentSelectedSchool = (status) => {
  console.log('storeCurrentSelectedSchool_ko_bhitra');
  console.log('statusko_value');
  console.log(status);
  return { type: 'REMEMBER_SELECTED_SCHOOL', payload: status.schoolId };
};

export const storeUserGroup = (status) => {
  console.log('storeUserGroup_ko_bhitra');
  console.log('statusko_value');
  console.log(status);
  return { type: 'REMEMBER_USER_GROUP', payload: status };
};
