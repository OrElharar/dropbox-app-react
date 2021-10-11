import React, { useContext, useState } from "react";

import { NavLink, useHistory } from "react-router-dom";
import { deleteUserFromCookie } from "../../cookies/cookies";
import { userLogoutAction } from "../../actions/loginActions";
import { LoginContext } from "../../contexts/LoginContext";
import { userLogoutFromSite } from "../../server/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// import { deleteUserFromCookie } from "../../cookies/cookies";


const Header = () => {
    const { userData, dispatchUserData } = useContext(LoginContext);
    const history = useHistory();
    const [headerNavClass, setHeaderNavClass] = useState("header__nav__dropdown");
    const onClickLogout = () => {
        dispatchUserData(userLogoutAction())

        changeNavDropdownState()
        userLogoutFromSite()
            .then(() => {
                dispatchUserData(userLogoutAction());
                deleteUserFromCookie()
                history.push("/home");
            })

    };

    const onClickNavCheckBox = () => {
        changeNavDropdownState()
    }

    const onClickLogin = () => {
        changeNavDropdownState()
    }

    const changeNavDropdownState = () => {
        if (headerNavClass === "header__nav__dropdown") {
            setHeaderNavClass("header__nav__dropdown hide")
            return
        }
        setHeaderNavClass("header__nav__dropdown")
    }

    const closeDropdown = () => {
        if (headerNavClass === "header__nav__dropdown") {
            setHeaderNavClass("header__nav__dropdown hide")
            return
        }
    }
    return (
        <div className="header">
            <div className="header__nav">
                <NavLink className="home-nav" to="/home" activeClassName="header__active-link" onClick={() => closeDropdown()}>
                    Dropbox
                </NavLink>
                <div className={headerNavClass}>
                    <NavLink to="/personal-zone" activeClassName="header__active-link"
                        onClick={() => changeNavDropdownState()}>Personal Zone</NavLink>
                    {/* <NavLink to="/login" activeClassName="header__active-link">Login</NavLink> */}
                    {


                        !!userData.user ?
                            <div className="header__logout-nav" onClick={onClickLogout}>Logout</div> :
                            <NavLink to="/login" activeClassName="header__active-link" onClick={onClickLogin}>Login</NavLink>
                    }

                </div>
                <label className="check-bar" onClick={onClickNavCheckBox}>
                    <FontAwesomeIcon icon={faBars} />
                </label>

            </div>
        </div>
    );
};

export default Header;

