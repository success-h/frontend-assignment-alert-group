// store.ts
import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Import your slices
import authReducer from './slices/business_details';
import sidebarReducer from './slices/sidebar';
import drawerReducer from './slices/drawer';
// Define persist configuration for each slice
const businessDetailsPersistConfig = {
  key: 'info',
  storage,
};

const sidebarPersistConfig = {
  key: 'sidebar',
  storage,
};

const drawerPersistConfig = {
  key: 'drawer',
  storage,
};

const persistedAuthReducer = persistReducer(
  businessDetailsPersistConfig,
  authReducer
);

const persistedSidebarReducer = persistReducer(
  sidebarPersistConfig,
  sidebarReducer
);
const persistedDrawerReducer = persistReducer(
  drawerPersistConfig,
  drawerReducer
);

// Combine all reducers
const rootReducer = combineReducers({
  info: persistedAuthReducer,
  sidebar: persistedSidebarReducer,
  drawer: persistedDrawerReducer,
});

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

// Persist the store

export const persistor = persistStore(store, null, () => {
  console.log('Rehydration complete');
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
