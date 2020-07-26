import React from 'react';
import { Button } from 'react-bootstrap';

import './login-page.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';


const LoginPage = () =>{
    return(
    <div className="login-page">
        <SignIn/>
    </div>
)};

export default LoginPage;