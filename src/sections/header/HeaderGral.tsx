import { useAuth0 } from "@auth0/auth0-react";
import { Button, Grid, MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import LoginButton from "../../components/LoginButton";
import LogoutButton from "../../components/LogoutButton";
import ModalElement from "../../components/Modal";
import LanguageContext from "../../context/LanguageContext";
import { useClock } from "../../hooks/useClook";
import { useModal } from "../../hooks/useModal";
import { ContactUs } from "./ContactUs";

export const HeaderGral = () => {
    const { isAuthenticated } = useAuth0();
    const { texts, handleLanguage, language } = useContext(LanguageContext);
    const time = useClock();
    const {
        isOpen: isOpenModal1,
        openModal: openModal1,
        closeModal: closeModal1,
    } = useModal(false);

    return (
        <>
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
                        <Button
                            variant="outlined"
                            sx={{ m: 1 }}
                            onClick={openModal1}
                        >
                            {texts.contactButton}
                        </Button>
                        <ModalElement
                            isOpen={isOpenModal1}
                            closeModal={closeModal1}
                        >
                            <ContactUs
                                closeModal={closeModal1}
                                isOpen={isOpenModal1}
                            />
                        </ModalElement>
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
        </>
    );
};
