import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer, { usersFetch } from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import productsReducer, { productsFetch } from './products/productsSlice';
import cartReducer, { getTotals } from './cart/cartSlice';
import scrollReducer from './scroll/scrollSlice';
import orderReducer from "./order/orderSlice"

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  scroll: scrollReducer,
  order: orderReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(usersFetch());

export const persistor = persistStore(store)