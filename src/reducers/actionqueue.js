import _ from 'lodash';

const initialState = {
  actionQueue: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_ACTION_QUEUE':
    console.log('ADD_TO_ACTION_QUEUE');
    state.actionQueue.concat([action.payload]);
    state.actionQueue.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        _.isEqual(t, thing)
      ))
    );
      return Object.assign({}, state, {
        actionQueue: state.actionQueue,
      });
    case 'REMOVE_FROM_ACTION_QUEUE':
    console.log('REMOVE_FROM_ACTION_QUEUE');
    console.log('action.payloadko_value');
    console.log(action.payload);
    console.log('actionQueueko_value');
    console.log(state.actionQueue.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        _.isEqual(t, thing)
      ))
    ));

      return Object.assign({}, state, {
        actionQueue: _.without(state.actionQueue, action.payload),
      });
    default:
      return state;
  }
};
