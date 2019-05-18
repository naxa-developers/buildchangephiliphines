const initialState = {
  hasDownloadStarted: false,
  pathForZip: null,
  pathForExtracted: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "REMEMBER_FILE_PATHS":
      return Object.assign({}, state, {
        pathForZip: action.payload.filePaths.pathForZip,
        pathForExtracted: action.payload.filePaths.pathForExtracted
      });
    case "REMEMBER_DOWNLOAD_STATUS":
      return Object.assign({}, state, {
        hasDownloadStarted: action.payload.hasDownloadStarted
      });

    default:
      return state;
  }
};
