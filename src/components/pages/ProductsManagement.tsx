import { Box, Text } from "@chakra-ui/react";
import React from "react";
import ProductDetailsForm from "../formik/ProductDetailsForm";

const ProductManagement = () => {
  return (
    <>
      <Box
        marginBottom={5}
        justifyContent={"center"}
        display={"flex"}
        fontWeight={500}
        color={"teal.400"}
        fontSize="3xl"
      >
        <Text>Add Products</Text>
      </Box>
      <Box
        marginX={5}
        justifyContent={"center"}
        alignItems="center"
        display={"flex"}
        fontWeight={500}
        color={"gray.500"}
      >
        <ProductDetailsForm />
      </Box>
    </>
  );
};

export default ProductManagement;
