const INITIAL_STATE = {
  hasTyped: false,
  typedText: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "user_searched":
      return {
        ...state,
        hasTyped: true,
        typedText: action.payload
      };

    default:
      return state;
  }
};
