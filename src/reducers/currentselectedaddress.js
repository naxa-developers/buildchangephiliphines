const initialState = {
  currentSelectedAddress: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'REMEMBER_SELECTED_ADDRESS':
      return Object.assign({}, state, {
        currentSelectedAddress: action.payload.selectedAddress,
      });

    default:
      return state;
  }
};
