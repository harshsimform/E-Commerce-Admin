import React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";

const OrderManagement = () => {
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
          <h1>Order Management page</h1>
        </Box>
      </center>
    </>
  );
};

export default OrderManagement;
