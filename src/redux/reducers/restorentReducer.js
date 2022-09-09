import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { getItems, postApiWithoutToken, postItems } from '../heplers/fetch2';
import { PathUrl, baseUrl } from '../../config/Config';
// import swal from 'sweetalert';
import { toast } from 'react-toastify';

// const logout = createAction('auth/logout')

const initialState = {
    restoList: [],
    branchList: [],
    restroLoading: false
}

// this function will be triggered when called login
export const fetchRestaurant = createAsyncThunk(
    'fetch/restaurant',
    async ({type,token}) => {
        const returnData = await getItems(`${baseUrl.production}/restaurant?type=${type}`, token)
        return returnData
    }
)
export const fetchBranch = createAsyncThunk(
    'fetch/branch',
    async ({type,token}) => {
        const returnData = await getItems(`${baseUrl.production}/BranchStatus?type=${type}`, token)
        return returnData
    }
)

// this function will be triggered when called logout
export const addRestaurant = createAsyncThunk(
    'add/restaurant',
    async ({ data, token }) => {
        const returnData = await postItems(`${baseUrl.production}/restaurant`, data, token)
        return returnData
    }
)

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
     
    },
    extraReducers: {
        // get Resturent
        [fetchRestaurant.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
            state.restroLoading = false
            state.restoList = []
        },
        [fetchRestaurant.fulfilled]: (state, { payload: { data, error, code } }) => {
            if (code == 200) {
                state.restroLoading = false
                state.restoList = data
            } else {
                state.restroLoading = false
                state.restoList = []
                toast.error(error)
            }
        },
        [fetchRestaurant.pending]: (state, { payload }) => {
            state.restroLoading = true
            state.restoList = []
        },

        // get branch
        [fetchBranch.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
            state.branchList = []
        },
        [fetchBranch.fulfilled]: (state, { payload: { data, error, code } }) => {
            if (code == 200) {
                state.branchList = data
            } else {
                state.branchList = []
                toast.error(error)
            }
        },
        [fetchBranch.pending]: (state, { payload }) => {
            state.branchList = []
        },

        // add restaurant
        [addRestaurant.fulfilled]: (state, { payload:{error,code} }) => {
            if (code == 200) {
                toast.success("Restaurant Created successfully !")
            } else {
                toast.error(error)
            }
        },
        [addRestaurant.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
        },
        [addRestaurant.pending]: (state, { payload }) => {
        },
    }
})
export const { logout } = restaurantSlice.actions;
export default restaurantSlice.reducer