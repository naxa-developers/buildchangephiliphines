const initialState = {
  drafts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_DRAFT_TO_DRAFTS_COLLECTION":
      return Object.assign({}, state, {
        drafts: state.drafts
          .filter(draft => {
            if (draft.hasOwnProperty("subStepId")) {
              return draft.subStepId !== action.payload.subStepId;
            } else {
              if (
                draft.siteId === action.payload.siteId &&
                action.payload.hasOwnProperty("subStepId")
              ) {
                return true;
              }
              return draft.siteId !== action.payload.siteId;
            }
          })
          .concat([action.payload])
      });

    case "DELETE_FROM_DRAFTS_COLLECTION":
      console.log("ation payload", action.payload);
      if (action.payload.hasOwnProperty("siteId")) {
        return Object.assign({}, state, {
          drafts: state.drafts.filter(draft => {
            if (
              draft.hasOwnProperty("stepId") &&
              draft.hasOwnProperty("subStepId")
            ) {
              return true;
            } else {
              return (
                draft.draftUserId === action.payload.draftUserId &&
                draft.siteId !== action.payload.siteId
              );
            }
          })
        });
      } else {
        return Object.assign({}, state, {
          drafts: state.drafts.filter(draft => {
            return (
              draft.draftUserId === action.payload.draftUserId &&
              draft.subStepId !== action.payload.subStepId
            );
          })
        });
      }

    default:
      return state;
  }
};
