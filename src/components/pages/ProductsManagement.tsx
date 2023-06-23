import {
  Box,
  Center,
  Heading,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import ProductCrudManagement from "./crud/ProductCrudManagement";

const ProductsManagement = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const headingColor = useColorModeValue("teal.400", "teal.500");

  return (
    <>
      <center>
        <Box marginX={4} marginTop={isScreenFixed ? "4.3rem" : "1rem"}>
          <Center>
            <Heading
              my={2}
              mt={"1.5rem"}
              textAlign="center"
              colorScheme={"teal"}
              color={headingColor}
            >
              Products Management
            </Heading>
          </Center>
        </Box>
      </center>
      <ProductCrudManagement />
    </>
  );
};

export default ProductsManagement;
