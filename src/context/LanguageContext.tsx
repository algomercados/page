import { ChangeEvent, createContext, useState } from "react";

const LanguageContext = createContext<any>({});

const initialLanguage = "es";
const translations = {
    es: {
        auxText: "En Construcción",
        logIn: "ACCEDER",
        logOut: "SALIR",
        contactButton:"Contactanos",
    },
    en: {
        auxText: "Under Construction",
        logIn: "LOGIN",
        logOut: "LOGOUT",
        contactButton:"Contact us",
    },
};

const LanguageProvider = ({ children }: { children: any }) => {
    const [language, setLanguage] = useState<string>(initialLanguage);
    const [texts, setTexts] = useState<object>(translations[initialLanguage]);

    const handleLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        // console.log(e.target.value);
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
        <>
            <LanguageContext.Provider value={data}>
                {children}
            </LanguageContext.Provider>
        </>
    );
};

export { LanguageProvider };
export default LanguageContext;
