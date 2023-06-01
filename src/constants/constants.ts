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

export const productCategory: IOption[] = [
  { key: "Select category", value: "" },
  { key: "Topwear", value: "topwear" },
  { key: "Bottomwear", value: "bottomwear" },
  { key: "Footwear", value: "footwear" },
  { key: "Fashion Accessories", value: "fashion accessories" },
  { key: "Indian Wear", value: "indian wear" },
  { key: "Watches & Wearables", value: "watches and wearables" },
  { key: "Jewelry", value: "jewelry" },
  { key: "Makeup", value: "makeup" },
  { key: "Haircare", value: "haircare" },
  { key: "Fragrances", value: "fragrances" },
  { key: "Appliances", value: "appliances" },
  { key: "Home & Living", value: "home and living" },
  { key: "Electronics", value: "electronics" },
  { key: "Beauty", value: "beauty" },
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
