
const INITIAL_STATE = {
  hasInternetConnection: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'check_online':
      console.log('check_online_reducer_bhitra');
      console.log({ ...state, hasInternetConnection: action.payload });
      return {
        ...state, hasInternetConnection: action.payload
      };

    default:
      return state;
  }
};
