// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
//   Storage,
// } from "redux-persist";
// // import {MMKV} from 'react-native-mmkv';
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { api } from "../services/api";

// import auth from "./auth";
// import loading from "./loading";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const reducers = combineReducers({
//   auth,
//   loading,

//   [api.reducerPath]: api.reducer,
// });

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
//   whitelist: ["auth"],
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => {
//     const middlewares = getDefaultMiddleware({
//       immutableCheck: {
//         warnAfter: 300, // Set a higher threshold in milliseconds
//       },
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         warnAfter: 100,
//         serializableCheck: false,
//       },
//     }).concat(api.middleware);

//     return middlewares;
//   },
// });

// const persistor = persistStore(store);

// setupListeners(store.dispatch);

// export { store, persistor };

// export const useAppSelector: TypedUseSelectorHook<
//   ReturnType<typeof store.getState>
// > = useSelector;

// export const useAppDispatch: () => typeof store.dispatch = useDispatch;

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
} from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";
import auth from "./auth";
import loading from "./loading";

// ✅ Only persist the auth slice
const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  loading,
  [api.reducerPath]: api.reducer, // RTK Query slice (not persisted)
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 300 },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 100,
        serializableCheck: false,
      },
    }).concat(api.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
