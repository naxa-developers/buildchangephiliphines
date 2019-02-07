import _ from 'lodash';

const initialState = {
  actionQueue: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_ACTION_QUEUE':
            return Object.assign({}, state, {
            actionQueue: state.actionQueue.concat([action.payload]).filter((thing, index, self) =>
              index === self.findIndex((t) => (
                _.isEqual(t, thing)
              ))
            ),
          });
    case 'REMOVE_FROM_ACTION_QUEUE':
    console.log('REMOVE_FROM_ACTION_QUEUEko_bhitra');
    console.log('action.payloadko_value');
    console.log(action.payload);
    console.log('data_after_delete_operation');
    console.log(state.actionQueue.filter((element) => {
      return !_.isEqual(element, action.payload);
    }));

    return Object.assign({}, state, {
actionQueue: state.actionQueue.filter((element) => {
  return !_.isEqual(element, action.payload);
}),
});

    default:
      return state;
  }
};
