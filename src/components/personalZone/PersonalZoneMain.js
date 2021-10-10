import React, { useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import { getUserFilesFromDB, uploadFile } from '../../server/db';
import File from './File';

const PersonalZoneMain = ({ files, setFiles }) => {
    const { userData } = useContext(LoginContext);

    const onSubmitForm = (e) => {
        e.preventDefault();
        const file = e.target.children[0].files[0];
        const formData = new FormData();
        formData.append("file", file);
        uploadFile(formData, userData.token)
            .then((res) => {
                console.log({ res });
                return getUserFilesFromDB(userData.token)
            }).then((newFiles) => {
                setFiles(newFiles)
            })
            .catch((err) => {
                console.log({ err });
            })
    }

    return (
        <div className="personal-main-container">
            <div className="add-new-file-section">
                <div>Add new file:</div>
                <form onSubmit={onSubmitForm}>
                    <input type="file" name="file" />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="title">My Files:</div>
            {
                files.length > 0 &&
                <div className="files-container">
                    {files.map((file, i) => (
                        <div className="file-outer-wrapper" key={"file" + i} >
                            <File file={file} setFiles={setFiles} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}
export default PersonalZoneMain;