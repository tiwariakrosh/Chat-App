import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons'
import React from 'react'
import { auth } from "../firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const Login = () => {
    return (
        <div className='' id='login-page'>
            <div id="login-card">
                <h2>Welcome to Chat App</h2>

                <div className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                    <GoogleOutlined /> Sign In with Google
                </div>
                <br />
                <div className="login-button facebook"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}>                    <FacebookOutlined /> Sign In with facebook
                </div>
            </div>
        </div>
    )
}

export default Login