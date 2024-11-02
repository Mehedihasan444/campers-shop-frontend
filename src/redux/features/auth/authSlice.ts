import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
export interface TUser {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  profilePhoto: string;
  role: "ADMIN" | "SELLER" | "BUYER";
  exp: number;
}
interface DecodedToken {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  profilePhoto: string;
  role: "ADMIN" | "SELLER" | "BUYER";
  exp: number;
}

type TAuthState = {
  user: null | TUser;
  access_token: null | string;
  refresh_token: null | string;
};

const initialState: TAuthState = {
  user: null,
  access_token: null,
  refresh_token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const { access_token, refresh_token } = action.payload;

      const decodedUser = jwtDecode<DecodedToken>(access_token);
      state.user = decodedUser;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

export const { signIn, logout } = authSlice.actions;

export default authSlice.reducer;
