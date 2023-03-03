import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import auth from "./redux/slices/authSlice";
import user from "./redux/slices/userSlice";
import project from "./redux/slices/projectSlice";
// import task from "./slices/taskSlice";

const store = configureStore({
   reducer: {
      auth,
      user,
      project,
      //   task,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
