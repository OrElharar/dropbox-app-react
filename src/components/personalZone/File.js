import React, { useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import { deleteFile, getUserFilesFromDB } from '../../server/db';


const File = ({ file, setFiles }) => {
    // const URL = "http://localhost:4000/get-file";
    const URL = "Dropboxapiv1-env.eba-k9xybkux.eu-west-1.elasticbeanstalk.com/get-file"
    const { userData } = useContext(LoginContext);

    const onClickDeleteFile = (id, key) => {
        deleteFile(id, key)
            .then(() => { return getUserFilesFromDB(userData.token) })
            .then((newFiles) => { setFiles(newFiles) })
            .catch((err) => { console.log({ err }); })
    }
    return (
        <div className="file-container">
            <h3>{file.originalName}</h3>
            <img
                src={`${URL}?key=${file.key}&name=${file.originalName}&token=${userData.token}`}
                alt={file.originalName}
            />
            <iframe title={file.id} className="file" width="100%" height="50" src={`https://docs.google.com/gview?url=${`${URL}?key=${file.key}&name=${file.originalName}&token=${userData.token}`}&embedded=true`}></iframe>
            <button onClick={() => { onClickDeleteFile(file.id, file.key) }}>Delete</button>
        </div>
    );
}
export default File;