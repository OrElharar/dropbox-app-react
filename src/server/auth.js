import { getUserFromCookie } from "../cookies/cookies";
// const DB_URL = process.env.REACT_APP_PORT;
const DB_URL = "http://dropboxapiv2-env.eba-ihvpemty.eu-west-1.elasticbeanstalk.com";

export const userLoginToSite = async (email, password) => {
    try {
        const url = DB_URL + "/users/login"
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

export const userSigninToSite = async (reqBody) => {
    try {
        const url = DB_URL + "/users"
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody)
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

// 

export const userLogoutFromSite = async () => {
    try {
        console.log("Logout");
        const url = DB_URL + "/users/logout"
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