// slice - 객체 관련 상태 , 분리체계
import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name : 'login',
    initialState : {loggedIn : false },
    reducers: {
      login(state) {
        state.loggedIn = true;
      },
      logout(state){
       state.loggedIn = false;
      }
    }
});

export const {login, logout} = loginSlice.actions; // 액션 내보내기
export default loginSlice.reducer; // 리듀서 내보내기