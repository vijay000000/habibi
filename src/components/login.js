import React from "react";
import { GoogleLogin } from 'react-google-login';

const clientId = "97033125508-87sv8reknnosjpih7b8o7ttm21l2se40.apps.googleusercontent.com";

function Login() {

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj); // Corrected typo: 'profileobj' to 'profileObj'
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId} // Corrected typo: 'clintId' to 'clientId'
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;
