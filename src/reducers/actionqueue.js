import _ from 'lodash';

const initialState = {
  actionQueue: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_ACTION_QUEUE':
    console.log('ADD_TO_ACTION_QUEUE');
      return Object.assign({}, state, {
        actionQueue: state.actionQueue.concat([action.payload]),
      });
    case 'REMOVE_FROM_ACTION_QUEUE':
    console.log('REMOVE_FROM_ACTION_QUEUE');
    console.log(action.payload);
    console.log(state.actionQueue[0] !== state.actionQueue[3]);
      return Object.assign({}, state, {
        actionQueue: _.without(state.actionQueue, action.payload),
      });
    default:
      return state;
  }
};
