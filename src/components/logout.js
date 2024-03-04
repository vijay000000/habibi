import React from "react";
import {GoogleLogout } from 'react-google-login';

const clintId = "97033125508-87sv8reknnosjpih7b8o7ttm21l2se40.apps.googleusercontent.com";


function Logtout() {


    const onSuccess = () => {
        console.log("Log out successfull!");
    }

    return (
        <div id="signOutButton">
            <GoogleLogout 
            clintId ={clintId}
            buttonText={"Logot"}
            onLogoutSuccess={onSuccess}
            />

        </div>
    )
}

export default Logtout;