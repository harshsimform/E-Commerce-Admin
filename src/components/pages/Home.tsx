import React from "react";
import { Box } from "@chakra-ui/react";

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
          color={"teal.400"}
          fontSize="3xl"
        >
          <h1>Summary</h1>
        </Box>
      </center>
    </>
  );
};

export default Home;
