import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { postApiWithoutToken, postItems } from '../heplers/fetch2';
import { PathUrl, baseUrl } from '../../config/Config';
// import swal from 'sweetalert';
import { toast } from 'react-toastify';

// const logout = createAction('auth/logout')

const initialState = {
    userData: {},
    authLoading: false
}

// this function will be triggered when called login
export const authFun = createAsyncThunk(
    'login/admin',
    async (bodydata) => {
        const data = await postApiWithoutToken(`${baseUrl.production}/Adminlogin`, bodydata)
        return data
    }
)

// this function will be triggered when called logout
export const logoutFun = createAsyncThunk(
    'logout/admin',
    async ({ bodydata, token }) => {
        const data = await postItems(`${baseUrl.production}/logOut`, bodydata, token)
        return data
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            // From here we can take action only at this "counter" state
            // But, as we have taken care of this particular "logout" action
            // in rootReducer, we can use it to CLEAR the complete Redux Store's state
        }
    },
    extraReducers: {
        //login extraReducers
        [authFun.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
            state.authLoading = false
            state.userData = []
        },
        [authFun.fulfilled]: (state, { payload: { data, error, code } }) => {
            if (code == 200) {
                state.authLoading = false
                state.userData = data
                toast.success("Logged in successfully !")
            } else {
                state.authLoading = false
                state.userData = []
                toast.error(error)
            }
        },
        [authFun.pending]: (state, { payload }) => {
            state.authLoading = true
            state.userData = []
        },

        // logout extraReducers
        [logoutFun.fulfilled]: (state, { payload }) => {
            toast.success("Logout successfully !")
        },
        [logoutFun.rejected]: (state, { payload }) => {
            toast.error("Some error occurred in server side and we are working on it!");
        },
        [logoutFun.pending]: (state, { payload }) => {
        },
    }
})
export const { logout } = authSlice.actions;
export default authSlice.reducer