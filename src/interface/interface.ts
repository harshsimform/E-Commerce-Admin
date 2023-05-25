export interface IOption {
  key: string;
  value: string;
}

export interface IFormValues {
  image?: string | undefined;
  name: string;
  description: string;
  selectGender: string;
  selectCategory: string;
  selectSubCategory: string;
}

export interface Props {
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
  Radio = "radio",
  Checkbox = "checkbox",
}
