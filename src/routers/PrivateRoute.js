import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { userData } = useContext(LoginContext);

    return (
        <Route
            {...rest}
            component={(props) => (
                userData.user != null ?
                    <Component {...props} /> :
                    <Redirect to={{ pathname: "/login", state: { needToLogin: true } }} />
            )}
        />);
};

export default PrivateRoute;