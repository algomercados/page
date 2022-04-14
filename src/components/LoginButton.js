import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import LanguageContext from "../context/LanguageContext";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    const { texts } = useContext(LanguageContext);

    // return <button onClick={() => loginWithRedirect()}>Log In</button>;
    return (
        <Button
            variant="outlined"
            sx={{ m: 1 }}
            onClick={() => loginWithRedirect()}
        >
            {texts.logIn}
        </Button>
    );
};

export default LoginButton;
