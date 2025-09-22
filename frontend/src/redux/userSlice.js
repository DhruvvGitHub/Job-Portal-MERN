import { createSlice } from "@reduxjs/toolkit";
import { clearSavedJobs } from "./jobSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
});

export const { setLoading, setUser, clearUser } = authSlice.actions;

export const logoutUser = () => (dispatch) => {
  dispatch(clearUser());
  dispatch(clearSavedJobs());
};

export default authSlice.reducer;
