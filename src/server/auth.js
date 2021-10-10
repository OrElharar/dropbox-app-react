import { getUserFromCookie } from "../cookies/cookies";

export const userLoginToSite = async (email, password) => {
    try {
        const url = process.env.REACT_APP_PORT + "/users/login"
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json()
        return data
        //REACT_APP_LOGIN
    } catch (err) {
        if (err.response != null && err.response.status === 400) {
            // console.log(err.response.data.error.message);
            throw new Error("Email or Password are invalid.")
        }
    }
}



export const userLogoutFromSite = async () => {
    try {
        const url = process.env.REACT_APP_PORT + "/users/logout"
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + getUserFromCookie().token
            }
        });
        return res;
        //REACT_APP_LOGIN
    } catch (err) {
        if (err.response != null && err.response.status === 400) {
            // console.log(err.response.data.error.message);
            throw new Error("Email or Password are invalid.")
        }
    }
}
// instructorConfirmPassword
//                 instructorChangePassword


// export const userChangePassword = async (password) => {
//     try {
//         const url = process.env.REACT_APP_PORT + "/users/change-password"
//         const res = await fetch(url, {
//             method: "PATCH",
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Authorization": "Bearer " + getuserFromCookie().token

//             },
//             body: JSON.stringify({ password })
//         });
//         const data = await res.json()
//         console.log(data);
//         return data
//         //REACT_APP_LOGIN
//     } catch (err) {
//         console.log(err);
//         if (err.response != null && err.response.status === 400) {
//             // console.log(err.response.data.error.message);
//             throw new Error("Email or Password are invalid.")
//         }
//     }
// }