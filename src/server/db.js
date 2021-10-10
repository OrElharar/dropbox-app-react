import Axios from "axios";
// const DB_URL = process.env.REACT_APP_PORT;
const DB_URL = "Dropboxapiv1-env.eba-k9xybkux.eu-west-1.elasticbeanstalk.com";

export const getUserFilesFromDB = async (token) => {
    try {
        const res = await fetch(DB_URL + "/files", {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }
        });
        const data = await res.json();
        if (data.status === 401 || data.status === 404 || data.status === 500) {
            throw data
        }
        return data;
    } catch (err) {
        return (err)
    }
};

export const uploadFile = async (formData, token) => {
    try {
        const res = await Axios.post(DB_URL + `/upload-file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + token
            }
        });
        if (res.status === 500 || res.status === 400 || res.status === 404) {
            throw res
        }
        return res.data;
    } catch (err) {
        throw (err)
    }
};

export const deleteFile = async (id, key) => {
    try {
        await Axios.delete(DB_URL + "/delete-file", {
            data: { id, key }
        })
        return
    } catch (err) {
        console.log(err);
    }
}