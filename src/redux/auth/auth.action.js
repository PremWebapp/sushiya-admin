import AuthType from "./auth.type";

export const changeFirstLoginForm = (status) => ({
    type: AuthType.FIRST_LOGIN_FORM,
   status,
});
  
export const changeRegistredEmail = (status) => ({
    type: AuthType.REGISTRED_EMAIL,
   status,
});

export const changeResetPassword = (status) => ({
    type: AuthType.RESET_PASSWORD,
   status,
});
