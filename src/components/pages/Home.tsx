import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <center>
        <Box
          width={10 / 12}
          textAlign={"justify"}
          justifyContent={"center"}
          display={"flex"}
          fontWeight={500}
          color={"gray.500"}
        >
          <Text>Home Page</Text>
        </Box>
      </center>
    </>
  );
};

export default Home;
