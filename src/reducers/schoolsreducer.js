const INITIAL_STATE = { isLoading: true, data: { sites: [] } };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'tapped_on_view_schools':
      console.log({ ...state, data: action.payload, isLoading: false });
      return { ...state, data: action.payload, isLoading: false };
    default:
      return state;
  }
};
