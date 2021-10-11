import { getUserFromCookie } from "../cookies/cookies";

const defaultUserValue = getUserFromCookie();
const defaultToken = defaultUserValue?.token || "";

export const userDataInitialState = { user: defaultUserValue, token: defaultToken };

const loginReducer = (userData, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { user: { user: { ...action.user } }, token: action.token };
        case "LOGOUT_USER":
            return { user: null, token: "" };

        default:
            return { ...userData };
    }
};
// export const instructorLoginAction = ({ instructor, token }) => ({
//     type: "LOGIN_INSTRUCTOR",
//     instructor,
//     token
// });
export default loginReducer;