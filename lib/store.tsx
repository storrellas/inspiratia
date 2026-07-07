import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { setTitle } = menuSlice.actions;
