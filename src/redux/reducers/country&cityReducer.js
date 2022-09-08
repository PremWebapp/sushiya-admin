import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postApiWithoutToken, postItems, getItems, postWithImageItems } from '../heplers/fetch2';
import { PathUrl, baseUrl } from '../../config/Config';
import { toast } from 'react-toastify';

const initialState = {
    countryList: [],
    countryListForFilter: [],
    countryListActiveForFilter: [],
    cityList: [],
    cityListForFilter: [],
    cityListActiveForFilter: [],
    coucityLoading: false
}

// this function will be triggered when called country fetch 
export const countryFetchData = createAsyncThunk(
    'country/get',
    async ({ token }) => {
        const data = await getItems(`${baseUrl.production}/country`, token)
        return data
    }
)

export const addCountry = createAsyncThunk(
    'country/add',
    async ({ formData, token }) => {
        const data = await postWithImageItems(`${baseUrl.production}/country`, formData, token)
        return data
    }
)

export const updateCountry = createAsyncThunk(
    'country/update',
    async ({ formData, token }) => {
        const data = await postWithImageItems(`${baseUrl.production}/countryupdate`, formData, token)
        return data
    }
)
export const updateCountryStatus = createAsyncThunk(
    'country/updateStatus',
    async ({ formData, token }) => {
        const data = await postItems(`${baseUrl.production}/countryupdate`, formData, token)
        return data
    }
)
export const removeCountry = createAsyncThunk(
    'country/remove',
    async ({ id, token }) => {
        const data = await postItems(`${baseUrl.production}/countrydelete`, id, token)
        return data
    }
)

export const cityFetchData = createAsyncThunk(
    'fetchcity/admin',
    async ({ token }) => {
        const data = await getItems(`${baseUrl.production}/getCity`, token)
        return data
    }
)

export const addCity = createAsyncThunk(
    'addcity/admin',
    async ({ data, token }) => {
        const returnData = await postItems(`${baseUrl.production}/city`, data, token)
        return returnData
    }
)
export const updateCity = createAsyncThunk(
    'updatecity/admin',
    async ({ data, token }) => {
        const returnData = await postItems(`${baseUrl.production}/udpateCity`, data, token)
        return returnData
    }
)

export const updateCityStatus = createAsyncThunk(
    'updatecity/admin',
    async ({ data, token }) => {
        const returnData = await postItems(`${baseUrl.production}/udpateCity`, data, token)
        return returnData
    }
)
export const removeCity = createAsyncThunk(
    'deletecity/admin',
    async ({ id, token }) => {
        const returnData = await postItems(`${baseUrl.production}/deleteCity`, id, token)
        return returnData
    }
)

const countryAcityReducer = createSlice({
    name: 'country&city',
    initialState,
    reducers: {
        dataForFilters: (state, { payload }) => {
            state.countryListForFilter = state.countryList?.map(val => {
                return {
                    id: val.id,
                    value: val.country,
                }
            })
            let countryData = state.countryList?.filter(val => val.status === '1')
            
            state.countryListActiveForFilter = countryData?.map(val => {
                return {
                    id: val.id,
                    value: val.country,
                }
            })

            state.cityListForFilter = state.cityList?.map(val => {
                return {
                    id: val.id,
                    country_id: val.country_id,
                    value: val.city,
                }
            })

            let cityData = state.cityList?.filter(val => val.status === '1')

            state.cityListActiveForFilter = cityData?.map(val => {
                return {
                    id: val.id,
                    country_id: val.country_id,
                    value: val.city,
                }
            })
        }
    },
    extraReducers: {
        //get country
        [countryFetchData.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
            state.coucityLoading = false
            state.countryList = []
        },
        [countryFetchData.fulfilled]: (state, { payload: { data, error, code } }) => {
            if (code == 200) {
                state.coucityLoading = false
                state.countryList = data
            } else {
                state.coucityLoading = false
                state.countryList = []
            }
        },
        [countryFetchData.pending]: (state, { payload }) => {
            state.coucityLoading = true
            state.countryList = []
        },

        //add country
        [addCountry.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
        },
        [addCountry.fulfilled]: (state, { payload: { data, message, code } }) => {
            if (code == 200) {
                toast.success("Country added successfully !")
            } else {
                toast.error(message)
                data?.map(err => console.log('Object.values(err)', Object.values(err)))
                // data?.map(err=>toast.error(Object.values(err)) )
            }
        },
        [addCountry.pending]: (state, { payload }) => {
        },

        //remove country
        [removeCountry.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
        },
        [removeCountry.fulfilled]: (state, { payload: { data, message, code } }) => {
            if (code == 200) {
                toast.success("Country removed successfully !")
            } else {
                toast.error(message)
            }
        },
        [removeCountry.pending]: (state, { payload }) => {
        },


        //update country
        [updateCountry.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
        },
        [updateCountry.fulfilled]: (state, { payload: { data, message, code } }) => {
            if (code == 200) {
                toast.success("Country updated successfully !")
            } else {
                toast.error(message)
            }
        },
        [updateCountry.pending]: (state, { payload }) => {
        },

        //update country status
        [updateCountryStatus.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
        },
        [updateCountryStatus.fulfilled]: (state, { payload: { data, message, code } }) => {
            if (code == 200) {
                toast.success("Country status updated successfully !")
            } else {
                toast.error(message)
            }
        },
        [updateCountryStatus.pending]: (state, { payload }) => {
        },

        //get citys
        [cityFetchData.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
            state.coucityLoading = false
            state.cityList = []
        },
        [cityFetchData.fulfilled]: (state, { payload: { data, status, error, code } }) => {
            if (code == 200) {
                state.coucityLoading = false
                state.cityList = data
            } else {
                toast.error("Some error occurred in server side and we are working on it!");
                state.coucityLoading = false
                state.cityList = []
            }
        },
        [cityFetchData.pending]: (state, { payload }) => {
            state.coucityLoading = true
            state.cityList = []
        },
        //add city
        [addCity.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
        },
        [addCity.fulfilled]: (state, { payload: { data, status, message, code } }) => {
            if (code == 200) {
                toast.success("City added succesfully!");
            } else {
                toast.error(message);
            }
        },
        [addCity.pending]: (state, { payload }) => {
        },
        //update city
        [updateCity.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
        },
        [updateCity.fulfilled]: (state, { payload: { data, status, message, code } }) => {
            if (code == 200) {
                toast.success("City updated  succesfully!");
            } else {
                toast.error(message);
            }
        },
        [updateCity.pending]: (state, { payload }) => {
        },
        //update city
        [updateCityStatus.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
        },
        [updateCityStatus.fulfilled]: (state, { payload: { data, status, message, code } }) => {
            if (code == 200) {
                toast.success("City status updated succesfully!");
            } else {
                toast.error(message);
            }
        },
        [updateCityStatus.pending]: (state, { payload }) => {
        },
        //remove city
        [removeCity.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
        },
        [removeCity.fulfilled]: (state, { payload: { data, status, message, code } }) => {
            if (code == 200) {
                toast.success("City removed succesfully!");
            } else {
                toast.error(message);
            }
        },
        [removeCity.pending]: (state, { payload }) => {
        },
    }
})
export const { dataForFilters } = countryAcityReducer.actions;
export default countryAcityReducer.reducer