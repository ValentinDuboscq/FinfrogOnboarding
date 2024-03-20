import { Address } from "../api/actions";

export type InputTypes =
  | "firstname"
  | "lastname"
  | "email"
  | "phone"
  | "address";

export type InputsData = {
  [key in InputTypes]: key extends "address" ? Address | undefined : string;
};

export const STEPS: { [key in InputTypes]: { label: string } } = {
  firstname: { label: "Prénom" },
  lastname: { label: "Nom" },
  email: { label: "Email" },
  address: { label: "Adresse" },
  phone: { label: "Téléphone" },
};
