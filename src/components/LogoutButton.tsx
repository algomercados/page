import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import LanguageContext from "../context/LanguageContext";

const LogoutButton = () => {
    const { logout } = useAuth0();
    const { texts } = useContext(LanguageContext);

    return (
        // <button onClick={() => logout({ returnTo: window.location.origin })}>
        //     Log Out
        // </button>
        <Button
            variant="outlined"
            sx={{ m: 1 }}
            onClick={() => logout({ returnTo: window.location.origin })}
        >
            {texts.logOut}
        </Button>
    );
};

export default LogoutButton;
