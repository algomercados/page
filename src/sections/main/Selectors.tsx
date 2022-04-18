import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import LanguageContext from "../../context/LanguageContext";
import { toSearchInterface } from "../../interfaces/interfaces";

let companies = [
    {
        id: "apple0416",
        company: "Apple",
        optionOne: ["A-option1-1", "A-option1-2", "A-option1-3"],
        optionTwo: [
            "A-option2-1",
            "A-option2-2",
            "A-option2-3aaaasasjjhdfjkhdfjhkdfjhdfjhdfjhkdfjhk",
        ],
    },
    {
        id: "Ford0416",
        company: "Ford",
        optionOne: ["F-option1-1", "F-option1-2", "F-option1-3"],
        optionTwo: ["F-option2-1", "F-option2-2", "F-option2-3"],
    },
    {
        id: "nike0416",
        company: "Nike",
        optionOne: ["N-option1-1", "N-option1-2", "N-option1-3"],
        optionTwo: ["N-option2-1", "N-option2-2", "N-option2-3"],
    },
];

// let optionOne = ["option1-1", "option1-2", "option1-3"];
// let optionTwo = ["option2-1", "option2-2", "option2-3"];

const initialToSearch = {
    company: "",
    id: "",
    optionOne: "",
    optionTwo: "",
};
let indexCompany: number;
export const Selectors = () => {
    const getLocation = useLocation();
    const { texts } = useContext(LanguageContext);
    const navigate = useNavigate();

    const [toSearch, setToSearch] =
        useState<toSearchInterface>(initialToSearch);
    const [selectOptionOne, setSelectOptionOne] = useState<string[]>([]);
    const [selectOptionTwo, setSelectOptionTwo] = useState<string[]>([]);

    const handleChange = (e: SelectChangeEvent<string>) => {
        if (e.target.name === "company") {
            for (let i = 0; i < companies.length; i++) {
                if (e.target.value === companies[i].company) {
                    indexCompany = i;
                    break;
                }
            }
            setToSearch((prevState) => ({
                ...prevState,
                company: e.target.value,
                id: companies[indexCompany].id,
                optionOne: "",
                optionTwo: "",
            }));
            setSelectOptionOne(companies[indexCompany].optionOne);
            setSelectOptionTwo([]);
        } else if (e.target.name === "optionOne") {
            setToSearch((prevState) => ({
                ...prevState,
                optionOne: e.target.value,
                optionTwo: "",
            }));
            setSelectOptionTwo(companies[indexCompany].optionTwo);
        } else if (e.target.name === "optionTwo") {
            setToSearch((prevState) => ({
                ...prevState,
                optionTwo: e.target.value,
            }));
        }
    };
    const handleSearch = () => {
        navigate(
            `/search?company=${toSearch.company}&id=${toSearch.id}&optionone=${toSearch.optionOne}&optiontwo=${toSearch.optionTwo}`
        );
    };

    useEffect(() => {
        if (getLocation.pathname === "/") {
            setToSearch(initialToSearch);
            setSelectOptionOne([]);
            setSelectOptionTwo([]);
        }
    }, [getLocation.pathname]);

    return (
        <div className="Main-selectors">
            <Grid
                container
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Grid
                    item
                    xs={12}
                    sm={5}
                    md={3}
                    lg={3}
                    alignItems="center"
                    sx={{ m: 1, p: 0 }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="companySelect">
                            {texts.selectCompany}
                        </InputLabel>
                        <Select
                            fullWidth
                            labelId="companySelect"
                            id="company"
                            name="company"
                            value={toSearch.company}
                            label={texts.selectCompany}
                            onChange={handleChange}
                            size="small"
                        >
                            {companies.map((value) => {
                                return (
                                    <MenuItem
                                        value={value.company}
                                        key={value.id}
                                    >
                                        {value.company}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={5}
                    md={3}
                    lg={3}
                    alignItems="center"
                    sx={{ m: 1, padding: 0 }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="optionOneSelect">
                            {texts.selectNumbOne}
                        </InputLabel>
                        <Select
                            fullWidth
                            labelId="optionOneSelect"
                            id="optionOne"
                            name="optionOne"
                            value={toSearch.optionOne}
                            label={texts.selectNumbOne}
                            onChange={handleChange}
                            size="small"
                            disabled={selectOptionOne.length === 0}
                        >
                            {selectOptionOne.map((value, index) => {
                                return (
                                    <MenuItem value={value} key={value + index}>
                                        {value}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={5}
                    md={3}
                    lg={3}
                    alignItems="center"
                    sx={{ m: 1, p: 0 }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="optionTwoSelect">
                            {texts.selectNumbTwo}
                        </InputLabel>
                        <Select
                            labelId="optionTwoSelect"
                            id="optionTwo"
                            name="optionTwo"
                            value={toSearch.optionTwo}
                            label={texts.selectNumbTwo}
                            onChange={handleChange}
                            size="small"
                            disabled={selectOptionTwo.length === 0}
                        >
                            {selectOptionTwo.map((value, index) => {
                                return (
                                    <MenuItem value={value} key={value + index}>
                                        {value}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    sm={5}
                    md={4}
                    lg={2}
                    alignItems="center"
                    sx={{ m: 1, p: 0 }}
                    direction="row"
                    justifyContent="space-evenly"
                >
                    <Grid item>
                        <Button
                            variant="outlined"
                            // sx={{ m: 1 }}
                            onClick={handleSearch}
                            size="large"
                            disabled={toSearch.optionTwo.length === 0}
                        >
                            {texts.toSearch}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => navigate(`/`)}
                            size="large"
                            disabled={getLocation.pathname === "/"}
                        >
                            {texts.toMain}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
