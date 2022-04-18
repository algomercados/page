import logo from "../logo.svg";
import { useContext } from "react";
import LanguageContext from "../context/LanguageContext";

export const Start = () => {
    const { texts } = useContext(LanguageContext);
    return (
        <div className="Main-gral">
            <img src={logo} className="App-logo" alt="logo" />
            <p>{texts.auxText}</p>
        </div>
    );
};
