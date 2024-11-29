import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
