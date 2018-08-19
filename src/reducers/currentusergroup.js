const initialState = {
  currentUserGroup: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'REMEMBER_USER_GROUP':
      return Object.assign({}, state, {
        currentUserGroup: action.payload,
      });

    default:
      return state;
  }
};
