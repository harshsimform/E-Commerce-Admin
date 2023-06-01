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
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
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
  displaySection: "",
  gender: "",
  category: "",
};

const API_BASE_URL = "https://shopzify-products.onrender.com/product";

const ProductsManagement = () => {
  const [rowData, setRowData] = useState<ProductFormValues[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormValues>(
    selectedProductInitialValue
  );
  const [isProductUpdateLoading, setIsProductUpdateLoading] = useState(false);
  const [isProductDeleteLoading, setIsProductDeleteLoading] = useState("");
  const [isProductEditing, setIsProductEditing] = useState(false);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateButtonBgColor = useColorModeValue("teal.400", "teal.600");
  const deleteButtonBgColor = useColorModeValue("red.400", "red.600");

  const fetchProductData = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setRowData(response.data.productDetails);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleEdit = (product: ProductFormValues) => {
    onOpen();
    setSelectedProduct(product);
    setIsProductEditing(true);
  };

  const handleUpdate = async () => {
    setIsProductUpdateLoading(true);
    try {
      await axios.patch(
        `${API_BASE_URL}/${selectedProduct._id}`,
        selectedProduct
      );
      fetchProductData();
      setIsProductEditing(false);
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
    setIsProductUpdateLoading(false);
  };

  const handleDelete = async (productId: string) => {
    setIsProductDeleteLoading(productId);
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
    setIsProductDeleteLoading("");
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
      <Box maxWidth="1000px" mx="auto" my="5">
        {rowData.length === 0 ? (
          <Center>
            <Text fontSize="xl">No products found.</Text>
          </Center>
        ) : (
          <Stack>
            <Box p="4" mx="6" borderWidth="1px" borderRadius="md">
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th fontSize="md" color="teal.500">
                        Image
                      </Th>
                      <Th fontSize="md" color="teal.500">
                        Product Id
                      </Th>
                      <Th fontSize="md" color="teal.500">
                        Name
                      </Th>
                      <Th fontSize="md" color="teal.500">
                        Edit
                      </Th>
                      <Th fontSize="md" color="teal.500">
                        Delete
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {rowData.map((product) => (
                      <Tr key={product._id}>
                        <Td>
                          <Image
                            src={product.image}
                            alt="Product Image"
                            width="70px"
                          />
                        </Td>
                        <Td color="gray.500">{product._id}</Td>
                        <Td color="gray.500">{product.name}</Td>
                        <Td>
                          <Button
                            colorScheme="teal"
                            color="white"
                            size="md"
                            bgColor={updateButtonBgColor}
                            onClick={() => handleEdit(product)}
                            _hover={{
                              bgColor: "teal.500",
                            }}
                          >
                            Edit
                          </Button>
                        </Td>
                        <Td>
                          <Button
                            colorScheme="red"
                            size="md"
                            color="white"
                            bgColor={deleteButtonBgColor}
                            onClick={() => handleDelete(product._id)}
                            isLoading={
                              product._id === isProductDeleteLoading
                                ? true
                                : false
                            }
                            loadingText="Deleting"
                            _hover={{
                              bgColor: "red.500",
                            }}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Stack>
        )}
        {isProductEditing && (
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mx="5">
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton onClick={() => setIsProductEditing(false)} />
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
                <FormControl id="discountedPrice" mt="2">
                  <FormLabel>Discounted Price</FormLabel>
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
                </FormControl>{" "}
                <FormControl id="originalPrice" mt="2">
                  <FormLabel>Original Price</FormLabel>
                  <Input
                    type="number"
                    value={selectedProduct.originalPrice || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        originalPrice: e.target.value,
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
                </FormControl>{" "}
                <FormControl id="quantity" mt="2">
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="text"
                    value={selectedProduct.quantity || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        quantity: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="displaySection" mt="2">
                  <FormLabel>Display Section</FormLabel>
                  <Input
                    type="text"
                    value={selectedProduct.displaySection || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        displaySection: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="gender" mt="2">
                  <FormLabel>Gender</FormLabel>
                  <Input
                    type="text"
                    value={selectedProduct.gender || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        gender: e.target.value,
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
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleUpdate}
                  isLoading={isProductUpdateLoading}
                  loadingText="Updating"
                >
                  Save
                </Button>
                <Button onClick={() => setIsProductEditing(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </>
  );
};

export default ProductsManagement;
