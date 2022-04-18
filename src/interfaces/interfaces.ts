import { ChangeEvent, FormEvent } from "react";

export interface ContactDataInterface {
    firstName: string,
    lastName: string,
    id: number|null,
    email: string,
    age: number|null
}

export interface toSearchInterface {
    company: string,
    id: string,
    optionOne: string,
    optionTwo: string
}

export type FormElement = FormEvent<HTMLFormElement>;
export type InputElementChange = ChangeEvent<HTMLInputElement>;
export type TextAreaElementChange = ChangeEvent<HTMLTextAreaElement>;
