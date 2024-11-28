// slice - 객체 관련 상태 , 분리체계
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  loggedIn: boolean;
  loginInfo: {
    id: number | null;
    email: string | null;
    username: string | null;
    profileImageUrl: string | null;
    createdDt: string | null;
    providerId: string | null;
    githubUrl: string | null;
    blogUrl: string | null;
  };
}


const initialState : LoginState = {
  loggedIn: false,
  loginInfo: {
    id: null,
    email: null,
    username: null,
    profileImageUrl: null,
    createdDt: null,
    providerId: null,
    githubUrl: null,
    blogUrl: null,
  },
}
const loginSlice = createSlice({
    name : 'login',
    initialState ,
    reducers: {
     login(state, action: PayloadAction<LoginState['loginInfo']>) {
      state.loggedIn = true;
      state.loginInfo = action.payload; // 로그인 시 전달된 정보로 상태 업데이트
    },
      logout(state){
       state.loggedIn = false;
       state.loginInfo = initialState.loginInfo
      }
    }
});

export const {login, logout} = loginSlice.actions; // 액션 내보내기
export default loginSlice.reducer; // 리듀서 내보내기