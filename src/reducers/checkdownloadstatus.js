const initialState = {
  hasDownloadStarted: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'REMEMBER_DOWNLOAD_STATUS':
      return Object.assign({}, state, {
        hasDownloadStarted: action.payload.hasDownloadStarted
      });

    default:
      return state;
  }
};
