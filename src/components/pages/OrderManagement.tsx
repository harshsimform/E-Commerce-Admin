import React from "react";
import { Box } from "@chakra-ui/react";

const OrderManagement = () => {
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
          <h1>Order Management page</h1>
        </Box>
      </center>
    </>
  );
};

export default OrderManagement;
