const initialState = {
  isConnected: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_CONNECTION_STATUS":
      return Object.assign({}, state, {
        isConnected: action.payload
      });

    default:
      return state;
  }
};
