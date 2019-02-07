const INITIAL_STATE = { isLoading: true, data: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'opened_guidelines_category_scene':
      console.log({ ...state, data: action.payload, isLoading: false });
      return { ...state, data: action.payload, isLoading: false };
    default:
      return state;
  }
};
