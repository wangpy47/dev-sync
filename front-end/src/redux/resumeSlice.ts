import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ResumeSection, ResumeData } from "../types/resume.type";

type ResumeState = ResumeData | null;

// order에서 해당 id 찾아서 있으면, entitiy에서  해당 아이디로 들어가서 업데이트
const resumeSlice = createSlice({
  name: "resumeInfo",
  initialState: null as ResumeState,
  reducers: {
    //전체 저장
    setResume(state: ResumeState, action: PayloadAction<ResumeData>) {
      console.log(action);
      return action.payload;
    },
    updateResume<T extends ResumeSection>(
      state: ResumeState,
      action: PayloadAction<T>
    ) {
      if (!state) return;
      state.entities = state.entities.map((section) =>
        section.id === action.payload.id ? action.payload : section
      );
    },
  },
});

export const { updateResume, setResume } = resumeSlice.actions;
export default resumeSlice.reducer;
