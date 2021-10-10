import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from '../components/main/Header';
import LoginPage from '../components/login/LoginPage';
import Home from '../components/home/Home';
import PageNotFound from '../components/main/PageNotfound';

import LoginContextProvider from '../contexts/LoginContext';
import PrivateRoute from './PrivateRoute';
import LoginRoute from './LoginRoute';
import PersonalZone from '../components/personalZone/PersonalZone';

const AppRouter = () => (
    <BrowserRouter>
        <LoginContextProvider>
            <Header />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" />
                </Route>
                <Route path="/home" component={Home} />
                <LoginRoute path="/login" component={LoginPage} />
                <PrivateRoute path="/personal-zone" component={PersonalZone} />
                <Route path="/404" component={PageNotFound} />
            </Switch>
            {/* <Footer /> */}
        </LoginContextProvider>
    </BrowserRouter>
);

export default AppRouter;