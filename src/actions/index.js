import _ from "lodash";
import { NetInfo, AsyncStorage } from "react-native";

export const tappedOnViewSchools = token => {
  return dispatch => {
    fetch("http://bccms.naxa.com.np/core/api/project/1/", {
      method: "GET",
      headers: {
        Authorization: "token " + token
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch({ type: "tapped_on_view_schools", payload: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const openedGuidelinesCategoryScene = token => {
  return dispatch => {
    fetch(
      "http://bccms.naxa.com.np/core/api/houses-and-general-construction/",
      {
        method: "GET",
        headers: {
          Authorization: "token " + token
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        dispatch({
          type: "opened_guidelines_category_scene",
          payload: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const openedConstructionMaterialsScene = token => {
  return dispatch => {
    fetch("http://bccms.naxa.com.np/core/api/category-list/?project_id=1", {
      method: "GET",
      headers: {
        Authorization: "token " + token
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch({
          type: "opened_construction_materials_scene",
          payload: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const openedAddressScene = token => {
  return dispatch => {
    fetch("http://bccms.naxa.com.np/core/api/standard-school-design/", {
      method: "GET",
      headers: {
        Authorization: "token " + token
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch({ type: "opened_address_scene", payload: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const userSearched = text => {
  return {
    type: "user_searched",
    payload: text
  };
};

export const intelliSearch = text => {
  return {
    type: "intelli_search",
    payload: text
  };
};

export const checkOnline = () => {
  return dispatch => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        dispatch({ type: "check_online", payload: isConnected });
      }
      dispatch({ type: "check_online", payload: isConnected });
    });
  };
};

export const requestPerson = data => {
  return (dispatch, getState) => {
    AsyncStorage.getItem("token").then(token => {
      const { isConnected } = getState();

      const url =
        "http://bccms.naxa.com.np/core/api/checklist/" +
        data.checklistItemData.id +
        "/";
      const formdata = new FormData();

      formdata.append("status", data.checklistItemValue);

      const req = {
        method: "PUT",
        headers: {
          Authorization: "token " + token,
          "Content-Type": "multipart/form-data"
        },
        body: formdata
      };
      if (isConnected.isConnected) {
        fetch(url, req)
          .then(res => {
            dispatch({
              type: "REMOVE_FROM_ACTION_QUEUE",
              payload: {
                url,
                status: data.checklistItemValue,
                site: data.checklistItemData.site,
                step: data.checklistItemData.step,
                substep: data.checklistItemData.substep,
                id: data.checklistItemData.id,
                method: "PUT"
              }
            });
          })
          .catch(error => console.log(error));
      } else {
        dispatch({
          type: "ADD_TO_ACTION_QUEUE",
          payload: {
            url,
            status: data.checklistItemValue,
            site: data.checklistItemData.site,
            step: data.checklistItemData.step,
            substep: data.checklistItemData.substep,
            id: data.checklistItemData.id,
            method: "PUT"
          }
        });
      }
    });
  };
};

export const requestPersonByUrl = eachElement => {
  return dispatch => {
    AsyncStorage.getItem("token").then(token => {
      const formdata = new FormData();
      formdata.append("status", eachElement.status);

      const req = {
        method: eachElement.method,
        headers: {
          Authorization: "token " + token,
          "Content-Type": "multipart/form-data"
        },
        body: formdata
      };
      fetch(eachElement.url, req)
        .then(res => {
          dispatch({
            type: "REMOVE_FROM_ACTION_QUEUE",
            payload: {
              url: eachElement.url,
              status: eachElement.status,
              site: eachElement.site,
              step: eachElement.step,
              substep: eachElement.substep,
              id: eachElement.id,
              method: eachElement.method
            }
          });
        })
        .catch(error => console.log(error));
    });
  };
};

export const connectionState = status => {
  return { type: "CHANGE_CONNECTION_STATUS", payload: status.status };
};

export const storeCurrentSelectedSchool = status => {
  return { type: "REMEMBER_SELECTED_SCHOOL", payload: status.schoolId };
};

export const storeUserGroup = status => {
  return { type: "REMEMBER_USER_GROUP", payload: status };
};

export const storeAddress = status => {
  return { type: "REMEMBER_SELECTED_ADDRESS", payload: status };
};

export const setDownloadInfo = status => {
  if (status.hasOwnProperty("filePaths")) {
    return { type: "REMEMBER_FILE_PATHS", payload: status };
  }
  return { type: "REMEMBER_DOWNLOAD_STATUS", payload: status };
};

export const saveToDraftsCollection = draft => {
  return { type: "SAVE_DRAFT_TO_DRAFTS_COLLECTION", payload: draft };
};

export const deleteFromDraftsCollection = draft => {
  return { type: "DELETE_FROM_DRAFTS_COLLECTION", payload: draft };
};
