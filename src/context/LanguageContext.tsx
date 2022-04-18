import { ChangeEvent, createContext, useState } from "react";

const LanguageContext = createContext<any>({});

const initialLanguage = "es";
const translations = {
    es: {
        auxText: "En Construcción",
        contactButton: "Contactanos",
        logIn: "ACCEDER",
        logOut: "SALIR",
        selectLanguage: "Language",
        toSearch: "Buscar",
        toMain: "inicio",
        selectCompany: "Empresa",
        selectNumbOne: "Opción Uno",
        selectNumbTwo: "Opción Dos",
    },
    en: {
        auxText: "Under Construction",
        contactButton: "Contact us",
        logIn: "LOGIN",
        logOut: "LOGOUT",
        selectLanguage: "Idioma",
        toSearch: "Search",
        toMain: "Main",
        selectCompany: "Company",
        selectNumbOne: "Option One",
        selectNumbTwo: "Option Two",
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
