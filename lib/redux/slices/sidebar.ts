import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type ShrinkState = {
  shrink: boolean;
};

const initialState: ShrinkState = {
  shrink: false,
};

const sidebarSlice: any = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setShrink: (state, action) => {
      state.shrink = action.payload;
    },
  },
});

export const { setShrink } = sidebarSlice.actions;
export const selectSidebar = (state: any) => state.sidebar.shrink;
export default sidebarSlice.reducer;
