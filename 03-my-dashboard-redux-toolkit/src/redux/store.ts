import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./couter/counterSlice";
import { TypedUseSelectorHook, useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { counterReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useDispatch;
