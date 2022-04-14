import { createContext, useState } from "react";

const LanguageContext = createContext({});

const initialLanguage = "es";
const translations = {
    es: {
        auxText: "En Construcción",
        logIn: "ACCEDER",
        logOut: "SALIR",
    },
    en: {
        auxText: "Under Construction",
        logIn: "LOGIN",
        logOut: "LOGOUT",
    },
};

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(initialLanguage);
    const [texts, setTexts] = useState(translations[initialLanguage]);

    const handleLanguage = (e) => {
        console.log(e.target.value);
        if (e.target.value === "es") {
            setLanguage("es");
            setTexts(translations.es);
        } else {
            setLanguage("en");
            setTexts(translations.en);
        }
    };

    const data = { texts, handleLanguage, language };

    return (
        <LanguageContext.Provider value={data}>
            {children}
        </LanguageContext.Provider>
    );
};

export { LanguageProvider };
export default LanguageContext;
