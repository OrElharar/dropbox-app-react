export const userLoginAction = ({ user, token }) => ({
    type: "LOGIN_USER",
    user,
    token
});

export const userLogoutAction = () => ({
    type: "LOGOUT_USER",
});

