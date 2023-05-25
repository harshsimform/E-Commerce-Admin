import React, { useState } from "react";
import { ErrorMessage, useField } from "formik";
import TextError from "./TextError";
import { Props } from "../../interface/interface";
import { Box, FormLabel } from "@chakra-ui/react";

const FileInput = ({ label, name }: Props) => {
  const [field, meta, helpers] = useField(name);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files && event.currentTarget.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          const base64 = reader.result as string;
          setSelectedImg(base64);
          helpers.setValue(base64);
        }
      };

      reader.readAsDataURL(file);
    } else {
      helpers.setValue("");
    }
  };

  return (
    <>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Box marginY={2}>
        <input id={name} type="file" onChange={handleFileChange} />
      </Box>
      {selectedImg && (
        <Box marginY={5}>
          <img src={selectedImg} alt="Preview" />
        </Box>
      )}
      <ErrorMessage name={name} component={TextError} />
    </>
  );
};

export default FileInput;
