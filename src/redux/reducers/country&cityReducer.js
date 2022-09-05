import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postApiWithoutToken, postItems,getItems } from '../heplers/fetch2';
import { PathUrl, baseUrl } from '../../config/Config';
import swal from 'sweetalert';


const initialState = {
    countryData: [],
    cityData: [],
    coucityLoading: false
}

// this function will be triggered when called country fetch 
export const countryFetchData = createAsyncThunk(
    'country/admin',
    async ({token}) => {
        const data = await getItems(`${baseUrl.production}/country`, token)
        return data
    }
)

// this function will be triggered when called city fetch 
export const cityFetchData = createAsyncThunk(
    'city/admin',
    async ({ token }) => {
        const data = await postItems(`${baseUrl.production}/city`, token)
        return data
    }
)

const countryAcityReducer = createSlice({
    name: 'country&city',
    initialState,
    reducers: {
    },
    extraReducers: {
        //country
        [countryFetchData.rejected]: (state, { payload }) => {
            swal("Bad Call!", 'Some error occurred in server side!', "warning")
            state.coucityLoading = false
            state.countryData = []
        },
        [countryFetchData.fulfilled]: (state, { payload: { data, status, error, code } }) => {
            if (status == 'success' || code == 200) {
                state.coucityLoading = false
                state.countryData = data
            } else {
                state.coucityLoading = false
                state.countryData = []
            }
        },
        [countryFetchData.pending]: (state, { payload }) => {
            state.coucityLoading = true
            state.countryData = []
        },

        //city
        [cityFetchData.rejected]: (state, { payload }) => {
            swal("Bad Call!", 'Some error occurred in server side!', "warning")
            state.coucityLoading = false
            state.cityData = []
        },
        [cityFetchData.fulfilled]: (state, { payload: { data, status, error, code } }) => {
            if (status == 'success' || code == 200) {
                state.coucityLoading = false
                state.cityData = data
                swal("Good job!", "Logged In succesfully!", "success");
            } else {
                swal("Bad Call!", "Credentials does not match!", "warning")
                state.coucityLoading = false
                state.cityData = []
            }
        },
        [cityFetchData.pending]: (state, { payload }) => {
            state.coucityLoading = true
            state.cityData = []
        },
    }
})
export const { logout } = countryAcityReducer.actions;
export default countryAcityReducer.reducer