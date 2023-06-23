import {
  Box,
  Center,
  Heading,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import ProductDetailsForm from "./crud/ProductDetailsForm";

const AddProduct = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const headingColor = useColorModeValue("teal.400", "teal.500");

  return (
    <>
      <Box marginX={4} marginTop={isScreenFixed ? "4.3rem" : "0"}>
        <Center>
          <Heading
            my={2}
            mt={"1.5rem"}
            textAlign="center"
            colorScheme={"teal"}
            color={headingColor}
          >
            Add Product
          </Heading>
        </Center>
      </Box>
      <Box
        marginTop={5}
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
