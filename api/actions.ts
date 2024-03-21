import * as Yup from "yup";
import { InferType } from "yup";

const addressSchema = Yup.object({
  properties: Yup.object({
    label: Yup.string().required(),
    id: Yup.string().required(),
    name: Yup.string().required(),
    postcode: Yup.string().required(),
    city: Yup.string().required(),
  }).required(),
});
const addressesSchema = Yup.array().of(addressSchema);
const resSchema = Yup.object({
  features: addressesSchema,
  code: Yup.number(),
});
export type Address = InferType<typeof addressSchema>;

export const fetchAddresses = async (input: string) => {
  const res = await fetch(`https://api-adresse.data.gouv.fr/search?q=${input}`);
  const json = await res.json();

  return await resSchema.validate(json);
};
