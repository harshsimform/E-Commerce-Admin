import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { IFormValues, IOption } from "../../interface/interface";
import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import FileInput from "./FileInput";

const ProductDetailsForm = () => {
  const customBorderColor = useColorModeValue("white.200", "gray.700");
  const productGender: IOption[] = [
    { key: "Select gender", value: "" },
    { key: "Male", value: "male" },
    { key: "Female", value: "female" },
  ];
  const productCategory: IOption[] = [
    { key: "Select category", value: "" },
    { key: "Men", value: "men" },
    { key: "Women", value: "women" },
    { key: "Electronics", value: "electronics" },
    { key: "Beauty", value: "beauty" },
  ];

  const productSubCategory: IOption[] = [
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
  ];

  const initialValue: IFormValues = {
    image: "",
    name: "",
    description: "",
    selectGender: "",
    selectCategory: "",
    selectSubCategory: "",
  };
  const validationSchema = Yup.object({
    image: Yup.string()
      .matches(/data:image\/(png|jpg|);base64?/i, "Image must be jpg or png")
      .test("fileSize", "Image size must be less than 2MB", function (value) {
        if (!value) {
          return true;
        }
        const fileInput = document.getElementById("image") as HTMLInputElement;
        const file = fileInput.files && fileInput.files[0];
        if (file && file.size) {
          return file.size <= 2 * 1024 * 1024;
        }
        return false;
      })
      .required("Image is required"),
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    selectGender: Yup.string().required("Required"),
    selectCategory: Yup.string().required("Required"),
    selectSubCategory: Yup.string().required("Required"),
  });
  const onSubmit = (
    values: IFormValues,
    onSubmitProps: FormikHelpers<IFormValues>
  ) => {
    console.log("Form data", values);
    onSubmitProps.resetForm();
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
          borderRadius="lg"
          border={1}
          borderStyle="solid"
          borderColor={customBorderColor}
        >
          <Form>
            <FileInput label="Product Image" name="image" />
            <FormikControl
              control="input"
              type="text"
              label="Product Name"
              name="name"
              placeholder="Please enter product name"
            />
            <FormikControl
              control="textarea"
              label="Description"
              name="description"
              placeholder="Please enter product description"
            />
            <FormikControl
              control="select"
              label={"select Gender"}
              name="selectGender"
              options={productGender}
            />
            <FormikControl
              control="select"
              label={"select Category"}
              name="selectCategory"
              options={productCategory}
            />
            <FormikControl
              control="select"
              label={"select Sub Category"}
              name="selectSubCategory"
              options={productSubCategory}
            />
            <Button
              type="submit"
              colorScheme={"teal"}
              bgColor={"teal.400"}
              marginY={4}
            >
              Submit
            </Button>
            <Button
              type="reset"
              colorScheme={"teal"}
              bgColor={"teal.400"}
              marginY={4}
              marginX={2}
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
