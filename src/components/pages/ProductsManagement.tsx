import { Box, useBreakpointValue } from "@chakra-ui/react";
import ProductCrudManagement from "./crud/ProductCrudManagement";

const ProductsManagement = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  return (
    <>
      <center>
        <Box
          width={10 / 12}
          textAlign={"center"}
          justifyContent={"center"}
          display={"flex"}
          fontWeight={500}
          color={"teal.400"}
          fontSize="3xl"
          marginTop={isScreenFixed ? "5rem" : "1rem"}
        >
          <h1>Products Management</h1>
        </Box>
      </center>
      <ProductCrudManagement />
    </>
  );
};

export default ProductsManagement;
