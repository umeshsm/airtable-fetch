import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IStudent, IClass } from "src/types";

const initialState: IStudent = {};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        name: action.payload.name,
      };
    },
    logout: () => {
      return initialState;
    },
    saveDetails: (state, action: PayloadAction<IClass>) => {
      return {
        ...state,
        classes: action.payload.classes,
      };
    },
  },
});

export const { login, logout, saveDetails } = studentSlice.actions;

export default studentSlice.reducer;
