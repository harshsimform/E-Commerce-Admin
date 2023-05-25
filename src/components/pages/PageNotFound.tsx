import { Box, Button, Container, Image, Spacer } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import PageNotFoundImg from "/public/404-error.gif";

const PageNotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <center>
        <Container
          width={10 / 12}
          textAlign={"center"}
          justifyContent={"center"}
          display={"flex"}
        >
          <Box>
            <Image src={PageNotFoundImg} alt="Page Not Found" />
            <Button colorScheme="teal" variant="solid" onClick={goBack}>
              Go Back
            </Button>
          </Box>
        </Container>
        <Spacer mt={"2"} />
      </center>
    </>
  );
};

export default PageNotFound;
