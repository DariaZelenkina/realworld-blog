import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { getPersistConfig } from 'redux-deep-persist';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import dataReducer from "./dataSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  data: dataReducer,
  user: userReducer,
});

const persistConfig = getPersistConfig({
  key: 'root',
  storage,
  whitelist: ['user.user'],
  rootReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
