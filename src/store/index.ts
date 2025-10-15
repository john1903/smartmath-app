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
import home from "./home";
import lang from "./lang";
import tasks from "./tasks";
import reports from "./reports";
import categories from "./categories";

// ✅ Combine all reducers
const rootReducer = combineReducers({
  auth,
  loading,
  home,
  lang,
  tasks,
  reports,
  categories,
  [api.reducerPath]: api.reducer, // RTK Query slice (not persisted)
});

// ✅ Persist only `auth`
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"], // only auth is persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 300 },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

// ✅ Persistor
const persistor = persistStore(store);

// ✅ Enable RTK Query listeners
setupListeners(store.dispatch);

// ✅ Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export { store, persistor };
