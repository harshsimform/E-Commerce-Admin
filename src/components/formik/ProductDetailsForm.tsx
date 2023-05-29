import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { IFormValues, IOption } from "../../interface/interface";
import { Box, Button, useToast } from "@chakra-ui/react";
import FileInput from "./FileInput";
import { useState } from "react";
import API from "../../api";

const ProductDetailsForm = () => {
  const toast = useToast();
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((prevKey) => prevKey + 1);
  };

  const productGender: IOption[] = [
    { key: "Select gender", value: "" },
    { key: "Male", value: "male" },
    { key: "Female", value: "female" },
  ];

  const productCategory: IOption[] = [
    { key: "Select category", value: "" },
    { key: "Topwear", value: "topwear" },
    { key: "Bottomwear", value: "bottomwear" },
    { key: "Footwear", value: "footwear" },
    { key: "Fashion Accessories", value: "fashion accessories" },
    { key: "Indian Wear", value: "indian wear" },
    { key: "Watches & Wearables", value: "watches and wearables" },
    { key: "Jewelry", value: "jewelry" },
    { key: "Makeup", value: "makeup" },
    { key: "Haircare", value: "haircare" },
    { key: "Fragrances", value: "fragrances" },
    { key: "Appliances", value: "appliances" },
    { key: "Home & Living", value: "home and living" },
    { key: "Electronics", value: "electronics" },
    { key: "Beauty", value: "beauty" },
  ];

  const initialValue: IFormValues = {
    image: "",
    name: "",
    originalPrice: "",
    discountedPrice: "",
    description: "",
    quantity: "",
    gender: "",
    category: "",
  };
  const validationSchema = Yup.object({
    image: Yup.string().required("Image is required"),
    name: Yup.string().trim().required("Required"),
    description: Yup.string()
      .trim()
      .required("Required")
      .min(30, "Description at least be 30 characters long"),
    gender: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    quantity: Yup.string()
      .required("Required")
      .test("is-positive", "Quantity must be greater than 0", (value) => {
        return parseInt(value) > 0;
      }),
    discountedPrice: Yup.string()
      .required("Required")
      .test("is-positive", "Price must be greater than 0", (value) => {
        return parseInt(value) > 0;
      }),
    originalPrice: Yup.number()
      .required("Required")
      .moreThan(
        Yup.ref("discountedPrice"),
        "Original price must be greater than discounted price"
      ),
  });
  const onSubmit = async (
    values: IFormValues,
    onSubmitProps: FormikHelpers<IFormValues>
  ) => {
    onSubmitProps.resetForm();
    setResetKey((prevKey) => prevKey + 1);

    API.post("/product", values)
      .then((res) => {
        // Handle successful response
        toast({
          title: "New product has been added successfully",
          position: "top",
          status: "success",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error occurred while adding the product",
          position: "top",
          status: "error",
          isClosable: true,
        });
      });
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Box
          width={"3xl"}
          boxShadow="lg"
          padding={6}
          borderWidth="1px"
          borderRadius="lg"
          marginBottom="5rem"
        >
          <Form>
            <FileInput label="Product Image" name="image" key={resetKey} />
            <FormikControl
              control="input"
              type="text"
              label="Product Name"
              name="name"
              placeholder="Please enter product name"
            />
            <FormikControl
              control="input"
              type="number"
              label="Product Discounted Price"
              name="discountedPrice"
              placeholder="Please enter product discounted price"
            />
            <FormikControl
              control="input"
              type="number"
              label="Product Original Price"
              name="originalPrice"
              placeholder="Please enter product actual price"
            />
            <FormikControl
              control="textarea"
              label="Product Description"
              name="description"
              placeholder="Please enter product description"
            />
            <FormikControl
              control="input"
              type="number"
              label="Available Quantity"
              name="quantity"
              placeholder="Please enter available product quantity"
            />
            <FormikControl
              control="select"
              label="Select Gender"
              name="gender"
              options={productGender}
            />
            <FormikControl
              control="select"
              label="Select Category"
              name="category"
              options={productCategory}
            />
            <Button
              type="submit"
              colorScheme="teal"
              color="white"
              bgColor="teal.400"
              marginY={4}
            >
              Submit
            </Button>
            <Button
              type="reset"
              colorScheme="teal"
              color="white"
              bgColor="teal.400"
              marginY={4}
              marginX={2}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default ProductDetailsForm;
