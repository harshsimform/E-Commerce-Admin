import { Box } from "@chakra-ui/react";
import React from "react";

const UserManagement = () => {
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
          <h1>User Management Page</h1>
        </Box>
      </center>
    </>
  );
};

export default UserManagement;
