import { useState } from "react";
import {
  VStack,
  HStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  IconButton,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface SubNav {
  label: string;
  sublabel: string;
  to: string;
}

interface NavItem {
  label: string;
  children: SubNav[];
  to: string;
}

const NavItemForm: React.FC = () => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState<NavItem>({
    label: "",
    children: [],
    to: "",
  });
  const [editedIndex, setEditedIndex] = useState(-1);

  const [errorFields, setErrorFields] = useState<{
    label: boolean;
    to: boolean;
  }>({
    label: false,
    to: false,
  });

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setErrorFields({ label: false, to: false });
  };

  const handleOpenEditModal = (index: number) => {
    const editedItem = navItems[index];
    setNewMenuItem(editedItem);
    setEditedIndex(index);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setErrorFields({ label: false, to: false });
  };

  const handleAddMenuItem = () => {
    if (newMenuItem.label.trim() === "") {
      setErrorFields((prevErrorFields) => ({
        ...prevErrorFields,
        label: true,
      }));
      return;
    }

    if (newMenuItem.to.trim() === "") {
      setErrorFields((prevErrorFields) => ({ ...prevErrorFields, to: true }));
      return;
    }

    setNavItems((prevItems) => [...prevItems, newMenuItem]);
    setNewMenuItem({ label: "", children: [], to: "" });
    handleCloseAddModal();
  };

  const handleEditMenuItem = () => {
    if (newMenuItem.label.trim() === "") {
      setErrorFields((prevErrorFields) => ({
        ...prevErrorFields,
        label: true,
      }));
      return;
    }

    if (newMenuItem.to.trim() === "") {
      setErrorFields((prevErrorFields) => ({ ...prevErrorFields, to: true }));
      return;
    }

    setNavItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[editedIndex] = newMenuItem;
      return updatedItems;
    });
    setNewMenuItem({ label: "", children: [], to: "" });
    setEditedIndex(-1);
    handleCloseEditModal();
  };

  const handleDeleteMenuItem = (index: number) => {
    setNavItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    isSubMenu = false,
    subMenuIndex = -1
  ) => {
    const { value } = e.target;
    setNewMenuItem((prevItem) => {
      const updatedItem = { ...prevItem };
      if (isSubMenu && subMenuIndex !== -1) {
        updatedItem.children = prevItem.children.map((subMenu, index) => {
          if (index === subMenuIndex) {
            return { ...subMenu, [field]: value };
          }
          return subMenu;
        });
      } else {
        updatedItem[field] = value;
      }
      return updatedItem;
    });
    setErrorFields((prevErrorFields) => ({
      ...prevErrorFields,
      [field]: false,
    }));
  };

  return (
    <Grid templateColumns="1fr" gap={4} p={4} maxWidth="500px" margin="0 auto">
      <VStack align="center" spacing={4}>
        {navItems.map((menuItem, index) => (
          <HStack key={index}>
            <FormControl isReadOnly>
              <FormLabel>Menu Label</FormLabel>
              <Input
                value={menuItem.label}
                onChange={(e) => handleInputChange(e, "label")}
              />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Menu Link</FormLabel>
              <Input
                value={menuItem.to}
                onChange={(e) => handleInputChange(e, "to")}
              />
            </FormControl>
            <IconButton
              icon={<EditIcon />}
              aria-label="Edit Menu"
              onClick={() => handleOpenEditModal(index)}
              variant="ghost"
            />
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete Menu"
              onClick={() => handleDeleteMenuItem(index)}
              variant="ghost"
              colorScheme="red"
            />
          </HStack>
        ))}
        <Button leftIcon={<AddIcon />} onClick={handleOpenAddModal}>
          Add Menu
        </Button>
      </VStack>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Menu Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={4}>
              <FormControl isRequired isInvalid={errorFields.label}>
                <FormLabel>Menu Label</FormLabel>
                <Input
                  value={newMenuItem.label}
                  onChange={(e) => handleInputChange(e, "label")}
                />
                {errorFields.label && (
                  <FormHelperText color="red.500">
                    Menu Label is required
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={errorFields.to}>
                <FormLabel>Menu Link</FormLabel>
                <Input
                  value={newMenuItem.to}
                  onChange={(e) => handleInputChange(e, "to")}
                />
                {errorFields.to && (
                  <FormHelperText color="red.500">
                    Menu Link is required
                  </FormHelperText>
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddMenuItem}>
              Save
            </Button>
            <Button onClick={handleCloseAddModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Menu Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={4}>
              <FormControl isRequired isInvalid={errorFields.label}>
                <FormLabel>Menu Label</FormLabel>
                <Input
                  value={newMenuItem.label}
                  onChange={(e) => handleInputChange(e, "label")}
                />
                {errorFields.label && (
                  <FormHelperText color="red.500">
                    Menu Label is required
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={errorFields.to}>
                <FormLabel>Menu Link</FormLabel>
                <Input
                  value={newMenuItem.to}
                  onChange={(e) => handleInputChange(e, "to")}
                />
                {errorFields.to && (
                  <FormHelperText color="red.500">
                    Menu Link is required
                  </FormHelperText>
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditMenuItem}>
              Save
            </Button>
            <Button onClick={handleCloseEditModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default NavItemForm;
