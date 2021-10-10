import React, { useContext, useState } from "react";
// import { useHistory } from "react-router-dom";
import { instructorLoginAction, studentLoginAction } from "../../actions/loginActions";
import { LoginContext } from "../../contexts/LoginContext";
import { instructorLoginToSite, studentLoginToSite } from "../../server/auth";
import { saveInstructorOnCookie, saveStudentOnCookie } from "../../cookies/cookies";
import { NavLink, useHistory } from "react-router-dom";
// import { loginToSite } from "../../server/auth";

const SubscribePage = () => {
    const { dispatchUserData } = useContext(LoginContext);
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailinputValid, setIsEmailInputValid] = useState(true);
    const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const isFormInavlid = () => {
        return email === "" || password === "";
    };

    const onSubmitform = (event) => {
        event.preventDefault();
        studentLoginToSite(email, password)
            .then((userData) => {
                console.log(userData);
                if (userData.status === 400) {
                    setErrorMessage(userData.message)
                }
                else {
                    dispatchUserData(studentLoginAction(userData));
                    saveStudentOnCookie(userData)
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
        if (emailInput === "") {
            setEmail("");
            // emailState[1]("")
            setIsEmailInputValid(false);
        } else {
            setEmail(emailInput);
            setIsEmailInputValid(true);
        }
    };

    const onBlurPasswordInput = (event) => {
        const passwordInput = event.target.value.trim();
        setPassword(passwordInput === "" ? "" : passwordInput);
        setIsPasswordInputValid(passwordInput !== "");
    };

    return (
        <div className="login-page">
            <div className="login-page__form">
                <div className="login-form">
                    <h3>Subscribe</h3>
                    {errorMessage !== "" && <div className="error-message">{errorMessage}</div>}
                    <form onSubmit={onSubmitform}>
                        <input placeholder="Email" onBlur={onBlurEmailInput} />
                        {!isEmailinputValid && <div className="invalid-message">You must enter your email.</div>}
                        <input type="password" placeholder="Password" onBlur={onBlurPasswordInput} />
                        {!isPasswordInputValid && <div className="invalid-message">You must enter your password.</div>}
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