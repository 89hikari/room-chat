import { Button } from '@material-ui/core';
import React from 'react'
import './Login.css'
import {auth, provider} from './firebase'
import logo from './logo.png';

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch(error => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img src={logo} alt=""/>
                <h1>Messenger</h1>
            </div>
            <Button onClick={signIn}>Войти с помощью Google</Button>
        </div>
    )
}

export default Login
