const INITIAL_STATE = { isLoading: true, data: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "opened_construction_materials_scene":
      return { ...state, data: action.payload, isLoading: false };
    default:
      return state;
  }
};
