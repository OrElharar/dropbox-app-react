import React, { useContext, useState } from "react";
import { userLoginAction } from "../../actions/loginActions";
import { LoginContext } from "../../contexts/LoginContext";
import { userSigninToSite } from "../../server/auth";
import { saveUserOnCookie } from "../../cookies/cookies";
import { NavLink, useHistory } from "react-router-dom";
import validator from "validator";
const SubscribePage = () => {
    const { userData, dispatchUserData } = useContext(LoginContext);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isEmailinputValid, setIsEmailInputValid] = useState(true);
    const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const isFormInavlid = () => {
        return email === "" || password === "" || firstName === "" || lastName === "" || repeatPassword === "";
    };

    const onSubmitform = (event) => {
        event.preventDefault();
        userSigninToSite({ email, password, firstName, lastName })
            .then((userData) => {
                if (userData.status === 400) {
                    setErrorMessage(userData.message)
                }
                else {
                    dispatchUserData(userLoginAction(userData));
                    saveUserOnCookie(userData)
                    history.push("/personal-zone");
                }
            }).catch((error) => {
                if (error.status === 400) {
                    setErrorMessage(error.message)
                }
            })

    };

    const onBlurEmailInput = (event) => {
        const emailInput = event.target.value.trim();
        if (!validator.isEmail(emailInput)) {
            setEmail("");
            setIsEmailInputValid(false);
        } else {
            setEmail(emailInput);
            setIsEmailInputValid(true);
        }
    };

    const onBlurPasswordInput = (event) => {
        const passwordInput = event.target.value;
        if (isPasswordValidate(passwordInput)) {
            setPassword(passwordInput);
            setIsPasswordInputValid(true)
        }
        else {
            setPassword("");
            setIsPasswordInputValid(false)
        }
    };
    const isPasswordValidate = (value) => {
        if (value.includes(" "))
            return false;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
        if (!passwordRegex.test(value))
            return false;
        return true;
    }
    return (
        <div className="login-page">
            <div className="login-page__form">
                <div className="login-form">
                    <h3>Subscribe</h3>
                    {errorMessage !== "" && <div className="error-message">{errorMessage}</div>}
                    <form onSubmit={onSubmitform}>
                        <input placeholder="First Name" onBlur={(e) => { setFirstName(e.target.value) }} />
                        {firstName === "" && <div className="invalid-message">You must enter your first name.</div>}
                        <input placeholder="Last Name" onBlur={(e) => { setLastName(e.target.value) }} />
                        {firstName === "" && <div className="invalid-message">You must enter your last name.</div>}
                        <input placeholder="Email" onBlur={onBlurEmailInput} />
                        {!isEmailinputValid && <div className="invalid-message">You must enter an email address.</div>}
                        <input type="password" placeholder="Password" onBlur={onBlurPasswordInput} />
                        {!isPasswordInputValid && <div className="invalid-message">You must enter a valid password.</div>}
                        <input type="password" placeholder="Repeat Password" onBlur={(e) => { setRepeatPassword(e.target.value) }} />
                        {repeatPassword !== password && <div className="invalid-message">Please repeat the password correctly.</div>}
                        <div className="login-form__nav">
                            <button type="submit" disabled={isFormInavlid()}>Submit</button>
                            <div>
                                <NavLink to="/login" className="subscribe__cta">Subscribed already? Login</NavLink>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SubscribePage;