import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import ProductDetailsForm from "./crud/ProductDetailsForm";

const AddProduct = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <Box
        marginBottom={5}
        justifyContent={"center"}
        display={"flex"}
        fontWeight={500}
        color={"teal.400"}
        fontSize="3xl"
        marginTop={isScreenFixed ? "5rem" : "1rem"}
      >
        <Text>Add Product</Text>
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

export default AddProduct;
