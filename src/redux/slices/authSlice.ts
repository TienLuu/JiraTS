import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import localService from "../../services/localService";

import userAPI from "../../services/userAPI";
import { TUserLogin } from "../../type/user.interface";

interface IAuthState {
   user?: any | null;
   isTokenValid?: boolean;
   isCheckingToken?: boolean;
   loading?: boolean;
   error?: any;
}

const initialState: IAuthState = {
   user: localService.user.get() || null,
   isTokenValid: false,
   isCheckingToken: false,
   loading: false,
   error: false,
};

export const login = createAsyncThunk<any, any>(
   "authenticate/login",
   async (values: TUserLogin) => {
      try {
         const data = await userAPI.signin(values);
         localService.user.set(data);
         return data;
      } catch (error) {
         throw error;
      }
   }
);

export const checkToken = createAsyncThunk(
   "authenticate/checkToken",
   async () => {
      try {
         const data = await userAPI.tesToken();
         return data;
      } catch (error) {
         throw error;
      }
   }
);

const authSlice = createSlice({
   name: "authenticate",
   initialState,
   reducers: {
      logout: (state, action) => {
         localService.user.remove();
         return {
            ...state,
            user: null,
            isCheckingToken: false,
            isTokenValid: false,
         };
      },
   },
   extraReducers: (builder) => {
      builder.addCase(login.pending, (state, action) => {
         return {
            ...state,
            loading: true,
            error: false,
         };
      });

      builder.addCase(login.fulfilled, (state, action) => {
         return {
            ...state,
            loading: false,
            user: action.payload,
            isCheckingToken: true,
            isTokenValid: true,
         };
      });

      builder.addCase(login.rejected, (state, action) => {
         return {
            ...state,
            loading: false,
            error: action.error.message,
         };
      });

      builder.addCase(checkToken.pending, (state, action) => {
         return {
            ...state,
            loading: true,
            error: false,
         };
      });

      builder.addCase(checkToken.fulfilled, (state, action) => {
         return {
            ...state,
            loading: false,
            isCheckingToken: true,
            isTokenValid: true,
         };
      });

      builder.addCase(checkToken.rejected, (state, action) => {
         console.log(action.error);
         if (action.error.message === "Đăng nhập thành công!") {
            return {
               ...state,
               loading: false,
               isCheckingToken: true,
               isTokenValid: true,
            };
         }

         return {
            ...state,
            loading: false,
            error: action.error.message,
            isCheckingToken: true,
            isTokenValid: false,
         };
      });
   },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
