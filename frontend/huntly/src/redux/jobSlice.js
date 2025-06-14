import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    savedJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchQuery: ""
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setallAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
    },
    clearSavedJobs: (state) => {
      state.savedJobs = [];
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { 
  setAllJobs, 
  setallAdminJobs, 
  setSavedJobs, 
  clearSavedJobs,
  setSingleJob, 
  setSearchJobByText, 
  setAllAppliedJobs, 
  setSearchQuery 
} = jobSlice.actions;

export default jobSlice.reducer;
