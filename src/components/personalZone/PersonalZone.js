import React, { useEffect, useState, useContext } from 'react';
import Loader from "../main/Loader";
import PersonalZoneMain from './PersonalZoneMain';
import { getUserFilesFromDB } from '../../server/db';
import { LoginContext } from "../../contexts/LoginContext";


const PersonalZone = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [personalFiles, setPersonalFiles] = useState([]);
    const { userData } = useContext(LoginContext);
    console.log({ userData });
    useEffect(() => {
        let isComponentExist = true
        getUserFilesFromDB(userData.token)
            .then((res) => {
                const files = res;
                if (isComponentExist) {
                    setIsLoaded(true)
                    setPersonalFiles([...files])
                }
            }).catch((err) => {
                setIsLoaded(true)
                console.log({ err });
            })

        return () => {
            isComponentExist = false
        }
    }, [setIsLoaded, userData.token, setPersonalFiles]);
    return (
        <div className="personal-zone-container">

            <div className="personal-zone__title"></div>
            {!isLoaded ?

                <Loader /> :
                <PersonalZoneMain files={personalFiles} setFiles={setPersonalFiles} />
            }
        </div>
    );
}
export default PersonalZone;