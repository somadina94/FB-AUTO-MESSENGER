import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  uids: [],
  messageCounter: 0,
  uidsCounter: 0,
};

const dataSlice = createSlice({
  name: "Extention data",
  initialState,
});

export const dataActions = dataSlice.actions;

export default dataSlice;
