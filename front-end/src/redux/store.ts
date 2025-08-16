import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import resumeReducer from "./resumeSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const resumePersistConfig = {
  key: "resumeInfo",
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  login: loginReducer, // persist 안 함
  resumeInfo: persistReducer(resumePersistConfig, resumeReducer), // persist 적용
});

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: {
//     ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // redux-persist 관련 액션 무시
//   },
// });

// const rootReducer = combineReducers({
//   login: loginReducer, // persist 안 함
//   resumeInfo: persistReducer(resumePersistConfig, resumeReducer), // persist 적용
// });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
