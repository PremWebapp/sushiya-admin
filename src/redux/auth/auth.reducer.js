import AuthType from "./auth.type"

export const initialState = {
    firstLoginFormStatus : true,
    registredEmailStatus : false,
    resetPasswordStatus : false
}

export const AuthReducer = (state = initialState,action) => {

    switch (action.type) {
        case AuthType.FIRST_LOGIN_FORM:
            return {
                    ...state,
                    firstLoginFormStatus:action.status,
                    registredEmailStatus:false,
                    resetPasswordStatus : false
                    
                };

        case AuthType.REGISTRED_EMAIL :
            return {
                    ...state,
                    registredEmailStatus:action.status,
                    firstLoginFormStatus:false,
                    resetPasswordStatus : false
                    
                }

        case AuthType.RESET_PASSWORD:
            return {
                    ...state,
                    resetPasswordStatus : action.status,
                    registredEmailStatus:false,
                    firstLoginFormStatus:false,                    
                }


        default:
            return state
    }
}

export default AuthReducer;
