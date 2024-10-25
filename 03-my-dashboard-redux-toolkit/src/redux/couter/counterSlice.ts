import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  // acciones que queremos llamar desde cualquier parte de la app
  reducers: {},
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
