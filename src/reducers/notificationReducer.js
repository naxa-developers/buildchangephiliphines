const INITIAL_STATE = {
  list: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_NOTIFICATIONS":
      return action.payload;
    default:
      return state;
  }
};
