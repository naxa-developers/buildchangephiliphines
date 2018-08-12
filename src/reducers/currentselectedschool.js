const initialState = {
  selectedSchoolId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'REMEMBER_SELECTED_SCHOOL':
      return Object.assign({}, state, {
        selectedSchoolId: action.payload,
      });

    default:
      return state;
  }
};
