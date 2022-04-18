import { useEffect } from "react";
import { useLocation } from "react-router";

export const Search = () => {
    const search = useLocation().search;
    const params = new URLSearchParams(search);
    let getCompany = params.get("company");
    let getId = params.get("id");
    let getOptionOne = params.get("optionone");
    let getOptionTwo = params.get("optiontwo");
    // console.log(getCompany, getId, getOptionOne, getOptionTwo);

    useEffect(() => {}, []);

    return (
        <>
            <p>{`Company: ${getCompany}`}</p>
            <p>{`ID: ${getId}`}</p>
            <p>{`Option One: ${getOptionOne}`}</p>
            <p>{`Option Two: ${getOptionTwo}`}</p>
        </>
    );
};
