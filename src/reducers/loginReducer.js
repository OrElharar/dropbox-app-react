import { getUserFromCookie } from "../cookies/cookies";

const defaultUserValue = getUserFromCookie();
const defaultToken = defaultUserValue?.token || "";

export const userDataInitialState = { user: defaultUserValue, token: defaultToken };

const loginReducer = (userData, action) => {
    switch (action.type) {
        case "LOGIN_STUDENT":
            return { user: { student: { ...action.student } }, token: action.token };
        case "LOGOUT_STUDENT":
            return { user: null, token: "" };
        case "LOGIN_INSTRUCTOR":
            return { user: { instructor: { ...action.instructor } }, token: action.token };
        case "LOGOUT_INSTRUCTOR":
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