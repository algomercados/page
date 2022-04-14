import logo from "./logo.svg";
import "./App.css";
import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import LanguageContext from "./context/LanguageContext";
import { Grid, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { useClock } from "./hooks/useClook";

function App() {
    const { isAuthenticated } = useAuth0();
    const { texts, handleLanguage, language } = useContext(LanguageContext);
    const time = useClock();

    return (
        <div className="App">
            <header className="App-header">
                {/* <Box sx={{ flexGrow: 1 }} alignItems="center"> */}
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid item xs={12} sm={6} alignItems="center">
                        <h2>ALGOMERCADOS</h2>
                    </Grid>
                    <Grid
                        spacing={2}
                        container
                        item
                        xs={12}
                        sm={6}
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        <Grid item>
                            <p style={{ margin: 0 }}>{time}</p>
                        </Grid>
                        <Grid item>
                            {!isAuthenticated && <LoginButton />}
                            {isAuthenticated && (
                                <>
                                    <LogoutButton />
                                </>
                            )}
                        </Grid>
                        <Grid item>
                            <Select
                                labelId="Status"
                                id="status"
                                name="status"
                                value={language}
                                label="Status"
                                onChange={handleLanguage}
                                defaultValue="es"
                                size="small"
                                sx={{ mr: 2 }}
                            >
                                <MenuItem value="es">Español</MenuItem>
                                <MenuItem value="en">English</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>
                {/* </Box> */}
            </header>
            <main className="App-main">
                <img src={logo} className="App-logo" alt="logo" />
                <p>{texts.auxText}</p>
            </main>
        </div>
    );
}
export default App;
