import React, { useContext, useState } from 'react';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePdf, faFile, faDownload } from '@fortawesome/free-solid-svg-icons';

import { LoginContext } from '../../contexts/LoginContext';
import { deleteFile, getUserFilesFromDB } from '../../server/db';


const File = ({ file, setFiles }) => {
    // const [isUserDownloadedFile, setIsUserDownloadedFile] = useState(false);
    const fileType = file.originalName.split(".")[1];
    // const URL = "http://dropboxapiv1-env.eba-k9xybkux.eu-west-1.elasticbeanstalk.com";

    const { userData } = useContext(LoginContext);
    const DOWNLOAD_URL = `http://localhost:4000/get-file?key=${file.key}&name=${file.originalName}&token=${userData.token}`;

    const onClickDeleteFile = (id, key) => {
        deleteFile(id, key)
            .then(() => { return getUserFilesFromDB(userData.token) })
            .then((newFiles) => { setFiles(newFiles) })
            .catch((err) => { console.log({ err }); })
    }

    const onClickDownload = () => {
        window.location.href = DOWNLOAD_URL
    }

    return (
        <div className="file-container">
            <div>
                <h3>{file.originalName}</h3>
            </div>
            <div className="file-options">


                {fileType === "jpg" && <FontAwesomeIcon icon={faImage} />}
                {fileType === "pdf" && <FontAwesomeIcon icon={faFilePdf} />}
                {fileType !== "pdf" && fileType !== "jpg" && <FontAwesomeIcon icon={faFile} />}
                <div onClick={onClickDownload}>
                    <FontAwesomeIcon icon={faDownload} />
                </div>
                <span onClick={() => { onClickDeleteFile(file.id, file.key) }}>
                    <FontAwesomeIcon icon={faTrash} />
                </span>
            </div>
            {/* {isUserDownloadedFile && <i src={URL + `/get-file?key=${file.key}&name=${file.originalName}`} />} */}
        </div>
    );
}
export default File;
