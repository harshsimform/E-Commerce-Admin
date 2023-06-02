import { IOption, ProductFormValues } from "../interface/interface";

export const displaySection: IOption[] = [
  { key: "Select section", value: "" },
  { key: "Top Picks", value: "top picks" },
  { key: "Trending Now", value: "trending now" },
  { key: "Flash Sale", value: "flash sale" },
  { key: "Other", value: "other" },
];

export const productGender: IOption[] = [
  { key: "Select gender", value: "" },
  { key: "Male", value: "male" },
  { key: "Female", value: "female" },
  { key: "Both", value: "both" },
];

export const initialValue: ProductFormValues = {
  _id: "",
  image: "",
  name: "",
  originalPrice: "",
  discountedPrice: "",
  description: "",
  quantity: "",
  displaySection: "",
  gender: "",
  category: "",
};
