import { Input as ChakraInput, FormLabel } from "@chakra-ui/react";
import { ErrorMessage } from "formik";
import TextError from "./TextError";
import { Props } from "../../interface/interface";
import { Field } from "formik";

const Input = (props: Props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="formControl">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field
        as={ChakraInput}
        id={name}
        name={name}
        {...rest}
        color={"gray.600"}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Input;
