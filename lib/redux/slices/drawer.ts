import { createSlice } from '@reduxjs/toolkit';

type ShrinkState = {
  drawer_open: boolean;
};

const initialState: ShrinkState = {
  drawer_open: true,
};

const drawerSlice: any = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setDrawerState: (state, action) => {
      state.drawer_open = !action.payload;
    },
  },
});

export const { setDrawerState } = drawerSlice.actions;
export const selectDrawer = (state: any) => state.drawer.drawer_open;
export default drawerSlice.reducer;
