import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

let initialContact = {
    name: "",
    email: "",
    comment: "",
};
let styles = {
    // fontWeight: "bold",
    color: "#dc3545",
    // padding : "0",
    margin: "0",
    fontSize: "calc(10px + 1vmin)",
};

export const ContactUs = ({
    closeModal,
    isOpen,
}: {
    closeModal: any;
    isOpen: boolean;
}) => {
    const [contact, setContact] = useState<{
        name: string;
        email: string;
        comment: string;
    }>(initialContact);
    const [sending, setSending] = useState<boolean>(false);
    const [response, setResponse] = useState<{
        thereIsResponse: boolean;
        success: boolean;
        error?: string;
    }>({ thereIsResponse: false, success: false });
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        comment?: string;
    }>({});

    const searchInputRef = useRef<any | null>(null);

    const validateContact = (contact: {
        name: string;
        email: string;
        comment: string;
    }) => {
        let errors: { name?: string; email?: string; comment?: string } = {};
        // let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        let regexComments = /^.{0,199}$/;

        if (!contact.name.trim()) {
            errors.name = "Name is required / Nombre requerido";
        }
        // else if (!regexName.test(contact.name.trim())) {
        //     errors.name = 'The "First Name" field only accepts letters and blanks';
        // }
        if (!contact.email.trim()) {
            errors.email = '"email" is required / "mail" requerido';
        } else if (!regexEmail.test(contact.email.trim())) {
            errors.email = '"email" incorrect / "mail" incorrecto';
        }
        if (!regexComments.test(contact.comment)) {
            errors.comment = "Limit 200 characters / 200 caracteres limite";
        }
        return errors;
    };

    const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        let nameInput: string = evt.target.name;
        setContact((prevState) => ({
            ...prevState,
            [nameInput]: evt.target.value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let listErrors = validateContact(contact);
        setErrors(listErrors);
        if (Object.keys(listErrors).length === 0) {
            setSending(true);
            const controller = new AbortController();
            let endpoint =
                "https://formsubmit.co/ajax/c478a512af67f2f41bbdbcde472eb138";
            let options = {
                body: JSON.stringify(contact),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                method: "POST",
                signal: controller.signal,
            };
            setTimeout(() => controller.abort(), 3000);
            let errorSend = new Error(`Delivery failed`);
            fetch(endpoint, options)
                .then((res) => res.json())
                .then((data) => {
                    setSending(false);
                    if (data.success === "true") {
                        setResponse({ thereIsResponse: true, success: true });
                        setTimeout(
                            () =>
                                setResponse({
                                    thereIsResponse: false,
                                    success: false,
                                }),
                            5000
                        );
                        setTimeout(() => closeModal(), 7000);
                        setContact(initialContact);
                    } else {
                        throw errorSend;
                    }
                })
                .catch((errorSend) => {
                    console.log(errorSend.message);
                    setTimeout(
                        () =>
                            setResponse({
                                thereIsResponse: false,
                                success: false,
                            }),
                        5000
                    );
                    errorSend.message === "Delivery failed"
                        ? setResponse({
                              thereIsResponse: true,
                              success: false,
                              error: "Delivery failed / Envío fallido",
                          })
                        : setResponse({
                              thereIsResponse: true,
                              success: false,
                              error: "Time Out / Tiempo agotado",
                          });
                });
        }
    };

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);
    useEffect(() => {
        setContact(initialContact);
        setErrors({});
    }, [isOpen]);

    return (
        <>
            <br />
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Contact us / Contactanos </legend>
                    <TextField
                        id="name"
                        name="name"
                        label="Name / Nombre"
                        type="text"
                        variant="outlined"
                        size="small"
                        margin="normal"
                        fullWidth
                        onChange={handleChange}
                        value={contact.name}
                        required
                        ref={searchInputRef}
                    />{" "}
                    <br />
                    {errors.name && <p style={styles}>{errors.name}</p>}
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        type="text"
                        variant="outlined"
                        size="small"
                        margin="normal"
                        fullWidth
                        onChange={handleChange}
                        value={contact.email}
                        required
                    />{" "}
                    <br />
                    {errors.email && <p style={styles}>{errors.email}</p>}
                    <TextField
                        id="comment"
                        name="comment"
                        label="Your Comment / Su comentario"
                        type="text"
                        variant="outlined"
                        size="small"
                        margin="normal"
                        multiline
                        rows={8}
                        fullWidth
                        onChange={handleChange}
                        value={contact.comment}
                    />
                    {errors.comment && <p style={styles}>{errors.comment}</p>}
                </fieldset>
                <br />
                <Button variant="outlined" onClick={(evt) => handleSubmit(evt)}>
                    {sending ? "Sending / Enviando" : "Send / Enviar"}
                </Button>
                {response.thereIsResponse && response.success && (
                    <p style={styles}>{`OK`}</p>
                )}
                {response.thereIsResponse && !response.success && (
                    <p style={styles}>{response.error}</p>
                )}
            </form>
        </>
    );
};
