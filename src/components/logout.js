import React from "react";
import {GoogleLogout } from 'react-google-login';

const clintId = "client_id";//replace your client id 


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