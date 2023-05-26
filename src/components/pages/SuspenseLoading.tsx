import { Box, Spinner } from "@chakra-ui/react";

const SuspenseLoading = () => {
  return (
    <Box height="100vh" width="100vw" position="relative">
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="lg"
        />
      </Box>
    </Box>
  );
};

export default SuspenseLoading;
