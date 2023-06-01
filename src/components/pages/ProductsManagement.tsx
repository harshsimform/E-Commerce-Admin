import { Box } from "@chakra-ui/react";
import ProductCrudManagement from "./crud/ProductCrudManagement";

const ProductsManagement = () => {
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
        >
          <h1>Products Management</h1>
        </Box>
      </center>
      <ProductCrudManagement />
    </>
  );
};

export default ProductsManagement;
