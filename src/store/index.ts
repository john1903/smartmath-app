import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Storage,
} from "redux-persist";
// import {MMKV} from 'react-native-mmkv';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "../services/api";

import auth from "./auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({
  auth,

  [api.reducerPath]: api.reducer,
});

// const storage = new MMKV();
// export const reduxStorage: Storage = {
//   setItem: (key, value) => {
//     storage.set(key, value);
//     return Promise.resolve(true);
//   },
//   getItem: key => {
//     const value = storage.getString(key);
//     return Promise.resolve(value);
//   },

//   removeItem: key => {
//     storage.delete(key);
//     return Promise.resolve();
//   },
// };

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      immutableCheck: {
        warnAfter: 300, // Set a higher threshold in milliseconds
      },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 100,
        serializableCheck: false,
      },
    }).concat(api.middleware);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
