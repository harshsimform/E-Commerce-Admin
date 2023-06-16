export interface IOption {
  key: string;
  value: string;
}

export interface ProductFormValues {
  _id: string;
  image?: string | undefined;
  name: string;
  discountedPrice: string;
  originalPrice: string;
  description: string;
  quantity: string;
  displaySection: string;
  gender: string;
  category: string;
}

export interface ProductResponse {
  productDetails: ProductFormValues[];
}

export interface UserAuthFormValues {
  name?: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword?: string;
}

export interface Props {
  key?: number;
  control?: string;
  label?: string;
  name: string;
  options?: { key: string; value: string }[];
  type?: string;
  className?: string;
  placeholder?: string;
  color?: string;
}

export interface TextErrorProps {
  children?: React.ReactNode;
}

export enum InputControlType {
  Input = "input",
  TextArea = "textarea",
  Select = "select",
}

export interface ImageCellProps {
  value: string;
}

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  to: string;
}
