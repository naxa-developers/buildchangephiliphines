const INITIAL_STATE = {
  hasInternetConnection: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "check_online":
      return {
        ...state,
        hasInternetConnection: action.payload
      };

    default:
      return state;
  }
};
