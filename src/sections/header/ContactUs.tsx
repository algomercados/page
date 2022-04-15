import { Button, TextField } from "@mui/material"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
// import { helpHttp } from "../helpers/helpHttp";
// import Loader from "./Loader";
// import Message from "./Message";

let initialContact = {
    name:"",
    email:"",
    comment:"",
}
let styles = {
    // fontWeight: "bold",
    color: "#dc3545",
    // padding : "0",
    margin: "0",
    fontSize: "calc(10px + 1vmin)",
};


export const ContactUs = ({closeModal, isOpen}:{closeModal:any, isOpen:boolean})=>{
    const [contact, setContact]= useState<{name:string, email:string, comment:string}>(initialContact)
    // const [loading, setLoading] = useState<boolean>(false);
    // const [response, setResponse] = useState<{thereIsResponse:boolean, success:boolean}>({thereIsResponse:false, success:false});
    const [errors, setErrors] = useState<{name?:string, email?:string, comment?:string }>({});

    const searchInputRef = useRef<any| null>(null);

    const validateContact = (contact:{name:string, email:string, comment:string}, ) => {
        let errors:{name?:string, email?:string, comment?:string}={};
        // let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        let regexComments = /^.{1,199}$/;

        if (!contact.name.trim()) {
            errors.name = 'Name is required / Nombre requerido';
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

    const handleChange = (evt:ChangeEvent<HTMLInputElement>):void=>{
        // console.log(contact)
        let nameInput:string = evt.target.name;
        setContact(prevState=>({
            ...prevState,
            [nameInput]: evt.target.value
        }));
    }
    
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        let listErrors = validateContact(contact)
        setErrors(listErrors);
        // if (Object.keys(listErrors).length === 0) {
        //     alert("Enviando Formulario");
        //     setLoading(true);
        //     helpHttp()
        //     .post("https://formsubmit.co/ajax/diegopruebas@yahoo.com", {
        //         body: contact,
        //         headers: {
        //         "Content-Type": "application/json",
        //         Accept: "application/json",
        //         },
        //     })
        //     .then((res) => {
        //         console.log(res)
        //         if (res.success==="true"){
        //         setResponse({thereIsResponse:true, success:true})
        //         }else{
        //         setResponse({thereIsResponse:true, success:false})
        //         }
        //         setLoading(false);
        //         setContact(initialContact);
        //         setTimeout(() => setResponse({thereIsResponse:false, success:false}), 5000);
        //         setTimeout(() => closeModal(), 6000);
        //     });
        // }
    };
    
    useEffect(()=>{
        // console.log(searchInputRef);
        if(searchInputRef.current){
            searchInputRef.current.focus();
        }
    },[])
    useEffect(()=>{
        setContact(initialContact);
        setErrors({});
    },[isOpen])

    return(
        <>
            {/* <h3>About Us</h3> */}
            {/* <p>Worst programmer ever</p> */}
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Contact us / Contactanos </legend>
                    <TextField id="name" name="name" label="Name / Nombre" type="text"
                        variant="outlined" size="small" margin="normal" fullWidth
                        onChange={handleChange} value = {contact.name}  required ref={searchInputRef}/> <br/>
                    {errors.name && <p style={styles}>{errors.name}</p>}
                    <TextField id="email" name="email" label="Email" type="text"
                        variant="outlined" size="small" margin="normal" fullWidth
                        onChange={handleChange} value = {contact.email} required/> <br/>
                     {errors.email && <p style={styles}>{errors.email}</p>}
                    <TextField id="comment" name="comment" label="Your Coment / Su comentario" type="text"
                        variant="outlined" size="small" margin="normal"
                        multiline rows={8}  fullWidth
                        onChange={handleChange}  value={contact.comment} />
                   {errors.comment && <p style={styles}>{errors.comment}</p>}
                </fieldset>
                <Button variant="outlined" onClick={(evt)=>handleSubmit(evt)}>Send / Enviar</Button>
            </form>
            {/* {loading && <Loader />}
            {response.thereIsResponse && response.success &&
                <Message msg="The contact has been save." bgColor="green" />
            }
            {response.thereIsResponse && !response.success &&
                <Message msg="There was a error. The contact has not been save." bgColor="red" />
            } */}
        </>
    )
}