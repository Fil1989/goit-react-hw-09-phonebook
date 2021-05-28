import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import {
  filter,
  contacts,
  isLoading,
  user,
  token,
  error,
  isAutenticated,
} from './reducers';
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
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// const middleware = [logger, ...getDefaultMiddleware()];
const rootReducer = combineReducers({
  filter,
  contacts,
  isLoading,
  user,
  token,
  error,
  isAutenticated,
});

const persistConfig = {
  key: 'auth', //localStorage.set('token',...)
  storage: storage,
  whitelist: ['token', 'isAutenticated'], // token, isAutenticated will be persisted
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  // reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV === 'development',
});

export default store;

export const persistor = persistStore(store);
