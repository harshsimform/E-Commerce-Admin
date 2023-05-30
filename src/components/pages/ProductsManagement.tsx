import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import axios from "axios";
import { ProductFormValues } from "../../interface/interface";

const selectedProductInitialValue = {
  name: "",
  _id: "",
  image: "",
  discountedPrice: "",
  originalPrice: "",
  description: "",
  quantity: "",
  gender: "",
  category: "",
};

const API_BASE_URL = "https://shopzify-products.onrender.com/product";

const ProductsManagement = () => {
  const [rowData, setRowData] = useState<ProductFormValues[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormValues>(
    selectedProductInitialValue
  );
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateBgColor = useColorModeValue("teal.400", "teal.600");
  const resetMenuBgColor = useColorModeValue("red.400", "red.600");

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setRowData(response.data.productDetails);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleEdit = (product: ProductFormValues) => {
    onOpen();
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    setIsUpdateLoading(true);
    try {
      await axios.patch(
        `${API_BASE_URL}/${selectedProduct._id}`,
        selectedProduct
      );
      fetchProductData();
      setIsEditing(false);
      setSelectedProduct(selectedProductInitialValue);
      toast({
        title: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error updating product",
        description: "An error occurred while updating the product.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    setIsUpdateLoading(false);
  };

  const handleDelete = async (productId: string) => {
    setIsDeleteLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/${productId}`);
      fetchProductData();
      toast({
        title: "Product deleted successfully",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error deleting product",
        description: "An error occurred while deleting the product.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    setIsDeleteLoading(false);
  };

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
          <h1>Products Management</h1>
        </Box>
      </center>
      <Box maxWidth="800px" mx="auto" my="5">
        {rowData.length === 0 ? (
          <Center>
            <Text fontSize="xl">No products found.</Text>
          </Center>
        ) : (
          <Stack spacing="4">
            {rowData.map((product) => (
              <Box key={product._id} p="4" borderWidth="1px" borderRadius="md">
                <Image src={product.image} alt="image" width="15rem" />
                <Text fontWeight="bold">Name: {product.name}</Text>
                <Text>Category: {product.category}</Text>
                <Text>Discounted Price: {product.discountedPrice}</Text>
                <Text>Original Price: {product.originalPrice}</Text>
                <Text>Description: {product.description}</Text>
                <Text>Quantity: {product.quantity}</Text>
                <Text>Gender: {product.gender}</Text>
                <Text>Category: {product.category}</Text>
                {!isEditing && (
                  <Button
                    colorScheme="teal"
                    color="white"
                    bgColor={updateBgColor}
                    mt="2"
                    onClick={() => handleEdit(product)}
                    _hover={{
                      bgColor: "teal.500",
                    }}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  colorScheme="red"
                  bgColor={resetMenuBgColor}
                  color="white"
                  mt="2"
                  ml="2"
                  onClick={() => handleDelete(product._id)}
                  isLoading={isDeleteLoading}
                  loadingText="Deleting"
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Stack>
        )}
        {isEditing && (
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton onClick={() => setIsEditing(false)} />
              <ModalBody pb={6}>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={selectedProduct.name || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="category" mt="2">
                  <FormLabel>Category</FormLabel>
                  <Input
                    type="text"
                    value={selectedProduct.category || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        category: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="price" mt="2">
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    value={selectedProduct.discountedPrice || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        discountedPrice: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="description" mt="2">
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    value={selectedProduct.description || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleUpdate}
                  isLoading={isUpdateLoading}
                  loadingText="Updating"
                >
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </>
  );
};

export default ProductsManagement;
