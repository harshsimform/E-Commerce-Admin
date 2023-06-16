import {
  Box,
  Button,
  useColorModeValue,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { ProductFormValues } from "../../../interface/interface";
import { FiEdit2 } from "react-icons/fi";
import { DeleteIcon } from "@chakra-ui/icons";

interface ProductsTableProps {
  rowData: ProductFormValues[];
  handleEdit: (product: ProductFormValues) => void;
  handleDelete: (productId: string) => void;
  isProductDeleteLoading: string;
}

const ProductsTable = ({
  rowData,
  handleEdit,
  handleDelete,
  isProductDeleteLoading,
}: ProductsTableProps) => {
  const updateButtonBgColor = useColorModeValue("teal.400", "teal.600");
  const deleteButtonBgColor = useColorModeValue("red.400", "red.600");

  return (
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
            {rowData.map((product: ProductFormValues) => (
              <Tr key={product._id}>
                <Td>
                  <Image
                    src={product.image}
                    alt="Product Image"
                    width={"4rem"}
                    height={"4rem"}
                    borderRadius="md"
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
                    <FiEdit2 /> <Text ml={2}>Update</Text>
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
                      product._id === isProductDeleteLoading ? true : false
                    }
                    loadingText="Deleting"
                    _hover={{
                      bgColor: "red.500",
                    }}
                  >
                    <DeleteIcon />
                    <Text ml={2}>Delete</Text>
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductsTable;
