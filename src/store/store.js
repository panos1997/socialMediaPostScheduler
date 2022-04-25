import { configureStore } from '@reduxjs/toolkit';
import combinedReducer from './combinedReducer';

const store = configureStore({ 
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export default store;