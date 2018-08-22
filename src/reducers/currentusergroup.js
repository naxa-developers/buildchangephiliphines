const initialState = {
  currentUserGroup: null,
  currentUserId: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'REMEMBER_USER_GROUP':
      return Object.assign({}, state, {
        currentUserGroup: action.payload.userGroup,
        currentUserId: action.payload.userId
      });

    default:
      return state;
  }
};
