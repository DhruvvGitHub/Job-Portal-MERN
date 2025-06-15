import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        allCompanies: [],
        singleCompany: null,
        searchCompanyByText: ""
    },
    reducers: {
        setAllCompanies: (state,action) => {
            state.allCompanies = action.payload
        },
        setSingleCompany: (state,action) => {
            state.singleCompany = action.payload
        },
                setSsearchCompanyByText: (state,action) => {
            state.searchCompanyByText = action.payload
        }
    }
})

export const {setAllCompanies, setSingleCompany, setSsearchCompanyByText} = companySlice.actions
export default companySlice.reducer