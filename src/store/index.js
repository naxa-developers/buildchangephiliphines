import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import ReduxThunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import reducers from "../reducers";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["checkOnline", "isConnected"]
};

const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(ReduxThunk))
);
export const persistor = persistStore(store);
