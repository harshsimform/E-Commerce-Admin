import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikControl from "../../formik/FormikControl";
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { UserAuthFormValues } from "../../../interface/interface";

const Login = () => {
  const toast = useToast();
  const submitMenuBgColor = useColorModeValue("teal.400", "teal.600");
  const resetMenuBgColor = useColorModeValue("red.400", "red.600");

  const initialValue: UserAuthFormValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is invalid")
      .required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be 8 characters long")
      .required("Password is required"),
  });
  const onSubmit = async (
    values: UserAuthFormValues,
    onSubmitProps: FormikHelpers<UserAuthFormValues>
  ) => {
    onSubmitProps.resetForm();
    console.log(values);
    toast({
      title: "You have successfully signed in",
      position: "top",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      mx="3"
    >
      <Box
        width={"xl"}
        boxShadow="lg"
        padding={6}
        borderWidth="1px"
        borderRadius="lg"
        marginBottom="5rem"
      >
        <Box>
          <Text fontSize="4xl" mb={4} textColor="teal">
            Login
          </Text>
        </Box>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <FormikControl
                control="input"
                type="text"
                label="Email"
                name="email"
                placeholder="Enter your email"
              />

              <FormikControl
                control="input"
                type="text"
                label="Password"
                name="password"
                placeholder="Enter your password"
              />

              <Box textAlign="left">
                <Button
                  type="submit"
                  colorScheme="teal"
                  color="white"
                  bgColor={submitMenuBgColor}
                  marginY={4}
                  _hover={{
                    bgColor: "teal.500",
                  }}
                >
                  Submit
                </Button>
                <Button
                  type="reset"
                  colorScheme="red"
                  color="white"
                  bgColor={resetMenuBgColor}
                  marginY={4}
                  marginX={2}
                  _hover={{
                    bgColor: "red.500",
                  }}
                >
                  Reset
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Login;
