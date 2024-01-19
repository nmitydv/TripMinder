import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { commonServices } from './services/commonServices';
// import { driverServices } from './services/driverServices';
// import { userServices } from './services/userServices';
import { adminServices } from './services/adminServices';
// import { vehicleOwnerServices } from './services/vehicleOwnerServices';
import { authServices } from './services/authServices';

// Combine reducers
const rootReducer = combineReducers({
    [commonServices.reducerPath]: commonServices.reducer,
    // [driverServices.reducerPath]: driverServices.reducer,
    // [userServices.reducerPath]: userServices.reducer,
    [adminServices.reducerPath]: adminServices.reducer,
    // [vehicleOwnerServices.reducerPath]: vehicleOwnerServices.reducer,
    [authServices.reducerPath]: authServices.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            commonServices.middleware,
            // driverServices.middleware,
            // userServices.middleware,
            adminServices.middleware,
            // vehicleOwnerServices.middleware,
            authServices.middleware
        ),
});

// Set up listeners for rtk-query
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
